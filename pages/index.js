import { Box, Typography } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import StakingPage from "../components/StakingPage";

const Home = () => {
  return (
    <Box sx={{ backgroundColor: "#111827" }} className={styles.container}>
      <Head>
        <title>ChillPill Staking</title>
        <meta name="description" content="stake your ChillPill" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />
        <StakingPage />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/SweetmanTech/rainbowkit-token-gated"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography color="white">Made with ❤️ by sweetman.eth</Typography>{" "}
        </a>
      </footer>
    </Box>
  );
};

export default Home;
