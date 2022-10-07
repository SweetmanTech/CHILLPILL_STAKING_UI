import { Box, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
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
import { stake, unstake, stakeAll } from "../../lib/stake";
import StakeButton from "./StakeButton";
import StakedButton from "./StakedButton";
import UnstakeButton from "./UnstakeButton";

const StakeAllButton = ({
  style,
  tokensToStake,
  stakingContract,
  nftContract,
  staked,
  onSuccess,
  setPendingTxStep,
}) => {
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const { address: account } = useAccount();
  const { switchNetwork } = useSwitchNetwork();
  const [hovering, setHovering] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

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
    setPendingTxStep(1);
    if (staked) {
      setPendingTxStep(4);
      console.log("HOW TO HANDLE UNSTAKE ALL? HIDE BUTTON?");
      // await unstake(stakingContract, tokenId, onSuccess);
    } else {
      const response = await stakeAll(
        stakingContract,
        nftContract,
        tokensToStake,
        account,
        onSuccess,
        setPendingTxStep
      );
    }
    setPendingTxStep(0);
  };

  let buttonFill;
  if (staked) {
    buttonFill = hovering ? "#FD0101" : "#00a6c6";
  } else {
    buttonFill = hovering ? "#FD0101" : "#FAF400";
  }

  let buttonText;
  if (staked) {
    buttonText = hovering ? "UNSTAKE" : "STAKED";
  } else {
    buttonText = "STAKE ALL";
  }

  let buttonTransform;
  if (staked) {
    buttonTransform = hovering ? 1510 : 1537.04;
  } else {
    buttonTransform = 1490.04;
  }

  return (
    <Box>
      <svg
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1946.14 512.28"
      >
        <g
          onClick={handleClick}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <g>
            <path
              style={{ fill: "#040402" }}
              d="M1471.97,231.58c.17-3.22,.36-6,.43-8.78,.07-2.67,1.02-3.39,4.3-3.44,17.61-.26,35.14,1.21,52.72,1.49,17.92,.28,35.86,.1,53.79,.06,10.51-.03,21.02-.27,31.52-.28,33.12-.03,66.25-.03,99.37,.05,10.28,.02,20.55,.31,30.83,.54,20.8,.47,41.56-.44,62.33-1.05,25.59-.75,51.16-.4,76.72,.79,1.68,.08,3.4,0,5.07-.17,1.55-.16,2.41,.31,2.77,1.48,.14,.45,.17,.92,.19,1.38,.84,22.79,1.94,45.58,2.39,68.38,.23,11.81-.66,23.63-1.1,35.44-.19,5.12-.54,10.23-.81,15.34-.76,14.32-1.47,28.64-2.32,42.96-.16,2.65-.84,5.3-1.4,7.93-.3,1.42-1.65,1.86-3.28,1.97-4.66,.32-9.32,.68-14.29,1.05-.11,.6-.34,1.3-.33,2,.03,2.33,.19,4.65,.21,6.98,.03,3.31-1.52,4.62-5.48,4.63-5.14,0-10.28-.1-15.42-.08-32.09,.08-64.19,.03-96.28,.32-29.48,.27-58.93-.08-88.38-.96-14.84-.45-29.68-.75-44.52-1.16-18.95-.53-37.89-1.31-56.84-1.59-15.41-.23-30.83,.17-46.24,.19-9.25,0-18.49-.09-27.74-.31-11.53-.28-23.05-.71-34.57-1.12-4.54-.16-5.92-1.2-5.99-4.93-.07-3.6,.35-7.21,.42-10.82,.34-18.24,.6-36.49,.95-54.73,.43-21.97,.91-43.93,1.4-65.9,.05-2.51,.43-5.03,.36-7.53-.18-6.42-.54-12.83-.79-19.24-.09-2.23-.24-4.47-.11-6.7,.22-3.68,.9-4.17,5.35-4.21,3.65-.03,7.31,.02,10.97,.03,1.13,0,2.25,0,3.81,0h0Zm412.3,160.76c.32-2.17,.49-3.81,.81-5.43,.17-.87,.83-1.69,.87-2.55,.54-10.14,.98-20.28,1.51-30.41,.89-16.92,2.19-33.84,2.65-50.78,.35-12.65-.21-25.32-.6-37.97-.35-11.17-1.03-22.32-1.58-33.48-.11-2.3-.34-4.6-.52-7.04-.81-.06-1.47-.12-2.14-.14-7.99-.27-15.98-.5-23.97-.81-23.76-.92-47.51-.12-71.25,.43-13.93,.32-27.86,.64-41.79,.62-14.39-.03-28.78-.7-43.17-.7-39.07,0-78.13,.13-117.2,.37-30.73,.19-61.45,.44-92.13-1.38-6.21-.37-12.49-.05-19.08-.05-.4,7.87-.84,15.57-1.17,23.27-.23,5.3-.26,10.61-.48,15.91-.48,11.91-1.03,23.81-1.52,35.72-.2,4.84-.2,9.68-.54,14.51-.87,12.18-1.39,24.36-.4,36.56,.94,11.61,1.59,23.23,2.4,34.84,.11,1.66,.39,3.3,.61,5.07,1.09,.09,1.97,.21,2.85,.22,21.81,.28,43.63,.53,65.44,.81,44.54,.58,89.09,1.08,133.63,1.82,25.24,.42,50.46,1.55,75.7,1.85,28.21,.34,56.43,.15,84.65,.09,10.62-.02,21.24-.26,31.86-.52,4.88-.12,9.75-.54,14.55-.83h0Z"
            />
            <path
              style={{ fill: buttonFill }}
              d="M1884.27,392.35c-4.8,.28-9.67,.71-14.55,.83-10.62,.26-21.24,.5-31.86,.52-28.22,.06-56.43,.25-84.65-.09-25.24-.3-50.46-1.43-75.7-1.85-44.54-.74-89.08-1.24-133.63-1.82-21.81-.29-43.63-.54-65.44-.81-.88-.01-1.76-.13-2.85-.22-.22-1.76-.5-3.41-.61-5.07-.81-11.61-1.46-23.23-2.4-34.84-.99-12.2-.47-24.38,.4-36.56,.34-4.83,.34-9.68,.54-14.51,.5-11.91,1.05-23.81,1.52-35.72,.21-5.3,.25-10.61,.48-15.91,.33-7.71,.77-15.41,1.17-23.27,6.59,0,12.86-.31,19.08,.05,30.69,1.82,61.41,1.57,92.13,1.38,39.06-.24,78.13-.36,117.2-.37,14.39,0,28.78,.67,43.17,.7,13.93,.03,27.86-.3,41.79-.62,23.75-.54,47.49-1.35,71.25-.43,7.99,.31,15.98,.54,23.97,.81,.67,.02,1.33,.09,2.14,.14,.18,2.44,.4,4.74,.52,7.04,.56,11.16,1.23,22.32,1.58,33.48,.4,12.66,.95,25.33,.6,37.97-.47,16.93-1.76,33.85-2.65,50.78-.54,10.14-.97,20.28-1.51,30.41-.05,.86-.7,1.68-.87,2.55-.32,1.62-.5,3.25-.81,5.43h0Z"
            />
          </g>
          <text
            style={{
              fontFamily: "MoreSugarRegular, 'More Sugar'",
              fontSize: "70.3px",
            }}
            transform={`translate(${buttonTransform} 341.52)`}
          >
            <tspan x="0" y="0">
              {buttonText}
            </tspan>
          </text>
        </g>
      </svg>
    </Box>
  );
};

export default StakeAllButton;
