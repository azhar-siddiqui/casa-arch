import React from 'react'
import styles from './CCheckbox.module.css'

export const CCheckbox = ({ checked }) => {
  return (
    <div className={`${checked ? styles.checked : styles.unchecked} ${styles.circle_checkbox}`}>
      {checked && <div></div>}
    </div>
  )
}
