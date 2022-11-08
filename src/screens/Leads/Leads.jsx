import React, { useState, useEffect } from "react";
import Call from "../../assets/LeadsIcons/Call.svg";
import Mail from "../../assets/LeadsIcons/Email.svg";
import ArrowLeft from "../../assets/LeadsIcons/ArrowLeft.svg";
import "./Leads.css";
import ButtonField from "../../components/ButtonsFields/ButtonField";
import LeadsCards from "../../components/LeadsCards/LeadsCards";
import { useParams, useNavigate } from "react-router-dom";

const Leads = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, [screenWidth]);

  const param = useParams();

  useEffect(() => {}, [param.id]);
  const navigate = useNavigate();

  return (
    <div className="lg:flex leadsContainer">
      {screenWidth > 1024 && <LeadsCards />}
      <div className="flex-1 px-5 lg:px-0 lg:pl-6 lg:pt-16">
        {screenWidth < 1024 && (
          <div className="w-full border-b">
            <ButtonField
              className="flex items-center w-[118px] justify-between py-2"
              onClick={() => {
                navigate("/leads");
              }}
            >
              <img src={ArrowLeft} alt="ArrowLeft" />
              <span className="text-black text-sm">Back to list</span>
            </ButtonField>
          </div>
        )}
        <h1 className="font-semibold text-[32px]">Krishna</h1>
        <p className="text-[20px] font-normal">Interior Design</p>
        <p className="text-[20px] font-semibold text-[#939CA3] pb-2">6400961</p>
        <span className="flex items-center pb-3">
          <img src={Call} alt="Call Icon" />
          <p className="pl-5 font-semibold text-[16px]">855*******</p>
        </span>
        <span className="flex items-center pb-4">
          <img src={Mail} alt="Mail Icon" />
          <p className="pl-5 font-semibold text-[16px]">
            k****************1@g***l.com
          </p>
        </span>
        <ButtonField
          children={"Contact Krishna"}
          className="bg-primaryOrange border-2 border-primaryOrange text-[16px] font-medium py-2 px-3  lg:px-4 mr-4"
        />
        <ButtonField
          children={"Not Interested"}
          className="border-2 border-primaryOrange text-[16px] font-medium py-2 px-3 lg:px-4 text-primaryOrange"
        />
        <h1 className="w-full border-b border-[#939CA3] pt-5 pb-1 text-[#08090A] font-semibold text-[20px] ">
          Details
        </h1>
        <p className="text-[#939CA3] font-semibold text-[16px] pt-3">
          Enter your Pincode
        </p>
        <p className="text-[#08090A] font-semibold text-[16px] pt-1">6400961</p>
        <p className="text-[#939CA3] font-semibold text-[16px] pt-3">
          What type of services you’re looking for?
        </p>
        <p className="text-[#08090A] font-semibold text-[16px] pt-1">
          Interior Design
        </p>
        <p className="text-[#939CA3] font-semibold text-[16px] pt-3">
          What type of property is this?
        </p>
        <p className="text-[#08090A] font-semibold text-[16px] pt-1">
          Commercial Design
        </p>
        <p className="text-[#939CA3] font-semibold text-[16px] pt-3">
          Which room need designing?
        </p>
        <p className="text-[#08090A] font-semibold text-[16px] pt-1">
          Only one room
        </p>
        <p className="text-[#939CA3] font-semibold text-[16px] pt-3">
          Enter your email for sending quotation
        </p>
        <p className="text-[#08090A] font-semibold text-[16px] pt-1">
          Kartikeyan@gmail.com
        </p>
      </div>
    </div>
  );
};

export default Leads;
