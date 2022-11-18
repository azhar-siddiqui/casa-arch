// import { useState } from "react";
import { useEffect } from "react";
import Cross from "../../assets/ModalIcon/cross-img.svg";
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
    secondModalVisible,
    secondModalBody,
    // checkValue,
    footerClassName,
    headerClassName
  } = props;

  //disable body scroll if modal open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [])

  return (
    <>
      <div
        className={`${classNameModal} pt-10 pb-6 justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl my-auto">
          {/*content*/}
          <div className="border-0 shadow-lg relative flex flex-col bg-white outline-none focus:outline-none ">
            {/*header*/}
            <div className="p-4 sm:p-5 pb-0">
              <div className="flex items-center justify-between ">
                <h3 className={`${headerClassName} font-semibold text-2xl md:text-[32px]`}>
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
            <div className="relative px-4 sm:px-5 flex-auto">{body}</div>
            {/*footer*/}
            <div className={`p-6 ${footerClassName} `}>{footer}</div>
          </div>
        </div>

        {
          secondModalVisible &&
          <div className='mx-auto bg-white w-full px-5 max-w-601'>
            {secondModalBody}
          </div>
        }

      </div>

      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
