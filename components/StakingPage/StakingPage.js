import { useState } from "react";
import TxModal from "../TxModals";
import ClaimTxModal from "./ClaimTxModal";
import MainPage from "./MainPage";
import UnstakeTxModal from "./UnstakeTxModal";

const StakingPage = () => {
  const [pendingTxStep, setPendingTxStep] = useState(0);

  return (
    <>
      {pendingTxStep > 0 ? (
        <>
          {pendingTxStep > 2 ? (
            <>
              {pendingTxStep > 4 ? (
                <TxModal
                  stepOnePassed={pendingTxStep > 5}
                  stepTwoPassed={pendingTxStep > 6}
                  textOne="SIGNING TRANSACTION"
                  textTwo="CLAIMING $CHILL"
                  translateOne={186.75}
                  translateTwo={276.86}
                  style={{ width: "50vw" }}
                />
              ) : (
                <TxModal
                  stepOnePassed={pendingTxStep > 3}
                  stepTwoPassed={pendingTxStep == 0}
                  textOne="SIGNING TRANSACTION"
                  textTwo="UNSTAKING PILL"
                  translateOne={186.75}
                  translateTwo={276.86}
                  style={{ width: "50vw" }}
                />
              )}
            </>
          ) : (
            <TxModal
              stepOnePassed={pendingTxStep > 1}
              stepTwoPassed={pendingTxStep == 0}
              textOne="APPROVING PILLS"
              textTwo="STAKING PILLS"
              translateOne={326.75}
              translateTwo={376.86}
              style={{ width: "50vw" }}
            />
          )}
        </>
      ) : (
        <MainPage setPendingTxStep={setPendingTxStep} />
      )}
    </>
  );
};

export default StakingPage;
