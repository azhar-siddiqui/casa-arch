import React from "react";
import styles from "./Blog.module.css";
import HeadImg from "../../assets/BlogIcons/blog-main.svg";
import Card from "../../components/Blog-Card/Card";
import CardImg from "../../assets/BlogIcons/CardImg.svg";

const Blog = () => {
  const data = [
    {
      Img: CardImg,
      heading:
        "This Insanely Designed Glasshouse Unfolds Like a Flower in Just Four Minutes",
      content:
        "When designing the kinetic glasshouse, Heatherwick Studio took inspiration from Victorian ornamental terrariums that were used to transport plants back to Europe from the Silk Route",
      author: "JESSICA CHERNER",
      id: 1,
    },
    {
      Img: CardImg,
      heading:
        "This Insanely Designed Glasshouse Unfolds Like a Flower in Just Four Minutes",
      content:
        "When designing the kinetic glasshouse, Heatherwick Studio took inspiration from Victorian ornamental terrariums that were used to transport plants back to Europe from the Silk Route",
      author: "JESSICA CHERNER",
      id: 2,
    },
    {
      Img: CardImg,
      heading:
        "This Insanely Designed Glasshouse Unfolds Like a Flower in Just Four Minutes",
      content:
        "When designing the kinetic glasshouse, Heatherwick Studio took inspiration from Victorian ornamental terrariums that were used to transport plants back to Europe from the Silk Route",
      author: "JESSICA CHERNER",
      id: 3,
    },
    {
      Img: CardImg,
      heading:
        "This Insanely Designed Glasshouse Unfolds Like a Flower in Just Four Minutes",
      content:
        "When designing the kinetic glasshouse, Heatherwick Studio took inspiration from Victorian ornamental terrariums that were used to transport plants back to Europe from the Silk Route",
      author: "JESSICA CHERNER",
      id: 4,
    },
    {
      Img: CardImg,
      heading:
        "This Insanely Designed Glasshouse Unfolds Like a Flower in Just Four Minutes",
      content:
        "When designing the kinetic glasshouse, Heatherwick Studio took inspiration from Victorian ornamental terrariums that were used to transport plants back to Europe from the Silk Route",
      author: "JESSICA CHERNER",
      id: 5,
    },
    {
      Img: CardImg,
      heading:
        "This Insanely Designed Glasshouse Unfolds Like a Flower in Just Four Minutes",
      content:
        "When designing the kinetic glasshouse, Heatherwick Studio took inspiration from Victorian ornamental terrariums that were used to transport plants back to Europe from the Silk Route",
      author: "JESSICA CHERNER",
      id: 6,
    },
  ];

  return (
    <div className={styles.main_div}>
      <div className={styles.intro}>
        <div className={styles.content}>
          <p className={styles.intro_head_small}>ARCHITECTURE</p>
          <h2 className={styles.intro_head}>
            This Insanely Designed Glasshouse Unfolds Like a Flower in Just Four
            Minutes
          </h2>
          <p className={styles.intro_para}>
            Created by Heatherwick Studios, the structure’s 10 steel “sepals”
            open up on warm days, letting in sunlight for the plants inside{" "}
          </p>
          <span className={styles.post_details}>
            <p className={styles.author}>BY JESSICA CHERNER</p>
            <p className={styles.date}>FEBRAURY 12,2012</p>
          </span>
        </div>
        <div className={styles.intro_img}>
          <img src={HeadImg} alt="intro" />
        </div>
      </div>

      <div className={styles.explore}>
        <p className={styles.explore_head}>Explore more</p>
        <div className={styles.card_div}>
          {data.map((elem) => {
            return (
              <Card
                Img={elem.Img}
                key={elem.id}
                heading={elem.heading}
                content={elem.content}
                author={elem.author}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blog;
