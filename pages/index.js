import { Box, useMediaQuery } from "@mui/material";
import { useAccount } from "wagmi";
import styles from "../styles/Home.module.css";
import Head from "components/Head";
import SocialRow from "components/SocialRow";
import StakingPage from "components/StakingPage";
import LoginSpeechBubble from "components/SVG/LoginSpeechBubble";
import StakingData from "components/SVG/StakingData";
import getStakingContracts from "../lib/getStakingContract";
import getDefaultProvider from "../lib/getDefaultProvider";
import getTotalStakedPills from "../lib/getTotalStakedPills";

const Home = ({ totalStakedPills, floorPrice }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { address } = useAccount();
  return (
    <Box sx={{ backgroundColor: "#111827" }} className={styles.container}>
      <Head />

      <SocialRow
        style={{
          paddingTop: "2.5%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "95vw",
          position: "fixed",
          top: "0px",
          right: "0px",
          paddingRight: "5%",
          zIndex: 1000,
        }}
      />

      <main className={styles.main}>
        {address ? (
          <StakingPage />
        ) : (
          <LoginSpeechBubble style={{ width: isMobile ? "100vw" : "50vw" }} />
        )}
      </main>
      <StakingData
        minimumLockedValue={
          totalStakedPills
            ? Math.round(floorPrice * totalStakedPills * 100) / 100
            : "..."
        }
        totalChillRxStaked={totalStakedPills || "..."}
        percentPillsStaked={
          totalStakedPills
            ? Math.round((totalStakedPills / 9999) * 10000) / 100
            : "..."
        }
        style={{
          width: "100vw",
          position: "fixed",
          bottom: "0px",
          right: "0px",
          zIndex: 1000,
        }}
      />
    </Box>
  );
};

export async function getServerSideProps(context) {
  const res = await fetch("https://api.opensea.io/collection/chillrx");
  const openSeaData = await res.json();
  const floorPrice = openSeaData.collection.stats.floor_price;
  const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID);
  const provider = getDefaultProvider(chainId);
  const readOnlyContracts = await getStakingContracts(provider);
  const totalStakedPills = await getTotalStakedPills(readOnlyContracts.staking);
  return {
    props: { totalStakedPills, floorPrice }, // will be passed to the page component as props
  };
}

export default Home;
