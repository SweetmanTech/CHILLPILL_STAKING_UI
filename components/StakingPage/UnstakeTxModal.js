import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const UnstakeTxModal = ({ pendingTxStep }) => {
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
        <h2>Unstaking Pill</h2>
        <CircularProgress size={20} />
      </Box>
    </>
  );
};

export default UnstakeTxModal;
