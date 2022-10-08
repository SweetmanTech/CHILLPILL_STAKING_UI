import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const TxModal = ({ pendingTxStep }) => {
  return (
    <>
      <h1>Pending Transaction</h1>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: 15,
        }}
      >
        <h2>Minting Pill</h2>
        {pendingTxStep > 1 ? (
          <CheckCircleIcon />
        ) : (
          <CircularProgress size={20} />
        )}
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: 15,
        }}
      >
        <h2>Approving Token</h2>
        {pendingTxStep > 2 ? (
          <CheckCircleIcon />
        ) : (
          <CircularProgress size={20} />
        )}
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: 15,
        }}
      >
        <h2>Staking Pill(s)</h2>
        {pendingTxStep > 3 ? (
          <CheckCircleIcon />
        ) : (
          <CircularProgress size={20} />
        )}
      </Box>
    </>
  );
};

export default TxModal;
