import React from "react";

const ButtonField = (props) => {
  const { className, children, onClick, type, icons, disabled } = props;
  return (
    <button
      className={`text-white ease-linear duration-300 font-medium tracking-wider ${className} disabled:opacity-60 disabled:pointer-events-none`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
      <span>{icons}</span>
    </button>
  );
};

export default ButtonField;
