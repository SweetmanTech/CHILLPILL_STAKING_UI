import { useState } from "react";
import ClaimTxModal from "./ClaimTxModal";
import MainPage from "./MainPage";
import TxModal from "./TxModal";
import UnstakeTxModal from "./UnstakeTxModal";

const StakingPage = () => {
  const [pendingTxStep, setPendingTxStep] = useState(0);

  return (
    <>
      {pendingTxStep > 0 ? (
        <>
          {pendingTxStep > 3 ? (
            <>
              {" "}
              {pendingTxStep > 4 ? (
                <ClaimTxModal pendingTxStep={pendingTxStep} />
              ) : (
                <UnstakeTxModal pendingTxStep={pendingTxStep} />
              )}{" "}
            </>
          ) : (
            <TxModal pendingTxStep={pendingTxStep} />
          )}
        </>
      ) : (
        <MainPage setPendingTxStep={setPendingTxStep} />
      )}
    </>
  );
};

export default StakingPage;
