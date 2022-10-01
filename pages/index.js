import { Box } from "@mui/material";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import StakingPage from "../components/StakingPage";
import { useAccount } from "wagmi";
import LoginPage from "../components/LoginPage";

const Home = ({ openSeaData }) => {
  const { address } = useAccount();
  return (
    <Box sx={{ backgroundColor: "#111827" }} className={styles.container}>
      <Head>
        <title>ChillPill Staking</title>
        <meta name="description" content="stake your ChillPill" />
      </Head>

      <main className={styles.main}>
        {address ? <StakingPage openSeaData={openSeaData} /> : <LoginPage />}
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
