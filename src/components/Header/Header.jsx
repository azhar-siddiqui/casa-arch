import React, { useState, useEffect } from "react";
import ButtonField from "../ButtonsFields/ButtonField";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import CasaLogo from "../../assets/HeaderIcon/CasaLogo.svg";
import MenuIcon from "../../assets/HeaderIcon/Menu.svg";
import { Formik } from "formik";
import * as Yup from "yup";
import InputField from "../InputField/InputField";
import Modal from "../Modal/Modal";
import EyeIcon from "../../assets/InputFieldIcons/EyeIcon.svg";
import BlankCheck from "../../assets/ModalIcon/blank.svg";
import Check from "../../assets/ModalIcon/Right.svg";
import ProfessionalLoginFrame from "../../screens/Frame/ProfessionalLoginFrame/ProfessionalLoginFrame";
import SelectLoginFrame from "../../screens/Frame/SelectLoginFrame/SelectLoginFrame";
import ProfessionalSignUp from "../../screens/Frame/ProfessionalSignUpFrame/ProfessionalSignUp";
import SuccessModal from "../../components/SuccessModal/SuccessModal";
import Loc from "../../assets/ModalIcon/loc.svg";
import { CCheckbox } from "../CircularCheckbox/CCheckbox";
import styles from "./Header.module.css";
import Corss from "../../assets/ModalIcon/Cross.svg";
// import SelectLoginFrame from "../../screens/Frame/SelectLoginFrame/SelectLoginFrame";

const stepper = [
  {
    step: 1,
    title: "Where do you serve your customers",
    placeholder: "Area,City,State...",
    type: "text",
    name: "text",
    value: "Aurangabad",
  },
  {
    step: 2,
    title: "Enter your pincode",
    type: "number",
    placeholder: "Pincode",
    name: "pincode",
    value: "431111",
  },
  {
    step: 3,
    title: "Do you prefer meeting remotely",
    type: "radio",
    preference: ["Yes", "No"],
    value: "Yes",
  },
];

