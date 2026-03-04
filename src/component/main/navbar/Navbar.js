import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ThemeButton from "../ThemeButton";
import Button from "../../basic/button/Button";
import styles from "./Navbar.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = (signer) => {
  const [currentSelection, setCurrentSelection] = useState(0);
  const router = useRouter();

  const url = router.asPath.split("?")[0];

  useEffect(() => {
    switch (url) {
      case "/":
        setCurrentSelection(0);
        break;
      case "/rewards":
        setCurrentSelection(1);
        break;
      case "/vote":
        setCurrentSelection(2);
        break;
      case "/buy":
        setCurrentSelection(3);
        break;
    }
  }, [url]);

  return (
    <div className={styles.parent}>
      <nav className={styles.container}>
        <div className="image-logo" />
        <div className={styles.nav}>
          <label
            htmlFor="option1"
            className={`btn btn-secondary ${
              currentSelection === 0 && styles.active
            }`}
          >
            <input
              className={styles.inputRadio}
              type="radio"
              value="Trade"
              name="options"
              id="option1"
              onChange={() => {
                setCurrentSelection(0);
                router.push("/");
              }}
            />{" "}
            Trade
          </label>
          <div className={styles.divider}></div>
          <label
            htmlFor="option2"
            className={`btn btn-secondary ${
              currentSelection === 1 && styles.active
            }`}
          >
            <input
              className={styles.inputRadio}
              type="radio"
              value="Rewards"
              name="options"
              id="option2"
              onChange={() => {
                setCurrentSelection(1);
                router.push("/rewards");
              }}
            />{" "}
            Rewards
          </label>
          <div className={styles.divider}></div>
          <label
            htmlFor="option3"
            className={`btn btn-secondary ${
              currentSelection === 2 && styles.active
            }`}
          >
            <input
              className={styles.inputRadio}
              type="radio"
              value="Vote"
              name="options"
              id="option3"
              onChange={() => {
                setCurrentSelection(2);
                router.push("/vote");
              }}
            />{" "}
            Vote
          </label>
          <div className={styles.divider}></div>
          <label
            htmlFor="option4"
            className={`btn btn-secondary ${
              currentSelection === 3 && styles.active
            }`}
          >
            <input
              className={styles.inputRadio}
              type="radio"
              value="Buy"
              name="options"
              id="option4"
              onChange={() => {
                setCurrentSelection(3);
                router.push("/buy");
              }}
            />
            Buy
          </label>
        </div>

        <div className={styles.accountContainer}>
          <ThemeButton />
          <ConnectButton />
          <Button
            type="secondary"
            iconOpacity={1}
            iconClass="icon-kebab-horizontal"
            bg="more"
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
