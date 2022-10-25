import React, { useState } from "react";
import styles from "./ProQuestions.module.css";
import DeleteOrange from "../../assets/ProQuestionIcons/DeleteOrange.svg";
import UpArrow from "../../assets/ProQuestionIcons/up-arrow.svg";

const ProQuestion = () => {
  const [fields, setFields] = useState({
    photo: [],
  });

  const handleFileUpload = (e) => {
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
      alert("alert");
    }
    console.log(fieldsCpy);
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

  let photo = {
    name: "photo",
    title: "Photos of Past Work",
    desc: "Showcase what your business can do for certain services, photos are often what customers look for first.Maximum 5 photos of the latest 5 projects can be uploaded.",
    linkDesc: "Click to upload the photos",
    type: "file",
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
        <div className="border-2 px-5 py-4 mt-3">
          <h1 className="font-semibold text-2xl">Photos of past work</h1>
          <p className="font-medium text-primaryLightGray pt-1 pb-4 text-base text-justify md:text-left d-none md:block">
            Showcase what your business can do for certain services, photos are
            often what customers look for first.Maximum 5 photos of the latest 5
            projects can be uploaded.
          </p>
          <div
            className={`w-full md:h-44 py-4 px-5 border border-dashed  border-primaryLightGray flex flex-wrap items-center mt-3 md:mt-0${
              fields[photo.name].length === 0
                ? " justify-center"
                : "justify-start "
            } `}
          >
            {photo.name === "photo" && (
              <>
                <input
                  type={"file"}
                  onChange={handleFileUpload}
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
                <div className="inline-block mr-3">
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
      </div>
    </>
  );
};

export default ProQuestion;
