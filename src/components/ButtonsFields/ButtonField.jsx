import React from "react";

const ButtonField = (props) => {
  const { className, children, onClick, type, icons } = props;
  return (
    <button
      className={`text-white ease-linear duration-300 font-medium tracking-wider ${className}`}
      onClick={onClick}
      type={type}
      // disabled={disabled}
    >
      {children}
      <span>{icons}</span>
    </button>
  );
};

export default ButtonField;
