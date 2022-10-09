import { Box } from "@mui/material";
import Discord from "../SVG/Discord";
import OpenSea from "../SVG/OpenSea";
import Twitter from "../SVG/Twitter";

const SocialRow = () => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90vw",
      }}
    >
      <OpenSea style={{ height: "75px" }} />
      <Box style={{ display: "flex", gap: 30 }}>
        <Twitter style={{ width: "50px" }} />
        <Discord style={{ width: "50px" }} />
      </Box>
    </Box>
  );
};

export default SocialRow;
