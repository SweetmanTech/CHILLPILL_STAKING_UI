import { default as NextJsHead } from "next/head";

const Head = () => (
  <NextJsHead>
    <title>ChillPill Staking</title>
    <meta name="description" content="stake your ChillRx" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="ChillRx Staking" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="stake your ChillRx" />
    {/* <meta property="og:image" content={ogImgUrl} /> */}
    <meta property="og:url" content="https://stake.chillrx.io" />
  </NextJsHead>
);

export default Head;
