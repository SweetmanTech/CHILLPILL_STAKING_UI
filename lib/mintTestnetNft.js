import { ethers } from "ethers";
import abi from "./abi/ChillRx.json";

export const mintTestnetNft = async (address, account, tokenId, signer) => {
  console.log("ADDRESS", address);
  const contract = new ethers.Contract(address, abi, signer);
  console.log("CONTRACT", contract);
  const tokenOwner = await contract.ownerOf(tokenId).catch(async () => {
    await contract.mint(account, tokenId);
  });
  console.log("TOKEN OWNER", tokenOwner);
};
