import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  allChains,
  useAccount,
  useNetwork,
  useSigner,
  useSwitchNetwork,
} from "wagmi";
import { mintTestnetNft } from "../../lib/mintTestnetNft";
import { stake, unstake } from "../../lib/stake";
import StakeButton from "./StakeButton";
import StakedButton from "./StakedButton";
import UnstakeButton from "./UnstakeButton";

const TokenRow = ({
  style,
  tokenId,
  stakingContract,
  nftContract,
  staked,
  onSuccess,
}) => {
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const { address: account } = useAccount();
  const { switchNetwork } = useSwitchNetwork();
  const [hovering, setHovering] = useState(false);

  const handleClick = async () => {
    if (!signer) {
      toast.error("please connect wallet");
      return;
    }
    if (chain.id !== parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)) {
      await switchNetwork(parseInt(process.env.NEXT_PUBLIC_CHAIN_ID));
      const myChain = allChains.find(
        (blockchain) => blockchain.id == process.env.NEXT_PUBLIC_CHAIN_ID
      );
      toast.error(`Please connect to ${myChain.name} and try again`);
      return;
    }
    if (staked) {
      await unstake(stakingContract, tokenId, onSuccess);
    } else {
      const response = await stake(
        stakingContract,
        tokenId,
        nftContract,
        onSuccess
      );
      if (response?.error) {
        await mintTestnetNft(nftContract.address, account, tokenId, signer);
      }
    }
  };

  return (
    <Box
      onClick={handleClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Box style={{ display: "flex" }}>
        <Typography mb={-9} variant="h3" color="white">
          token #{tokenId}
        </Typography>
        {staked ? (
          <>
            {" "}
            {hovering ? (
              <UnstakeButton style={{ width: "100px" }} />
            ) : (
              <StakedButton style={{ width: "100px" }} />
            )}
          </>
        ) : (
          <StakeButton
            style={{ width: "100px" }}
            fillColor={hovering ? "#FD0101" : "#FAF400"}
          />
        )}
      </Box>
      <svg
        id="Layer_1"
        xmlns="http://www.w3.org/1000/svg"
        viewBox="0 0 2048 2048"
        style={style}
      >
        <g>
          <path
            style={{ fill: "#030303" }}
            d="M1479.51,789.98c97.67-.02,195.35,1.31,293.02-1.17,22.28-.57,44.57-.51,66.86-.92,29.8-.55,59.61-1.12,89.4-2.06,7.16-.22,9.25,1.7,9.2,9.27-.36,58.65-.56,117.31-.02,175.96,.38,40.96-4.5,81.71-3.98,122.63,.49,38.97-1.24,77.97,1.45,116.91,.56,8.1-.25,14.5-11.1,12.76-2.46-.39-5.19,1.16-7.74,1-5.89-.37-8.46,1.5-7.06,7.77,.63,2.82,.32,5.87,.28,8.82-.06,5.19-1.46,7.57-7.96,7.9-107.06,5.5-214.22,4.67-321.36,5.47-68.82,.51-137.66,.77-206.46,2.36-220.88,5.11-441.8,6.85-662.72,4.79-183.58-1.71-367.15-.95-550.72-1.4-8.28-.02-19.18,4.34-24.15-1.91-4.22-5.3-2.21-15.67-2.67-23.82-5.4-96.54-2.51-193.19-3.89-289.79-.54-37.99-.99-75.99-2.15-113.96-.31-10.17,3.68-14.27,13-12.99,10.8,1.48,14.8-2.41,12.82-13.09-1.8-9.73,3.4-12.69,12.29-12.64,29.5,.16,59.06,1.24,88.48-.24,84.49-4.22,169.05-4.94,253.55-3.44,209.13,3.71,418.27,.41,627.39,2.55,67.52,.69,135.03,1.76,202.53-.51,1.31,0,2.62-.02,3.93-.03,2.62-.01,5.23-.03,7.85-.04,43.3-.06,86.6-.13,129.9-.19Zm-766.35,438.61c205.16-.84,397.56,1.22,589.94-3.43,90.4-2.18,180.86-2.31,271.29-4.01,57.67-1.09,115.38,.01,173.06-.71,56.99-.72,113.96-2.57,170.95-3.71,7.01-.14,9.74-2.34,9.46-9.75-.89-23.55-1.19-47.12-1.63-70.69-.74-39.95,2.31-79.81,3.09-119.69,1.39-71.4,.4-142.84,.84-214.26,.05-8.16-1.83-11.07-10.13-9.94-27.67,3.77-55.61,1.95-83.41,3.16-47.13,2.05-94.36,2.2-141.55,2.26-198.64,.27-397.29,.24-595.93,.27-142.92,.03-285.84,.26-428.76-.13-84.55-.23-169.08-2.2-253.64-2.36-75.05-.13-149.94,5.02-224.96,4.29-6.88-.07-13.78,.05-20.64-.33-7.12-.4-10.24,1.39-9.93,9.71,1.2,32.06,1.9,64.16,2.09,96.24,.37,62.9,.41,125.81,.33,188.72-.06,41.91,1.37,83.75,3.74,125.58,.27,4.75,.55,7.49,6.96,7.43,56.05-.53,112.1-.74,168.15-.74,127.83,.02,255.66-.71,370.7,2.09Z"
          />
          <path
            style={{ fill: "#fefefe" }}
            d="M713.17,1228.59c-115.04-2.8-242.88-2.07-370.7-2.09-56.05,0-112.1,.21-168.15,.74-6.41,.06-6.69-2.68-6.96-7.43-2.37-41.83-3.79-83.68-3.74-125.58,.09-62.9,.04-125.81-.33-188.72-.19-32.09-.9-64.18-2.09-96.24-.31-8.32,2.81-10.1,9.93-9.71,6.87,.38,13.76,.26,20.64,.33,75.02,.73,149.91-4.42,224.96-4.29,84.56,.15,169.1,2.13,253.64,2.36,142.92,.39,285.84,.15,428.76,.13,198.64-.04,397.29,0,595.93-.27,47.19-.06,94.42-.21,141.55-2.26,27.8-1.21,55.74,.6,83.41-3.16,8.3-1.13,10.18,1.77,10.13,9.94-.44,71.42,.56,142.86-.84,214.26-.78,39.89-3.82,79.75-3.09,119.69,.44,23.57,.74,47.14,1.63,70.69,.28,7.41-2.45,9.61-9.46,9.75-56.98,1.14-113.96,2.99-170.95,3.71-57.68,.72-115.39-.37-173.06,.71-90.43,1.7-180.89,1.83-271.29,4.01-192.38,4.65-384.77,2.59-589.94,3.43Z"
          />
        </g>
        <path d="M610.94,794.52c1.04,91.46,2.14,213.41,2.82,304.41-.04,36.33-.65,74.41-1.75,110.69-.36,9.22-.61,18.45-1.07,27.67,0,0-.6,0-.6,0-.46-9.22-.71-18.45-1.07-27.67-1.11-36.26-1.72-74.38-1.75-110.69,.3-50.07,1.3-142.8,1.62-193.71,0,0,1.2-110.69,1.2-110.69,0,0,.6,0,.6,0h0Z" />
      </svg>
    </Box>
  );
};

export default TokenRow;
