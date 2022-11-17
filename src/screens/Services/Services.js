import React, { useEffect, useState } from 'react'
import ServicesCard from '../../components/Services-Card/Card'
import styles from './Services.module.css'
import HeadImg from './services-main.svg'
import HeadImgSm from './services-main-small.svg'

import Landscaping from '../../assets/services/landscaping.svg'
import Restaurant from '../../assets/services/restaurant.svg'
import Residental from '../../assets/services/residental.svg'
import Gardening from '../../assets/services/gardening.svg'
import Architecture from '../../assets/services/architecture.svg'
import Interior from '../../assets/services/interior.svg'
import Commercial from '../../assets/services/commercial.svg'
import Professional from '../../assets/services/professional.svg'
import { useLazyGetServicesQuery } from '../../app/services/blogs'
import { useNavigate } from 'react-router-dom'

export const Services = () => {


   let data = [
      {
         heading: "Architecture",
         Img: Architecture,
         route: 'architecture'
      },
      {
         heading: "Interior Designing",
         Img: Interior,
         route: 'interior'
      },
      {
         heading: "Residental ID",
         Img: Residental,
         route: 'residental'
      },
      {
         heading: "Commercial ID",
         Img: Commercial,
         route: 'commercial'
      },
      {
         heading: "Professional ID",
         Img: Professional,
         route: 'professional'
      },
      {
         heading: "Landscaping",
         Img: Landscaping,
         route: 'landscaping'
      },
      {
         heading: "Restaurant",
         Img: Restaurant,
         route: 'restaurant'
      },
      {
         heading: "Gardening",
         Img: Gardening,
         route: 'gardening'
      },
   ]

   const [fetchServices, response] = useLazyGetServicesQuery()
   const [services, setServices] = useState([])
   const navigate = useNavigate()

   useEffect(() => {
      fetchServices()
         .then(res => {
            setServices(res.data.data)
         })
      }, [])
      

   const handleClick = id => navigate(`/service/${id}`)
   
   return (
      <div className={styles.main_div}>
         <div className={styles.intro}>
            <div className={styles.head_img}>
               <img src={HeadImg} className={styles.big_dev} alt="..." />
               <img src={HeadImgSm} alt="..." className={styles.small_dev} />
            </div>
            <div className={styles.content}>
               <h2>A word about our services</h2>
               <p>We make perfect casa if it’s your first time looking for a professional and not sure where to start? Tell us about your project and we’ll send you a list of professionals to review. There’s no pressure to hire, so you can compare profiles, read previous reviews and ask for more information before you make your decision. We make perfect casa if it’s your first time looking for a professional and not sure where to start? Tell us about your project and we’ll send you a list of professionals to review. There’s no pressure to hire, so you can compare profiles, read previous reviews and ask for more information before you make your decision. </p>
            </div>
         </div>
         <div className={styles.options}>
            <h2>
               What we design
            </h2>
            <div className={styles.card_div}>
               {services.length > 0 && services.map((ele) => {
                  return <ServicesCard Img={ele.icon}
                     id={ele.id}
                     key={ele.id}
                     heading={ele.heading}
                     handleClick={handleClick} />
               })}
               {/* {services.length > 0 && services.map((elem) => {
            return (
              <Card
                id={elem.id}
                Img={elem.cover}
                key={elem.id}
                heading={elem.title}
                content={
                  <span dangerouslySetInnerHTML={{ __html: elem.description }} />
                }
                author={elem.author}
                handleClick={handleClick}
              />
            );
          })} */}
            </div>
         </div>
      </div>
   )
}
