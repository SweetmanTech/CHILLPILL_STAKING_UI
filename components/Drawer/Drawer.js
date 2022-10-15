import { Box, Drawer as MuiDrawer, Typography } from "@mui/material";
import EarnChillSection from "../EarnChillSection";
import JoinTheClubSection from "../JoinTheClubSection";
import SpendChillSection from "../SpendChillSection";
import SocialRow from "../SocialRow";
import LearnMoreSection from "../LearnMoreSection";

const Drawer = ({ open, setOpen }) => {
  return (
    <MuiDrawer
      open={open}
      anchor={"right"}
      onClose={() => setOpen(false)}
      PaperProps={{
        style: { borderRadius: "25px", paddingLeft: "3%", paddingRight: "3%" },
      }}
    >
      <SocialRow closeDrawer={() => setOpen(false)} />
      <Box px={7}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: 5,
            paddingBottom: "10%",
          }}
        >
          <EarnChillSection />
          <JoinTheClubSection />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 5 }}>
          <SpendChillSection />
          <LearnMoreSection />
        </Box>
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
