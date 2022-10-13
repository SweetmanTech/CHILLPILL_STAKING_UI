import { Box, useMediaQuery } from "@mui/material";
import Discord from "../SVG/Discord";
import Twitter from "../SVG/Twitter";
import { useSigner } from "wagmi";
import ChillRxLogo from "../SVG/ChillRxLogo";

const SocialRow = ({ style }) => {
  return (
    <Box style={style}>
      <ChillRxLogo style={{ width: "100px" }} />
    </Box>
  );
};

export default SocialRow;
