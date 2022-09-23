import { Button, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import handleTxError from "../../lib/handleTxError";

const StakeButton = ({
  contract,
  tokenId,
  onSuccess,
  nftContract,
  approved,
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!contract.signer) {
      toast.error("Please connect your wallet");
      return;
    }

    setLoading(true);
    try {
      console.log("APPROVED", approved);
      if (!approved) {
        const nowApproved = await approve();
        if (!nowApproved) {
          setLoading(false);
          return;
        }
      }
      const tx = await contract.stake([tokenId]);
      await tx.wait();
      toast.success("Staked!");
      onSuccess();
    } catch (error) {
      handleTxError(error);
    }
    setLoading(false);
  };

  const approve = async () => {
    console.log(nftContract);
    if (!nftContract?.signer) {
      toast.error("Please connect your wallet");
      return;
    }

    try {
      const tx = await nftContract.approve(contract.address, [tokenId]);
      await tx.wait();
      toast.success("Approved! You can now stake your ChillPill");
      return true;
    } catch (error) {
      handleTxError(error);
    }
  };

  return (
    <>
      <Typography color="white">
        {loading ? "staking..." : "Your Pills (click to stake)"}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <img
          onClick={handleClick}
          height={250}
          width={250}
          alt="chillpill"
          src="https://nftstorage.link/ipfs/QmRWnRm7wMxjcYsWde6QFNpPyMKXPN6GCwAZv5QmuhUJnJ"
        />
      )}
    </>
  );
};

export default StakeButton;
