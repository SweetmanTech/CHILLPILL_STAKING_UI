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
    })
    .catch(console.error);
  return results.tokens.nodes;
};
