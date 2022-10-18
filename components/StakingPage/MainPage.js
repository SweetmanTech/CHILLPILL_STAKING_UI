import { useEffect, useState } from "react";
import { allChains, useAccount, useNetwork, useSigner } from "wagmi";
import {
  getDCNTStaking,
  getDCNT721A,
  setupDCNTSDK,
} from "@decent.xyz/decent-sdk-private-v0";
import { Box, useMediaQuery } from "@mui/material";
import SteakChatSvg from "../SVG/SteakChat";
import TokenRow from "../SVG/TokenRow";
import { getStakedZdkTokens, getZdkTokens } from "../../lib/zdk";
import getIpfsLink from "../../lib/getIpfsLink";
import { ethers } from "ethers";

const MainPage = ({ setPendingTxStep }) => {
  const { data: signer } = useSigner();
  const { address: account } = useAccount();
  const { chain: activeChain } = useNetwork();
  const isMobile = useMediaQuery("(max-width:600px)");
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID;
  const address = process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS;
  const chain = allChains.find((chain) => chain.id == chainId);
  const [stakingContract, setStakingContract] = useState();
  const [nftContract, setNftContract] = useState();
  const [erc20ContractAddress, setErc20ContractAddress] = useState();
  const [tokens, setTokens] = useState([]);
  const [stakedTokens, setStakedTokens] = useState([]);
  const [unstakedTokens, setUnstakedTokens] = useState([]);
  const [unclaimedChill, setUnclaimedChill] = useState("...");

  const getStakingContract = async (signerOrProvider) => {
    const sdk = await setupDCNTSDK(chain?.id || 1, signerOrProvider);
    const staking = await getDCNTStaking(sdk, address);
    setStakingContract(staking);
    const nftAddress = await staking.nftAddress();
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
    const contracts = await getStakingContract(signerOrProvider);
    if (account) {
      const zdkTokens = await getZdkTokens(account);
      setUnstakedTokens(zdkTokens);
      const stakedPills = await getStakedPills(contracts.staking);
      let stakedZdkTokens = [];
      if (stakedPills.length > 0) {
        stakedZdkTokens = await getStakedZdkTokens(stakedPills);
      }
      setTokens([...zdkTokens, ...stakedZdkTokens]);
      await getUnclaimedChill(contracts.staking, stakedPills);
    }
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
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <SteakChatSvg
          amountOfChill={unclaimedChill}
          style={{
            width: isMobile ? "90vw" : "50vw",
            position: "relative",
            left: isMobile ? "0vw" : "8vw",
            top: isMobile ? "0vh" : "-10vh",
          }}
          chillTokenAddres={erc20ContractAddress}
          setPendingTxStep={setPendingTxStep}
          tokensToStake={unstakedTokens}
          stakedTokenIds={stakedTokens}
          stakingContract={stakingContract}
          nftContract={nftContract}
          onSuccess={() => {
            load(signer);
            setPendingTxStep(0);
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
        }}
      >
        {tokens.length > 0 &&
          tokens.map((token) => {
            const myTokenId = token.token.tokenId;
            const imageUrl = getIpfsLink(token.token.image.url);
            const isStaked = stakedTokens.includes(parseInt(myTokenId));
            return (
              <TokenRow
                stakingContract={stakingContract}
                key={myTokenId}
                nftContract={nftContract}
                staked={isStaked}
                tokenId={myTokenId}
                image={imageUrl}
                onSuccess={() => {
                  load(signer);
                  setPendingTxStep(0);
                }}
                style={{
                  width: isMobile ? "75vw" : "30vw",
                }}
                setPendingTxStep={setPendingTxStep}
              />
            );
          })}
      </Box>
    </Box>
  );
};

export default MainPage;
