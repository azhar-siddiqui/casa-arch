import React from "react";
import "./SuccessModal.css";
import CircleOrange from "../../assets/successModalIcons/Circle.svg";
import Loading from "../../assets/successModalIcons/Loading.svg";
// import Tick from "../../assets/successModalIcons/Right.svg";

const SuccessModal = () => {
  return (
    <>
      <div
        className={` justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 shadow-lg relative flex flex-col bg-white outline-none focus:outline-none py-6">
            {/*header*/}
            <div className="mx-auto">
              <div className="">
                <img
                  src={CircleOrange}
                  alt="CircleOrange"
                  className="OrangeImg w-20 md:w-auto"
                />
                {/* <img
                  src={Tick}
                  alt="RightTick"
                  className="ml-3 sm:ml-4 md:ml-6 "
                /> */}
              </div>
            </div>
            {/*body*/}
            <div className="py-4 flex-auto mx-auto font-medium text-lg lg:text-2xl text-primaryExtraLightGray">
              Details Added Successfully
            </div>
            {/*footer*/}
            <div className=" mx-auto flex items-center">
              <img src={Loading} alt="Loading" className="animate-spin" />
              <p className="pl-2 text-primaryLight">Please wait</p>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default SuccessModal;
