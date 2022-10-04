const getIpfsLink = (url) =>
  url?.indexOf?.("ipfs://") > -1
    ? url.replace("ipfs://", "https://ipfs.io/ipfs/")
    : url;

export default getIpfsLink;
