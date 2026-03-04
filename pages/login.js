/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../src/component/main/layout/Layout";
import Navbar from "../src/component/main/navbar/Navbar";
import styles from "../src/component/main/login/Login.module.css";

const login = () => {
  const [userAccount, setUserAccount] = useState("");
  const [userBalance, setUserBalance] = useState("");
  const router = useRouter();

  const handleConnect = async () => {
    try {
      const account = await signer.connectToAccount({
        extraKeys: ["publicKey"],
      });
      console.log(account);
      setUserAccount(account.address);
      setUserBalance(account);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userAccount) {
      router.push("/");
    }
  }, [userAccount, router]);

  return (
    <Layout>
      <Navbar signer={userAccount} account={userBalance} />

      <div className={styles.container}>
        <h2>Connect Wallet</h2>
        <form>
          <div>
            <button onClick={handleConnect}>Connect</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default login;
