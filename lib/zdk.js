import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";

const networkInfo = {
  network: ZDKNetwork.Ethereum,
  chain: ZDKChain.Mainnet,
};

const API_ENDPOINT = "https://api.zora.co/graphql";
const args = {
  endPoint: API_ENDPOINT,
  networks: [networkInfo],
};

export const zdk = new ZDK(args); // All arguments are optional

export const getZdkTokens = async (account) => {
  const results = await zdk
    .tokens({
      where: {
        collectionAddresses: ["0xe7e07f9dff6b48eba32641c53816f25368297d22"],
        ownerAddresses: [account],
      },
      pagination: {
        limit: 500,
      },
    })
    .catch(console.error);
  return results.tokens.nodes;
};

export const getStakedZdkTokens = async (stakedTokenIds) => {
  const tokenTuples = stakedTokenIds.map((token) => ({
    tokenId: token.toString(),
    address: "0xe7e07f9dff6b48eba32641c53816f25368297d22",
  }));
  console.log("tokenTuples", tokenTuples);
  const results = await zdk
    .tokens({
      where: {
        tokens: tokenTuples,
      },
      pagination: {
        limit: 500,
      },
    })
    .catch(console.error);
  return results.tokens.nodes;
};
