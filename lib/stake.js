import { toast } from "react-toastify";
import handleTxError from "./handleTxError";
import { batchMintTestnetNfts } from "./mintTestnetNft";

export const stakeAll = async (
  contract,
  nftContract,
  tokensToStake,
  address,
  onSuccess,
  setPendingTxStep
) => {
  try {
    await checkTestnetMint(nftContract, tokensToStake, address);
    setPendingTxStep(2);
    const approved = await isPillStakeApproved(nftContract, address, contract);
    if (!approved) {
      const nowApproved = await approve(nftContract, contract);
      if (!nowApproved || nowApproved.error) {
        return nowApproved;
      }
    }
    setPendingTxStep(3);
    const tx = await contract.stake(tokensToStake);
    await tx.wait();
    toast.success("Staked all tokens!");
    onSuccess();
  } catch (error) {
    handleTxError(error);
    return { error };
  }
};

export const stake = async (
  contract,
  tokenId = 1,
  nftContract,
  onSuccess,
  setPendingTxStep,
  address
) => {
  try {
    setPendingTxStep(2);
    const approved = await isPillStakeApproved(nftContract, address, contract);
    if (!approved) {
      const nowApproved = await approve(nftContract, contract, tokenId);
      if (!nowApproved || nowApproved.error) {
        return nowApproved;
      }
    }
    setPendingTxStep(3);
    const tx = await contract.stake([tokenId]);
    await tx.wait();
    toast.success("Staked!");
    onSuccess();
  } catch (error) {
    handleTxError(error);
    return { error };
  }
};

const approve = async (nftContract, contract) => {
  if (!nftContract?.signer) {
    toast.error("Please connect your wallet");
    return;
  }

  try {
    const tx = await nftContract.setApprovalForAll(contract.address, true);
    await tx.wait();
    toast.success("Approved! You can now stake your ChillPill");
    return true;
  } catch (error) {
    handleTxError(error);
    return { error: error.reason };
  }
};

const isPillStakeApproved = async (nftContract, address, stakingContract) => {
  const isApproved = await nftContract
    .isApprovedForAll(address, stakingContract.address)
    .catch();
  return isApproved;
};

export const unstake = async (contract, tokenId, onSuccess) => {
  try {
    const tx = await contract.unstake([tokenId]);
    await tx.wait();
    toast.success("Unstaked!");
    await onSuccess();
  } catch (error) {
    handleTxError(error);
  }
};

export const claim = async (
  contract,
  tokenIds,
  setPendingTxStep,
  onSuccess,
  switchNetwork
) => {
  if (!contract.signer) {
    toast.error("please connect wallet & try again");
    await switchNetwork(parseInt(process.env.NEXT_PUBLIC_CHAIN_ID));
    return;
  }
  setPendingTxStep(5);
  try {
    const tx = await contract.claim(tokenIds);
    setPendingTxStep(6);
    await tx.wait();
    toast.success("Claimed!");
    await onSuccess();
  } catch (error) {
    handleTxError(error);
  }
  setPendingTxStep(0);
};

const checkTestnetMint = async (contract, tokens, address) => {
  if (process.env.NEXT_PUBLIC_CHAIN_ID != 1) {
    console.log("CHECKING IF TOKENS EXIST");
    const unmintedTokenIds = [];
    for (let i = 0; i < tokens.length; i++) {
      try {
        const ownerAddress = await contract.ownerOf(tokens[i]);
        console.log("ownerAddress", ownerAddress);
      } catch (err) {
        unmintedTokenIds.push(tokens[i]);
        console.log("TOKEN DOES NOT EXIST, ADD TO MINTING LIST");
      }
    }
    if (unmintedTokenIds.length > 0) {
      console.log("BATCH MINT", unmintedTokenIds);
      await batchMintTestnetNfts(
        contract.address,
        address,
        unmintedTokenIds,
        contract.signer
      );
    }
  }
};
