import React from 'react'
import styles from './Card.module.css'
import { useNavigate } from 'react-router-dom'

const ServicesCard = ({ id, Img, heading, route, handleClick }) => {

  let navigate = useNavigate()

  // const handleClick = () => {
  //   window.scrollTo(0, 0)
  //   navigate(`/services/${route}`)
  // }

  return (
    <div className={styles.container}>
      <div className={styles.img_div}>
        <img src={Img} alt="..." />
      </div>
      <h2 onClick={() => handleClick(id)}>{heading}</h2>
    </div>
  )
}

export default ServicesCard
