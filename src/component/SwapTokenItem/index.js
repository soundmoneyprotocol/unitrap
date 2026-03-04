import React from "react";
import styles from "./Token.module.css";
import { FaChevronDown } from "react-icons/fa";

export const SwapTokenItem = ({ selectedToken, onShow, onSetType }) => {
  return (
    <div className={`common-card ${styles.card}`}>
      <div className={styles.series}>
        <img src={selectedToken.url} alt="" width="48px" height="48px" />
        <div
          style={{ fontWeight: 600, marginLeft: "16px", cursor: "pointer" }}
          onClick={() => {
            onShow();
            onSetType();
          }}
        >
          <span className="color-primary">{selectedToken.name}</span>
        </div>
        <FaChevronDown
          fontSize={14}
          className={styles.dropdownIcon}
          onClick={() => {
            onShow();
            onSetType();
          }}
        />
      </div>
      <div>
        <span className={styles.smallNum}>~${selectedToken.price}</span>
        <div style={{ marginBottom: "4px" }}></div>
        <span className={styles.bigNumber}>{selectedToken.usdtBalance}</span>
      </div>
    </div>
  );
};
