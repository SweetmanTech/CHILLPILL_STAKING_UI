const { ethers } = require("ethers");

const getDefaultProvider = (chainId) => {
  // POLYGON
  const polygonRpc = "https://polygon-rpc.com";
  const mumbaiRpc = "https://rpc-mumbai.maticvigil.com";
  // OPTIMISM
  const optimismRpc = "https://mainnet.optimism.io";
  const optimismGoerliRpc = "https://goerli.optimism.io/";
  const optimismKovanRpc = "https://kovan.optimism.io/";
  // ARBITRUM
  const arbitrumRinkebyRpc = "https://rinkeby.arbitrum.io/rpc";
  const arbitrumRpc = "https://rpc.ankr.com/arbitrum";

  const chainIdInt = parseInt(chainId?.toString());

  if (!chainId) return null;

  if (chainIdInt === 10) {
    return ethers.getDefaultProvider(optimismRpc);
  }
  if (chainIdInt === 69) {
    return ethers.getDefaultProvider(optimismKovanRpc);
  }
  if (chainIdInt === 137) {
    return ethers.getDefaultProvider(polygonRpc);
  }
  if (chainIdInt === 420) {
    return ethers.getDefaultProvider(optimismGoerliRpc);
  }
  if (chainIdInt === 42161) {
    return ethers.getDefaultProvider(arbitrumRpc);
  }
  if (chainIdInt === 421611) {
    return ethers.getDefaultProvider(arbitrumRinkebyRpc);
  }
  if (chainIdInt === 80001) {
    return ethers.getDefaultProvider(mumbaiRpc);
  }

  return ethers.getDefaultProvider({
    chainId: chainIdInt,
  });
};

export default getDefaultProvider;
