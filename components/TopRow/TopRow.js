import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useAccount } from "wagmi";
import getTruncatedWallet from "../../lib/getTruncatedWallet";
import Drawer from "../Drawer";
import ChillRxLogo from "../SVG/ChillRxLogo";
import Midi from "../SVG/Midi";
import WalletAddressBox from "../SVG/WalletAddressBox";

const TopRow = ({ style }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { address: account } = useAccount();
  const [open, setOpen] = useState(false);

  const handleMidiClick = () => {
    setOpen(true);
  };

  return (
    <Box style={style}>
      <ChillRxLogo style={{ width: "100px" }} />

      <Box sx={{ display: "flex", alignItems: "center" }}>
        {account && (
          <WalletAddressBox
            address={getTruncatedWallet(account)}
            style={{ width: isMobile ? "100px" : "200px" }}
          />
        )}
        <Midi
          onClickFx={handleMidiClick}
          style={{ width: isMobile ? "50px" : "100px", cursor: "pointer" }}
        />
      </Box>
      <Drawer open={open} setOpen={setOpen} />
    </Box>
  );
};

export default TopRow;
