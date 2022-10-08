import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ClaimTxModal = ({ pendingTxStep }) => {
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
        <h2>Signing Transaction</h2>
        {pendingTxStep > 5 ? (
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
        <h2>Claiming $CHILL</h2>
        <CircularProgress size={20} />
      </Box>
    </>
  );
};

export default ClaimTxModal;
