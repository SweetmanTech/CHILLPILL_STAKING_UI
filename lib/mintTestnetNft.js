import { ethers } from "ethers";
import abi from "./abi/ChillRx.json";

export const mintTestnetNft = async (address, account, tokenId, signer) => {
  const contract = new ethers.Contract(address, abi, signer);
  await contract.ownerOf(tokenId).catch(async () => {
    await contract.mint(account, tokenId);
  });
};
