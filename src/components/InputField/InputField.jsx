import React, { useRef } from "react";
const InputField = (props) => {
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
    forgetLinkOnclick
  } = props;
  const inputRef = useRef();
  return (
    <div className="w-full pt-4">
      <div className="flex items-center justify-between">
        <label htmlFor={name}>{label}</label>
        <p className="text-primaryGray cursor-pointer" onClick={forgetLinkOnclick} >{forgetLink}</p>
      </div>
      <div className="relative flex items-center pt-3">
        <input
          ref={inputRef}
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`outline-none border-2 py-2.5 px-6 w-full ${
            props?.className
          } ${props?.errorText ? `border-red-700` : `border-primaryLight`}`}
          autoComplete="off"
        />
        {EyeIcon ? (
          <img
            src={EyeIcon}
            alt="EyeIcon"
            className="absolute right-3 cursor-pointer"
            onClick={handleViewPassword}
          />
        ) : (
          ""
        )}
      </div>
      {props?.errorText && (
        <div className="text-red-700">{props?.errorText}</div>
      )}
    </div>
  );
};

export default InputField;
