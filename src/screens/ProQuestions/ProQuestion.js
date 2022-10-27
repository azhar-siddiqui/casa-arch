import React, { useState } from "react";
import styles from "./ProQuestions.module.css";
import DeleteOrange from "../../assets/ProQuestionIcons/DeleteOrange.svg";
import UpArrow from "../../assets/ProQuestionIcons/up-arrow.svg";
import { CCheckbox } from "../../components/CircularCheckbox/CCheckbox";
import Up from "../../assets/up-icon.svg";
const ProQuestion = () => {
  const [checkedName, setcheckedName] = useState("");
  const [fields, setFields] = useState({
    photo: [],
    video: [],
  });

  // const maxLengthfields = (maxLength, fieldsCpy) => {
  //   if (maxLength <= 5) {
  //     setFields(fieldsCpy);
  //   } else {
  //     alert("alert");
  //   }
  // };

  const handleImgFileUpload = (e) => {
    // const { name } = e.target;
    let fieldsCpy = { ...fields };
    console.log(fieldsCpy);
    fieldsCpy = {
      ...fields,
      [photo.name]: fields[photo.name].concat(
        URL.createObjectURL(e.target.files[0])
      ),
    };
    const maxPhotoLength = fieldsCpy[photo.name].length;

    if (maxPhotoLength <= 5) {
      setFields(fieldsCpy);
    } else {
      alert("faild");
      return;
    }
  };

  const handleVideoFileUpload = (e) => {
    // const { name } = e.target;
    let fieldsCpy = { ...fields };
    console.log(fieldsCpy);
    fieldsCpy = {
      ...fields,
      [video.name]: fields[video.name].concat(
        URL.createObjectURL(e.target.files[0])
      ),
    };
    const maxVideoLength = fieldsCpy[video.name].length;
    // maxLengthfields(maxVideoLength, fieldsCpy);
    if (maxVideoLength <= 5) {
      setFields(fieldsCpy);
    } else {
      alert("alert");
      return;
    }
  };

  const handleDeleteImg = (index) => {
    let fieldsCpy = { ...fields };
    fieldsCpy = {
      ...fields,
      [photo.name]: fieldsCpy[photo.name].filter(
        (photo, fieldIndex) => fieldIndex !== index
      ),
    };
    setFields(fieldsCpy);
  };

  const handleDeleteVideo = (index) => {
    let fieldsCpy = { ...fields };
    fieldsCpy = {
      ...fields,
      [video.name]: fieldsCpy[video.name].filter(
        (video, fieldIndex) => fieldIndex !== index
      ),
    };
    setFields(fieldsCpy);
  };

  const handleCheckboxChange = (val) => {
    setcheckedName((prev) => {
      if (val === prev) {
        return "";
      } else return val;
    });
  };

  let photo = {
    name: "photo",
    title: "Photos of Past Work",
    desc: "Showcase what your business can do for certain services, photos are often what customers look for first.Maximum 5 photos of the latest 5 projects can be uploaded.",
    linkDesc: "Click to upload the photos",
    type: "file",
  };

  let video = {
    name: "video",
    title: "Videos of Past Work",
    desc: "Showcase what your business can do for certain services, photos are often what customers look for first.Maximum 5 photos of the latest 5 projects can be uploaded.",
    linkDesc: "Click to upload the videos",
    type: "file",
  };

  const options = {
    name: "selection",
    title: "Select one of the following:",
    desc: "Increase your chances of getting hired and boost customer confidence by adding your accreditations.",
    linkDesc: "Click to upload your accrediations.",
    type: "checkbox",
    option: [
      {
        question: "Are you a part of an organization?",
        name: "organization",
        content: [
          {
            name: "name",
            heading: "Name of the company",
            placeholder: "Enter name of the company",
            type: "text",
          },
          {
            name: "size",
            heading: "Company size",
            placeholder: "Enter company size",
            type: "text",
          },
          {
            name: "years",
            heading: "Years in business",
            placeholder: "Enter name of the organization",
            type: "text",
          },
          {
            name: "companyWeb",
            heading: "Company website",
            placeholder: "Enter company website",
            type: "text",
          },
          {
            name: "companyDesc",
            heading: "Description of the company",
            placeholder: "Write your Project details...",
            type: "textarea",
          },
        ],
      },

      {
        question: "Are you an individual business owner/Freelancer?",
        name: "individual",
        content: [
          {
            name: "business",
            heading: "Name of your business",
            placeholder: "Enter name of your business",
            type: "text",
          },
          {
            name: "portfolio",
            heading: "Portfolio",
            placeholder: "Enter your portfolio link",
            type: "text",
          },
          {
            name: "websites",
            heading: "Websites",
            placeholder: "Enter your website link",
            type: "text",
          },
        ],
      },
    ],
  };

  return (
    <>
      <div className="lg:px-24 px-5 py-10 pb-2">
        <h1 className="font-semibold text-2xl md:text-4xl">
          Time to improve your profile
        </h1>
        <p className="font-medium text-primaryLightGray pt-1 text-base md:text-xl text-justify md:text-left">
          Make the best first impression with a great profile this is what
          customers will look at first when choosing which professional to hire.{" "}
        </p>
      </div>
      <div className="lg:px-24">
        <div className="border-2 px-5 py-4 mt-5">
          <h1 className="font-semibold text-2xl">Photos of past work</h1>
          <p className="font-medium text-primaryLightGray pt-1 pb-4 text-base text-justify md:text-left d-none md:block">
            Showcase what your business can do for certain services, photos are
            often what customers look for first.Maximum 5 photos of the latest 5
            projects can be uploaded.
          </p>
          <div
            className={`w-full min-h-min md:h-44 py-4 px-5 border border-dashed  border-primaryLightGray flex flex-wrap items-center mt-3 md:mt-0${
              fields[photo.name].length === 0
                ? " justify-center"
                : "justify-start "
            } `}
          >
            {photo.name === "photo" && (
              <>
                <input
                  type={"file"}
                  onChange={handleImgFileUpload}
                  className={`absolute invisible cursor-pointer text-base md:text-lg`}
                  id={photo.name}
                  name={photo.name}
                />
                {fields[photo.name].length !== 0 &&
                  fields[photo.name].map((currFile, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div
                          className={`h-full w-24 md:w-36 mr-3 md:mr-6 relative ${styles.uploaded_img}`}
                        >
                          <img
                            src={currFile}
                            className={`opacity-100 block w-full h-full transition ease duration-500 hover:opacity-30 hover:cursor-pointer mb-2 md:mb-0`}
                            alt="img__"
                          />
                          <div
                            className={`transition ease duration-500 opacity-0 absolute top-2/4 left-2/4 text-center hover:opacity-100 ${styles.delete_icon_container}`}
                          >
                            <img
                              src={DeleteOrange}
                              className={`w-24 cursor-pointer ${styles.delete_icon_img}`}
                              alt="delete_icon"
                              onClick={() => {
                                handleDeleteImg(index);
                              }}
                            />
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
              </>
            )}
            {fields[photo.name].length === 0 ? (
              <>
                <div className={`inline-block mr-3`}>
                  <img src={UpArrow} alt="up" />
                </div>
                <label
                  htmlFor={photo.name}
                  className={`font-semibold text-base text-primaryOrange cursor-pointer`}
                >
                  {photo.linkDesc}
                </label>
              </>
            ) : (
              <label
                htmlFor={photo.name}
                className={`font-semibold text-base text-primaryOrange cursor-pointer `}
              >
                <div className={`${styles.add_icon}`}>
                  <p className={` ${styles.plus_icon}`}>+</p>
                </div>
              </label>
            )}
          </div>
        </div>
        <div className="border-2 px-5 py-4 mt-5">
          <h1 className="font-semibold text-2xl">Videos of Past Work</h1>
          <p className="font-medium text-primaryLightGray pt-1 pb-4 text-base text-justify md:text-left d-none md:block">
            Showcase what your business can do for certain services, videos are
            often what customers look for first.Maximum 5 videos of the latest 5
            projects can be uploaded.
          </p>
          <div
            className={`w-full md:h-44 py-4 px-5 border border-dashed  border-primaryLightGray flex flex-wrap items-center mt-3 md:mt-0${
              fields[video.name].length === 0
                ? " justify-center"
                : "justify-start "
            } `}
          >
            {video.name === "video" && (
              <>
                <input
                  type={"file"}
                  onChange={handleVideoFileUpload}
                  className={`absolute invisible cursor-pointer text-base md:text-lg`}
                  id={video.name}
                  name={video.name}
                />
                {fields[video.name].length !== 0 &&
                  fields[video.name].map((currFile, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div
                          className={`h-full w-24 md:w-36 mr-3 md:mr-6 relative ${styles.uploaded_img}`}
                        >
                          <img
                            src={currFile}
                            className={`opacity-100 block w-full h-full transition ease duration-500 hover:opacity-30 hover:cursor-pointer mb-2 md:mb-0`}
                            alt="img__"
                          />
                          <div
                            className={`transition ease duration-500 opacity-0 absolute top-2/4 left-2/4 text-center hover:opacity-100 ${styles.delete_icon_container}`}
                          >
                            <img
                              src={DeleteOrange}
                              className={`w-24 cursor-pointer ${styles.delete_icon_img}`}
                              alt="delete_icon"
                              onClick={() => {
                                handleDeleteVideo(index);
                              }}
                            />
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
              </>
            )}
            {fields[video.name].length === 0 ? (
              <>
                <div className="inline-block mr-3">
                  <img src={UpArrow} alt="up" />
                </div>
                <label
                  htmlFor={video.name}
                  className={`font-semibold text-base text-primaryOrange cursor-pointer`}
                >
                  {video.linkDesc}
                </label>
              </>
            ) : (
              <label
                htmlFor={video.name}
                className={`font-semibold text-base text-primaryOrange cursor-pointer `}
              >
                <div className={`${styles.add_icon}`}>
                  <p className={` ${styles.plus_icon}`}>+</p>
                </div>
              </label>
            )}
          </div>
        </div>
        <div className="border-2 px-5 py-4 mt-5">
          <h1 className="font-semibold text-2xl">Accreditations</h1>
          <p className="font-medium text-primaryLightGray pt-1 pb-4 text-base text-justify md:text-left d-none md:block">
            Increase your chances of getting hired and boost customer confidence
            by adding your accreditations.
          </p>
          <div
            className={`w-full md:h-28 py-4 px-5 border border-dashed  border-primaryLightGray items-center mt-3 md:mt-0`}
          >
            <ul className="flex items-center flex-wrap">
              <li className="mt-4 md:mt-0 flex items-center">
                <input
                  type="checkbox"
                  name="Architecture"
                  id="Architecture"
                  className="h-5 w-5 rounded-full cursor-pointer"
                />
                <label
                  htmlFor="Architecture"
                  className="ml-3 font-semibold text-primaryLightGray mr-10"
                >
                  Architecture
                </label>
              </li>
              <li className="mt-4 md:mt-0 flex items-center">
                <input
                  type="checkbox"
                  name="ResidentialDesign"
                  id="ResidentialDesign"
                  className="h-5 w-5 rounded-full cursor-pointer"
                />
                <label
                  htmlFor="ResidentialDesign"
                  className="ml-3 font-semibold text-primaryLightGray mr-10"
                >
                  Residential Design
                </label>
              </li>
              <li className="mt-4 md:mt-0 flex items-center">
                <input
                  type="checkbox"
                  name="Landscaping"
                  id="Landscaping"
                  className="h-5 w-5 rounded-full cursor-pointer"
                />
                <label
                  htmlFor="Landscaping"
                  className="ml-3 font-semibold text-primaryLightGray mr-10"
                >
                  Landscaping
                </label>
              </li>
              <li className="mt-4 md:mt-0 flex items-center">
                <input
                  type="checkbox"
                  name="OfficeDesign"
                  id="OfficeDesign"
                  className="h-5 w-5 rounded-full cursor-pointer"
                />
                <label
                  htmlFor="OfficeDesign"
                  className="ml-3 font-semibold text-primaryLightGray mr-10"
                >
                  Office Design
                </label>
              </li>
            </ul>
            <ul className="flex items-center flex-wrap mt-0 md:mt-8">
              <li className="mt-4 md:mt-0 flex items-center">
                <input
                  type="checkbox"
                  name="Architecture"
                  id="Architecture"
                  className="h-5 w-5 rounded-full cursor-pointer"
                />
                <label
                  htmlFor="Architecture"
                  className="ml-3 font-semibold text-primaryLightGray mr-10"
                >
                  Architecture
                </label>
              </li>
              <li className="mt-4 md:mt-0 flex items-center">
                <input
                  type="checkbox"
                  name="ResidentialDesign"
                  id="ResidentialDesign"
                  className="h-5 w-5 rounded-full cursor-pointer"
                />
                <label
                  htmlFor="ResidentialDesign"
                  className="ml-3 font-semibold text-primaryLightGray mr-10"
                >
                  Residential Design
                </label>
              </li>
              <li className="mt-4 md:mt-0 flex items-center">
                <input
                  type="checkbox"
                  name="Landscaping"
                  id="Landscaping"
                  className="h-5 w-5 rounded-full cursor-pointer"
                />
                <label
                  htmlFor="Landscaping"
                  className="ml-3 font-semibold text-primaryLightGray mr-10"
                >
                  Landscaping
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div className={`mt-5 ${styles.inputs}`}>
          <h2>{options.title}</h2>
          <p>{options.desc}</p>
          {options.option.map((opt, i) => {
            return (
              <React.Fragment key={i}>
                <input
                  className={styles.hidden_checkbox}
                  type="checkbox"
                  aria-hidden
                  name={opt.name}
                  id={opt.name}
                  onChange={() => {
                    handleCheckboxChange(opt.name);
                  }}
                  autoComplete="off"
                />
                <label
                  htmlFor={opt.name}
                  className={`${styles.options_label} ${
                    checkedName === opt.name ? styles.options_label_open : ""
                  }`}
                >
                  <CCheckbox checked={checkedName === opt.name} />
                  <p>{opt.question}</p>
                  {checkedName === opt.name && (
                    <div className={styles.up_icon}>
                      <img src={Up} alt="close" />
                    </div>
                  )}
                </label>
                {checkedName === opt.name && (
                  <div className={styles.exp_div}>
                    {opt.content.map((inps) => {
                      return (
                        <div key={inps.name}>
                          <label
                            className={styles.exp_label}
                            htmlFor={inps.name}
                          >
                            {inps.heading}
                          </label>
                          {inps.type !== "textarea" ? (
                            <input
                              className={styles.exp_inp}
                              type={inps.type}
                              placeholder={inps.placeholder}
                              id={inps.name}
                              name={inps.name}
                              autoComplete="off"
                            />
                          ) : (
                            <textarea
                              name={inps.name}
                              id={styles.desc}
                              placeholder={inps.placeholder}
                              autoComplete="off"
                            ></textarea>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center mb-5">
        <button
          className="h-11 w-44 bg-primaryOrange text-white text-center"
          onClick={() => alert("data")}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default ProQuestion;
