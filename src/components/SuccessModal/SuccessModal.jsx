import React from "react";
import "./SuccessModal.css";
import Loading from "../../assets/successModalIcons/Loading.svg";
import { useEffect } from "react";

const SuccessModal = (props) => {
  const { massage, hideFooter, maxWidthClass } = props;

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
        className={` justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
      >
        <div className={`relative my-6 mx-auto ${maxWidthClass ? maxWidthClass : 'max-w-3xl w-auto '}`}>
          {/*content*/}
          <div
            className={`border-0 shadow-lg relative flex flex-col bg-white px-4 md:px-6 focus:outline-none py-[24px] ${maxWidthClass ? '' : 'outline-none'}`}
          >
            {/*header*/}
            <div className="mx-auto TickContainer">
              {/* <div className=""> */}
              {/* <img
                  src={CircleOrange}
                  alt="CircleOrange"
                  className="OrangeImg w-20 md:w-auto"
                /> */}
              {/* <img src={Tick} alt="RightTick" className="ml-3 md:ml-6 Tick" /> */}
              <span className="tick"></span>
              {/* </div> */}
            </div>
            {/*body*/}
            <div className="py-4 mt-7 flex-auto mx-auto font-medium text-lg lg:text-2xl text-primaryExtraLightGray">
              {massage}
            </div>
            {/*footer*/}
            {
              hideFooter ? '' :
                <div className=" mx-auto flex items-center">
                  <img src={Loading} alt="Loading" className="animate-spin" />
                  <p className="pl-2 text-primaryLight">Please wait</p>
                </div>
            }
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default SuccessModal;
