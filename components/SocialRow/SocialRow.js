import { Box } from "@mui/material";
import Twitter from "components/SVG/Twitter";
import Discord from "components/SVG/Discord";
import Instagram from "../SVG/Instagram";
import Spotify from "../SVG/Spotify";
import YouTube from "../SVG/YouTube";
import OpenSea from "../SVG/OpenSea";
import WWOCP from "../SVG/WWOCP";
import CloseButton from "../SVG/CloseButton";

const SocialRow = ({ closeDrawer }) => {
  return (
    <Box style={{ display: "flex", gap: 20, alignItems: "center" }}>
      <Twitter style={{ width: "40px" }} />
      <Discord style={{ width: "40px" }} />
      <Instagram style={{ width: "40px" }} />
      <Spotify style={{ width: "40px" }} />
      <YouTube style={{ width: "40px" }} />
      <OpenSea style={{ width: "40px" }} />
      <WWOCP style={{ width: "40px" }} />
      <CloseButton style={{ width: "40px" }} closeDrawer={closeDrawer} />
    </Box>
  );
};

export default SocialRow;
