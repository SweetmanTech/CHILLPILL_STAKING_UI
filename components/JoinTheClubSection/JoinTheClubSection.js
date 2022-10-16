import { Box, Typography } from "@mui/material";

const SpendChillSection = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h4">Join the Club</Typography>
      <a href="https://opensea.io/collection/chillrx" target="__blank">
        <Box>
          <Typography variant="h6" color="red">
            Buy a Pill
          </Typography>
          <Typography variant="p">Or sweep a bunch, you do you</Typography>
        </Box>
      </a>
      <a href="https://twitter.com/iamchillpill" target="__blank">
        <Box>
          <Typography variant="h6" color="red">
            Follow on Twitter
          </Typography>
          <Typography variant="p">
            Stay updated on everything ChillRx
          </Typography>
        </Box>
      </a>
      <a href="https://discord.com/invite/chillrx" target="__blank">
        <Box>
          <Typography variant="h6" color="red">
            Join the Discord
          </Typography>
          <Typography variant="p">
            Participate in the ChillRx community
          </Typography>
        </Box>
      </a>
    </Box>
  );
};

export default SpendChillSection;
