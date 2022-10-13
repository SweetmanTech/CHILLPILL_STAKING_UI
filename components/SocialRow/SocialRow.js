import { Box, useMediaQuery } from "@mui/material";
import Discord from "../SVG/Discord";
import Twitter from "../SVG/Twitter";
import { useSigner } from "wagmi";
import ChillRxLogo from "../SVG/ChillRxLogo";

const SocialRow = ({}) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90vw",
        flexWrap: "wrap",
      }}
    >
      <ChillRxLogo style={{ width: "100px" }} />
    </Box>
  );
};

export default SocialRow;
