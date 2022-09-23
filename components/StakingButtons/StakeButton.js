import { Button } from "@mui/material";
import { toast } from "react-toastify";
import handleTxError from "../../lib/handleTxError";

const StakeButton = ({
  contract,
  tokenId,
  onSuccess,
  nftContract,
  approved,
}) => {
  const handleClick = async () => {
    if (!contract.signer) {
      toast.error("Please connect your wallet");
      return;
    }

    try {
      console.log("APPROVED", approved);
      if (!approved) {
        const nowApproved = await approve();
        if (!nowApproved) return;
      }
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
      const tx = await nftContract.approve(contract.address, [tokenId]);
      await tx.wait();
      toast.success("Approved! You can now stake your ChillPill");
      return true;
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
