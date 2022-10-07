import { toast } from "react-toastify";
import handleTxError from "./handleTxError";

export const stakeAll = async (
  contract,
  nftContract,
  tokensToStake,
  address,
  onSuccess,
  setPendingTxStep
) => {
  try {
    setPendingTxStep(2);
    const approved = await isPillStakeApproved(nftContract, address, contract);
    console.log("approved", approved);
    if (!approved) {
      const nowApproved = await approve(nftContract, contract, tokenId);
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
    console.log("staking contract", contract);
    setPendingTxStep(2);
    const approved = await isPillStakeApproved(nftContract, address, contract);
    console.log("approved", approved);
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

const approve = async (nftContract, contract, tokenId) => {
  if (!nftContract?.signer) {
    toast.error("Please connect your wallet");
    return;
  }

  try {
    console.log("nftContract", nftContract);
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
  console.log("isPillStakeApproved", nftContract);
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
