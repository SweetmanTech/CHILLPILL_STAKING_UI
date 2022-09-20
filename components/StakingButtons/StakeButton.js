import { Button } from "@mui/material";
import { toast } from "react-toastify";
import handleTxError from "../../lib/handleTxError";

const StakeButton = ({ contract, tokenId, onSuccess }) => {
  const handleClick = async () => {
    if (!contract.signer) {
      toast.error("Please connect your wallet");
      return;
    }

    try {
      const tx = await contract.stake([tokenId]);
      await tx.wait();
      toast.success("Staked!");
      onSuccess();
    } catch (error) {
      handleTxError(error);
    }
  };

  return (
    <Button onClick={handleClick} size="large" variant="contained">
      Stake Pill
    </Button>
  );
};

export default StakeButton;
