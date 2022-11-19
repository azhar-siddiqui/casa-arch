import React, { useRef } from "react";
import styles from './styles.module.css'
import DownArrow from '../../assets/down-arrow.svg'

const InputSelect = (props) => {
  const {
    type,
    id,
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    EyeIcon,
    label,
    handleViewPassword,
    forgetLink,
    optionData,
    labelClassName
  } = props;
  const inputRef = useRef();
  return (
    <div className="w-full pt-4">
       <div className={`flex items-center justify-between ${labelClassName ? labelClassName : ''} `}>
        <label htmlFor={name}>{label}</label>
        <p className="text-primaryGray cursor-pointer">{forgetLink}</p>
      </div>
      <div className="relative flex items-center pt-3">
        {/* <input
          ref={inputRef}
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`outline-none border-2 py-2.5 px-6 w-full ${props?.className
            } ${props?.errorText ? `border-red-700` : `border-primaryLight`}`}
          autoComplete="off"
        /> */}
        <select
          id={id}
          name={name}
          value={value}
          className={`outline-none border py-2.5 px-6 w-full ${props?.className
            } ${props?.errorText ? `border-red-700` : `border-primaryLight`} ${styles.select} `}
          autoComplete="off"
          onChange={onChange}
          onBlur={onBlur}
          >
          {optionData.map((option, idx) => {
          return <option key={idx} >
              {option}
            </option>
          })}
        </select>
          <img src={DownArrow} className={styles.icon} />
      </div>
      {props?.errorText && (
        <div className="text-red-700">{props?.errorText}</div>
      )}
    </div>
  );
};

export default InputSelect;
