import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { allChains, useAccount, useSigner } from "wagmi";
import {
  getDCNTStaking,
  getDCNT721A,
  setupDCNTSDK,
} from "@decent.xyz/decent-sdk-private-v0";
import {
  ApproveNFTButton,
  StakeButton,
  UnstakeButton,
} from "../StakingButtons";
import getDefaultProvider from "../../lib/getDefaultProvider";
import { Box, TextField, Typography } from "@mui/material";

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
  const [tokenId, setTokenId] = useState();

  useEffect(() => {
    if (!chainId) return;
    const provider = getDefaultProvider(chainId);

    const getStakingContract = async () => {
      const sdk = await setupDCNTSDK(chain?.id || 1, signer || provider);
      const contract = await getDCNTStaking(sdk, address);
      setStakingContract(contract);
      const nftAddress = await contract.nftAddress();
      setNftContractAddress(nftAddress);
      const erc20Address = await contract.erc20Address();
      setErc20ContractAddress(erc20Address);
      const stakingNftContract = await getDCNT721A(sdk, nftAddress);
      setNftContract(stakingNftContract);

      if (!signer) return;
      const balance = await contract.balanceOf(account);
      setStakedNftCount(balance.toNumber());
    };

    if (!provider && !signer) return;
    getStakingContract();
  }, [address, chain, chainId, signer]);

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography mt={3} variant="h3" color="white">
        Staking
      </Typography>
      <Typography variant="caption" color="white">
        Chain: {chain?.name}
      </Typography>
      <Typography variant="caption" color="white">
        ChainId: {chainId}
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

      {signer && <StakeButton contract={stakingContract} tokenId={1} />}
      {signer && (
        <ApproveNFTButton
          stakingContractAddress={stakingContract?.address}
          nftContract={nftContract}
          tokenId={1}
        />
      )}
      {stakedNftCount > 0 && signer && (
        <UnstakeButton contract={stakingContract} tokenId={1} />
      )}
    </Box>
  );
};

export default StakingPage;
