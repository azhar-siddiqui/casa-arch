import React from "react";
import styles from "./Card.module.css";
// import { useNavigate } from "react-router-dom";

const Card = ({ id, Img, heading, content, author, handleClick }) => {
  // let navigate = useNavigate();

  // const handleClick = () => {
  //   window.scrollTo(0, 0);
  //   // navigate("/blog/article");
  // };

  return (
    <div className={styles.container}>
      <div className={styles.img_div}>
        <img src={Img} alt="..." />
      </div>
      <h2 onClick={()=> handleClick(id)}>{heading}</h2>
      <p className={styles.content}>{content}</p>
      <p className={styles.author}>BY {author}</p>
    </div>
  );
};

export default Card;