const Header = () => {
  let [openMenu, setOpenMenu] = useState(false);
  const [visible, setVisible] = useState(false);
  const [professionalsAccSwitchingMsg, setProfessionalsAccSwitchingMsg] =
    useState(false);
  const [proButtonVisible, setProButtonVisible] = useState(true);
  const [visibleForProfessionalLogin, setVisibleForProfessionalLogin] =
    useState(false);
  const [visibleForProfessionalSignUp, setVisibleForProfessionalSignUp] =
    useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [proVisible, setProVisible] = useState(false);

  const location = useLocation();

  let LinksUrl = [
    { name: "HOME", link: "/" },
    { name: "SERVICE", link: "/" },
    { name: "BLOG", link: "/blogs" },
    { name: "ABOUT US", link: "/about" },
    { name: "CONTACT US", link: "/contact" },
  ];

  useEffect(() => {
    if (location.pathname === "/professionals") {
      setProButtonVisible(false);
      setProfessionalsAccSwitchingMsg(true);
      setTimeout(() => {
        setProfessionalsAccSwitchingMsg(false);
      }, 1000);
    } else {
      setProButtonVisible(true);
    }
  }, [location]);

  //  New Changes Start

  const [fields, setFields] = useState({
    loc: "",
    pincode: "",
    preference: "",
  });
  const [count, setCount] = useState(0);
  const [currData, setCurrData] = useState({
    heading: "",
    type: "",
    name: "",
    options: [],
    imgLink: "",
    placeholder: "",
  });

  const data = [
    {
      heading: "Where do you serve your customers",
      placeholder: "Area,City,State...",
      type: "text",
      name: "loc",
    },
    {
      heading: "Enter your pincode",
      type: "text",
      name: "pincode",
      placeholder: "Pincode",
      imgLink: Loc,
    },
    {
      heading: "Do you prefer meeting remotely",
      type: "checkbox",
      name: "preference",
      options: ["Yes", "No"],
    },
  ];

  useEffect(() => {
    setCurrData(data[count]);
  }, [count]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const navigate = useNavigate();

  const handleCheckboxChange = (name, val) => {
    // let { name } = e.target
    console.log("val", val);
    setFields({ ...fields, [name]: val });
    setProVisible(false);
    navigate("/professionals/questions");
  };

  const incCount = () => {
    if (count !== data.length - 1) {
      setCount(count + 1);
    } else {
      console.log(fields);
    }
  };

  const decCount = () => {
    if (count > 0) {
      setCount(count - 1);
    } else return;
  };

  // End

  return (
    <div className="shadow-md w-full relative bg-white z-40">
      <div className="lg:flex items-center justify-between bg-white py-4 lg:px-24 px-5">
        <NavLink to="/" className="flex items-center">
          <img src={CasaLogo} alt="Logo" />
        </NavLink>

        <div
          onClick={() => setOpenMenu(!openMenu)}
          className="text-3xl absolute right-8 top-6 cursor-pointer lg:hidden"
        >
          <img src={MenuIcon} alt="MenuIcon" />
        </div>

        <ul
          className={`lg:flex lg:items-center lg:pb-0 pb-12 absolute lg:static bg-white lg:z-auto z-[-1] left-0 w-full lg:w-auto lg:pl-0 pl-5 transition-all duration-500 ease-in ${
            openMenu ? "top-20 " : "top-[-490px]"
          }`}
        >
          {LinksUrl.map((link, i) => (
            <li key={i} className="lg:ml-8 text-sm lg:my-0 my-4">
              <NavLink
                to={link.link}
                className={`text-primaryDark font-medium text-sm hover:border-b-2 border-primaryOrange`}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          <li>
            <ButtonField
              className="lg:ml-8 hover:bg-primaryOrange border-solid border-2 border-primaryOrange py-2 px-6 h-11 ease-linear duration-300 text-primaryOrange hover:text-white lg:my-0 my-3 w-11/12 lg:w-32"
              onClick={() => {
                setVisible(!visible);
              }}
            >
              Login
            </ButtonField>
          </li>
          <li>
            {proButtonVisible && (
              <Link to="/professionals">
                <ButtonField className="lg:ml-8 bg-primaryOrange py-2 px-6 h-11 hover:border-solid border-2 border-primaryOrange hover:bg-white hover:text-primaryOrange lg:my-0 my-3 w-11/12 lg:w-auto">
                  Join as a Professional
                </ButtonField>
              </Link>
            )}
          </li>
        </ul>
      </div>

      {visible && (
        <SelectLoginFrame
          setVisible={setVisible}
          setProButtonVisible={setProButtonVisible}
          setVisibleForProfessionalLogin={setVisibleForProfessionalLogin}
        />
      )}

      {visibleForProfessionalLogin && (
        <ProfessionalLoginFrame
          setVisibleForProfessionalLogin={setVisibleForProfessionalLogin}
          setVisibleForProfessionalSignUp={setVisibleForProfessionalSignUp}
        />
      )}

      {visibleForProfessionalSignUp && (
        <ProfessionalSignUp
          setVisibleForProfessionalSignUp={setVisibleForProfessionalSignUp}
          setSuccessModalVisible={setSuccessModalVisible}
          setProVisible={setProVisible}
        />
      )}

      {professionalsAccSwitchingMsg && (
        <SuccessModal massage={"Switching to professional account"} />
      )}

      {successModalVisible && (
        <SuccessModal massage={"Professional User created SuccessFully"} />
      )}

      {proVisible && (
        <>
          <div className={styles.main_div}>
            <div className={styles.popup}>
              <div className={styles.popup_body}>
                <div
                  className={styles.cross}
                  onClick={() => {
                    setProVisible(false);
                  }}
                >
                  <img src={Corss} alt="cross" />
                </div>
                {
                  <>
                    <h2 className={styles.question}>{currData.heading}</h2>
                    <div className={styles.input_div}>
                      {currData.type === "text" || currData.type === "email" ? (
                        <>
                          {currData.imgLink && (
                            <img src={currData.imgLink} alt="location" />
                          )}
                          <input
                            type={`${currData.type}`}
                            onChange={handleChange}
                            value={fields[currData.name]}
                            name={currData.name}
                            placeholder={currData.placeholder}
                            id={`${
                              currData.name === "pincode" ? styles.loc_inp : ""
                            }`}
                            className={styles.text_inp}
                          />
                        </>
                      ) : (
                        <>
                          {currData.options.map((ele) => {
                            return (
                              <>
                                <input
                                  key={ele.indexOf}
                                  type="checkbox"
                                  aria-hidden
                                  name={currData.name}
                                  id={currData.name}
                                />

                                <label
                                  htmlFor={currData.name}
                                  onClick={() => {
                                    handleCheckboxChange(currData.name, ele);
                                  }}
                                  style={{
                                    borderColor: `${
                                      fields[currData.name] === ele
                                        ? "#F36C25"
                                        : ""
                                    }`,
                                  }}
                                  className={styles.checkbox_label}
                                >
                                  <CCheckbox
                                    checked={fields[currData.name] === ele}
                                  />
                                  <p
                                    className={styles.checkbox_text}
                                    style={{
                                      color: `${
                                        fields[currData.name] === ele
                                          ? ""
                                          : "#939CA3"
                                      }`,
                                    }}
                                  >
                                    {ele}
                                  </p>
                                </label>
                              </>
                            );
                          })}
                        </>
                      )}
                    </div>
                  </>
                }
                <div className={styles.bottom}>
                  <p className={styles.back} onClick={decCount}>
                    Back
                  </p>
                  <button
                    className={styles.btn}
                    onClick={incCount}
                    disabled={
                      currData.name && fields[`${currData.name}`].length === 0
                        ? true
                        : false
                    }
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
