import { Box } from "@mui/material";
import { useAccount } from "wagmi";
import getTruncatedWallet from "../../lib/getTruncatedWallet";
import ChillRxLogo from "../SVG/ChillRxLogo";
import Midi from "../SVG/Midi";
import WalletAddressBox from "../SVG/WalletAddressBox";

const SocialRow = ({ style }) => {
  const { address: account } = useAccount();

  return (
    <Box style={style}>
      <ChillRxLogo style={{ width: "100px" }} />
      {account && (
        <WalletAddressBox
          address={getTruncatedWallet(account)}
          style={{ width: "200px" }}
        />
      )}
      <Midi style={{ width: "100px" }} />
    </Box>
  );
};

export default SocialRow;
