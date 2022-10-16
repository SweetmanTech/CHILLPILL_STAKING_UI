const getTruncatedWallet = (account) =>
  account &&
  `${account.substring(0, 4)}...${account.substring(account.length - 3)}`;

export default getTruncatedWallet;
