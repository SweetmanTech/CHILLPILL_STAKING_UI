import { toast } from "react-toastify";
import handleTxError from "./handleTxError";

export const stake = async (contract, tokenId = 1, nftContract, onSuccess) => {
  try {
    const approved = await isPillStakeApproved(nftContract, tokenId, contract);
    if (!approved) {
      const nowApproved = await approve(nftContract, contract, tokenId);
      if (!nowApproved || nowApproved.error) {
        return nowApproved;
      }
    }
    const tx = await contract.stake([tokenId]);
    await tx.wait();
    toast.success("Staked!");
    onSuccess();
  } catch (error) {
    handleTxError(error);
    return { error };
  }
};

const approve = async (nftContract, contract, tokenId) => {
  if (!nftContract?.signer) {
    toast.error("Please connect your wallet");
    return;
  }

  try {
    const tx = await nftContract.approve(contract.address, tokenId);
    await tx.wait();
    toast.success("Approved! You can now stake your ChillPill");
    return true;
  } catch (error) {
    handleTxError(error);
    return { error: error.reason };
  }
};

const isPillStakeApproved = async (nftContract, tokenId, stakingContract) => {
  const approvedAddress = await nftContract.getApproved(tokenId).catch();
  const isApproved = approvedAddress == stakingContract.address;
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
