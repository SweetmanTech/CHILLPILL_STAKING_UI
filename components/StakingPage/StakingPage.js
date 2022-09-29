import { useEffect, useState } from "react";
import { allChains, useAccount, useSigner } from "wagmi";
import {
  getDCNTStaking,
  getDCNT721A,
  setupDCNTSDK,
} from "@decent.xyz/decent-sdk-private-v0";
import { StakeButton, UnstakeButton } from "../StakingButtons";
import { Box, CircularProgress, Typography } from "@mui/material";

const StakingPage = ({ openSeaData }) => {
  const { data: signer } = useSigner();
  const { address: account } = useAccount();
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID;
  const address = process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS;
  const chain = allChains.find((chain) => chain.id == chainId);
  const [stakingContract, setStakingContract] = useState();
  const [nftContractAddress, setNftContractAddress] = useState();
  const [nftContract, setNftContract] = useState();
  const [erc20ContractAddress, setErc20ContractAddress] = useState();
  const [stakedNftCount, setStakedNftCount] = useState();
  const [totalStakedPills, setTotalStakedPills] = useState(0);
  const [floorPrice, setFloorPrice] = useState(0);
  const [tokenId, setTokenId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(true);
  console.log("STAKING CONTRACT ADDRESS: ", address);
  console.log("NFT CONTRACT ADDRESS: ", nftContractAddress);
  console.log("$CHILL ERC20 ADDRESS: ", erc20ContractAddress);
  console.log("CHAIN ID: ", chainId);

  const getStakedBalance = async (staking = stakingContract) => {
    if (!signer) return;
    const stakedBalance = await staking.balanceOf(account);
    setStakedNftCount(stakedBalance.toNumber());
    return stakedBalance.toNumber();
  };

  const getTotalStakedPills = async (staking = stakingContract) => {
    const stakedBalance = await staking.totalStaked();
    setTotalStakedPills(stakedBalance.toNumber());
    return stakedBalance.toNumber();
  };

  const isPillStakeApproved = async (
    pillToStake = tokenId,
    { nft, staking }
  ) => {
    const approvedAddress = await nft.getApproved(pillToStake);
    const isApproved = approvedAddress == staking.address;
    setApproved(isApproved);
    return isApproved;
  };

  const getStakingContract = async (signerOrProvider) => {
    const sdk = await setupDCNTSDK(chain?.id || 1, signerOrProvider);
    const staking = await getDCNTStaking(sdk, address);
    setStakingContract(staking);
    const nftAddress = await staking.nftAddress();
    setNftContractAddress(nftAddress);
    const erc20Address = await staking.erc20Address();
    setErc20ContractAddress(erc20Address);

    const stakingNftContract = await getDCNT721A(sdk, nftAddress);
    setNftContract(stakingNftContract);
    return { staking, sdk, nft: stakingNftContract };
  };

  const getPillToStake = async (stakingNftContract) => {
    const balance = await stakingNftContract.balanceOf(account);
    if (balance.toNumber() > 0) {
      const totalNftSupply = await stakingNftContract.totalSupply();
      for (let i = 0; i < totalNftSupply; i++) {
        const tokenOwner = await stakingNftContract.ownerOf(i);
        if (tokenOwner === account) {
          setTokenId(i);
          return i;
        }
      }
    }
  };

  const getStakedPill = async (staking = stakingContract) => {
    const stakedPills = await staking.tokensOfOwner(account);
    setTokenId(stakedPills[0].toNumber());
    return stakedPills[0].toNumber();
  };

  const load = async (signerOrProvider) => {
    setLoading(true);
    const contracts = await getStakingContract(signerOrProvider);
    const stakedBalance = await getStakedBalance(contracts.staking);
    if (stakedBalance > 0) {
      // TODO: get staked tokenID
      await getStakedPill(contracts.staking);
    } else {
      const pillToStake = await getPillToStake(contracts.nft);
      await isPillStakeApproved(pillToStake, contracts);
    }
    await getTotalStakedPills(contracts.staking);
    getFloorPrice();
    setLoading(false);
  };

  const getFloorPrice = () => {
    setFloorPrice(openSeaData.collection.stats.floor_price);
  };

  useEffect(() => {
    if (!chainId) return;

    if (!signer) return;
    load(signer);
  }, [address, chain, chainId, signer]);

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography mt={3} variant="h3" color="white">
        ChillRx Staking
      </Typography>
      <Typography variant="body2" color="white">
        % of ChillRx Staked:{" "}
        {parseFloat((totalStakedPills / 9999) * 100).toFixed(2)}%
      </Typography>
      <Typography variant="body2" color="white">
        Total ChillRx Staked: {totalStakedPills}
      </Typography>
      <Typography variant="body2" color="white">
        Minimum Value Locked: {totalStakedPills * floorPrice}ETH
      </Typography>

      {signer && !loading ? (
        <>
          {stakedNftCount > 0 ? (
            <UnstakeButton
              contract={stakingContract}
              tokenId={tokenId}
              onSuccess={() => load(signer)}
            />
          ) : (
            <StakeButton
              contract={stakingContract}
              tokenId={tokenId}
              onSuccess={() => load(signer)}
              approved={approved}
              nftContract={nftContract}
            />
          )}
        </>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default StakingPage;
