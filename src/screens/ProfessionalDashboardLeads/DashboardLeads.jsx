import { useEffect } from "react";
import OrangeStar from "../../assets/DashboardLeadsIcons/OrangeStar.svg";
import OutlineStar from "../../assets/DashboardLeadsIcons/OutlineStar.svg";
import Location from "../../assets/DashboardLeadsIcons/Location.svg";
import Dot from "../../assets/DashboardLeadsIcons/Dot.svg";
import "./DashboardLeads.css";
import {
  useDesignLeadsMutation,
  useOnGoingProjectLeadsMutation,
  useSearchLeadsMutation,
} from "../../app/services/leadsServices";

const DashboardLeads = () => {
  let Token = localStorage.getItem("Token");
  const [designLead, designLeadResponse] = useDesignLeadsMutation();
  const [searchLead, searchLeadResponse] = useSearchLeadsMutation();
  const [ongoingProject, ongoingProjectResponse] =
    useOnGoingProjectLeadsMutation();

  console.log("projectLeadResponse", ongoingProjectResponse?.data?.data);

  useEffect(() => {
    designLead({ token: Token });
  }, []);

  useEffect(() => {
    searchLead({ token: Token });
  }, []);

  useEffect(() => {
    ongoingProject({ token: Token });
  }, []);

  return (
    <div className="dashLeads">
      <div className="w-full h-[72px] lg:h-[93px] bg-primaryOrange mt-4 pl-5 lg:pl-[76px] flex items-center text-white font-semibold text-[20px] lg:text-2xl">
        Welcome to your Dashboard !
      </div>
      <h1 className="text-[#08090A] text-center font-medium text-2xl py-3">
        My Leads
      </h1>
      <div className="lg:px-[76px] ">
        {/*  */}
        <div className="lg:flex justify-between styled-scrollbar">
          <div className="w-full h-[544px]  border border-[#000] overflow-auto">
            <div className="w-full">
              <div className="bg-[#CED4DA] w-full sticky top-0 flex items-center justify-between">
                <h1 className="text-[#08090A] text-2xl font-medium px-5 py-2 lg:text-center w-full">
                  Search Leads
                </h1>
                <select
                  name=""
                  id=""
                  className="outline-none p-2 rounded-md cursor-pointer mr-4"
                >
                  <option value="All" className="p-2">
                    All
                  </option>
                  <option value="Favourite" className="p-2">
                    Favourite
                  </option>
                </select>
              </div>
              {searchLeadResponse?.data?.data.map((SearchLeads) => (
                <div
                  className="px-5 pt-5 border-b border-[#CED4DA]"
                  key={SearchLeads.id}
                >
                  <div className="flex justify-between items-center">
                    <h1 className="text-[#08090A] font-semibold text-2xl w-full">
                      {SearchLeads.name}
                    </h1>
                    <button>
                      {SearchLeads.is_designer_fav === true ? (
                        <img src={OrangeStar} alt="OrangeStar" />
                      ) : (
                        <img src={OutlineStar} alt="OutlineStar" />
                      )}
                    </button>
                  </div>
                  <h2 className="text-[20px] font-normal">
                    {SearchLeads.service_looking}
                  </h2>
                  <p className="text-[#939CA3] text-base font-normal pt-1">
                    {SearchLeads.email}
                  </p>
                  <p className="text-[#939CA3] text-base font-normal pt-1">
                    Pincode - {SearchLeads.pincode}
                  </p>
                  <p className="text-[#939CA3] text-base font-normal pt-1">
                    Mobile No - {SearchLeads.phone}
                  </p>
                  <p className="text-[#939CA3] text-base font-normal pt-1">
                    Property - {SearchLeads.property_type}
                  </p>
                  <p className="text-[#939CA3] text-base font-normal py-2">
                    Number of rooms - {SearchLeads.rooms}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-[544px]  border border-[#000] overflow-auto">
            <div className="w-full ">
              <div className="bg-[#CED4DA] w-full sticky top-0 flex justify-between items-center">
                <h1 className="text-[#08090A] text-2xl font-medium px-5 py-2 lg:text-center w-full">
                  Designing Leads
                </h1>
                <select
                  name=""
                  id=""
                  className="outline-none p-2 rounded-md cursor-pointer mr-4"
                >
                  <option value="All" className="p-2">
                    All
                  </option>
                  <option value="Favourite" className="p-2">
                    Favourite
                  </option>
                </select>
              </div>
              {designLeadResponse?.data?.data.map((SearchLeads) => (
                <div
                  className="px-5 pt-5 border-b border-[#CED4DA]"
                  key={SearchLeads.id}
                >
                  <div className="flex justify-between items-center">
                    <h1 className="text-[#08090A] font-semibold text-2xl w-full">
                      {SearchLeads.name}
                    </h1>
                    <button>
                      {SearchLeads.is_designer_fav === true ? (
                        <img src={OrangeStar} alt="OrangeStar" />
                      ) : (
                        <img src={OutlineStar} alt="OutlineStar" />
                      )}
                    </button>
                  </div>
                  <h2 className="text-[20px] font-normal">
                    {SearchLeads.design_type === ""
                      ? "Interior Design"
                      : SearchLeads.design_type}
                  </h2>
                  <p className="text-[#939CA3] text-base font-normal pt-5">
                    Create new interiors/{SearchLeads.property_type} / <br />
                    {SearchLeads.rooms === null
                      ? "One Room"
                      : SearchLeads.rooms}
                  </p>
                  <p className="text-[#939CA3] text-base font-normal pt-2">
                    Mobile No - 123458784
                  </p>
                  <span className="flex items-center">
                    <img src={Location} alt="Location" />
                    <p className="text-[#939CA3] text-base font-normal pl-3 py-5">
                      {SearchLeads.location}
                    </p>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:px-[76px] mt-5 styled-scrollbar mb-10">
        <div className="w-full h-[210px] border border-[#000] overflow-auto">
          <div className="w-full ">
            <div className="bg-[#CED4DA] w-full sticky top-0 flex justify-between items-center">
              <h1 className="text-[#08090A] text-2xl font-medium px-5 py-2 lg:text-center w-full">
                Ongoing Projects
              </h1>
              <select
                name=""
                id=""
                className="outline-none p-2 rounded-md cursor-pointer mr-4"
              >
                <option value="All" className="p-2">
                  All
                </option>
                <option value="Favourite" className="p-2">
                  Favourite
                </option>
              </select>
            </div>
            {ongoingProjectResponse?.data?.data.map((ongoingProject) => (
              <div
                className="px-5 pt-5 border-b border-[#CED4DA]"
                key={ongoingProject.id}
              >
                <div className="flex justify-between items-center">
                  <h1 className="text-[#08090A] font-semibold text-2xl w-full">
                    {ongoingProject.project_name}
                  </h1>
                  <button>
                    {ongoingProject.is_designer_fav === true ? (
                      <img src={OrangeStar} alt="OrangeStar" />
                    ) : (
                      <img src={OutlineStar} alt="OutlineStar" />
                    )}
                  </button>
                </div>
                <span className="flex items-center">
                  <h2 className="text-[20px] font-normal text-[#6D747A] pr-2">
                    {ongoingProject.location === null
                      ? "Chennai"
                      : ongoingProject.location}
                  </h2>
                  <img src={Dot} alt="Dot" />
                  <h2 className="text-[20px] font-normal text-[#6D747A] px-2">
                    {ongoingProject.project_budget}
                  </h2>
                  <img src={Dot} alt="Dot" />
                  <h2 className="text-[20px] font-normal text-[#6D747A] pl-2">
                    {ongoingProject.aesthetic_req}
                  </h2>
                </span>
                <p className="text-[#939CA3] text-base font-normal pt-1 pb-3">
                  Text description provided by the architects. nursery The
                  Learning Tree in Romford, for leading childcare and education
                  company, Storal Learning.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLeads;
