import { useState } from "react";
import ClaimTxModal from "./ClaimTxModal";
import MainPage from "./MainPage";
import TxModal from "./TxModal";
import UnstakeTxModal from "./UnstakeTxModal";

const StakingPage = ({ openSeaData }) => {
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
        <MainPage
          openSeaData={openSeaData}
          setPendingTxStep={setPendingTxStep}
        />
      )}
    </>
  );
};

export default StakingPage;
