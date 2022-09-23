import { toast } from "react-toastify";

const handleTxError = (error) => {
  console.error(error);
  toast.error(error?.data?.message || error.message);
};

export default handleTxError;
