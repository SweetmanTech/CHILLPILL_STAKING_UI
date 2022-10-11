import Image from "next/image";

const OpenSea = ({ height, width }) => {
  return (
    <a href="https://opensea.io/collection/chillrx" target="__blank">
      <Image
        style={{
          border: "1px solid red",
          marginRight: "-100%",
        }}
        src="/opensea.png"
        alt="opensea"
        height={height}
        width={width}
      />
    </a>
  );
};

export default OpenSea;
