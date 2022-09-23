import { useEffect, useState } from "react";
import { allChains, useAccount, useSigner } from "wagmi";
import {
  getDCNTStaking,
  getDCNT721A,
  setupDCNTSDK,
} from "@decent.xyz/decent-sdk-private-v0";
import { StakeButton, UnstakeButton } from "../StakingButtons";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { ethers } from "ethers";

const StakingPage = () => {
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
  const [tokenId, setTokenId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(true);
  const [unclaimed, setUnclaimed] = useState(0);

  const getStakedBalance = async (staking = stakingContract) => {
    if (!signer) return;
    const stakedBalance = await staking.balanceOf(account);
    setStakedNftCount(stakedBalance.toNumber());
    return stakedBalance.toNumber();
  };

  const isPillStakeApproved = async (
    pillToStake = tokenId,
    { nft, staking }
  ) => {
    const approvedAddress = await nft.getApproved(pillToStake);
    console.log("approvedAddress", approvedAddress);

    const isApproved = approvedAddress == staking.address;
    console.log("IS APPROVED", isApproved);
    setApproved(isApproved);
    console.log("IS APPROVED", isApproved);
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
    console.log("stakingNftContract", stakingNftContract);
    setNftContract(stakingNftContract);
    return { staking, sdk, nft: stakingNftContract };
  };

  const getPillToStake = async (stakingNftContract) => {
    console.log("stakingNftContract", stakingNftContract);
    const balance = await stakingNftContract.balanceOf(account);
    console.log("BALALNCE", balance.toNumber());
    if (balance.toNumber() > 0) {
      const totalNftSupply = await stakingNftContract.totalSupply();
      console.log("totalNftSupply", totalNftSupply);
      for (let i = 0; i < totalNftSupply; i++) {
        const tokenOwner = await stakingNftContract.ownerOf(i);
        if (tokenOwner === account) {
          console.log("FOUND IT", i);
          setTokenId(i);
          return i;
        }
      }
    }
  };

  const getUnclaimedChillBalance = async (stakingNftContract, stakedPills) => {
    console.log("$CHILL contract", stakingNftContract);
    const newUnclaimed = await stakingNftContract.earningInfo(
      account,
      stakedPills
    );
    setUnclaimed(newUnclaimed.toString());
    console.log("unclaimed", unclaimed.toString());
  };

  const getStakedPill = async (staking = stakingContract) => {
    const stakedPills = await staking.tokensOfOwner(account);
    console.log("STAKED PILLS", stakedPills);
    setTokenId(stakedPills[0].toNumber());
    return stakedPills;
  };

  const load = async (signerOrProvider) => {
    setLoading(true);
    const contracts = await getStakingContract(signerOrProvider);
    const stakedBalance = await getStakedBalance(contracts.staking);
    console.log("Staked balance", stakedBalance);
    if (stakedBalance > 0) {
      // TODO: get staked tokenID
      const stakedPills = await getStakedPill(contracts.staking);
      await getUnclaimedChillBalance(contracts.staking, stakedPills);
    } else {
      console.log("HELLO WORLD");

      const pillToStake = await getPillToStake(contracts.nft);
      console.log("TOKEN ID:", pillToStake);
      await isPillStakeApproved(pillToStake, contracts);
    }
    setLoading(false);
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
      <Typography variant="caption" color="white">
        Staking Contract Address: {address}
      </Typography>
      <Typography variant="caption" color="white">
        NFT Contract Address: {nftContractAddress}
      </Typography>
      <Typography variant="caption" color="white">
        ERC20 Contract Address: {erc20ContractAddress}
      </Typography>
      <Typography variant="caption" color="white">
        NFTs Staked: {stakedNftCount}
      </Typography>
      <Typography variant="caption" color="white">
        $CHILL balance (unclaimed): {ethers.utils.formatEther(unclaimed)} $CHILL
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
