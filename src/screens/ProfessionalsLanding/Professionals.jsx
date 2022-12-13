import { useState } from "react";
import ProLandingImg from "../../assets/ProfessionalsImages/ProLandingImg.svg";
import SearchBar from "../../components/SearchBard/SearchBar";
import Frame1 from "../../assets/ProfessionalsImages/Frame1.svg";
import Frame2 from "../../assets/ProfessionalsImages/Frame2.svg";
import ProfessionalSignUp from "../Frame/ProfessionalSignUpFrame/ProfessionalSignUp";

const Professionals = () => {
  const [searchTxt, setSearchTxt] = useState("");
  const [filterDropData, setFilterDropData] = useState([]);
  const [visibleForProfessionalSignUp, setVisibleForProfessionalSignUp] =
    useState(false);
  const dorpItem = [
    { id: 1, type: "Architect" },
    { id: 2, type: "Interior" },
  ];

  const [successModalVisible , setSuccessModalVisible ] = useState(false)
  const [proVisible, setProVisible] = useState(false)
  const handleFilter = (e) => {
    const searchWord = e.target.value || e.currentTarget.textContent;
    setSearchTxt(searchWord);
    const newFilter = dorpItem.filter((value) => {
      return value.type.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilterDropData([]);
    } else {
      setFilterDropData(newFilter);
    }
  };

  const handleOnclick = (e) => {
    const searchWord = e.target.value || e.currentTarget.textContent;
    setSearchTxt(searchWord);
    setFilterDropData([]);
  };

  const handlePop = () => {
    setVisibleForProfessionalSignUp(true);
  };

  const FrameImg = [
    {
      id: 1,
      image: Frame1,
      width: 81,
    },
    {
      id: 2,
      image: Frame2,
      width: 105,
    },
    {
      id: 3,
      image: Frame1,
      width: 81,
    },
    {
      id: 4,
      image: Frame2,
      width: 105,
    },
    {
      id: 5,
      image: Frame1,
      width: 81,
    },
    {
      id: 6,
      image: Frame2,
      width: 105,
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 grid-rows-7 lg:grid-cols-12 grid-flow-row-dense lg:px-24 px-5 py-10  pt-8 md:pt-16">
        <div className="row-start-1 pb-3 row-end-2 lg:col-span-6">
          <h1 className="text-primaryDark font-medium text-2xl lg:text-5xl ">
            Make your first job and grow your business
          </h1>
          <p className="text-base text-primaryGray font-medium pt-4 text-justify lg:text-left">
            View opportunities in your area for free!
          </p>
        </div>
        <div className="relative lg:row-start-1 lg:row-end-7 lg:col-start-8 lg:col-end-13">
          <img src={ProLandingImg} alt="ProLandingImg" className="w-full" />
        </div>

        <div className="lg:row-start-2 lg:row-end-3 lg:col-span-5 text-center lg:text-left py-4 lg:py-0 lg:pt-9">
          <p className="text-base text-primaryGray font-semibold py-2 text-justify lg:text-left">
            What services do you offer?
          </p>
          <SearchBar
            searchTxt={searchTxt}
            handleFilter={handleFilter}
            handleOnclick={handleOnclick}
            filterDropData={filterDropData}
            inputProp={{
              type: "text",
              placeholder: "Architect, Interior Designing",
            }}
            onClick={handlePop}
            buttonClassName='h-9'
          />
        </div>
      </div>
      <div className="h-56 bg-primaryOrange w-full flex items-center lg:justify-evenly overflow-x-hidden lg:overflow-x-auto">
        {FrameImg?.map((item, i) => (
          <img src={item.image} alt="Frame1" key={i} />
        ))}
      </div>
      {visibleForProfessionalSignUp && (
        <ProfessionalSignUp
          setVisibleForProfessionalSignUp={setVisibleForProfessionalSignUp}
          setProVisible={setProVisible}
          setSuccessModalVisible={setSuccessModalVisible}
          refreshAfterSignup={true}
        />
      )}
    </>
  );
};

export default Professionals;
