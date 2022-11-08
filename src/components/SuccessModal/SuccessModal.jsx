import React from "react";
import "./SuccessModal.css";
import Loading from "../../assets/successModalIcons/Loading.svg";

const SuccessModal = (props) => {
  const { massage, hideFooter } = props;
  return (
    <>
      <div
        className={` justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div
            className={` border-0 shadow-lg relative flex flex-col bg-white outline-none focus:outline-none py-6`}
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
