import { Box } from "@mui/material";
import { useAccount } from "wagmi";
import ChillRxLogo from "../SVG/ChillRxLogo";
import WalletAddressBox from "../SVG/WalletAddressBox";

const SocialRow = ({ style }) => {
  const { address: account } = useAccount();

  const truncatedAccount =
    account &&
    `${account.substring(0, 4)}...${account.substring(account.length - 3)}`;

  console.log("ACCOUNT", account);

  return (
    <Box style={style}>
      <ChillRxLogo style={{ width: "100px" }} />
      {account && (
        <WalletAddressBox
          address={truncatedAccount}
          style={{ width: "200px" }}
        />
      )}
    </Box>
  );
};

export default SocialRow;
