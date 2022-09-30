import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import ConnectSvg from "./ConnectSvg";

const ConnectWalletButton = () => {
  const [hovering, setHovering] = useState(false);

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <div
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    onClick={openConnectModal}
                  >
                    <ConnectSvg
                      width={200}
                      height={25}
                      fillColor={hovering ? "#FD0101" : "#FAF400"}
                    />
                  </div>
                );
              }
              return <ConnectButton />;
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectWalletButton;
