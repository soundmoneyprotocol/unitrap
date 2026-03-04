import React, { useEffect, useState } from "react";
import styles from "./TokenSelect.module.css";
import { GrClose } from "react-icons/gr";
import SearchInput from "../SearchInput";
import { TokenDatas } from "../../TokenMockData";
import { ModalTokenItem } from "../ModalTokenItem";

export const TokenSelectModal = ({
  onHide,
  handleTokenSelect,
  handleSwapTokenSelect,
  tokenType,
}) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeTheme, setActiveTheme] = useState("light");

  const filteredTokens = TokenDatas?.filter((item) => {
    return (
      item.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1 ||
      item.symbol.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1
    );
  });

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    setActiveTheme(savedTheme);
  }, []);

  return (
    <div className={styles.modal}>
      <div className={styles.tokenMenu}>
        <div className={styles.tokenHeader}>
          <p className={styles.tokenTopic}>Select Token</p>
          <GrClose
            onClick={onHide}
            style={{
              cursor: "pointer",
              filter:
                activeTheme === "dark" ? "invert(1) brightness(200%)" : "none",
            }}
          />
        </div>
        <SearchInput
          setValue={({ target }) => setSearchKeyword(target.value)}
        />
        <div className={styles.divideSection} />
        <div className={styles.tokenSection}>
          <p className={styles.popularTokenText}>Popular tokens</p>
          {filteredTokens?.map((token, index) => (
            <ModalTokenItem
              key={index}
              token={token}
              handleTokenSelect={() => {
                if (tokenType) {
                  handleSwapTokenSelect(token);
                } else {
                  handleTokenSelect(token);
                }
                onHide();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
