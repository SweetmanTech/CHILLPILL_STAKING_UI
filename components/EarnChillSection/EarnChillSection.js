import { Box, Typography } from "@mui/material";

const EarnChillSection = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h4">Earn $CHILL</Typography>
      <a href="https://stake.chillrx.io/" target="__blank">
        <Box>
          <Typography variant="h6" color="red">
            Stake Your Pills
          </Typography>
          <Typography variant="p">
            Earn $CHILL by staking your ChillRx
          </Typography>
        </Box>
      </a>
      <Box>
        <Typography variant="h6" color="#b8b8b8">
          Compete in the Song Games
        </Typography>
        <Typography variant="p" color="#b8b8b8">
          Earn $CHILL by staking your PartyPill
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" color="#b8b8b8">
          The MPill3 Player
        </Typography>
        <Typography variant="p" color="#b8b8b8">
          Earn $CHILL by listening to songs
        </Typography>
      </Box>
    </Box>
  );
};

export default EarnChillSection;
