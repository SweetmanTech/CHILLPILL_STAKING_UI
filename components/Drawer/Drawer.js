import { Drawer as MuiDrawer, Typography } from "@mui/material";
import SocialRow from "../SocialRow";

const Drawer = ({ open, setOpen }) => {
  return (
    <MuiDrawer
      open={open}
      anchor={"right"}
      onClose={() => setOpen(false)}
      m={4}
      PaperProps={{ style: { borderRadius: "25px", padding: "10px" } }}
    >
      <SocialRow />
      <Typography variant="h4">Earn $CHILL</Typography>
    </MuiDrawer>
  );
};

export default Drawer;
