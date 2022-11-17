import React, { useEffect, useState } from 'react'
import styles from './BlogEx.module.css'
import HeadImg from './blog-ex-main.svg'
import HeadImgSm from './blog-main.svg'
import CardImg from './blog-explore.svg'
import Card from '../../components/Blog-Card/Card'
import { useLazyGetSingleBlogQuery } from '../../app/services/blogs'
import { useParams } from 'react-router-dom'

const monthNames = ["January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"
];

const data = [
   {
      Img: CardImg,
      heading: "This Insanely Designed Glasshouse Unfolds Like a Flower in Just Four Minutes",
      content: "When designing the kinetic glasshouse, Heatherwick Studio took inspiration from Victorian ornamental terrariums that were used to transport plants back to Europe from the Silk Route",
      author: "JESSICA CHERNER"
   },
   {
      Img: CardImg,
      heading: "This Insanely Designed Glasshouse Unfolds Like a Flower in Just Four Minutes",
      content: "When designing the kinetic glasshouse, Heatherwick Studio took inspiration from Victorian ornamental terrariums that were used to transport plants back to Europe from the Silk Route",
      author: "JESSICA CHERNER"
   },
   {
      Img: CardImg,
      heading: "This Insanely Designed Glasshouse Unfolds Like a Flower in Just Four Minutes",
      content: "When designing the kinetic glasshouse, Heatherwick Studio took inspiration from Victorian ornamental terrariums that were used to transport plants back to Europe from the Silk Route",
      author: "JESSICA CHERNER"
   }
];
export const SingleBlog = () => {

   const [fetchBlog, response] = useLazyGetSingleBlogQuery()
   const [blog, setBlog] = useState({})
   const { id } = useParams()

   useEffect(() => {
      fetchBlog(id)
         .then(res => {
            setBlog(res.data.data)
         })
   }, [id])

   // console.log(blog)
   const { cover, author, description, meta_title, title, service, created_at } = blog
   let date = new Date(created_at)

   return (
      <div className={styles.main_div}>
         <div className={styles.intro}>
            <div className={styles.intro_img}>
               <img src={cover} className={styles.big_dev} alt='intro' />
               <img src={HeadImgSm} className={styles.small_dev} alt='intro' />
            </div>
            <div className={styles.content}>
               <p className={styles.intro_head_small}>
                  {service === 1 ? 'ARCHITECTURE' : 'INTERIOR DESIGN'}
               </p>
               <h2 className={styles.intro_head}>
                  {title}
               </h2>
               <p className={styles.intro_para}>
                  {meta_title}
               </p>
               <span className={styles.post_details}>
                  <p className={styles.author}>{author}</p>
                  <p className={styles.dot}>{' . '}</p>
                  <p className={styles.date}>
                     <span>
                        {monthNames[date.getMonth()]}
                     </span>
                     <span className='inline-block ml-1'>
                        {date.getDate()}
                     </span>,
                     <span className='inline-block ml-1'>
                        {date.getFullYear()}
                     </span>
                  </p>
               </span>
            </div>
         </div>

         <hr className={styles.divide_line} />

         <div className={styles.article}>
            <p className={styles.para1}>
               {/* {description} */}
               <div dangerouslySetInnerHTML={{ __html: description }} />
            </p>
            <div className={styles.mid}>
               {/* <h2 className={styles.highlight_text}>
                  <p>“</p>
                  21st-century urbanism abounds with newly created ruins that blur the distinction between success and failure, growth and decay
                  <p>”</p>
               </h2> */}
               {/* <p className={styles.para1}>
                  One of the signal by-products of finance capitalism’s emphasis on asset value over use value is the underuse of architectural space. High residential vacancies in parts of cities that are perceived as desirable as well as abandoned or largely empty speculative developments are both prominent features of 21st-century urbanism. And as these two conditions suggest, not all under-occupancy is the same. A large proportion of owned but empty residential units generates an in-between state of uncertain vitality — zombie urbanism — whereas a more dramatic proportion of vacant or unfinished units produces a very different phenomenon — ghost urbanism. 3 This divergence — again, between buildings for use and buildings for investment — complicates some widely held assumptions; chiefly, that underuse is associated with blight and decay, while new growth signals vibrant prosperity. Indeed, 21st-century urbanism abounds with newly created ruins that blur the distinction between success and failure, growth and decay. And in the process, they recalibrate theoretical and emotional conceptions of architecture.Zombie urbanism occurs when an area has large numbers of owned but empty housing units, resulting in a de facto density that is significantly below the designed capacity.
               </p> */}
            </div>
            <p className={`${styles.para1} ${styles.big_dev}`}>
               {/* Zombie urbanism occurs when an area has large numbers of owned but empty housing units, resulting in a de facto density that is significantly below the designed capacity. These areas mix present populations with absent populations, exhibiting an eerily low level of vitality in relation to their scale. They are not dead, but they are also not quite alive.
                */}
            </p>
            <div className={styles.orange_dot}>...</div>
            <p className={`${styles.para1} ${styles.big_dev}`}>
               {/* If zombie urbanism is defined by reduced occupancy that operates in the context of success, ghost urbanism is characterized by high vacancy that contributes to the perception of failure. Ghost urbanism can make a place feel experientially dead and reinforce a palpable sense of decline; most commonly it is marked by a noticeable volume of unsold or incomplete housing units that may be in some state of decay.One of the signal by-products of finance capitalism’s emphasis on asset value over use value is the underuse of architectural space. High residential vacancies in parts of cities that are perceived as desirable as well as abandoned or largely empty speculative developments are both prominent features of 21st-century urbanism. And as these two conditions suggest, not all under-occupancy is the same. A large proportion of owned but empty residential units generates an in-between state of uncertain vitality — zombie urbanism — whereas a more dramatic proportion of vacant or unfinished units produces a very different phenomenon — ghost urbanism. 3 This divergence — again, between buildings for use and buildings for investment — complicates some widely held assumptions; chiefly, that underuse is associated with blight and decay, while new growth signals vibrant prosperity. Indeed, 21st-century urbanism abounds with newly created ruins that blur the distinction between success and failure, growth and decay. And in the process, they recalibrate theoretical and emotional conceptions of architecture.Zombie urbanism occurs when an area has large numbers of owned but empty housing units, resulting in a de facto density that is significantly below the designed capacity. */}
            </p>
         </div>

         <hr className={styles.divide_line} />

         {/* <div className={styles.related}>
            <h2>Related blogs</h2>
            <div className={styles.card_div}>
               {data.map((elem) => {
                  return <Card Img={elem.Img} heading={elem.heading} content={elem.content} author={elem.author} />
               })}
            </div>
         </div> */}

      </div>
   )
}
