import React, { useState, useEffect } from "react";
import Call from "../../assets/LeadsIcons/Call.svg";
import Mail from "../../assets/LeadsIcons/Email.svg";
import ArrowLeft from "../../assets/LeadsIcons/ArrowLeft.svg";
import "./Leads.css";
import ButtonField from "../../components/ButtonsFields/ButtonField";
import LeadsCards from "../../components/LeadsCards/LeadsCards";
import { useParams, useNavigate } from "react-router-dom";
import { useCustomerDetailsLeadMutation } from "../../app/services/leadsServices";
import Subscription from "../Frame/Subscription/Subscription";
import SubscriptionFrame from "../Frame/SubscriptionFrame/SubscriptionFrame";
const Leads = () => {
  const [customerDetailsLead, customerDetailsReponse] =
    useCustomerDetailsLeadMutation();
  console.log(customerDetailsReponse);
  const param = useParams();
  const navigate = useNavigate();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [subscriptionVisible, setSubscriptionVisible] = useState(false);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);
  }, [screenWidth]);

  useEffect(() => {
    customerDetailsLead({ id: param?.id });
  }, [param]);

  const hiddenNumber = (value) => {
    let number = value.toString().split("");
    for (let i = 0; i <= number.length; i++) {
      if (i <= number.length - 4) {
        number[i] = "*";
      }
    }
    return number.join("");
  };

  const hiddenEmail = (value = "") => {
    let email = value.toString().split("@");
    let newemail = email[0].split("");
    for (let i = 0; i <= newemail.length; i++) {
      if (i <= newemail.length - 4) {
        newemail[i] = "*";
      }
    }
    return newemail.join("") + "@" + email[1];
  };

  return (
    <>
      <div className="lg:flex leadsContainer md:mb-[100px]">
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
          <h1 className="font-semibold text-[32px]">
            {customerDetailsReponse?.data?.data.name}
          </h1>
          <p className="text-[20px] font-normal">
            {customerDetailsReponse?.data?.data.design_type}
          </p>
          <p className="text-[20px] font-semibold text-[#939CA3] pb-2">
            {customerDetailsReponse?.data?.data.pincode}
          </p>
          <span className="flex items-center pb-3">
            <img src={Call} alt="Call Icon" />
            <p className="pl-5 font-semibold text-[16px]">
              {customerDetailsReponse.data?.data.mobile
                ? hiddenNumber(customerDetailsReponse?.data?.data.mobile)
                : "N/A"}
            </p>
          </span>
          <span className="flex items-center pb-4">
            <img src={Mail} alt="Mail Icon" />
            <p className="pl-5 font-semibold text-[16px]">
              {customerDetailsReponse.data?.data.email
                ? hiddenEmail(customerDetailsReponse?.data?.data.email)
                : "N/A"}
            </p>
          </span>

          <ButtonField
            children={"Contact Krishna"}
            className="bg-primaryOrange border-2 border-primaryOrange text-[16px] font-medium py-2 px-3  lg:px-4 mr-4"
            onClick={() => {
              setSubscriptionVisible(true);
            }}
          />
          <ButtonField
            children={"Not Interested"}
            className="border-2 border-primaryOrange text-[16px] font-medium py-2 px-3 lg:px-4 text-primaryOrange"
          />
          <h1 className="w-full border-b border-[#939CA3] pt-5 pb-1 text-[#08090A] font-semibold text-[20px] ">
            Details
          </h1>
          <p className="text-[#939CA3] font-semibold text-[16px] pt-3">
            Pincode
          </p>
          <p className="text-[#08090A] font-semibold text-[16px] pt-1">
            {customerDetailsReponse?.data?.data.pincode}
          </p>
          <p className="text-[#939CA3] font-semibold text-[16px] pt-3">
            What type of services you’re looking for?
          </p>
          <p className="text-[#08090A] font-semibold text-[16px] pt-1">
            {customerDetailsReponse?.data?.data.service_looking}
          </p>
          <p className="text-[#939CA3] font-semibold text-[16px] pt-3">
            What type of property is this?
          </p>
          <p className="text-[#08090A] font-semibold text-[16px] pt-1">
            {customerDetailsReponse?.data?.data.property_type}
          </p>
          <p className="text-[#939CA3] font-semibold text-[16px] pt-3">
            How Many room need designing?
          </p>
          <p className="text-[#08090A] font-semibold text-[16px] pt-1">
            {customerDetailsReponse?.data?.data.rooms !== ""
              ? 1
              : customerDetailsReponse?.data?.data.rooms}
          </p>
          <p className="text-[#939CA3] font-semibold text-[16px] pt-3">
            Enter your email for sending quotation
          </p>
          <p className="text-[#08090A] font-semibold text-[16px] pt-1">
            {customerDetailsReponse?.data?.data.email}
          </p>
        </div>
      </div>

      {subscriptionVisible && (
        <SubscriptionFrame setSubscriptionVisible={setSubscriptionVisible} />
      )}
    </>
  );
};

export default Leads;
