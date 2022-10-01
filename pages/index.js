import { Box } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import StakingPage from "../components/StakingPage";
import { useAccount } from "wagmi";
import ConnectWalletButton from "../components/ConnectWalletButton";
import LoginSpeechBubble from "../components/LoginSpeechBubble";
import bg from "../public/speechbubble_1.svg";

const Home = ({ openSeaData }) => {
  const { address } = useAccount();
  return (
    <Box sx={{ backgroundColor: "#111827" }} className={styles.container}>
      <Head>
        <title>ChillPill Staking</title>
        <meta name="description" content="stake your ChillPill" />
      </Head>

      <main className={styles.main}>
        {/* <Box
          style={{
            backgroundImage: `url(${bg.src})`,
            width: "100%",
            height: "100%",
            // backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            border: "1px solid red",
          }}
        > */}
        {/* </Box> */}

        {address ? (
          <>
            <ConnectWalletButton />

            <StakingPage openSeaData={openSeaData} />
          </>
        ) : (
          <>
            <LoginSpeechBubble />
            <ConnectWalletButton />
          </>
        )}
      </main>
    </Box>
  );
};

export async function getServerSideProps(context) {
  const res = await fetch("https://api.opensea.io/collection/chillrx");
  const resJson = await res.json();

  return {
    props: { openSeaData: resJson }, // will be passed to the page component as props
  };
}

export default Home;
