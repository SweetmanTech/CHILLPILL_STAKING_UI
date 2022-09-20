import { Button } from "@mui/material";
import { toast } from "react-toastify";
import handleTxError from "../../lib/handleTxError";

const UnstakeButton = ({ contract, tokenId, onSuccess }) => {
  const handleClick = async () => {
    if (!contract.signer) {
      toast.error("Please connect your wallet");
      return;
    }

    try {
      const tx = await contract.unstake([tokenId]);
      await tx.wait();
      toast.success("Unstaked!");
      await onSuccess();
    } catch (error) {
      handleTxError(error);
    }
  };

  return (
    <Button onClick={handleClick} size="large" variant="contained">
      Unstake NFT
    </Button>
  );
};

export default UnstakeButton;
