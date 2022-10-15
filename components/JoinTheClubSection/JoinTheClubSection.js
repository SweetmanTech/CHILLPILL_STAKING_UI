import { Box, Typography } from "@mui/material";

const SpendChillSection = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h4">Join the Club</Typography>
      <Box>
        <Typography variant="h6" color="red">
          Buy a Pill
        </Typography>
        <Typography variant="p">Or sweep a bunch, you do you</Typography>
      </Box>
      <Box>
        <Typography variant="h6" color="red">
          Follow on Twitter
        </Typography>
        <Typography variant="p">Stay updated on everything ChillRx</Typography>
      </Box>
      <Box>
        <Typography variant="h6" color="red">
          Join the Discord
        </Typography>
        <Typography variant="p">
          Participate in the ChillRx community
        </Typography>
      </Box>
    </Box>
  );
};

export default SpendChillSection;
