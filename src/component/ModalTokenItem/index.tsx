import React from "react";
import styles from "./ModalTokenItem.module.css";
export const ModalTokenItem = ({ token, handleTokenSelect }) => {
  return (
    <div className={styles.modalItem} onClick={() => handleTokenSelect(token)}>
      <img src={token.url} alt="" width="48px" height="48px" />
      <div className={styles.modalDescription}>
        <p style={{ fontWeight: 600, margin: 0 }}>{token.name}</p>
        <p
          style={{
            fontFamily: "Gilroy",
            paddingTop: "2px",
            fontSize: "13px",
            margin: 0,
          }}
        >
          {token.symbol}
        </p>
      </div>
    </div>
  );
};
