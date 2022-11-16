import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetProfessionalProfileQuery } from "../../app/services/userServices";
import Img1 from "../../assets/ProfessionalProfileIcons/Img1.svg";
import Img2 from "../../assets/ProfessionalProfileIcons/Img2.svg";
import Img3 from "../../assets/ProfessionalProfileIcons/Img3.svg";

const SingleProfile = () => {

   const { id } = useParams()
   const [fetchProfile, response] = useLazyGetProfessionalProfileQuery()
   const [profile, setProfile] = useState({})

   useEffect(() => {
      fetchProfile(id)
         .then(res => {
            setProfile(res.data)
         })
   }, [id])

   console.log(profile)
   const {
      work_profile_pic1, work_profile_pic2, work_profile_pic3, work_profile_pic4, work_profile_pic5,
      work_profile_accerditation1, work_profile_accerditation2, work_profile_accerditation3,
      work_profile_accerditation4, work_profile_accerditation5,
      work_video_link1, work_video_link2, work_video_link3, work_video_link4, work_video_link5,
      years_in_business,
      websites,
      portfolio_url,
      organisation_website,
      organisation_size,
      name_of_organisation,
      name_of_business
   } = profile

   return (
      <div className="lg:px-24 px-5 py-10">
         <h1 className="text-[32px] md:text-[64px] font-semibold text-primaryOrange">
            Vishal Jaiswal
         </h1>
         <div className="md:flex md:justify-between items-start pb-5">
            <div>
               <p className="text-[#08090A] font-medium text-xl md:text-2xl">
                  Location
               </p>
               <p className="text-[#08090A] font-normal text-[16px] md:text-xl md:pb-4">
                  10th Cross Road, Bengalore - India
               </p>
               <p className="text-[#08090A] font-medium text-xl md:text-2xl">
                  Pincode
               </p>
               <p className="text-[#08090A] font-normal text-[16px] md:text-xl md:pb-4">
                  655655
               </p>
               <p className="text-[#08090A] font-medium text-xl md:text-2xl">
                  Do you prefer meeting remotely
               </p>
               <p className="text-[#08090A] font-normal text-[16px] md:text-xl md:pb-4">
                  Yes
               </p>
            </div>
            <div>
               <p className="text-[#08090A] font-medium text-xl md:text-2xl">
                  Where do you serve your customers
               </p>
               <p className="text-[#08090A] font-normal text-[16px] md:text-xl md:pb-4">
                  Chennai
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
                  Indevidual Residence
               </p>
               <p className="text-[#08090A] font-medium text-xl md:text-2xl">
                  What kind of properties do you have expertise in?
               </p>
               <p className="text-[#08090A] font-normal text-[16px] md:text-xl md:pb-4">
                  Commercial Units
               </p>
            </div>
            <div>
               <p className="text-[#08090A] font-medium text-xl md:text-2xl">
                  What is your Budget Scale to work with?
               </p>
               <p className="text-[#08090A] font-normal text-[16px] md:text-xl md:pb-4">
                  Only High Profile
               </p>
            </div>
         </div>
         <div className="border border-[#CED4DA] p-4">
            <h1 className="text-[#08090A] font-medium text-xl md:text-2xl pb-4">
               Photos of past work
            </h1>

            <div className="border border-dashed  border-[#939CA3] p-4 md:flex flex-wrap">
               {
                  work_profile_pic1 !== null && <img
                     src={work_profile_pic1}
                     alt="Img-1"
                     className="max-w-xs md:mr-3 mt-3 md:mt-0 w-full md:w-auto"
                  />
               }
               {
                  work_profile_pic2 !== null && <img
                     src={work_profile_pic2}
                     alt="Img-1"
                     className="max-w-xs md:mr-3 mt-3 md:mt-0 w-full md:w-auto"
                  />
               }
               {
                  work_profile_pic3 !== null && <img
                     src={work_profile_pic3}
                     alt="Img-1"
                     className="max-w-xs md:mr-3 mt-3 md:mt-0 w-full md:w-auto"
                  />
               }
               {
                  work_profile_pic4 !== null && <img
                     src={work_profile_pic4}
                     alt="Img-1"
                     className="max-w-xs md:mr-3 mt-3 md:mt-0 w-full md:w-auto"
                  />
               }
               {
                  work_profile_pic5 !== null && <img
                     src={work_profile_pic5}
                     alt="Img-1"
                     className="max-w-xs md:mr-3 mt-3 md:mt-0 w-full md:w-auto"
                  />
               }

            </div>
         </div>
         <div className="border border-[#CED4DA] p-4 mt-5">
            <h1 className="text-[#08090A] font-medium text-xl md:text-2xl pb-4">
               Videos of past work
            </h1>
            <div className="border border-dashed  border-[#939CA3] p-4 md:flex flex-wrap">
               <img
                  src={Img1}
                  alt="Img-1"
                  className="md:mr-3 mt-3 md:mt-0 w-full md:w-auto"
                  onClick={() => work_video_link1 !== null && window.open(work_video_link1)}
               />
               <img
                  src={Img2}
                  alt="Img-2"
                  className="md:mr-3 mt-3 md:mt-0 w-full md:w-auto"
                  onClick={() => work_video_link2 !== null && window.open(work_video_link2)}
               />
               <img
                  src={Img3}
                  alt="Img-1"
                  className="md:mr-3 mt-3 md:mt-0 w-full md:w-auto"
                  onClick={() => work_video_link3 !== null && window.open(work_video_link3)}
               />
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
                  <p className="md:pr-20 text-[#939CA3] font-semibold text-sm ">
                     {work_profile_accerditation1 !== null && work_profile_accerditation1}
                  </p>
                  <p className="md:pr-20 text-[#939CA3] font-semibold text-sm pt-3 md:pt-0">
                     {work_profile_accerditation2 !== null && work_profile_accerditation2}
                  </p>
               </div>
               <div className="md:flex flex-wrap md:pt-3">
                  <p className="md:pr-20 text-[#939CA3] font-semibold text-sm pt-3 md:pt-0">
                     {work_profile_accerditation3 !== null && work_profile_accerditation3}
                  </p>
                  <p className="md:pr-20 text-[#939CA3] font-semibold text-sm pt-3 md:pt-0">
                     {work_profile_accerditation4 !== null && work_profile_accerditation4}
                  </p>
                  <p className="md:pr-20 text-[#939CA3] font-semibold text-sm pt-3 md:pt-0">
                     {work_profile_accerditation5 !== null && work_profile_accerditation5}
                  </p>
               </div>
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
                  {name_of_organisation}
               </p>
               <p className="text-[#08090A] font-medium text-xl md:text-2xl">
                  Years in business
               </p>
               <p className="text-[#08090A] font-normal text-[16px] md:text-xl md:pb-4">
                  {years_in_business} years
               </p>
               <p className="text-[#08090A] font-medium text-xl md:text-2xl">
                  Company Size
               </p>
               <p className="text-[#08090A] font-normal text-[16px] md:text-xl md:pb-4">
                  {organisation_size}
               </p>
            </div>
            <div>
               <p className="text-[#08090A] font-medium text-xl md:text-2xl">
                  Company website
               </p>
               <p className="text-[#08090A] font-normal text-[16px] md:text-xl md:pb-4">
                  {organisation_website}
               </p>
               <p className="text-[#08090A] font-medium text-xl md:text-2xl">
                  Description
               </p>
               <p className="text-[#08090A] font-normal text-[16px] md:text-xl md:pb-4">
                  Lorem ipsum is placeholder text commonly used in the <br /> graphic,
                  print, and publishing industries for previewing <br /> layouts and
                  visual mockups.
               </p>
            </div>
         </div>
      </div>
   );
};

export default SingleProfile;
