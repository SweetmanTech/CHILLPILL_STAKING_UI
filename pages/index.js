import { Box } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import StakingPage from "../components/StakingPage";
import { useAccount } from "wagmi";

const Home = () => {
  const { address } = useAccount();
  return (
    <Box sx={{ backgroundColor: "#111827" }} className={styles.container}>
      <Head>
        <title>ChillPill Staking</title>
        <meta name="description" content="stake your ChillPill" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />
        {address && <StakingPage />}
      </main>
    </Box>
  );
};

export default Home;
