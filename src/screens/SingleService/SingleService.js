import React, { useEffect, useState } from 'react'
import styles from './ServicesEx.module.css'
import HeadImg from '../../assets/services/services-main.svg'
import HeadImgSm from '../../assets/services/services-main-small.svg'
import { useLazyGetSingleServiceQuery } from '../../app/services/blogs'
import { useParams } from 'react-router-dom'

const SingleService = () => {

   const [fetchService, response] = useLazyGetSingleServiceQuery()

   const [service, setService] = useState({})
   const { id } = useParams()

   useEffect(() => {
      fetchService(id)
         .then(res => {
            // console.log(res.data)
            setService(res.data)
         })
   }, [id])
   // console.log(service)
   const { heading, icon, description, meta_title, title } = service

   const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

   if(Object.keys(service).length === 0) return <></>
   
   return (
      <div className={styles.main_div}>
         <div className={styles.head_img}>
            <img src={icon} className={styles.big_dev} alt="..."
               onClick={() => { console.log(heading) }} />
            <img src={icon} alt="..." className={styles.small_dev} />
         </div>
         <div className={styles.content}>
            <h2>
               {capitalize(heading)}
            </h2>
            <p dangerouslySetInnerHTML={{ __html: description }}  ></p>
         </div>
      </div>
   )
}

export default SingleService