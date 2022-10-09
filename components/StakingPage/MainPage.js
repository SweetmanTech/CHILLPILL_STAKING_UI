import { useEffect, useState } from "react";
import { allChains, useAccount, useNetwork, useSigner } from "wagmi";
import {
  getDCNTStaking,
  getDCNT721A,
  setupDCNTSDK,
} from "@decent.xyz/decent-sdk-private-v0";
import { Box, useMediaQuery } from "@mui/material";
import SteakChatSvg from "../SVG/SteakChatSvg";
import TokenRow from "../SVG/TokenRow";
import { getZdkTokens } from "../../lib/zdk";
import getIpfsLink from "../../lib/getIpfsLink";
import { ethers } from "ethers";
import StakingData from "../SVG/StakingData";
import StakeAllButton from "../SVG/StakeAllButton";
import ClaimButton from "../SVG/ClaimButton";
import SocialRow from "../SocialRow";

const MainPage = ({ openSeaData, setPendingTxStep }) => {
  const { data: signer } = useSigner();
  const { address: account } = useAccount();
  const { chain: activeChain } = useNetwork();
  const isMobile = useMediaQuery("(max-width:600px)");
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID;
  const address = process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS;
  const chain = allChains.find((chain) => chain.id == chainId);
  const [stakingContract, setStakingContract] = useState();
  const [nftContractAddress, setNftContractAddress] = useState();
  const [nftContract, setNftContract] = useState();
  const [erc20ContractAddress, setErc20ContractAddress] = useState();
  const [totalStakedPills, setTotalStakedPills] = useState(0);
  const [floorPrice, setFloorPrice] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [unstakedTokens, setUnstakedTokens] = useState([]);
  const [stakedTokens, setStakedTokens] = useState([]);
  const [unclaimedChill, setUnclaimedChill] = useState("...");

  const getTotalStakedPills = async (staking = stakingContract) => {
    const stakedBalance = await staking.totalStaked();
    setTotalStakedPills(stakedBalance.toNumber());
    return stakedBalance.toNumber();
  };

  const getStakingContract = async (signerOrProvider) => {
    const sdk = await setupDCNTSDK(chain?.id || 1, signerOrProvider);
    const staking = await getDCNTStaking(sdk, address);
    setStakingContract(staking);
    const nftAddress = await staking.nftAddress();
    setNftContractAddress(nftAddress);
    const erc20Address = await staking.erc20Address();
    setErc20ContractAddress(erc20Address);
    const stakingNftContract = await getDCNT721A(sdk, nftAddress);
    setNftContract(stakingNftContract);
    return { staking, sdk, nft: stakingNftContract };
  };

  const getStakedPills = async (staking = stakingContract) => {
    const stakedPills = await staking.tokensOfOwner(account);
    const intArray = [];
    for (let i = 0; i < stakedPills.length; i++) {
      intArray.push(stakedPills[i].toNumber());
    }
    setStakedTokens(intArray);
    return intArray;
  };

  const getUnclaimedChill = async (staking = stakingContract, tokens) => {
    if (!staking) return;
    const unclaimedTokens = await staking.earningInfo(account, tokens);
    const formattedChill =
      Math.round(ethers.utils.formatEther(unclaimedTokens.toString()) * 1000) /
      1000;
    setUnclaimedChill(formattedChill);
    return formattedChill;
  };

  const load = async (signerOrProvider) => {
    const zdkTokens = await getZdkTokens(account);
    setTokens(zdkTokens);
    const contracts = await getStakingContract(signerOrProvider);
    if (account) {
      const stakedPills = await getStakedPills(contracts.staking);
      const stakeable = zdkTokens.filter(
        (pill) => stakedPills.indexOf(parseInt(pill.token.tokenId)) < 0
      );
      setUnstakedTokens(stakeable);
      await getUnclaimedChill(contracts.staking, stakedPills);
    }
    await getTotalStakedPills(contracts.staking);
    getFloorPrice();
  };

  const getFloorPrice = () => {
    setFloorPrice(openSeaData.collection.stats.floor_price);
  };

  const getSignerOrProvider = () => {
    const goerliRpc = "https://ethereum-goerli-rpc.allthatnode.com";
    const isCorrectNetwork = chain.id === activeChain.id;
    const provider =
      chain.id === 1
        ? { chainId: chain.id }
        : ethers.getDefaultProvider(goerliRpc);
    return isCorrectNetwork ? signer : provider;
  };

  useEffect(() => {
    if (!chainId) return;

    if (!signer) return;
    load(getSignerOrProvider());
  }, [address, chain, chainId, signer]);

  useEffect(() => {
    const interval = setInterval(async () => {
      await getUnclaimedChill(stakingContract, stakedTokens);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <SocialRow />
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <SteakChatSvg
          amountOfChill={unclaimedChill}
          style={{ width: isMobile ? "90vw" : "50vw" }}
          chillTokenAddres={erc20ContractAddress}
        />
      </Box>

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
          top: "0px",
          right: "0px",
          zIndex: 1000,
        }}
      />

      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <ClaimButton
          style={{}}
          stakingContract={stakingContract}
          stakedTokenIds={stakedTokens}
          setPendingTxStep={setPendingTxStep}
          onSuccess={() => {
            load(signer);
            setPendingTxStep(0);
          }}
          unclaimedChill={unclaimedChill}
        />

        <StakeAllButton
          stakingContract={stakingContract}
          nftContract={nftContract}
          tokensToStake={unstakedTokens}
          onSuccess={() => {
            load(signer);
            setPendingTxStep(0);
          }}
          style={{}}
          setPendingTxStep={setPendingTxStep}
        />
      </Box>

      {tokens.map((token) => {
        const myTokenId = token.token.tokenId;
        const imageUrl = getIpfsLink(token.token.image.url);
        const isStaked = stakedTokens.includes(parseInt(myTokenId));
        return (
          <TokenRow
            stakingContract={stakingContract}
            nftContract={nftContract}
            staked={isStaked}
            key={myTokenId}
            tokenId={myTokenId}
            image={imageUrl}
            onSuccess={() => {
              load(signer);
              setPendingTxStep(0);
            }}
            style={{}}
            setPendingTxStep={setPendingTxStep}
          />
        );
      })}
    </Box>
  );
};

export default MainPage;
