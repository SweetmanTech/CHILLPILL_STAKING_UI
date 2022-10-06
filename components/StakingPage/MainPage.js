import { useEffect, useState } from "react";
import { allChains, useAccount, useSigner } from "wagmi";
import {
  getDCNTStaking,
  getDCNT721A,
  setupDCNTSDK,
} from "@decent.xyz/decent-sdk-private-v0";
import { Box } from "@mui/material";
import WalletConnectedSvg from "../SVG/WalletConnected";
import SteakChatSvg from "../SVG/SteakChatSvg";
import TokenRow from "../SVG/TokenRow";
import { getZdkTokens } from "../../lib/zdk";
import getIpfsLink from "../../lib/getIpfsLink";
import { ethers } from "ethers";
import StakingData from "../SVG/StakingData";

const MainPage = ({ openSeaData, setPendingTxStep }) => {
  const { data: signer } = useSigner();
  const { address: account } = useAccount();
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID;
  const address = process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS;
  const chain = allChains.find((chain) => chain.id == chainId);
  const [stakingContract, setStakingContract] = useState();
  const [nftContractAddress, setNftContractAddress] = useState();
  const [nftContract, setNftContract] = useState();
  const [erc20ContractAddress, setErc20ContractAddress] = useState();
  const [totalStakedPills, setTotalStakedPills] = useState(0);
  const [floorPrice, setFloorPrice] = useState(0);
  const [tokenId, setTokenId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState([]);
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
    setTokenId(stakedPills[0]?.toNumber());
    return intArray;
  };

  const getUnclaimedChill = async (staking = stakingContract, tokens) => {
    const unclaimedTokens = await staking.earningInfo(account, tokens);
    const formattedChill =
      Math.round(ethers.utils.formatEther(unclaimedTokens.toString()) * 1000) /
      1000;
    setUnclaimedChill(formattedChill);
    return formattedChill;
  };

  const load = async (signerOrProvider) => {
    setLoading(true);
    const zdkTokens = await getZdkTokens(account);
    setTokens(zdkTokens);
    const contracts = await getStakingContract(signerOrProvider);
    if (account) {
      const stakedPills = await getStakedPills(contracts.staking);
      await getUnclaimedChill(contracts.staking, stakedPills);
    }
    await getTotalStakedPills(contracts.staking);
    getFloorPrice();
    setLoading(false);
  };

  const getFloorPrice = () => {
    setFloorPrice(openSeaData.collection.stats.floor_price);
  };

  useEffect(() => {
    if (!chainId) return;

    if (!signer) return;
    load(signer);
  }, [address, chain, chainId, signer]);

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <SteakChatSvg
        amountOfChill={unclaimedChill}
        style={{ position: "relative", zIndex: 0, width: "75vw" }}
      />

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
