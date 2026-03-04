import Layout from "../src/component/main/layout/Layout";
import Navbar from "../src/component/main/navbar/Navbar";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
// import { FACTORY_ADDRESS } from '@uniswap/v2-sdk';

// import { SwapWidget } from '@uniswap/widgets';
// import '@uniswap/widgets/fonts.css';
import Web3 from "web3";

const ethEnabled = () => {
  if (window.web3) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    return true;
  }
  return false;
};

const TOKEN_LIST = [
  {
    name: "Dai Stablecoin",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    symbol: "DAI",
    decimals: 18,
    chainId: 1,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
  },
  {
    name: "Tether USD",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    symbol: "USDT",
    decimals: 6,
    chainId: 1,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
  },
  {
    name: "USD Coin",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    symbol: "USDC",
    decimals: 6,
    chainId: 1,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  },
];

// Default token list from Uniswap
const UNISWAP_TOKEN_LIST = "https://gateway.ipfs.io/ipns/tokens.uniswap.org";

// Use the native token of the connected chain as the default input token
const INPUT = "NATIVE"; // Special address for native token

const OUTPUT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

const isWindowLoaded = () => {
  return (
    typeof window.ethereum !== "undefined" || typeof window.web3 !== "undefined"
  );
};

const getEthereumProvider = () => {
  // return new ethers.providers.Web3Provider(window.ethereum);
  return new Web3(window.ethereum);
};

const Rewards = () => {
  const jsonRpcEndpoint = "https://rinkeby.infura.io/v3/";

  const [ethereum, setEthereum] = useState();
  useEffect(() => {
    setEthereum(window.ethereum);
  }, []);

  return (
    <Layout>
      <Navbar />
      <div className={styles.container}></div>
    </Layout>
  );
};

export default Rewards;
