import OrangeStar from "../../assets/DashboardLeadsIcons/OrangeStar.svg";
import Location from "../../assets/DashboardLeadsIcons/Location.svg";
import Dot from "../../assets/DashboardLeadsIcons/Dot.svg";
import "./DashboardLeads.css";

const SearchLeads = [
  {
    id: "1",
    name: "Krishna Ahuja",
    designType: "Interior Design",
    email: "kartikeyan@gmail.com",
    pincode: "6400961 ",
    propertyType: "Commercial design ",
    numberOfRooms: "One room",
  },
  {
    id: "2",
    name: "Krishna Ahuja",
    designType: "Interior Design",
    email: "kartikeyan@gmail.com",
    pincode: "6400961 ",
    propertyType: "Commercial design ",
    numberOfRooms: "One room",
  },
  {
    id: "3",
    name: "Krishna Ahuja",
    designType: "Interior Design",
    email: "kartikeyan@gmail.com",
    pincode: "6400961 ",
    propertyType: "Commercial design ",
    numberOfRooms: "One room",
  },
];

const DashboardLeads = () => {
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
        <div className="lg:flex justify-between">
          <div className="w-full h-[544px]  border border-[#000] overflow-auto">
            <div className="w-full">
              <div className="bg-[#CED4DA] w-full sticky top-0 flex items-center justify-between">
                <h1 className="text-[#08090A] text-2xl font-medium px-5 py-2 lg:text-center w-full">
                  Search Leads
                </h1>
                <p>jjkdhf</p>
              </div>
              {SearchLeads.map((SearchLeads) => (
                <div
                  className="px-5 pt-5 border-b border-[#CED4DA]"
                  key={SearchLeads.id}
                >
                  <div className="flex justify-between items-center">
                    <h1 className="text-[#08090A] font-semibold text-2xl w-full">
                      Krishna Ahuja
                    </h1>
                    <img src={OrangeStar} alt="OrangeStar" />
                  </div>
                  <h2 className="text-[20px] font-normal">Interior Design</h2>
                  <p className="text-[#939CA3] text-base font-normal pt-1">
                    kartikeyan@gmail.com
                  </p>
                  <p className="text-[#939CA3] text-base font-normal pt-1">
                    Pincode - 6400961
                  </p>
                  <p className="text-[#939CA3] text-base font-normal pt-1">
                    Mobile No - 888888888
                  </p>
                  <p className="text-[#939CA3] text-base font-normal pt-1">
                    Property - Commercial design
                  </p>
                  <p className="text-[#939CA3] text-base font-normal py-2">
                    Number of rooms - One room
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
                <p>jhfjkhd</p>
              </div>
              {SearchLeads.map((SearchLeads) => (
                <div
                  className="px-5 pt-5 border-b border-[#CED4DA]"
                  key={SearchLeads.id}
                >
                  <div className="flex justify-between items-center">
                    <h1 className="text-[#08090A] font-semibold text-2xl w-full">
                      Krishna Ahuja
                    </h1>
                    <img src={OrangeStar} alt="OrangeStar" />
                  </div>
                  <h2 className="text-[20px] font-normal">Interior Design</h2>
                  <p className="text-[#939CA3] text-base font-normal pt-5">
                    Create new interiors/Commercial property/ <br /> Only one
                    room
                  </p>
                  <span className="flex items-center">
                    <img src={Location} alt="Location" />
                    <p className="text-[#939CA3] text-base font-normal pl-3 py-5">
                      Vinukonda, Guntur, Andhra Pradesh <br /> (Nationwide)
                    </p>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:px-[76px]  mt-5">
        <div className="w-full h-full border border-[#000] overflow-auto">
          <div className="w-full ">
            <div className="bg-[#CED4DA] w-full sticky top-0 flex justify-between items-center">
              <h1 className="text-[#08090A] text-2xl font-medium px-5 py-2 lg:text-center w-full">
                Ongoing Projects
              </h1>
              <p>jhfjkhd</p>
            </div>
            <div
              className="px-5 pt-5 border-b border-[#CED4DA]"
              key={SearchLeads.id}
            >
              <div className="flex justify-between items-center">
                <h1 className="text-[#08090A] font-semibold text-2xl w-full">
                  Project ABC
                </h1>
                <img src={OrangeStar} alt="OrangeStar" />
              </div>
              <span className="flex items-center">
                <h2 className="text-[20px] font-normal text-[#6D747A] pr-2">
                  Chennai
                </h2>
                <img src={Dot} alt="Dot" />
                <h2 className="text-[20px] font-normal text-[#6D747A] px-2">
                  25k - 50 k
                </h2>
                <img src={Dot} alt="Dot" />
                <h2 className="text-[20px] font-normal text-[#6D747A] pl-2">
                  Classic
                </h2>
              </span>
              <p className="text-[#939CA3] text-base font-normal pt-1 pb-3">
                Text description provided by the architects. nursery The
                Learning Tree in Romford, for leading childcare and education
                company, Storal Learning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLeads;
