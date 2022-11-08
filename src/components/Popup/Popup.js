import React from "react";
import styles from "./Popup.module.css";
import Cross from "../../assets/ModalIcon/Cross.svg";
import { useState } from "react";
import { useEffect } from "react";
// import { validateYoutubeLink } from "../../services/generalServices";

const validateYoutubeLink = (link) => {
  var ytRegex =
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/i;
  if (!link.match(ytRegex)) {
    return false;
  } else return true;
};

export const Popup = ({ currData, closePopup, changeData, initialVal }) => {
  const [fields, setFields] = useState("");
  const [error, setError] = useState({
    err: false,
    mess: "",
  });

  useEffect(() => {
    setFields(initialVal);
  }, []);

  const handleChange = (e) => {
    let { value } = e.target;
    setFields(value);
  };

  const handleSubmit = () => {
    if (currData.name === "video") {
      if (!validateYoutubeLink(fields)) {
        setError({
          err: true,
          mess: "Please Enter a valid link",
        });
      } else {
        changeData(currData.name, fields);
        closePopup("");
      }
    } else {
      changeData(currData.name, fields);
      closePopup("");
    }
  };

  return (
    <div className={styles.main_div}>
      <div className={styles.popup}>
        <div className={styles.popup_body}>
          <div className={styles.cross} onClick={closePopup}>
            <img src={Cross} alt="cross" />
          </div>
          <h2 className={styles.question}>{currData.heading}</h2>

          <div className={styles.input_div}>
            {currData.imgLink && <img src={currData.imgLink} alt="location" />}
            <input
              type={`${currData.type}`}
              onChange={handleChange}
              value={fields}
              name={currData.name}
              placeholder={currData.placeholder}
              id={`${currData.name === "pincode" ? styles.loc_inp : ""}`}
              className={styles.text_inp}
            />
          </div>
          {error.err && <p className={styles.error}>&#9888; {error.mess}</p>}
          <div className={styles.bottom}>
            <p className={styles.back} onClick={closePopup}>
              Cancel
            </p>
            <button
              className={styles.btn}
              disabled={currData.name && fields.length === 0 ? true : false}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
