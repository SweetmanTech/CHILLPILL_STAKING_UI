const getIpfsLink = (url) =>
  url?.indexOf?.("ipfs://") > -1
    ? url.replace("ipfs://", "https://chillrx.mypinata.cloud/ipfs/")
    : url;

export default getIpfsLink;
