import React from "react";
import { Link } from "react-router-dom";
import Loc from "../../assets/LeadsIcons/Loc.svg";
const LeadsCards = () => {
  const data = [
    {
      id: 1,
      name: "Krishna",
      designType: "Interior Design",
      cat: "Create new interiors/Commercial property/Only one room",
      pincode: "6400961",
      number: "123456789",
      email: "Kartikeyan@gmail.com",
      details: "",
    },
    {
      id: 2,
      name: "Rahul",
      designType: "Interior Design",
      cat: "Create new interiors/Commercial property/Only one room",
      pincode: "47545787",
      number: "784578945",
      email: "rahul@gmail.com",
      details: "",
    },
    {
      id: 3,
      name: "Jhon Doe",
      designType: "Interior Design",
      cat: "Create new interiors/Commercial property/Only one room",
      pincode: "6400961",
      number: "58454845",
      email: "jhondoe@gmail.com",
      details: "",
    },
    {
      id: 4,
      name: "Alisha More",
      designType: "Interior Design",
      cat: "Create new interiors/Commercial property/Only one room",
      pincode: "6400961",
      number: "74584613464",
      email: "alisha@gmail.com",
      details: "",
    },
  ];
  return (
    <div className="lg:pl-24 w-full lg:w-[416px] h-screen overflow-auto">
      <p className="text-center text-sm font-semibold text-[#939CA3] py-5 border-b border-[#939CA3]">
        Showing all {data.length} Leads
      </p>
      {data.map((value) => (
        <Link to={`/leadsListing/${value.id}`} key={value.id}>
          <div className="p-3 pb-0 lg:p-0">
            <div className="border border-[#939CA3] w-full h-[181px] p-4  border-l-4 border-l-[#F36C25] lg:border-t-0 lg:border-r-0">
              <h1 className="text-[20px] font-semibold">{value.name}</h1>
              <p className="text-[16px] font-normal text-[#000000]">
                {value.designType}
              </p>
              <p className="text-[#939CA3] text-sm font-normal pt-1 pb-3">
                {value.cat}
              </p>
              <span className="flex items-center">
                <img src={Loc} alt="Location" />
                <p className="text-[16px] text-[#939CA3] font-semibold pl-3">
                  {value.pincode}
                </p>
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LeadsCards;
