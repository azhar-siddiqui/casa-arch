import React from "react";
import styles from "./Success2.module.css";
import { Loader } from "../Loader/Loader";

const Success2 = ({ message, customWidth }) => {
  return (
    <div className={styles.main}>
      <div className={`${styles.card} `}>
        <div className={styles.header}>
          <span className={styles.tick}></span>
        </div>
        <div className={styles.body}>
          <p className={styles.heading}>{message}</p>
          <div className={styles.loader_div}>
            <Loader />
          </div>
          <p className={styles.light_txt}>Please wait</p>
        </div>
      </div>
    </div>
  );
};

export default Success2;
