import { Box } from "@mui/material";
import { useState } from "react";
import { useAccount } from "wagmi";
import getTruncatedWallet from "../../lib/getTruncatedWallet";
import Drawer from "../Drawer";
import ChillRxLogo from "../SVG/ChillRxLogo";
import Midi from "../SVG/Midi";
import WalletAddressBox from "../SVG/WalletAddressBox";

const TopRow = ({ style }) => {
  const { address: account } = useAccount();
  const [open, setOpen] = useState(false);

  const handleMidiClick = () => {
    setOpen(true);
  };

  return (
    <Box style={style}>
      <ChillRxLogo style={{ width: "100px" }} />
      {account && (
        <WalletAddressBox
          address={getTruncatedWallet(account)}
          style={{ width: "200px" }}
        />
      )}
      <Midi onClickFx={handleMidiClick} style={{ width: "100px" }} />
      <Drawer open={open} setOpen={setOpen} />
    </Box>
  );
};

export default TopRow;
