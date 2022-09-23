import { Button, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import handleTxError from "../../lib/handleTxError";

const UnstakeButton = ({ contract, tokenId, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!contract.signer) {
      toast.error("Please connect your wallet");
      return;
    }

    setLoading(true);
    try {
      const tx = await contract.unstake([tokenId]);
      await tx.wait();
      toast.success("Unstaked!");
      await onSuccess();
    } catch (error) {
      handleTxError(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Typography color="white">
        ChillPill is in the Studio earning $CHILL (click to unstake)
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

export default UnstakeButton;
