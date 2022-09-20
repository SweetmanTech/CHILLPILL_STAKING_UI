import { Button } from "@mui/material";
import { toast } from "react-toastify";
import handleTxError from "../../lib/handleTxError";

const ApproveNFTButton = ({
  stakingContractAddress,
  nftContract,
  tokenId,
  onSuccess,
}) => {
  const handleClick = async () => {
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
      Prep Pill for Staking
    </Button>
  );
};

export default ApproveNFTButton;
