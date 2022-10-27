import React, { useRef } from "react";
const InputRadio = (props) => {
  const {
    type,
    id,
    name,
    value,
    checkedValue,
    onChange,
    onBlur,
    placeholder,
    label,
    forgetLink,
    isLast
  } = props;
  const inputRef = useRef();
  return (
    <div className={`w-full pt-4 flex items-center border px-4 pb-4  ${isLast ? '' : 'border-b-0'}`}>
      <div className="relative flex items-center mr-2">
        <input
          ref={inputRef}
          type='radio'
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`outline-none border-2 py-2.5 px-6 w-full ${props?.className} ${props?.errorText ? `border-red-700` : `border-primaryLight`}`}
          autoComplete="off"
          checked={value === checkedValue ? true : false}
        />
      </div>
      <div className="flex items-center justify-between">
        <label htmlFor={name}>{label}</label>
        <p className="text-primaryGray cursor-pointer">{forgetLink}</p>
      </div>
      {props?.errorText && (
        <div className="text-red-700">{props?.errorText}</div>
      )}
    </div>
  );
};

export default InputRadio;
