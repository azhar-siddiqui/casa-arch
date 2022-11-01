// import { useState } from "react";
import Cross from "../../assets/ModalIcon/Cross.svg";
import "./Modal.css";

export default function Modal(props) {
  const {
    ModalTitle,
    body,
    setVisible,
    description,
    classNameModal,
    className,
    footer,
    // checkValue,
  } = props;
  return (
    <>
      <div
        className={`${classNameModal} justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="p-5 pb-0">
              <div className="flex items-center justify-between ">
                <h3 className="font-semibold text-2xl md:text-[32px]">
                  {ModalTitle ? ModalTitle : ""}
                </h3>
                <button className="" onClick={() => setVisible(false)}>
                  <img src={Cross} alt="CrossImg" />
                </button>
              </div>
              <p className={`text-primaryGray font-medium  ${className}`}>
                {description}
              </p>
            </div>
            {/*body*/}
            <div className="relative px-6 flex-auto">{body}</div>
            {/*footer*/}
            <div className="p-6">{footer}</div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
