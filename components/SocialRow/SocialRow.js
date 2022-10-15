import { Box, useMediaQuery } from "@mui/material";
import Twitter from "components/SVG/Twitter";
import Discord from "components/SVG/Discord";
import Instagram from "../SVG/Instagram";
import Spotify from "../SVG/Spotify";
import YouTube from "../SVG/YouTube";
import OpenSea from "../SVG/OpenSea";
import WWOCP from "../SVG/WWOCP";
import CloseButton from "../SVG/CloseButton";

const SocialRow = ({ closeDrawer }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const ICON_WIDTH = isMobile ? "20px" : "40px";
  return (
    <Box
      style={{
        display: "flex",
        gap: isMobile ? 10 : 20,
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Twitter style={{ width: ICON_WIDTH }} />
      <Discord style={{ width: ICON_WIDTH }} />
      <Instagram style={{ width: ICON_WIDTH }} />
      <Spotify style={{ width: ICON_WIDTH }} />
      <YouTube style={{ width: ICON_WIDTH }} />
      <OpenSea style={{ width: ICON_WIDTH }} />
      <WWOCP style={{ width: ICON_WIDTH }} />
      <CloseButton
        style={{ width: ICON_WIDTH, marginTop: "10px" }}
        closeDrawer={closeDrawer}
      />
    </Box>
  );
};

export default SocialRow;
