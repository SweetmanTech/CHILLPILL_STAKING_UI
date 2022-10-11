import { Box, useMediaQuery } from "@mui/material";
import Discord from "../SVG/Discord";
import OpenSea from "../SVG/OpenSea";
import Twitter from "../SVG/Twitter";
import WhatIsChill from "../SVG/WhatIsChill";
import StakeAllButton from "../SVG/StakeAllButton";
import ClaimButton from "../SVG/ClaimButton";
import { useSigner } from "wagmi";

const SocialRow = ({
  nftContract,
  stakingContract,
  stakedTokens,
  setPendingTxStep,
  unclaimedChill,
  unstakedTokens,
  load,
}) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { data: signer } = useSigner();

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100vw",
        flexWrap: "wrap",
      }}
    >
      <ClaimButton
        style={{ height: isMobile ? "25px" : "50px" }}
        stakingContract={stakingContract}
        stakedTokenIds={stakedTokens}
        setPendingTxStep={setPendingTxStep}
        onSuccess={() => {
          load(signer);
          setPendingTxStep(0);
        }}
        unclaimedChill={unclaimedChill}
      />
      <StakeAllButton
        stakingContract={stakingContract}
        nftContract={nftContract}
        tokensToStake={unstakedTokens}
        onSuccess={() => {
          load(signer);
          setPendingTxStep(0);
        }}
        style={{
          height: isMobile ? "25px" : "50px",
          minHeight: isMobile ? "25px" : "50px",
        }}
        setPendingTxStep={setPendingTxStep}
      />
      <Box style={{ display: "flex", gap: 30 }}>
        <OpenSea
          height={isMobile ? "25px" : "50px"}
          width={isMobile ? "50px" : "100px"}
        />
        <Twitter style={{ width: isMobile ? "25px" : "50px" }} />
        <Discord style={{ width: isMobile ? "25px" : "50px" }} />
        <WhatIsChill style={{ height: isMobile ? "25px" : "50px" }} />
      </Box>
    </Box>
  );
};

export default SocialRow;
