import { Box, Typography } from "@mui/material";

const LearnMoreSection = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h4">Learn More</Typography>
      <Box>
        <Typography variant="h6" color="red">
          ChillPill Documentation
        </Typography>
        <Typography variant="p">
          Learn more about the entire ecosystem
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" color="red">
          $CHILL Documentation
        </Typography>
        <Typography variant="p">Learn more about $CHILL coin</Typography>
      </Box>
      <Box>
        <Typography variant="h6" color="red">
          Linktree
        </Typography>
        <Typography variant="p">Links to the ecosystem</Typography>
      </Box>
    </Box>
  );
};

export default LearnMoreSection;
