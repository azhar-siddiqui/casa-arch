import React, { useRef } from "react";

const TextAreaFields = (props) => {
  const { id, name, value, onChange, onBlur, placeholder, label } = props;
  const inputRef = useRef();
  return (
    <div className="w-full pt-4">
      <label htmlFor={name}>{label}</label>
      <div>
        <textarea
          ref={inputRef}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`outline-none border-2 py-2.5 px-6 w-full font-medium resize-none ${
            props?.className
          } ${props?.errorText ? `border-red-700` : `border-primaryLight`}`}
        />
      </div>
      {props?.errorText && (
        <div className="text-red-700">{props?.errorText}</div>
      )}
    </div>
  );
};

export default TextAreaFields;
