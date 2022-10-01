import { toast } from "react-toastify";
import handleTxError from "./handleTxError";

export const stake = async (contract, tokenId = 1, approved, nftContract) => {
  console.log("STAKE CONTRACT", contract);
  try {
    console.log("STAKE APPROVED", approved);
    if (!approved) {
      console.log("NOT APPROVED", nftContract);
      const nowApproved = await approve(nftContract, contract, tokenId);
      if (!nowApproved || nowApproved.error) {
        console.log("NEVER APPROVED RETURN", nowApproved.error);
        return nowApproved;
      }
    }
    const tx = await contract.stake([tokenId]);
    await tx.wait();
    toast.success("Staked!");
    onSuccess();
  } catch (error) {
    console.log("ERROR STAKING", error);
    handleTxError(error);
    return { error };
  }
};

const approve = async (nftContract, contract, tokenId) => {
  console.log(nftContract);
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
    console.log("ERROR APPROVING", error);
    console.log("ERROR APPROVING", Object.keys(error));
    console.log("ERROR APPROVING", error.reason);
    handleTxError(error);
    return { error: error.reason };
  }
};

export const unstake = async (contract, tokenId) => {
  console.log("STAKE CONTRACT", contract);

  try {
    const tx = await contract.unstake([tokenId]);
    await tx.wait();
    toast.success("Unstaked!");
    await onSuccess();
  } catch (error) {
    handleTxError(error);
  }
};
