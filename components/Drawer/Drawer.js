import { Drawer as MuiDrawer, Typography } from "@mui/material";

const Drawer = ({ open, setOpen }) => {
  return (
    <MuiDrawer open={open} anchor={"right"} onClose={() => setOpen(false)}>
      <Typography variant="h4">Earn $CHILL</Typography>
    </MuiDrawer>
  );
};

export default Drawer;
