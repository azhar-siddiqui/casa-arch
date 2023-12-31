import React, { useEffect } from "react";
import { useProfessionalImagesMutation, useProfessionalProfileMutation } from "../../app/services/professionalOauthApiServices";
import Img1 from "../../assets/ProfessionalProfileIcons/Img1.svg";
import Img2 from "../../assets/ProfessionalProfileIcons/Img2.svg";
import Img3 from "../../assets/ProfessionalProfileIcons/Img3.svg";

const clientTypeList = [
  'Individual residents',
  'Commercial groups',
]
const professionalTypeList = [
  (0, 'Architecture'),
  (1, 'Interior Designer'),
]
const propertyTypeList = [
  'Residential Flats',
  'Commercial Units',
  'Farm Houses/Vills',
  'Professional Cubicles',
]
const budgetTypeList = [
  'Only High Profile (5L and above)',
  'Not defined'
]

const ProfessionalProfile = () => {
  let Token = localStorage.getItem("Token");
  const [professionalDashboard, professionalResponse] = useProfessionalProfileMutation();
  const [professionalImages, professionalImagesResp] = useProfessionalImagesMutation();
  console.log(professionalResponse?.data);

  useEffect(() => {
    professionalDashboard({ token: Token });
    // professionalImages({ token: Token })
    // .then(res => {
    //   console.log(res);
    // })
  }, []);

  const getYtId = (link) => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = link.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };
  if (professionalResponse.data === undefined) return
  return (
    <div className="lg:px-24 px-5 py-10">
      <h1 className="text-[32px] md:text-[64px] font-semibold text-primaryOrange">
        {professionalResponse?.data?.name
          ? professionalResponse?.data?.name
          : ""}
      </h1>
      <div className="md:flex md:justify-between items-start pb-5">
        <div>
          <p className="text-[#08090A] font-medium text-xl md:text-2xl">
            Location
          </p>
          <p className="text-[#08090A] font-normal text-[16px] md:text-xl md:pb-4">
            {professionalResponse?.data?.area}
          </p>
          <p className="text-[#08090A] font-medium text-xl md:text-2xl">
            Pincode
          </p>
          <p className="text-[#08090A] font-normal text-[16px] md:text-xl md:pb-4">
            {professionalResponse?.data?.pin_code}
          </p>
          <p className="text-[#08090A] font-medium text-xl md:text-2xl">
            Do you prefer meeting remotely
          </p>
          <p className="text-[#08090A] font-normal text-[16px] md:text-xl md:pb-4">
            {professionalResponse?.data?.is_meeting_remotely === true
              ? "Yes"
              : "No"}
          </p>
        </div>
        <div>
          <p className="text-[#08090A] font-medium text-xl md:text-2xl">
            Where do you serve your customers
          </p>
          <p className="text-[#08090A] font-normal text-[16px] md:text-xl md:pb-4">
            {professionalResponse?.data?.area}
          </p>
          <p className="text-[#08090A] font-medium text-xl md:text-2xl">
            What type of service you are looking for?
          </p>
          <p className="text-[#08090A] font-normal text-[16px] md:text-xl md:pb-4">
            Product Based
          </p>
        </div>
      </div>
      <hr />
      <div className="md:flex md:justify-between items-start py-5">
        <div>
          <p className="text-[#08090A] font-medium text-xl md:text-2xl">
            What type of clients are you looking for?
          </p>
          <p className="text-[#08090A] font-normal text-[16px] md:text-xl md:pb-4">
            {professionalResponse?.data?.client_type}
          </p>
          <p className="text-[#08090A] font-medium text-xl md:text-2xl">
            What kind of properties do you have expertise in?
          </p>
          <p className="text-[#08090A] font-normal text-[16px] md:text-xl md:pb-4">
            {professionalResponse?.data?.property_type}
          </p>
        </div>
        <div>
          <p className="text-[#08090A] font-medium text-xl md:text-2xl">
            What is your Budget Scale to work with?
          </p>
          <p className="text-[#08090A] font-normal text-[16px] md:text-xl md:pb-4">
            {professionalResponse?.data?.budget_type}
          </p>
        </div>
      </div>
      <div className="border border-[#CED4DA] p-4">
        <h1 className="text-[#08090A] font-medium text-xl md:text-2xl pb-4">
          Photos of past work
        </h1>
        <div className="border border-dashed  border-[#939CA3] p-4 md:flex flex-wrap">
         
          { professionalResponse?.data?.work_profile_pic1 &&
            <img
            src={professionalResponse?.data?.work_profile_pic1}
            alt="Img-1"
            className="md:mr-3 mt-3 md:mt-0 w-full md:w-[216px] md:h-[197px]"
          />
          }

          { professionalResponse?.data?.work_profile_pic2 &&
            <img
            src={professionalResponse?.data?.work_profile_pic2}
            alt="Img-2"
            className="md:mr-3 mt-3 md:mt-0 w-full md:w-[216px] md:h-[197px]"
          />
          }

          { professionalResponse?.data?.work_profile_pic3 &&
            <img
            src={professionalResponse?.data?.work_profile_pic3}
            alt="Img-1"
            className="md:mr-3 mt-3 md:mt-0 w-full md:w-[216px] md:h-[197px]"
          />
          }

          { professionalResponse?.data?.work_profile_pic4 &&
            <img
            src={professionalResponse?.data?.work_profile_pic4}
            alt="Img-2"
            className="md:mr-3 mt-3 md:mt-0 w-full md:w-[216px] md:h-[197px]"
          />
          }

          { professionalResponse?.data?.work_profile_pic5 &&
            <img
            src={professionalResponse?.data?.work_profile_pic5}
            alt="Img-1"
            className="md:mr-3 mt-3 md:mt-0 w-full md:w-[216px] md:h-[197px]"
          />
          }

        </div>
      </div>
      <div className="border border-[#CED4DA] p-4 mt-5">
        <h1 className="text-[#08090A] font-medium text-xl md:text-2xl pb-4">
          Videos of past work
        </h1>
        <div className="border border-dashed  border-[#939CA3] p-4 md:flex flex-wrap">
          {professionalResponse?.data?.work_video_link1 &&
            <div
              className="md:mr-3 mt-3 md:mt-0 w-full md:w-[216px] md:h-[197px]"
            >
              <img src={`https://img.youtube.com/vi/${getYtId(professionalResponse?.data?.work_video_link1)}/mqdefault.jpg`} 
              onClick={() => window.open(professionalResponse?.data?.work_video_link1)} />
            </div>
          }
          {professionalResponse?.data?.work_video_link2 &&
            <div
              className="md:mr-3 mt-3 md:mt-0 w-full md:w-[216px] md:h-[197px]"
            >
              <img src={`https://img.youtube.com/vi/${getYtId(professionalResponse?.data?.work_video_link2)}/mqdefault.jpg`}
               onClick={() => window.open(professionalResponse?.data?.work_video_link2)} />
            </div>
          }
          {professionalResponse?.data?.work_video_link3 &&
            <div
              className="md:mr-3 mt-3 md:mt-0 w-full md:w-[216px] md:h-[197px]"
            >
              <img src={`https://img.youtube.com/vi/${getYtId(professionalResponse?.data?.work_video_link3)}/mqdefault.jpg`}
               onClick={() => window.open(professionalResponse?.data?.work_video_link3)} />
            </div>
          }
          {professionalResponse?.data?.work_video_link4 &&
            <div
              className="md:mr-3 mt-3 md:mt-0 w-full md:w-[216px] md:h-[197px]"
            >
              <img src={`https://img.youtube.com/vi/${getYtId(professionalResponse?.data?.work_video_link4)}/mqdefault.jpg`}
               onClick={() => window.open(professionalResponse?.data?.work_video_link4)} />
            </div>
          }
          {professionalResponse?.data?.work_video_link5 &&
            <div
              className="md:mr-3 mt-3 md:mt-0 w-full md:w-[216px] md:h-[197px]"
            >
              <img src={`https://img.youtube.com/vi/${getYtId(professionalResponse?.data?.work_video_link5)}/mqdefault.jpg`}
               onClick={() => window.open(professionalResponse?.data?.work_video_link5)} />
            </div>
          }
          {/* <video
            controls
            className="md:mr-3 mt-3 md:mt-0 w-full md:w-[216px] md:h-[197px]"
          >
            <source
              src={professionalResponse?.data?.work_video_link2}
              type="video/mp4"
            ></source>
          </video>
          <video
            controls
            className="md:mr-3 mt-3 md:mt-0 w-full md:w-[216px] md:h-[197px]"
          >
            <source
              src={professionalResponse?.data?.work_video_link3}
              type="video/mp4"
            ></source>
          </video>
          <video
            controls
            className="md:mr-3 mt-3 md:mt-0 w-full md:w-[216px] md:h-[197px]"
          >
            <source
              src={professionalResponse?.data?.work_video_link4}
              type="video/mp4"
            ></source>
          </video>
          <video
            controls
            className="md:mr-3 mt-3 md:mt-0 w-full md:w-[216px] md:h-[197px]"
          >
            <source
              src={professionalResponse?.data?.work_video_link5}
              type="video/mp4"
            ></source>
          </video> */}
        </div>
      </div>
      <div className="border border-[#CED4DA] p-4 my-5">
        <h1 className="text-[#08090A] font-medium text-xl md:text-2xl pb-4">
          Accreditations
        </h1>
        <p className="hidden md:block font-medium text-[16px] text-[#939CA3]">
          Increase your chances of getting hired and boost customer confidence
          by adding your accreditations.
        </p>
        <div className="border border-dashed border-[#939CA3] p-4 mt-4 text-center md:text-left ">
          <div className="md:flex flex-wrap md:pb-3">
            {
              professionalResponse?.data?.work_profile_accerditation1 &&
              <p className="md:pr-20 text-[#939CA3] font-semibold text-sm ">
                {professionalResponse?.data?.work_profile_accerditation1}
              </p>
            }
            {
              professionalResponse?.data?.work_profile_accerditation2 &&
              <p className="md:pr-20 text-[#939CA3] font-semibold text-sm ">
                {professionalResponse?.data?.work_profile_accerditation2}
              </p>
            }
            {
              professionalResponse?.data?.work_profile_accerditation3 &&
              <p className="md:pr-20 text-[#939CA3] font-semibold text-sm ">
                {professionalResponse?.data?.work_profile_accerditation3}
              </p>
            }
            {
              professionalResponse?.data?.work_profile_accerditation4 &&
              <p className="md:pr-20 text-[#939CA3] font-semibold text-sm ">
                {professionalResponse?.data?.work_profile_accerditation4}
              </p>
            }
            {
              professionalResponse?.data?.work_profile_accerditation5 &&
              <p className="md:pr-20 text-[#939CA3] font-semibold text-sm ">
                {professionalResponse?.data?.work_profile_accerditation5}
              </p>
            }

            {/* <p className="md:pr-20 text-[#939CA3] font-semibold text-sm pt-3 md:pt-0">
              Residencial Design
            </p>
            <p className="md:pr-20 text-[#939CA3] font-semibold text-sm pt-3 md:pt-0">
              Landscaping
            </p>
            <p className="md:pr-20 text-[#939CA3] font-semibold text-sm pt-3 md:pt-0">
              Office Design
            </p> */}
          </div>
          {/* <div className="md:flex flex-wrap md:pt-3">
            <p className="md:pr-20 text-[#939CA3] font-semibold text-sm pt-3 md:pt-0">
              Comercial Design
            </p>
            <p className="md:pr-20 text-[#939CA3] font-semibold text-sm pt-3 md:pt-0">
              Interier Design
            </p>
            <p className="md:pr-20 text-[#939CA3] font-semibold text-sm pt-3 md:pt-0">
              Resturent Design
            </p>
          </div> */}
        </div>
      </div>
      <h1 className="text-[#08090A] font-medium text-xl md:text-2xl">
        Organisation
      </h1>
      <div className="md:flex md:justify-between items-start pb-5 mt-5">
        <div>
          <p className="text-[#08090A] font-medium text-xl md:text-2xl">
            Company
          </p>
          <p className="text-[#08090A] font-normal text-[16px] md:text-xl md:pb-4">
            {professionalResponse?.data?.company_name}
          </p>
          <p className="text-[#08090A] font-medium text-xl md:text-2xl">
            Years in business
          </p>
          <p className="text-[#08090A] font-normal text-[16px] md:text-xl md:pb-4">
            {professionalResponse?.data?.years_in_business} years
          </p>
          <p className="text-[#08090A] font-medium text-xl md:text-2xl">
            Company Size
          </p>
          <p className="text-[#08090A] font-normal text-[16px] md:text-xl md:pb-4">
            {professionalResponse?.data?.organisation_size} Employees
          </p>
        </div>
        <div>
          <p className="text-[#08090A] font-medium text-xl md:text-2xl">
            Company website
          </p>
          <p className="text-[#08090A] font-normal text-[16px] md:text-xl md:pb-4">
            {professionalResponse?.data?.organisation_website}
          </p>
          <p className="text-[#08090A] font-medium text-xl md:text-2xl">
            Description
          </p>
          <p className="text-[#08090A] font-normal text-[16px] md:text-xl md:pb-4">
            {professionalResponse?.data?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfile;
