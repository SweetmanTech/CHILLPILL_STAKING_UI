import { Box, Typography } from "@mui/material";

const LearnMoreSection = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h4">Learn More</Typography>
      <a
        href="https://www.canva.com/design/DAFNW1W5o4I/u3g4RCk7J1T7x_PRRwP8_w/view?website#2:title"
        target="__blank"
      >
        <Box>
          <Typography variant="h6" color="red">
            ChillPill Documentation
          </Typography>
          <Typography variant="p">
            Learn more about the entire ecosystem
          </Typography>
        </Box>
      </a>
      <a href="https://coin.chillrx.io/" target="__blank">
        <Box>
          <Typography variant="h6" color="red">
            $CHILL Documentation
          </Typography>
          <Typography variant="p">Learn more about $CHILL coin</Typography>
        </Box>
      </a>
      <a href="https://linktr.ee/chillrx" target="__blank">
        <Box>
          <Typography variant="h6" color="red">
            Linktree
          </Typography>
          <Typography variant="p">Links to the ecosystem</Typography>
        </Box>
      </a>
    </Box>
  );
};

export default LearnMoreSection;
