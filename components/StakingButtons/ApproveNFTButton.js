import { Button } from "@mui/material";
import { toast } from "react-toastify";
import handleTxError from "../../lib/handleTxError";

const ApproveNFTButton = ({ stakingContractAddress, nftContract, tokenId }) => {
  const handleClick = async () => {
    console.log(nftContract);
    if (!nftContract?.signer) {
      toast.error("Please connect your wallet");
      return;
    }

    try {
      const tx = await nftContract.approve(stakingContractAddress, [tokenId]);
      await tx.wait();
      toast.success("Approved! You can now stake your NFT");
    } catch (error) {
      handleTxError(error);
    }
  };

  return (
    <Button onClick={handleClick} size="large" variant="contained">
      Approve NFT for Staking
    </Button>
  );
};

export default ApproveNFTButton;
