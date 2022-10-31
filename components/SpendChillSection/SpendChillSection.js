import { Box, Typography } from "@mui/material";

const EarnChillSection = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h4">Spend $CHILL</Typography>
      <a href="https://pharmacy.chillrx.io/" target="__blank">
        <Box>
          <Typography variant="h6" color="red">
            Enter the Pharmacy
          </Typography>
          <Typography variant="p">Spend $CHILL in our marketplace</Typography>
        </Box>
      </a>
      <Box>
        <Typography variant="h6" color="#b8b8b8">
          Bid on Bluechips
        </Typography>
        <Typography variant="p" color="#b8b8b8">
          Spend $CHILL to bid on Bluechip NFTs
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" color="#b8b8b8">
          Upgrade Your Pill
        </Typography>
        <Typography variant="p" color="#b8b8b8">
          Spend $CHILL to invite your entourage
        </Typography>
      </Box>
    </Box>
  );
};

export default EarnChillSection;
