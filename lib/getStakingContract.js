import {
  getDCNT721A,
  getDCNTStaking,
  setupDCNTSDK,
} from "@decent.xyz/decent-sdk-private-v0";

const getStakingContracts = async (signerOrProvider) => {
  const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID);
  const address = process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS;
  const sdk = await setupDCNTSDK(chainId, signerOrProvider);
  const staking = await getDCNTStaking(sdk, address);
  const nftAddress = await staking.nftAddress();
  const nft = await getDCNT721A(sdk, nftAddress);
  return { staking, sdk, nft };
};

export default getStakingContracts;
