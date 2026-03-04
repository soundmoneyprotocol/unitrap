import React, { useState, useEffect } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useSimulateContract,
  useBalance,
} from "wagmi";
import { waitForTransaction } from "@wagmi/core";
import { parseUnits, formatEther } from "viem";
import Layout from "../src/component/main/layout/Layout";
import Navbar from "../src/component/main/navbar/Navbar";
import Button from "../src/component/basic/button/Button";
import styles from "../styles/Home.module.css";
import { TokenItem } from "../src/component/TokenItem";
import { TokenSelectModal } from "../src/component/TokenSelectModal";
import tokenABI from "../artifacts/tokenAbi.json";
import dexABI from "../artifacts/dexAbi.json";
import { ethers } from "ethers";
import { SwapTokenItem } from "../src/component/SwapTokenItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { address, isConnected } = useAccount();
  const [error, setError] = useState("");
  const [btcPrice, setBtcPrice] = useState(60055.8);
  const [rate, setRate] = useState(0);
  const { writeContract } = useWriteContract();
  const [isApproved, setIsApproved] = useState(false);

  const dexContractAddress = "0xAAF23F0894f8CaE3051207D82588EcFff9531358";
  const [selectedToken, setSelectedToken] = useState({
    name: "BTC",
    url: "/images/btc.png",
    balance: 0,
    symbol: "BTC",
    price: 60055.8,
    usdtBalance: 0,
    swapAmount: 0,
    contractAddress: "0xAAF23F0894f8CaE3051207D82588EcFff9531358",
  });

  const [selectedSwapToken, setSelectedSwapToken] = useState({
    name: "TST",
    url: "/images/tether.png",
    balance: 0,
    symbol: "TST",
    price: 1,
    usdtBalance: 0,
    swapAmount: 0,
    contractAddress: "0x6C593A8Eb76a3769b360e8271C701702FE1a6ffD",
  });

  const [modalShow, setModalShow] = useState(false);
  const [tokenType, setTokenType] = useState(false);
  const [activeTheme, setActiveTheme] = useState("light");

  const { data: btcBalance, refetch: refetchBtcBalance } = useBalance({
    address,
    watch: true,
    enabled: isConnected && !!address,
  });

  const { data: tokenBalance, refetch: refetchTSTBalance } = useReadContract({
    address: "0x6C593A8Eb76a3769b360e8271C701702FE1a6ffD",
    abi: tokenABI,
    functionName: "balanceOf",
    args: [address],
    watch: true,
    enabled: isConnected && !!address,
  });

  useEffect(() => {
    if (selectedToken.symbol === "TST") {
      setRate(1 / btcPrice);
      if (tokenBalance) {
        const formattedBalance = ethers.utils.formatUnits(tokenBalance, 18); // Adjust '18' if your token uses a different number of decimals
        setSelectedToken((prevState) => ({
          ...prevState,
          balance: formattedBalance,
          usdtBalance: (
            parseFloat(formattedBalance) * parseFloat(prevState.price)
          ).toFixed(2),
        }));
      }
    } else {
      setRate(btcPrice);
      if (btcBalance) {
        const btcBalanceFormatted = Number(
          formatEther(btcBalance.value)
        ).toFixed(2);
        const usdValue = (parseFloat(btcBalanceFormatted) * btcPrice).toFixed(
          2
        );
        setSelectedToken((prevState) => ({
          ...prevState,
          balance: btcBalanceFormatted,
          usdtBalance: usdValue,
        }));
      }
    }
  }, [selectedToken, btcBalance, tokenBalance]);

  useEffect(() => {
    if (selectedSwapToken.symbol === "TST") {
      const usdtBalance =
        Number(selectedToken.swapAmount) * selectedToken.price;

      setSelectedSwapToken((prevState) => ({
        ...prevState,
        usdtBalance: usdtBalance,
      }));
    } else {
      const usdtBalance = Number(selectedToken.swapAmount) / btcPrice;
      setSelectedSwapToken((prevState) => ({
        ...prevState,
        usdtBalance: usdtBalance,
      }));
    }
  }, [selectedToken.swapAmount]);

  const handleTokenSelect = (tokenSymbol) => {
    setSelectedToken(tokenSymbol);
  };

  const handleSwapTokenSelect = (tokenSymbol) => {
    setSelectedSwapToken(tokenSymbol);
  };

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    setActiveTheme(savedTheme);
  }, []);

  const { data: simulateBtcForTst } = useSimulateContract({
    address: dexContractAddress,
    abi: dexABI,
    functionName: "swapBtcForTst",
    value:
      selectedToken.symbol === "BTC"
        ? parseUnits(selectedToken.swapAmount || "0", 18)
        : undefined,
    enabled: false,
  });

  const {
    data: simulateTstForBtc,
    error: simulateTstForBtcError,
    refetch: refetchSimulateTstForBtc,
  } = useSimulateContract({
    address: dexContractAddress,
    abi: dexABI,
    functionName: "swapTstForBtc",
    args: [
      selectedToken.symbol === "TST"
        ? parseUnits(selectedToken.swapAmount || "0", 18)
        : 0n,
    ],
    enabled: false,
  });

  const { data: simulateApprove } = useSimulateContract({
    address: selectedToken.contractAddress,
    abi: tokenABI,
    functionName: "approve",
    args: [
      dexContractAddress,
      selectedToken.symbol === "TST"
        ? parseUnits(selectedToken.swapAmount || "0", 18)
        : 0n,
    ],
    enabled: false,
  });

  const swapFunction = async () => {
    setError("");
    if (
      !selectedToken.swapAmount ||
      isNaN(parseFloat(selectedToken.swapAmount))
    ) {
      setError("Please enter a valid amount to swap.");
      return;
    }

    try {
      console.log("selectedToken:", selectedToken);

      if (selectedToken.symbol === "BTC") {
        if (simulateBtcForTst?.request) {
          await writeContract(simulateBtcForTst.request);
          toast.success("Swap successful!");
        }
      } else if (selectedToken.symbol === "TST") {
        if (!isApproved) {
          if (simulateApprove?.request) {
            const approveHash = await writeContract(simulateApprove.request);
            toast.success("Approval successful!");
            setIsApproved((_isApproved) => true);
          }
        } else {
          const { data, error } = await refetchSimulateTstForBtc();
          if (error) {
            throw new Error("Swap simulation failed: " + error.message);
          }
          if (data?.request) {
            const swapHash = await writeContract(data.request);
            await waitForTransaction({ hash: swapHash });
            toast.success("Swap successful!");
            setIsApproved(false); // Reset approval state
            refetchBtcBalance();
            refetchTSTBalance();
          } else {
            throw new Error("Swap simulation data is not available");
          }
        }
      }
    } catch (error) {
      console.error("Swap error:", error);
    }
  };

  return (
    <div>
      <Layout>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>Swap</h1>
            <Button type="secondary" iconOpacity={1} iconClass="icon-gear" />
          </div>
          <TokenItem
            selectedToken={selectedToken}
            onShow={() => setModalShow(true)}
            onSetType={() => setTokenType(false)}
            setSelectedToken={setSelectedToken}
            activeTheme={activeTheme}
          />
          <div style={{ marginBottom: "4px" }}></div>
          <SwapTokenItem
            selectedToken={selectedSwapToken}
            onShow={() => setModalShow(true)}
            onSetType={() => setTokenType(true)}
            activeTheme={activeTheme}
          />
          <div style={{ marginBottom: "16px" }}></div>
          <div className={`common-card ${styles.cardResult}`}>
            <span className="color-alternate">1 {selectedToken.symbol}</span>
            <span className="color-primary">=</span>
            <div className={styles.series}>
              <span className="color-primary">
                {rate} {selectedSwapToken.symbol}
              </span>
              <div style={{ marginRight: "12px" }} />
              <Button type="secondary" iconOpacity={1} iconClass="icon-help" />
            </div>
          </div>
          <div style={{ marginBottom: "16px" }}></div>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <div style={{ margin: "0 16px" }}>
            <Button
              type="main"
              onClick={swapFunction}
              className={styles.swapButton}
            >
              {selectedToken.symbol === "TST" && !isApproved
                ? "Approve"
                : "Swap"}
            </Button>
          </div>
          <div style={{ marginBottom: "16px" }}></div>
        </div>
        {modalShow && (
          <TokenSelectModal
            onHide={() => setModalShow(false)}
            handleTokenSelect={handleTokenSelect}
            handleSwapTokenSelect={handleSwapTokenSelect}
            tokenType={tokenType}
          />
        )}
        <ToastContainer />
      </Layout>
    </div>
  );
}
