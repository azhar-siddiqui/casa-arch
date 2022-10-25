import Load from "../../assets/loading.gif";
import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <>
      <img src={Load} className={styles.loading_img} alt="LoadingImg" />
    </>
  );
};

export default Loader;
