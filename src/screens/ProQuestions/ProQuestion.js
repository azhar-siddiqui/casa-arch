import React, { useState } from "react";
import styles from "./ProQuestions.module.css";
import DeleteOrange from "../../assets/ProQuestionIcons/DeleteOrange.svg";
import UpArrow from "../../assets/ProQuestionIcons/up-arrow.svg";
import { CCheckbox } from "../../components/CircularCheckbox/CCheckbox";
import Up from "../../assets/up-icon.svg";
import { Popup } from "../../components/Popup/Popup";
import TypeOfClientProfessional from "../Frame/TypeOfClientForProfessionalFrame/TypeOfClientProfessional";
import SubscriptionFrame from "../Frame/SubscriptionFrame/SubscriptionFrame";

const ProQuestion = () => {
  const [checkedName, setcheckedName] = useState("");
  const [fields, setFields] = useState({
    photo: [],
    video: [],
    accreditation: [],
  });

  const [orgnization, setOrgnization] = useState({
    companyName: "",
    companySize: "",
    yearOfBusiness: "",
    companyWebSite: "",
    companyDesc: "",
  });

  const [freelancer, setFreelancer] = useState({
    NameOfBusiness: "",
    Portfolio: "",
    Websites: "",
  });
  const [accr, setAccr] = useState([]);

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
            value: orgnization.companyName,
            Change: (e) => {
              setOrgnization({
                ...orgnization,
                companyName: e.target.value,
              });
            },
          },
          {
            name: "size",
            heading: "Company size",
            placeholder: "Enter company size",
            type: "text",
            value: orgnization.companySize,
            Change: (e) => {
              setOrgnization({
                ...orgnization,
                companySize: e.target.value,
              });
            },
          },
          {
            name: "years",
            heading: "Years in business",
            placeholder: "Enter name of the organization",
            type: "text",
            value: orgnization.yearOfBusiness,
            Change: (e) => {
              setOrgnization({
                ...orgnization,
                yearOfBusiness: e.target.value,
              });
            },
          },
          {
            name: "companyWeb",
            heading: "Company website",
            placeholder: "Enter company website",
            type: "text",
            value: orgnization.companyWebSite,
            Change: (e) => {
              setOrgnization({
                ...orgnization,
                companyWebSite: e.target.value,
              });
            },
          },
          {
            name: "companyDesc",
            heading: "Description of the company",
            placeholder: "Write your Project details...",
            type: "textarea",
            value: orgnization.companyDesc,
            Change: (e) => {
              setOrgnization({
                ...orgnization,
                companyDesc: e.target.value,
              });
            },
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
            value: freelancer.NameOfBusiness,
            Change: (e) => {
              setFreelancer({
                ...freelancer,
                NameOfBusiness: e.target.value,
              });
            },
          },
          {
            name: "portfolio",
            heading: "Portfolio",
            placeholder: "Enter your portfolio link",
            type: "text",
            value: freelancer.Portfolio,
            Change: (e) => {
              setFreelancer({
                ...freelancer,
                Portfolio: e.target.value,
              });
            },
          },
          {
            name: "websites",
            heading: "Websites",
            placeholder: "Enter your website link",
            type: "text",
            value: freelancer.Websites,
            Change: (e) => {
              setFreelancer({
                ...freelancer,
                Websites: e.target.value,
              });
            },
          },
        ],
      },
    ],
  };

  const [popup, setPopup] = useState({
    status: false,
    name: "",
    initialVal: "",
  });

  // const maxLengthfields = (maxLength, fieldsCpy) => {
  //   if (maxLength <= 5) {
  //     setFields(fieldsCpy);
  //   } else {
  //     alert("alert");
  //   }
  // };

  const getorgdata = () => {
    const data = { fields, orgnization, freelancer };
    console.log(data);
  };

  const handleImgFileUpload = (e) => {
    // const { name } = e.target;
    let fieldsCpy = { ...fields };
    console.log("fieldsCpy Img", fieldsCpy);
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

  const handleAccrValue = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAccr((pre) => [...pre, value]);
    } else {
      setAccr((pre) => {
        return [...pre.filter((accr) => accr !== value)];
      });
    }
  };

  const handleUploadPopup = (nam, value) => {
    if (nam !== "accreditation") {
      setFields({
        ...fields,
        [nam]: fields[nam].concat(value),
      });
    } else {
      setFields({
        ...fields,
        [nam]: value,
      });
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

  const handleDeleteVideo = (id) => {
    alert(id);
  };

  const handleCheckboxChange = (val) => {
    setcheckedName((prev) => {
      if (val === prev) {
        return "";
      } else return val;
    });
  };

  const changePopup = (val) => {
    if (val !== video.name) {
      setPopup({
        status: popup.status ? false : true,
        name: val,
        initialVal: fields[val] && fields[val].length === 0 ? "" : fields[val],
      });
    } else {
      setPopup({
        status: popup.status ? false : true,
        name: val,
        initialVal: "",
      });
    }
  };

  const getYtId = (link) => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = link.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };

  let popupDataVideo = {
    name: "video",
    heading: "Add YouTube/Google drive link",
    placeholder: "eg:https://www.youtube.com/watch?v=cuGPFq_GI10...",
    type: "text",
  };

  let popupDataAcc = {
    name: "accreditation",
    heading: " Name of accreditation",
    placeholder: "Enter your name of accrediation",
    type: "text",
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
    desc: "Showcase what your business can do for certain services, photos are often what customers look for first.Maximum 5 Videos of the latest 5 projects can be uploaded.",
    linkDesc: "Click to upload the videos",
    type: "file",
  };

  return (
    <>
      {popup.status && (
        <Popup
          initialVal={popup.initialVal}
          currData={popup.name === "video" ? popupDataVideo : popupDataAcc}
          closePopup={changePopup}
          changeData={handleUploadPopup}
        />
      )}
      <>
        <div className="lg:px-24 px-5 py-10 pb-2">
          <h1 className="font-semibold text-2xl md:text-4xl">
            Time to improve your profile
          </h1>
          <p className="font-medium text-primaryLightGray pt-1 text-base md:text-xl text-justify md:text-left">
            Make the best first impression with a great profile this is what
            customers will look at first when choosing which professional to
            hire.{" "}
          </p>
        </div>
        <div className="lg:px-24">
          <div className="border border-[#CED4DA] px-5 py-4 mt-5">
            <h1 className="font-semibold text-2xl">Photos of past work</h1>
            <p className="font-medium text-primaryLightGray pt-1 pb-4 text-base text-justify md:text-left d-none md:block">
              Showcase what your business can do for certain services, photos
              are often what customers look for first.Maximum 5 photos of the
              latest 5 projects can be uploaded.
            </p>
            <div
              className={`w-full min-h-[178px] py-4 px-5 border border-dashed  border-primaryLightGray flex flex-wrap items-center mt-3 md:mt-0${
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
                            className={`h-full w-full mr-3 md:mr-6 relative ${styles.uploaded_img}`}
                          >
                            <img
                              src={currFile}
                              className={`opacity-100 block w-full h-full transition ease duration-500 hover:opacity-30 hover:cursor-pointer mb-2 md:mb-0`}
                              alt="img__"
                            />
                            <div
                              className={`transition ease duration-500 opacity-0 text-center hover:opacity-100 ${styles.delete_icon_container}`}
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

          {/* Video Div Start */}
          <div
            className={`sm:p-6 bg-white border border-[#CED4DA] px-5 py-4 mt-5 `}
          >
            <h1 className="font-semibold text-2xl">{video.title}</h1>
            <p className="font-medium text-primaryLightGray pt-1 pb-4 text-base text-justify md:text-left d-none md:block">
              {video.desc}
            </p>

            <div
              className={`w-full h-[178px] py-4 px-5 border border-dashed  border-primaryLightGray flex flex-wrap items-center mt-3 md:mt-0${
                fields[video.name].length === 0
                  ? " justify-center"
                  : "justify-start "
              } `}
            >
              {fields[video.name].length !== 0 &&
                fields[video.name].map((currFile, i) => {
                  return (
                    <React.Fragment key={i}>
                      <div className={styles.uploaded_img}>
                        <img
                          src={`https://img.youtube.com/vi/${getYtId(
                            currFile
                          )}/mqdefault.jpg`}
                          alt="thumbnail"
                          className=""
                        />
                        <div
                          className={`transition ease duration-500 opacity-0 text-center hover:opacity-100 ${styles.delete_icon_container}`}
                        >
                          <img
                            src={DeleteOrange}
                            className={`w-24 cursor-pointer ${styles.delete_icon_img}`}
                            alt="delete_icon"
                            onClick={() => {
                              handleDeleteVideo(currFile.id);
                            }}
                          />
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              {fields[video.name].length === 0 ? (
                <>
                  <div className={styles.up_arrow_div}>
                    <img src={UpArrow} alt="up" />
                  </div>
                  <label
                    htmlFor={video.name}
                    className={styles.upload_inp_txt}
                    onClick={() => {
                      changePopup(video.name);
                    }}
                  >
                    {video.linkDesc}
                  </label>
                </>
              ) : (
                <div
                  onClick={() => {
                    changePopup(video.name);
                  }}
                  className={styles.upload_inp_txt}
                >
                  <div className={styles.add_icon}>
                    <p className={styles.plus_icon}>+</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Video Div End */}

          <div className="sm:p-6 bg-white border border-[#CED4DA] px-5 py-4 mt-5">
            <h1 className="font-semibold text-2xl">Accreditation</h1>
            <p className="font-medium text-primaryLightGray pt-1 pb-4 text-base text-justify md:text-left d-none md:block">
              Increase your chances of getting hired and boost customer
              confidence by adding your accreditation.
            </p>
            <div
              className={`w-full md:h-28 py-4 px-5 border border-dashed  border-primaryLightGray items-center mt-3 md:mt-0`}
            >
              <ul className="flex items-center flex-wrap">
                <li className="mt-4 md:mt-0 flex items-center">
                  <input
                    type="checkbox"
                    name="accreditationValue"
                    id="Architecture"
                    value="Architecture"
                    className="h-5 w-5 rounded-full cursor-pointer"
                    onChange={handleAccrValue}
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
                    name="accreditationValue"
                    id="ResidentialDesign"
                    value="Residential Design"
                    className="h-5 w-5 rounded-full cursor-pointer"
                    onChange={handleAccrValue}
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
                    name="accreditationValue"
                    id="Landscaping"
                    value="Landscaping"
                    className="h-5 w-5 rounded-full cursor-pointer"
                    onChange={handleAccrValue}
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
                    name="accreditationValue"
                    id="OfficeDesign"
                    value="Office Design"
                    className="h-5 w-5 rounded-full cursor-pointer"
                    onChange={handleAccrValue}
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
                    name="accreditationValue"
                    id="CommercialDesign"
                    value="Commercial Design"
                    className="h-5 w-5 rounded-full cursor-pointer"
                    onChange={handleAccrValue}
                  />
                  <label
                    htmlFor="CommercialDesign"
                    className="ml-3 font-semibold text-primaryLightGray mr-10"
                  >
                    Commercial Design
                  </label>
                </li>
                <li className="mt-4 md:mt-0 flex items-center">
                  <input
                    type="checkbox"
                    name="accreditationValue"
                    id="InteriorDesign"
                    value="Interior Design"
                    className="h-5 w-5 rounded-full cursor-pointer"
                    onChange={handleAccrValue}
                  />
                  <label
                    htmlFor="InteriorDesign"
                    className="ml-3 font-semibold text-primaryLightGray mr-10"
                  >
                    Interior Design
                  </label>
                </li>
                <li className="mt-4 md:mt-0 flex items-center">
                  <input
                    type="checkbox"
                    name="accreditationValue"
                    id="RestaurantDesign"
                    value="Restaurant Design"
                    className="h-5 w-5 rounded-full cursor-pointer"
                    onChange={handleAccrValue}
                  />
                  <label
                    htmlFor="RestaurantDesign"
                    className="ml-3 font-semibold text-primaryLightGray mr-10"
                  >
                    Restaurant Design
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <div
            className={`sm:p-6 bg-white border border-[#CED4DA] px-5 py-4 mt-5 ${styles.inputs}`}
          >
            <h1 className="font-semibold text-2xl">{options.title}</h1>
            <p className="font-medium text-primaryLightGray pt-1 pb-4 text-base text-justify md:text-left d-none md:block">
              {options.desc}
            </p>
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
                      {opt.content.map((inps, i) => {
                        return (
                          <div key={i}>
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
                                value={inps.value}
                                onChange={(e) => {
                                  inps.Change(e);
                                }}
                              />
                            ) : (
                              <textarea
                                name={inps.name}
                                id={styles.desc}
                                placeholder={inps.placeholder}
                                autoComplete="off"
                                value={inps.value}
                                onChange={(e) => {
                                  inps.Change(e);
                                }}
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

        <div className="flex justify-center my-5">
          <button
            className="h-11 w-44 bg-primaryOrange text-white text-center"
            onClick={getorgdata}
          >
            Save
          </button>
        </div>
      </>
      {/* Modal Start */}
      {/* <TypeOfClientProfessional /> */}
      {/* Modal End */}
      {/* <SubscriptionFrame /> */}
    </>
  );
};

export default ProQuestion;
