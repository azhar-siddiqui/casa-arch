import React, { useState } from "react";
import { Popup } from "../../components/Popup/Popup";
import DeleteOrange from "../../assets/ProQuestion/DeleteOrange.svg";
import UpArrow from "../../assets/ProQuestion/up-arrow.svg";
import AddIcon from "../../assets/ProQuestion/AddFile.svg";

const ProQuestion = () => {
  const [fields, setFields] = useState({
    photo: [],
    video: [],
  });
  const [popup, setPopup] = useState({
    status: false,
    name: "",
    initialVal: "",
  });

  let fieldsCpy = { ...fields };

  //   Photo Function And Start
  let photo = {
    name: "photo",
    title: "Photos of Past Work",
    desc: "Showcase what your business can do for certain services, photos are often what customers look for first.Maximum 5 photos of the latest 5 projects can be uploaded.",
    linkDesc: "Click to upload the photos",
    type: "file",
  };
  const handleFileUpload = (e) => {
    console.log(fieldsCpy);
    fieldsCpy = {
      ...fields,
      [photo.name]: fields[photo.name].concat(
        URL.createObjectURL(e.target.files[0])
      ),
    };
    setFields(fieldsCpy);
  };
  const handleDeleteImg = (index) => {
    fieldsCpy = {
      ...fields,
      [photo.name]: fieldsCpy[photo.name].filter(
        (photo, fileIndex) => fileIndex !== index
      ),
    };
    setFields(fieldsCpy);
  };
  //   Photo Function And End

  //   Video Function And Logic Start
  const video = {
    name: "video",
    title: "Videos of Past Work",
    desc: "Add YouTube videos to showcase your work and expertise – videos of previous events for example..",
    linkDesc: "Click to upload your link.",
    type: "file",
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

  const getYtId = (link) => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = link.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };

  const handleDeleteVideo = () => {};

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
        <div className="px-5 lg:px-16 py-5 lg:pt-10">
          <h1 className="font-semibold text-2xl md:text-4xl">
            Time to improve your profile
          </h1>
          <p className="font-medium text-primaryLightGray pt-1 text-base md:text-xl text-justify md:text-left">
            Make the best first impression with a great profile this is what
            customers will look at first when choosing which professional to
            hire.
          </p>

          {/* Photo */}
        </div>
        {/* Photo Div Start */}
        <div className="border border-[#CED4DA] px-5 py-5 lg:py-8 lg:mx-16 mb-5">
          <h1 className="font-semibold text-2xl ">{photo.title}</h1>
          <p className="font-medium text-primaryLightGray pt-1 pb-4 text-base text-justify md:text-left d-none md:block">
            {photo.desc}
          </p>
          <div
            className={`${
              fields[photo.name].length === 0
                ? "lg:flex justify-center"
                : "lg:flex justify-start"
            } w-full lg:h-[178px] bg-white border border-dashed border-[#939ca3] items-center  p-5 mt-2`}
          >
            {photo.name === "photo" && (
              <>
                <input
                  type={"file"}
                  onChange={handleFileUpload}
                  className="absolute invisible cursor-pointer w-2/4"
                  id={photo.name}
                  name={photo.name}
                />
                {fields[photo.name].length !== 0 &&
                  fields[photo.name].map((currFile, index) => (
                    <React.Fragment key={index}>
                      <div className="h-full w-full lg:w-[160px] mr-6 relative">
                        <img
                          src={currFile}
                          alt={`${currFile}__img`}
                          className="opacity-100 w-full h-full hover:opacity-30"
                        />
                        <div className="opacity-0 absolute top-1/3 right-1/3 text-center hover:opacity-100">
                          <img
                            src={DeleteOrange}
                            alt={`${DeleteOrange} deleteIcon`}
                            className="w-[50px] cursor-pointer"
                            onClick={() => {
                              handleDeleteImg(index);
                            }}
                          />
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
              </>
            )}
            {fields[photo.name].length === 0 ? (
              <>
                <div className="inline-block mr-3">
                  <img src={UpArrow} alt="up" />
                </div>
                <label
                  htmlFor={photo.name}
                  className="font-semibold text-sm lg:text-base text-[#f36c25] cursor-pointer "
                >
                  {photo.linkDesc}
                </label>
              </>
            ) : fields[photo.name].length === 5 ? (
              ""
            ) : (
              <>
                <label
                  htmlFor={photo.name}
                  className="font-semibold text-base text-[#f36c25] cursor-pointer"
                >
                  <img src={AddIcon} alt="AddIcon" />
                </label>
              </>
            )}
          </div>
        </div>
        {/* Photo Div End */}

        {/* Video Div Start */}
        <div className="border border-[#CED4DA] px-5 py-5 lg:py-8 lg:mx-16 mb-5">
          <h1 className="font-semibold text-2xl ">{video.title}</h1>
          <p className="font-medium text-primaryLightGray pt-1 pb-4 text-base text-justify md:text-left d-none md:block">
            {video.desc}
          </p>

          <div
            className={`${
              fields[video.name].length === 0
                ? "lg:flex justify-center"
                : "lg:flex justify-start"
            } w-full lg:h-[178px] bg-white border border-dashed border-[#939ca3] items-center  p-5 mt-2`}
          >
            {fields[video.name].length !== 0 &&
              fields[video.name].map((currFile, index) => (
                <React.Fragment key={index}>
                  <div className="h-full w-full lg:w-[160px] mr-6 relative">
                    <img
                      src={`https://img.youtube.com/vi/${getYtId(
                        currFile
                      )}/mqdefault.jpg`}
                      alt="thumbnail"
                      className="opacity-100 w-full h-full hover:opacity-30"
                    />
                    <div className="opacity-0 absolute top-1/3 right-1/3 text-center hover:opacity-100">
                      <img
                        src={DeleteOrange}
                        alt={`${DeleteOrange} deleteIcon`}
                        className="w-[50px] cursor-pointer"
                        onClick={() => {
                          handleDeleteVideo(index);
                        }}
                      />
                    </div>
                  </div>
                </React.Fragment>
              ))}
            {fields[video.name].length === 0 ? (
              <>
                <div className="inline-block mr-3">
                  <img src={UpArrow} alt="up" />
                </div>
                <label
                  htmlFor={video.name}
                  className="font-semibold text-sm lg:text-base text-[#f36c25] cursor-pointer "
                  onClick={() => {
                    changePopup(video.name);
                  }}
                >
                  {video.linkDesc}
                </label>
              </>
            ) : (
              <>
                <div
                  onClick={() => {
                    changePopup(video.name);
                  }}
                >
                  <label
                    htmlFor={video.name}
                    className="font-semibold text-base text-[#f36c25] cursor-pointer"
                  >
                    <img src={AddIcon} alt="AddIcon" />
                  </label>
                </div>
              </>
            )}
          </div>
        </div>
        {/* Video Div End */}
      </>
    </>
  );
};

export default ProQuestion;
