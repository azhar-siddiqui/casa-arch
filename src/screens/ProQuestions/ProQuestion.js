import React, { useState, useEffect } from "react";
import styles from "./ProQuestions.module.css";
import DeleteOrange from "../../assets/ProQuestionIcons/DeleteOrange.svg";
import UpArrow from "../../assets/ProQuestionIcons/up-arrow.svg";
import { CCheckbox } from "../../components/CircularCheckbox/CCheckbox";
import Up from "../../assets/up-icon.svg";
import { Popup } from "../../components/Popup/Popup";
import TypeOfClientProfessional from "../Frame/TypeOfClientForProfessionalFrame/TypeOfClientProfessional";
import SubscriptionFrame from "../Frame/SubscriptionFrame/SubscriptionFrame";
import { useProQuestionMutation } from "../../app/services/proQuestion";
import SuccessModal from "../../components/SuccessModal/SuccessModal";
import Swal from "sweetalert2";


const ProQuestion = () => {
  let Token = localStorage.getItem("Token");
  const [visibleSuccess, SetVisibleSuccess] = useState(false);
  const [visibleTypeOfClient, SetVisibleTypeOfClient] = useState(false);
  const [checkedName, setcheckedName] = useState("");
  const [fields, setFields] = useState({
    photo: [],
    video: [],
  });
  const [photos, setPhotos] = useState([])
  const [proQuestion, proQuestionresp] = useProQuestionMutation();

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

  function isUrlValid(userInput) {
    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (res == null)
      return false;
    else
      return true;
  }
  const websiteRegx = new RegExp("^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$", "g");

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
            type: "number",
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
            placeholder: "Enter Years in business",
            type: "number",
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

  useEffect(() => {
    if (proQuestionresp.isSuccess) {
      Swal.fire("Success!", "Saved Successfully!", "success");
      SetVisibleSuccess(true);
      setTimeout(() => {
        SetVisibleSuccess(false);
      }, 2000);
      SetVisibleTypeOfClient(true);
    } else if (proQuestionresp.isError) {
    }
  }, [proQuestionresp.isSuccess, proQuestionresp.isError]);

  const validateBeforeProceeding = () => {
    if (
      (fields.video.length > 0 &&
        fields.photo.length > 0 &&
        accr.length > 0 &&
        checkedName !== "" &&
        orgnization.companyName !== "" &&
        orgnization.companySize !== "" &&
        orgnization.yearOfBusiness !== "" &&
        orgnization.companyWebSite !== "" &&
        orgnization.companyDesc !== "") ||
      (freelancer.NameOfBusiness !== "" &&
        freelancer.Portfolio !== "" &&
        freelancer.Websites !== "")
    ) {
      return true;
    } else {
      !freelancer.NameOfBusiness === "" &&
        Swal.fire("Please Fill Name Of Business", "", "error");
      !freelancer.Portfolio === "" &&
        Swal.fire("Please Fill Portfolio", "", "error");
      !freelancer.Websites === "" &&
        Swal.fire("Please Fill Websites", "", "error");
      !orgnization.companyName === "" &&
        Swal.fire("Please Fill Company Name.", "", "error");
      !orgnization.companySize === "" &&
        Swal.fire("Please Fill Company Size", "", "error");
      !orgnization.yearOfBusiness === "" &&
        Swal.fire("Please Fill ", "", "error");
      !orgnization.companyWebSite === "" &&
        Swal.fire("Please Fill Year Of Business", "", "error");
      !orgnization.companyDesc === "" &&
        Swal.fire("Please Fill Company Desc", "", "error") &&
        !checkedName !== "" &&
        Swal.fire("Please select at least one of the following.", "", "error");
      !accr.length > 0 &&
        Swal.fire("Please select at least one Accreditation.", "", "error");
      !fields.video.length > 0 &&
        Swal.fire("Please upload at least one video.", "", "error");
      !fields.photo.length > 0 &&
        Swal.fire("Please add at least one photo.", "", "error");
      return false;
    }
  };

  const filterUndefined = val => val === undefined ? null : val
  const getorgdata = () => {
    const completeFormData = new FormData();
    const reqPayload = {
      desginer_profile_type: "",
      name_of_organization: filterUndefined(orgnization.companyName),
      years_in_business: filterUndefined(orgnization.yearOfBusiness),
      organization_website: filterUndefined(orgnization.companyWebSite),
      organisation_size: filterUndefined(orgnization.companySize),
      description: "",
      name_of_business: filterUndefined(freelancer.NameOfBusiness),
      website: filterUndefined(freelancer.Websites),
      portfolio_url: filterUndefined(freelancer.Portfolio),
      work_video_link1: filterUndefined(fields.video[0]),
      work_video_link2: filterUndefined(fields.video[1]),
      work_video_link3: filterUndefined(fields.video[2]),
      work_video_link4: filterUndefined(fields.video[3]),
      work_video_link5: filterUndefined(fields.video[4]),
      work_profile_pic1: filterUndefined(fields.photo[0]),
      work_profile_pic2: filterUndefined(fields.photo[1]),
      work_profile_pic3: filterUndefined(fields.photo[2]),
      work_profile_pic4: filterUndefined(fields.photo[3]),
      work_profile_pic5: filterUndefined(fields.photo[4]),
      work_profile_accerditation1: filterUndefined(accr[0]),
      work_profile_accerditation2: filterUndefined(accr[1]),
      work_profile_accerditation3: filterUndefined(accr[2]),
      work_profile_accerditation4: filterUndefined(accr[3]),
      work_profile_accerditation5: filterUndefined(accr[4]),
      work_profile_accerditation6: filterUndefined(accr[5]),
      work_profile_accerditation7: filterUndefined(accr[6]),
      work_profile_accerditation8: filterUndefined(accr[7]),
    };
    //added two 
    if (freelancer.Portfolio.length > 0) {
      if (isUrlValid(freelancer.Portfolio) === false) {
        // console.log(websiteRegx.test(freelancer.Portfolio));
        return Swal.fire("Please Enter Valid Portfolio", "", "error")
      }
    }
    if (freelancer.Websites.length > 0) {
      if (isUrlValid(freelancer.Websites) === false) {
        // console.log(websiteRegx.test(freelancer.Websites));
        return Swal.fire("Please Enter Valid Website", "", "error");
      }
    }
    if (orgnization.companyWebSite.length > 0) {
      if (isUrlValid(orgnization.companyWebSite) === false) {
        return Swal.fire("Please Enter Valid Company website", "", "error");
      }
    }

    completeFormData.append(
      "desginer_profile_type",
      reqPayload.desginer_profile_type
    );
    completeFormData.append(
      "name_of_organization",
      reqPayload.name_of_organization
    );
    console.log(reqPayload);

    completeFormData.append("years_in_business", reqPayload.years_in_business);
    completeFormData.append(
      "organization_website",
      reqPayload.organization_website
    );
    completeFormData.append("organisation_size", reqPayload.organisation_size);
    completeFormData.append("description", reqPayload.description);
    completeFormData.append("name_of_business", reqPayload.name_of_business);
    completeFormData.append("website", reqPayload.website);
    completeFormData.append("portfolio_url", reqPayload.portfolio_url);
    completeFormData.append("work_video_link1", reqPayload.work_video_link1);
    completeFormData.append("work_video_link2", reqPayload.work_video_link2);
    completeFormData.append("work_video_link3", reqPayload.work_video_link3);
    completeFormData.append("work_video_link4", reqPayload.work_video_link4);
    completeFormData.append("work_video_link5", reqPayload.work_video_link5);
    completeFormData.append("work_profile_pic1", reqPayload.work_profile_pic1);
    completeFormData.append("work_profile_pic2", reqPayload.work_profile_pic2);
    completeFormData.append("work_profile_pic3", reqPayload.work_profile_pic3);
    completeFormData.append("work_profile_pic4", reqPayload.work_profile_pic4);
    completeFormData.append("work_profile_pic5", reqPayload.work_profile_pic5);
    completeFormData.append(
      "work_profile_accerditation1",
      reqPayload.work_profile_accerditation1
    );
    completeFormData.append(
      "work_profile_accerditation2",
      reqPayload.work_profile_accerditation2
    );
    completeFormData.append(
      "work_profile_accerditation3",
      reqPayload.work_profile_accerditation3
    );
    completeFormData.append(
      "work_profile_accerditation4",
      reqPayload.work_profile_accerditation4
    );
    completeFormData.append(
      "work_profile_accerditation5",
      reqPayload.work_profile_accerditation5
    );
    completeFormData.append(
      "work_profile_accerditation6",
      reqPayload.work_profile_accerditation6
    );
    completeFormData.append(
      "work_profile_accerditation7",
      reqPayload.work_profile_accerditation7
    );
    completeFormData.append(
      "work_profile_accerditation8",
      reqPayload.work_profile_accerditation8
    );
    // Display the values
    for (const value of completeFormData.values()) {
      console.log(value);
    }
    if (validateBeforeProceeding()) {
      proQuestion({ completeFormData: completeFormData, Token: Token });
    }
  };
  const handleImgFileUpload = (e) => {
    // const { name } = e.target;
    console.log(photo);
    let fieldsCpy = { ...fields };
    fieldsCpy = {
      ...fields,
      [photo.name]: fields[photo.name].concat(
        e.target.files[0]
      ),
    };
    const maxPhotoLength = fieldsCpy[photo.name].length;

    if (maxPhotoLength <= 5) {
      setFields(fieldsCpy);
    } else {
      alert("failed");
      return;
    }
  };
  // console.log(fields);
  const handleAccrValue = (e) => {
    const { value, checked } = e.target;
    const checkIcon =
      e.currentTarget.parentNode.querySelector(".material-icons");

    if (checked) {
      setAccr((pre) => [...pre, value]);
      checkIcon.innerText = "check_circle_outline";
    } else {
      setAccr((pre) => {
        return [...pre.filter((accr) => accr !== value)];
      });
      checkIcon.innerText = "radio_button_unchecked";
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

  const handleDeleteVideo = (index) => {
    let fieldsCpy = { ...fields };
    fieldsCpy = {
      ...fields,
      [video.name]: fieldsCpy[video.name].filter(
        (photo, fieldIndex) => fieldIndex !== index
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
          {/* Photo Div Start */}
          <div className="border border-[#CED4DA] px-5 py-4 mt-5">
            <h1 className="font-semibold text-2xl">Photos of past work</h1>
            <p className="font-medium text-primaryLightGray pt-1 pb-4 text-base text-justify md:text-left d-none md:block">
              Showcase what your business can do for certain services, photos
              are often what customers look for first.Maximum 5 photos of the
              latest 5 projects can be uploaded.
            </p>
            <div
              className={`w-full min-h-[178px] py-4 px-5 border border-dashed  border-primaryLightGray flex flex-wrap items-center mt-3 md:mt-0${fields[photo.name].length === 0
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
                    accept="image/*"
                  />
                  {fields[photo.name].length !== 0 &&
                    fields[photo.name].map((currFile, index) => {
                      return (
                        <React.Fragment key={index}>
                          <div
                            className={`h-full w-full mr-3 md:mr-6 relative ${styles.uploaded_img}`}
                          >
                            <img
                              src={URL.createObjectURL(currFile)}
                              className={`opacity-100 block w-full h-full transition ease duration-500 hover:opacity-30 hover:cursor-pointer mb-2 md:mb-0`}
                              alt="img__"
                              accept="image/*"
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
          {/* Photo Div End */}

          {/* Video Div Start */}
          <div
            className={`sm:p-6 bg-white border border-[#CED4DA] px-5 py-4 mt-5 `}
          >
            <h1 className="font-semibold text-2xl">{video.title}</h1>
            <p className="font-medium text-primaryLightGray pt-1 pb-4 text-base text-justify md:text-left d-none md:block">
              {video.desc}
            </p>

            <div
              className={`w-full h-[178px] py-4 px-5 border border-dashed  border-primaryLightGray flex flex-wrap items-center mt-3 md:mt-0${fields[video.name].length === 0
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
                              handleDeleteVideo(i);
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
                    hidden
                  />
                  <label
                    htmlFor="Architecture"
                    className="ml-3 font-semibold text-primaryLightGray mr-10 flex items-center"
                  >
                    <span className="material-icons text-red-500 mr-2">
                      radio_button_unchecked
                    </span>
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
                    hidden
                  />
                  <label
                    htmlFor="ResidentialDesign"
                    className="ml-3 font-semibold text-primaryLightGray mr-10 flex items-center"
                  >
                    <span className="material-icons text-red-500 mr-2">
                      radio_button_unchecked
                    </span>
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
                    hidden
                  />
                  <label
                    htmlFor="Landscaping"
                    className="ml-3 font-semibold text-primaryLightGray mr-10 flex items-center"
                  >
                    <span className="material-icons text-red-500 mr-2">
                      radio_button_unchecked
                    </span>
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
                    hidden
                  />
                  <label
                    htmlFor="OfficeDesign"
                    className="ml-3 font-semibold text-primaryLightGray mr-10 flex items-center"
                  >
                    <span className="material-icons text-red-500 mr-2">
                      radio_button_unchecked
                    </span>{" "}
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
                    hidden
                  />
                  <label
                    htmlFor="CommercialDesign"
                    className="ml-3 font-semibold text-primaryLightGray mr-10 flex items-center"
                  >
                    <span className="material-icons text-red-500 mr-2">
                      radio_button_unchecked
                    </span>
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
                    hidden
                  />
                  <label
                    htmlFor="InteriorDesign"
                    className="ml-3 font-semibold text-primaryLightGray mr-10 flex items-center"
                  >
                    <span className="material-icons text-red-500 mr-2">
                      radio_button_unchecked
                    </span>{" "}
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
                    hidden
                  />
                  <label
                    htmlFor="RestaurantDesign"
                    className="ml-3 font-semibold text-primaryLightGray mr-10 flex items-center"
                  >
                    <span className="material-icons text-red-500 mr-2">
                      radio_button_unchecked
                    </span>{" "}
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
                    className={`${styles.options_label} ${checkedName === opt.name ? styles.options_label_open : ""
                      }`}
                  >
                    <CCheckbox checked={checkedName === opt.name} />
                    <p className="flex-1" >{opt.question}</p>
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
      {visibleSuccess && <SuccessModal massage={"Added Successfully"} />}
      {visibleTypeOfClient && (
        <TypeOfClientProfessional
          SetVisibleTypeOfClient={SetVisibleTypeOfClient}
        />
      )}

      {/* Modal Start */}
      {/* Modal End */}
      {/* <SubscriptionFrame /> */}
    </>
  );
};

export default ProQuestion;
