import React from "react";
import styles from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className={styles["spinner-container"]}>
      <div className={styles["loading-spinner"]}></div>
    </div>
  );
}
