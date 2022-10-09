import { Box } from "@mui/material";
import Discord from "../SVG/Discord";
import Twitter from "../SVG/Twitter";

const SocialRow = () => {
  return (
    <Box style={{ display: "flex", justifyContent: "space-between" }}>
      <h1>Hello World</h1>
      <Box style={{ display: "flex", gap: 30 }}>
        <Twitter style={{ width: "50px" }} />
        <Discord style={{ width: "50px" }} />
      </Box>
    </Box>
  );
};

export default SocialRow;
