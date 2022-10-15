import { Box, Drawer as MuiDrawer, Typography } from "@mui/material";
import EarnChillSection from "../EarnChillSection";
import SocialRow from "../SocialRow";

const Drawer = ({ open, setOpen }) => {
  return (
    <MuiDrawer
      open={open}
      anchor={"right"}
      onClose={() => setOpen(false)}
      PaperProps={{ style: { borderRadius: "25px", padding: "30px" } }}
    >
      <SocialRow closeDrawer={() => setOpen(false)} />
      <Box px={7}>
        <Box sx={{ display: "flex", justifyContent: "space-around", gap: 5 }}>
          <EarnChillSection />
          <Typography variant="h4">Join the Club</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Typography variant="h4">Spend $CHILL</Typography>
          <Typography variant="h4">Learn More</Typography>
        </Box>
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
