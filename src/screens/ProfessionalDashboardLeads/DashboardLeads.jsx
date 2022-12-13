import { useState, useEffect } from "react";
import OrangeStar from "../../assets/DashboardLeadsIcons/OrangeStar.svg";
import OutlineStar from "../../assets/DashboardLeadsIcons/OutlineStar.svg";
import Location from "../../assets/DashboardLeadsIcons/Location.svg";
import Dot from "../../assets/DashboardLeadsIcons/Dot.svg";
import "./DashboardLeads.css";
import {
  useDesignLeadsMutation,
  useOnGoingProjectLeadsMutation,
  useSearchLeadsMutation,
  useSearchLeadAddOrRemFavMutation,
  useDesignLeadAddOrRemFavMutation,
  useOngoingProjectLeadAddOrRemFavMutation,
  useSearchLeadFvtMutation,
} from "../../app/services/leadsServices";

const DashboardLeads = () => {
  let Token = localStorage.getItem("Token");
  const [filteredSearchLeads, setFilteredSearchLeads] = useState([]);

  const [searchLead, searchLeadResponse] = useSearchLeadsMutation();
  const [designLead, designLeadResponse] = useDesignLeadsMutation();

  const [searchLeadsData, setSearchLeadsData] = useState([])
  const [filteredSearchLeadsData, setFilteredSearchLeadsData] = useState([])

  const [designLeadsData, setDesignLeadsData] = useState([])
  const [filteredDesignLeadsData, setFilteredDesignLeadsData] = useState([])

  const [ongoingProjectsData, setOngoingProjectsData] = useState([])
  const [filteredOngoingProjectsData, setFilteredOngoingProjectsData] = useState([])

  const [addorRemoveFav, addorRemoveFavResponse] =
    useSearchLeadAddOrRemFavMutation();
  const [addorRemoveDesignFav, addorRemoveDesignFavResponse] =
    useDesignLeadAddOrRemFavMutation();
  const [addorRemoveOngoingFav, addorRemoveOngoingFavResponse] =
    useOngoingProjectLeadAddOrRemFavMutation();
  const [ongoingProject, ongoingProjectResponse] =
    useOnGoingProjectLeadsMutation();

  const [searchLeadFvt, searchLeadFvtResponse] = useSearchLeadFvtMutation();

  const [searchLeadFavActive, setSearchLeadFavActive] = useState('All')
  const [designFavActive, setDesignFavActive] = useState('All')
  const [ongoingProjectsActive, setOngoingProjectsActive] = useState('All')

  useEffect(() => {
    searchLead({ token: Token })
      .then(res => {
        setSearchLeadsData(res.data.data)
      })
  }, [addorRemoveFavResponse.isSuccess]);

  useEffect(() => {
    if (searchLeadFavActive === 'All') {
      setFilteredSearchLeadsData(searchLeadsData)
    } else {
      let temp = searchLeadsData.filter(item => item.is_designer_fav === true)
      setFilteredSearchLeadsData(temp)
    }
  }, [searchLeadFavActive, searchLeadsData])
// console.log(filteredSearchLeadsData);
  // useEffect(() => {
  //   if (searchLeadResponse.isSuccess) {
  //     setFilteredSearchLeads(searchLeadResponse?.data?.data);
  //   }
  // }, [searchLeadResponse.isSuccess, searchLeadResponse.isError]);

  // useEffect(() => {
  //   searchLeadFvt({ token: Token });
  // }, []);

  // useEffect(() => {
  //   if (searchLeadFvtResponse.isSuccess) {
  //     setFilteredSearchLeads(searchLeadFvtResponse.data?.data);
  //   }
  // }, [searchLeadFvtResponse.isSuccess, searchLeadFvtResponse.isError]);


  useEffect(() => {
    designLead({ token: Token })
      .then(res => {
        setDesignLeadsData(res.data.data)
      })
  }, [addorRemoveDesignFavResponse.isSuccess]);

  useEffect(() => {
    if (designFavActive === 'All') {
      setFilteredDesignLeadsData(designLeadsData)
    } else {
      let temp = designLeadsData.filter(item => item.is_designer_fav === true)
      setFilteredDesignLeadsData(temp)
    }
  }, [designFavActive, designLeadsData])

  //ongoing projs
  useEffect(() => {
    ongoingProject({ token: Token })
      .then(res => {
        setOngoingProjectsData(res.data.data)
      })
  }, [addorRemoveOngoingFavResponse.isSuccess]);

  useEffect(() => {
    if (ongoingProjectsActive === 'All') {
      setFilteredOngoingProjectsData(ongoingProjectsData)
    } else {
      let temp = ongoingProjectsData.filter(item => item.is_designer_fav === true)
      setFilteredOngoingProjectsData(temp)
    }
  }, [ongoingProjectsActive, ongoingProjectsData])


  const [searchLeadValue, setSearchLeadValue] = useState("");

  // const handleSelect = (e) => {
  //   console.log(e);
  //   console.log(searchLeadValue);
  //   setSearchLeadValue(e.currentTarget.value);
  // };

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
                  className="outline-none p-2 rounded-md cursor-pointer mr-4"
                  onChange={(e) => {
                    if (e.target.value === "All") {
                      searchLead({ token: Token });
                    } else if (e.target.value === "Favourite") {
                      searchLeadFvt({ token: Token });
                    }
                    setSearchLeadValue(!e.currentTarget.value);
                    setSearchLeadFavActive(e.target.value)
                  }}
                >
                  <option value="All" className="p-2">
                    All
                  </option>
                  <option value="Favourite" className="p-2">
                    Favourite
                  </option>
                </select>
              </div>
              {/* {searchLeadResponse?.data?.data.map((SearchLeads) => ( */}
              {filteredSearchLeadsData?.length > 0 &&
                filteredSearchLeadsData.map((SearchLeads) => (
                  <div
                    className="px-5 pt-5 border-b border-[#CED4DA]"
                    key={SearchLeads.id}
                  >
                    <div className="flex justify-between items-center">
                      <h1 className="text-[#08090A] font-semibold text-2xl w-full">
                        {SearchLeads.name}
                      </h1>
                      {SearchLeads.is_designer_fav === true ? (
                        <button
                          onClick={() => {
                            addorRemoveFav({
                              token: Token,
                              id: SearchLeads.id,
                              task: "remove",
                            });
                          }}
                        >
                          <img src={OrangeStar} alt="OrangeStar" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            addorRemoveFav({
                              token: Token,
                              id: SearchLeads.id,
                              task: "add",
                            });
                          }}
                        >
                          <img src={OutlineStar} alt="OutlineStar" />
                        </button>
                      )}
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
                  onChange={e => setDesignFavActive(e.target.value)}
                >
                  <option value="All" className="p-2">
                    All
                  </option>
                  <option value="Favourite" className="p-2">
                    Favourite
                  </option>
                </select>
              </div>
              {filteredDesignLeadsData.length >= 1 && filteredDesignLeadsData.map((SearchLeads) => {
                return (
                  <div
                    className="px-5 pt-5 border-b border-[#CED4DA]"
                    key={SearchLeads.id}
                  >
                    <div className="flex justify-between items-center">
                      <h1 className="text-[#08090A] font-semibold text-2xl w-full">
                        {SearchLeads.name}
                      </h1>
                      {SearchLeads.is_designer_fav === true ? (
                        <button
                          onClick={() => {
                            addorRemoveDesignFav({
                              token: Token,
                              id: SearchLeads.id,
                              task: "remove",
                            });
                          }}
                        >
                          <img src={OrangeStar} alt="OrangeStar" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            addorRemoveDesignFav({
                              token: Token,
                              id: SearchLeads.id,
                              task: "add",
                            });
                          }}
                        >
                          <img src={OutlineStar} alt="OutlineStar" />
                        </button>
                      )}
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
                )

              })}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:px-[76px] mt-5 styled-scrollbar mb-10">
        <div className="w-full h-[500px] border border-[#000] overflow-auto">
          <div className="w-full ">
            <div className="bg-[#CED4DA] w-full sticky top-0 flex justify-between items-center">
              <h1 className="text-[#08090A] text-2xl font-medium px-5 py-2 lg:text-center w-full">
                Ongoing Projects
              </h1>
              <select
                name=""
                id=""
                className="outline-none p-2 rounded-md cursor-pointer mr-4"
                onChange={e => setOngoingProjectsActive(e.target.value)}
              >
                <option value="All" className="p-2">
                  All
                </option>
                <option value="Favourite" className="p-2">
                  Favourite
                </option>
              </select>
            </div>
            {filteredOngoingProjectsData.length >= 1 && filteredOngoingProjectsData.map((ongoingProject) => {
              return (
                <div
                  className="px-5 pt-5 border-b border-[#CED4DA]"
                  key={ongoingProject.id}
                >
                  <div className="flex justify-between items-center">
                    <h1 className="text-[#08090A] font-semibold text-2xl w-full">
                      {ongoingProject.project_name}
                    </h1>
                    {ongoingProject.is_designer_fav === true ? (
                      <button
                        onClick={() => {
                          addorRemoveOngoingFav({
                            token: Token,
                            id: ongoingProject.id,
                            task: "remove",
                          });
                        }}
                      >
                        <img src={OrangeStar} alt="OrangeStar" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          addorRemoveOngoingFav({
                            token: Token,
                            id: ongoingProject.id,
                            task: "add",
                          });
                        }}
                      >
                        <img src={OutlineStar} alt="OutlineStar" />
                      </button>
                    )}
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
              )

            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLeads;
