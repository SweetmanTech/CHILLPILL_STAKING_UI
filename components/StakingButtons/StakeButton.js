import { Button } from "@mui/material";
import { toast } from "react-toastify";
import handleTxError from "../../lib/handleTxError";

const StakeButton = ({ contract, tokenId, onSuccess, nftContract }) => {
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

  const approve = async () => {
    console.log(nftContract);
    if (!nftContract?.signer) {
      toast.error("Please connect your wallet");
      return;
    }

    try {
      const tx = await nftContract.approve(stakingContractAddress, [tokenId]);
      await tx.wait();
      toast.success("Approved! You can now stake your ChillPill");
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
