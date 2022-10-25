import { useState } from "react";
import LandingImg from "../../assets/LandingPageIcons/Landing.svg";
import Vector from "../../assets/LandingPageIcons/Vector.svg";
import ButtonField from "../../components/ButtonsFields/ButtonField";
import SearchBar from "../../components/SearchBard/SearchBar";
import "./Landing.css";
import GetInTouch from "../Frame/GetInTouchFrame/GetInTouchFrame";
// import SuccessModal from "../../components/SuccessModal/SuccessModal";

const Landing = () => {
  const [searchTxt, setSearchTxt] = useState("");
  const [filterDropData, setFilterDropData] = useState([]);
  const [visibleGetInTouch, setVisibleGetInTouch] = useState(false);

  const dorpItem = [
    { id: 1, type: "Architecture" },
    { id: 2, type: "Interior" },
  ];

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
  return (
    <>
      <div className="grid grid-cols-1 grid-rows-7 lg:grid-cols-12 grid-flow-row-dense lg:px-24 px-5 py-10">
        <div className="row-start-1 row-end-2 lg:col-span-5 pb-3">
          <h1 className="text-primaryDark font-medium text-2xl lg:text-5xl ">
            We Help You To Make The Perfect CASA
          </h1>
          <p className="text-base text-primaryGray font-medium pt-4 text-justify lg:text-left">
            Interior design is an art and science of enhancing the interior of
            the building to achieve a healthier and more aesthetically
          </p>
        </div>
        <div className="relative lg:row-start-1 lg:row-end-7 lg:col-start-7 lg:col-end-12">
          <img src={LandingImg} alt="LandingImg" className="w-full" />
          <img
            src={Vector}
            alt="Vector"
            className="absolute hidden lg:block VectorImg"
          />
        </div>
        <div className="lg:row-start-2 lg:row-end-3 lg:col-span-5 text-center lg:text-left py-4 lg:py-0">
          <p className="text-base text-primaryGray font-semibold py-2 text-justify lg:text-left">
            What Services are you Looking for?
          </p>
          <SearchBar
            searchTxt={searchTxt}
            handleFilter={handleFilter}
            handleOnclick={handleOnclick}
            filterDropData={filterDropData}
            inputProp={{
              type: "text",
              placeholder: "Architecture, Interior Designing",
            }}
          />
          <h1 className="text-primaryDark pt-7 font-medium text-2xl lg:text-5xl text-left">
            Get In Touch
          </h1>

          <p className="text-base text-primaryGray font-medium text-justify py-4">
            Interior design is an art and science of enhancing the interior of
            the building to achieve a healthier and more aesthetically
          </p>

          <ButtonField
            children={"Get in Touch"}
            className={"bg-primaryOrange py-3 w-36 lg:w-40 "}
            onClick={() => {
              setVisibleGetInTouch(true);
            }}
          />
        </div>
      </div>
      <div className="text-center pt-0 sm:pt-5  lg:pt-14 mx-auto max-w-5xl mb-10 px-5 lg:px-0">
        <h1 className="text-primaryDark py-2 font-medium text-left md:text-center text-2xl lg:text-5xl">
          Pricing
        </h1>
        <p className="text-base text-primaryGray font-medium text-justify lg:text-left py-4 leading-5">
          From the moment you sign up, we'll send you leads for free. You only
          pay to contact customers that you think are the right fit for your
          business.From the moment you sign up, we'll send you leads for free.
          You only pay to contact customers that you think are the right fit for
          your business
        </p>
        <ButtonField
          children={"Casa Arch Premium"}
          className={"bg-primaryOrange py-3 px-4 mt-3 lt:mt-0"}
        />
        <h1 className="text-primaryDark pt-11 font-medium text-left md:text-center text-2xl lg:text-5xl">
          Discover
        </h1>
        <p className="text-base text-primaryGray font-medium text-justify lg:text-left py-4 leading-5">
          From the moment you sign up, we'll send you leads for free. You only
          pay to contact customers that you think are the right fit for your
          business.From the moment you sign up, we'll send you leads for free.
          You only pay to contact customers that you think are the right fit for
          your business. It was easy to use and I received sensible quotes. I
          had a professional visit the next day and he did an excellent job.
        </p>
        <ButtonField
          children={"Start Designing"}
          className={"bg-primaryOrange py-3 px-4 w-44 mt-3 lt:mt-0"}
        />
      </div>
      {visibleGetInTouch && (
        <GetInTouch setVisibleGetInTouch={setVisibleGetInTouch} />
      )}
      {/* <SuccessModal /> */}
    </>
  );
};

export default Landing;
