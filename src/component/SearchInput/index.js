import React from "react";
import styles from "./SearchInput.module.css";
export default function SearchInput({
  value,
  setValue,
  onKeyDown,
  className,
  placeholder,
}) {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder ?? `Search Name or paste address`}
        value={value}
        onChange={setValue}
        onKeyDown={onKeyDown}
        className={styles.SearchInput}
      />
    </div>
  );
}
