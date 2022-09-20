import { Button } from "@mui/material";
import { toast } from "react-toastify";
import handleTxError from "../../lib/handleTxError";

const StakeButton = ({ contract, tokenId }) => {
  const handleClick = async () => {
    if (!contract.signer) {
      toast.error("Please connect your wallet");
      return;
    }

    try {
      const tx = await contract.stake([tokenId]);
      await tx.wait();
      toast.success("Staked!");
    } catch (error) {
      handleTxError(error);
    }
  };

  return (
    <Button onClick={handleClick} size="large" variant="contained">
      Stake NFT
    </Button>
  );
};

export default StakeButton;
