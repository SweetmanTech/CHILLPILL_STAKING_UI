import { toast } from "react-toastify";
import handleTxError from "./handleTxError";

export const stake = async (contract, tokenId = 1, approved, nftContract) => {
  try {
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

export const unstake = async (contract, tokenId) => {
  try {
    const tx = await contract.unstake([tokenId]);
    await tx.wait();
    toast.success("Unstaked!");
    await onSuccess();
  } catch (error) {
    handleTxError(error);
  }
};
