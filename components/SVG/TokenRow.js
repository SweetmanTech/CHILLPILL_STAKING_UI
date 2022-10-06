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
  image,
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
      await unstake(stakingContract, tokenId, onSuccess);
    } else {
      const response = await stake(
        stakingContract,
        tokenId,
        nftContract,
        onSuccess,
        setPendingTxStep
      );
      if (response?.error) {
        await mintTestnetNft(nftContract.address, account, tokenId, signer);
      }
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
    buttonText = "STAKE";
  }

  let buttonTransform;
  if (staked) {
    buttonTransform = hovering ? 1510 : 1537.04;
  } else {
    buttonTransform = 1557.04;
  }

  return (
    <Box>
      <Box
        style={{
          position: "relative",
          top: isMobile ? 62 : 210,
          left: isMobile ? 20 : 50,
          height: isMobile ? "50px" : "150px",
          width: isMobile ? "50px" : "150px",
        }}
      >
        <Image src={image} layout="fill" objectFit="cover" alt="chillrx" />
      </Box>

      <svg
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1946.14 512.28"
      >
        <g>
          <path
            style={{ fill: "#030303" }}
            d="M1453.24,4.48c105.01-.03,210.02,1.41,315.01-1.26,23.95-.61,47.92-.55,71.88-.99,32.04-.59,64.08-1.21,96.11-2.21,7.69-.24,9.94,1.83,9.89,9.96-.39,63.05-.6,126.11-.02,189.17,.41,44.04-4.83,87.85-4.28,131.84,.53,41.9-1.33,83.83,1.56,125.69,.6,8.71-.27,15.58-11.93,13.71-2.65-.42-5.58,1.25-8.32,1.07-6.33-.4-9.1,1.61-7.58,8.36,.68,3.03,.34,6.31,.31,9.48-.07,5.58-1.57,8.13-8.56,8.49-115.1,5.91-230.3,5.02-345.48,5.88-73.99,.55-147.99,.83-221.96,2.54-237.47,5.49-474.97,7.37-712.47,5.15-197.36-1.84-394.71-1.02-592.06-1.5-8.9-.02-20.62,4.67-25.97-2.05-4.53-5.7-2.38-16.85-2.87-25.6C.7,378.42,3.81,274.51,2.33,170.67,1.75,129.82,1.26,88.98,.02,48.15c-.33-10.93,3.95-15.34,13.97-13.96,11.61,1.6,15.91-2.59,13.78-14.08-1.93-10.46,3.65-13.64,13.22-13.59,31.71,.17,63.49,1.33,95.12-.25C226.95,1.73,317.85,.96,408.7,2.57c224.83,3.99,449.67,.44,674.49,2.74,72.59,.74,145.16,1.9,217.74-.55,1.41-.01,2.82-.02,4.23-.03,2.81-.01,5.63-.03,8.44-.04,46.55-.07,93.1-.14,139.65-.21ZM629.36,476.01c220.57-.9,427.4,1.32,634.22-3.68,97.19-2.35,194.44-2.48,291.66-4.31,62-1.17,124.04,.01,186.06-.77,61.27-.77,122.52-2.76,183.78-3.98,7.54-.15,10.47-2.51,10.17-10.48-.96-25.32-1.28-50.66-1.75-76-.8-42.95,2.48-85.8,3.32-128.68,1.5-76.76,.43-153.56,.9-230.35,.05-8.78-1.97-11.9-10.89-10.68-29.75,4.05-59.78,2.1-89.67,3.4-50.67,2.2-101.45,2.36-152.18,2.43-213.56,.29-427.11,.25-640.67,.29-153.65,.03-307.3,.28-460.95-.14-90.9-.25-181.77-2.37-272.69-2.53-80.68-.14-161.19,5.4-241.85,4.61-7.4-.07-14.81,.05-22.19-.36-7.65-.42-11.01,1.49-10.67,10.43,1.29,34.47,2.05,68.97,2.25,103.47,.4,67.63,.45,135.25,.35,202.88-.06,45.05,1.47,90.04,4.02,135.01,.29,5.1,.59,8.05,7.48,7.99,60.25-.57,120.51-.8,180.77-.79,137.43,.02,274.86-.76,398.53,2.25Z"
          />
          <path
            style={{ fill: "#fefefe" }}
            d="M629.36,476.01c-123.68-3.01-261.11-2.23-398.53-2.25-60.26,0-120.52,.22-180.77,.79-6.89,.06-7.19-2.88-7.48-7.99-2.55-44.97-4.08-89.96-4.02-135.01,.09-67.63,.05-135.26-.35-202.88-.2-34.49-.96-69-2.25-103.47-.33-8.94,3.02-10.86,10.67-10.43,7.38,.41,14.79,.28,22.19,.36,80.65,.79,161.17-4.75,241.85-4.61,90.91,.16,181.79,2.28,272.69,2.53,153.65,.42,307.3,.16,460.95,.14,213.56-.04,427.11,0,640.67-.29,50.73-.07,101.51-.23,152.18-2.43,29.89-1.3,59.92,.65,89.67-3.4,8.93-1.22,10.94,1.91,10.89,10.68-.47,76.78,.6,153.59-.9,230.35-.84,42.88-4.11,85.73-3.32,128.68,.47,25.34,.8,50.68,1.75,76,.3,7.97-2.63,10.33-10.17,10.48-61.26,1.22-122.51,3.21-183.78,3.98-62.01,.78-124.05-.4-186.06,.77-97.22,1.83-194.47,1.97-291.66,4.31-206.82,5-413.66,2.78-634.22,3.68Z"
          />
        </g>
        <text
          style={{
            fontFamily: "MoreSugarThin, 'More Sugar'",
            fontSize: "66.04px",
          }}
          transform="translate(1340.49 158.04)"
        >
          <tspan x="0" y="0">
            TOKEN ID
          </tspan>
          <tspan x="360" y="0">
            #{tokenId}
          </tspan>
        </text>
        <g>
          <path
            style={{ fill: "#070704" }}
            d="M1287.67,127.09c3.62,31.15-13.22,52.68-37.77,70.16-5.15,3.66-10.58,7.08-15.14,11.39-12.05,11.42-25.56,14.31-41.54,9.95-40.19-10.96-77.22-43.75-75.32-96.13,.43-11.75,4.11-21.85,12.96-29.98,11.16-10.24,21.36-21.67,33.25-30.96,23.84-18.63,50.27-27.69,79.88-14.27,24.66,11.17,34.56,33.43,41.07,57.82,1.82,6.82,2.48,13.77,2.6,22Zm-54.67,73.07c-9.98,.76-21.68-8.99-29.88,4.95,11.55,6.5,20.78,1.59,29.66-5.11-.41-.43,1.27-1.51-.48-1.52,.23,.56,.46,1.12,.69,1.68Zm-45.6-142.65l-.13-.23c-12.92,4.55-20.13,14.63-24.88,26.62-11.73,29.61-1.3,70.97,23.5,90.96,13.83,11.15,29.28,19.06,48.16,14.4,15.03-2.73,28.21-8.36,35.81-22.78,21.39-29.45,6.6-87.36-20.53-106.66-12.43-8.84-26.67-13.75-42.44-8.81-5.67,1.57-11.34,3.14-17,4.72-1.19,.08-2.7-.27-2.47,1.78Zm-28.85,123.14c2.8-2.61,8.36-5.33,8.88-8.8,1.24-8.21-7.12-13.42-9.32-20.89-.66-2.24-2.2-2.96-3.83-1.71-4.51,3.46-10.95,5.19-12.59,11.32-.85,3.19,13.33,19.95,16.86,20.09Zm42.05,13.42c-6.5-3.91-13.98-6.63-19.21-12.38-7.11-7.83-11.15-1.23-14.68,3.22-5,6.3,3.2,5.95,5.46,8.14,2.9,2.82,7.2,4.13,10.66,6.44,8.15,5.41,13.98,3.64,17.76-5.41Zm-51.65-75.25c-18.96,11.72-19.57,13.56-10.78,31.1q14.92-9.1,10.78-31.1Zm-15.68-.75c16.32-8.93,18.45-12.65,17.15-29.9-15.69,13.39-17.34,16.27-17.15,29.9Z"
          />
          <path
            style={{ fill: "#f3ee2c" }}
            d="M1234.04,189.26c-18.87,4.66-34.32-3.24-48.15-14.4-24.8-20-35.23-61.35-23.5-90.96,4.75-11.99,11.96-22.07,24.88-26.62,1.79,5.34,4.28,10.22,9.12,13.5-22.61,16.32-28.17,37.96-15.86,63.16,10.51,21.51,28.28,32.95,51.71,36.14-3.15,2.67,1.33,7.13-1.97,9.49-11.77,8.43-2.93,8.6,3.78,9.69Z"
          />
          <path
            style={{ fill: "#f1ec2b" }}
            d="M1206.88,51.01c15.77-4.94,30.01-.04,42.44,8.81,27.14,19.3,41.92,77.21,20.54,106.65-3.42-3.72-3.3-11.34-11.17-10.14,20.32-41.24,.49-81.63-43.73-89.15-1.28-6.1,7.29-17.11-8.08-16.18Z"
          />
          <path
            style={{ fill: "#fcfcf4" }}
            d="M1258.67,156.35c7.88-1.22,7.77,6.4,11.18,10.12-7.59,14.43-20.78,20.06-35.81,22.79-6.71-1.09-15.55-1.26-3.78-9.69,3.3-2.36-1.17-6.82,1.97-9.49,10.25-1.81,19.42-5.69,26.43-13.72Z"
          />
          <path
            style={{ fill: "#f3ee2c" }}
            d="M1158.55,180.65c-3.53-.14-17.71-16.9-16.86-20.09,1.63-6.12,8.08-7.86,12.59-11.32,1.62-1.25,3.17-.53,3.83,1.71,2.2,7.47,10.56,12.68,9.32,20.89-.52,3.48-6.09,6.19-8.88,8.8Z"
          />
          <path
            style={{ fill: "#f1ec2b" }}
            d="M1200.6,194.06c-3.78,9.05-9.61,10.82-17.76,5.41-3.47-2.3-7.76-3.62-10.66-6.44-2.26-2.19-10.45-1.83-5.46-8.14,3.53-4.45,7.56-11.05,14.68-3.22,5.23,5.75,12.71,8.47,19.21,12.38Z"
          />
          <path
            style={{ fill: "#fcfcf4" }}
            d="M1206.88,51.01c15.37-.94,6.8,10.08,8.08,16.18-6.19,1.2-12.38,2.39-18.56,3.59-4.84-3.28-7.33-8.16-9.12-13.5,0,0,.13,.23,.14,.23,1.43,.25,2.04-.65,2.47-1.78,5.67-1.57,11.34-3.14,17-4.72Z"
          />
          <path
            style={{ fill: "#f1ec2b" }}
            d="M1148.94,118.82q4.13,22-10.78,31.1c-8.78-17.54-8.18-19.38,10.78-31.1Z"
          />
          <path
            style={{ fill: "#f1ec2b" }}
            d="M1133.26,118.07c-.19-13.64,1.46-16.52,17.15-29.9,1.31,17.26-.82,20.97-17.15,29.9Z"
          />
          <path
            style={{ fill: "#f1ec2b" }}
            d="M1232.84,200.04c-8.93,6.67-18.16,11.58-29.71,5.08,8.2-13.95,19.9-4.2,29.88-4.95l-.16-.13Z"
          />
          <path
            style={{ fill: "#f3ee2c" }}
            d="M1189.87,55.73c-.43,1.13-1.04,2.03-2.47,1.78-.23-2.05,1.28-1.7,2.47-1.78Z"
          />
          <path
            style={{ fill: "#f1ec2b" }}
            d="M1233,200.16c-.23-.56-.46-1.12-.69-1.68,1.74,.01,.07,1.09,.5,1.54,.03,.02,.19,.14,.19,.14Z"
          />
          <path
            style={{ fill: "#070704" }}
            d="M1196.39,70.78c6.19-1.2,12.38-2.39,18.56-3.59,44.23,7.52,64.05,47.91,43.73,89.15-7.04,8.04-16.2,11.93-26.45,13.74-23.43-3.18-41.2-14.63-51.71-36.14-12.31-25.19-6.74-46.84,15.86-63.16Zm61.63,55.99c1.06-24.69-11.29-41.15-36.73-48.97-18.23-5.61-36.19,6.87-37.97,25.97-1.38,14.85,3.26,27.63,12.49,38.83,8.07,9.79,18.8,15.81,31.11,18.26,18.06,3.61,30.06-9.83,31.1-34.09Z"
          />
          <path
            style={{ fill: "#f6f12b" }}
            d="M1258.02,126.76c-1.04,24.26-13.04,37.7-31.1,34.09-12.31-2.46-23.04-8.48-31.11-18.26-9.23-11.2-13.88-23.98-12.49-38.83,1.78-19.1,19.74-31.58,37.97-25.97,25.44,7.83,37.79,24.28,36.73,48.97Z"
          />
        </g>
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

export default TokenRow;
