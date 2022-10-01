import ConnectWalletButton from "../ConnectWalletButton";
import LoginSpeechBubble from "../LoginSpeechBubble";

const LoginPage = () => {
  return (
    <>
      <LoginSpeechBubble style={{ position: "relative", zIndex: 0 }} />
      <ConnectWalletButton
        style={{
          "enable-background": "new 0 0 2048 2048;",
          zIndex: 1000,
          position: "absolute",
          top: "50%",
          right: "20%",
        }}
      />
    </>
  );
};

export default LoginPage;
