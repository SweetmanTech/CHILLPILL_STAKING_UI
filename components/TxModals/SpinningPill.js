import { Box, useMediaQuery } from "@mui/material";
import Image from "next/image";

const SpinningPill = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      style={{
        position: "absolute",
        top: isMobile ? "44vh" : "30vh",
        left: isMobile ? "38vw" : "40vw",
        height: isMobile ? "100px" : "330px",
        width: isMobile ? "100px" : "330px",
      }}
    >
      <Image src="/spinner.gif" layout="fill" objectFit="cover" alt="chillrx" />
    </Box>
  );
};

export default SpinningPill;
