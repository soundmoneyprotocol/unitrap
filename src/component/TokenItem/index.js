import React from "react";
import styles from "./Token.module.css";
import { FaChevronDown } from "react-icons/fa";

export const TokenItem = ({
  selectedToken,
  setSelectedToken,
  onShow,
  onSetType,
}) => {
  return (
    <div className={`common-card ${styles.card}`}>
      <div className={styles.series}>
        <img src={selectedToken.url} alt="" width="48px" height="48px" />
        <div
          style={{ fontWeight: 600, marginLeft: "16px" }}
          onClick={() => {
            onSetType();
          }}
        >
          <span
            className="color-primary"
            style={{ cursor: "pointer" }}
            onClick={() => {
              onShow();
            }}
          >
            {selectedToken.name}
          </span>
          <div style={{ fontSize: "13px" }}>
            <span className="color-primary">Balance:</span>
            <span
              className="color-primary"
              style={{ fontFamily: "Gilroy", paddingTop: "2px" }}
            >
              &nbsp;{selectedToken.balance} {selectedToken.symbol}
            </span>
            <span
              className="color-alternate"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSelectedToken((prevToken) => ({
                  ...prevToken,
                  swapAmount: selectedToken.balance,
                }));
              }}
            >
              &nbsp;(Max)
            </span>
          </div>
        </div>
        <FaChevronDown
          fontSize={14}
          className={styles.dropdownIcon}
          onClick={() => {
            onShow();
          }}
        />
      </div>
      <div>
        <span className={styles.smallNum}>~${selectedToken.price}</span>
        {selectedToken.fluctuPercent && (
          <span className={styles.smallNum}>
            ({selectedToken.fluctuPercent})
          </span>
        )}
        <div style={{ marginBottom: "4px" }}></div>
        <input
          type="text"
          className={styles.bigNumber}
          value={selectedToken.swapAmount}
          onChange={(e) => {
            setSelectedToken((prevToken) => ({
              ...prevToken,
              swapAmount: e.target.value,
            }));
          }}
        />
      </div>
    </div>
  );
};
