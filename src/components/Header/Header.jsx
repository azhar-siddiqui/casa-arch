import React, { useState, useEffect } from "react";
import ButtonField from "../ButtonsFields/ButtonField";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import CasaLogo from "../../assets/HeaderIcon/CasaLogo.svg";
import MenuIcon from "../../assets/HeaderIcon/Menu.svg";
import { Formik } from "formik";
import * as Yup from "yup";
import InputField from "../InputField/InputField";
import Modal from "../Modal/Modal";
// import EyeIcon from "../../assets/InputFieldIcons/EyeIcon.svg";
// import BlankCheck from "../../assets/ModalIcon/blank.svg";
// import Check from "../../assets/ModalIcon/Right.svg";
import ProfessionalLoginFrame from "../../screens/Frame/ProfessionalLoginFrame/ProfessionalLoginFrame";
import SelectLoginFrame from "../../screens/Frame/SelectLoginFrame/SelectLoginFrame";
import ProfessionalSignUp from "../../screens/Frame/ProfessionalSignUpFrame/ProfessionalSignUp";
import InputRadio from "../InputRadio/inputRadio";
import UserSignUpFrame from "../../screens/Frame/UserSignupFrame/UserSignUpFrame";
import {
  useLazyGetQuestionsQuery,
  useLazyGetUserIdQuery,
  useSubmitSteppersMutation,
} from "../../app/services/userServices";
import { useDispatch, useSelector } from "react-redux";
import {
  updateIsLoggedIn,
  updateSelectLoginFrameActive,
  updateUserType,
  updateVisibleForUserLogin,
} from "../../app/slices/user";

import SuccessModal from "../../components/SuccessModal/SuccessModal";
import Loc from "../../assets/ModalIcon/loc.svg";
import { CCheckbox } from "../CircularCheckbox/CCheckbox";
import styles from "./Header.module.css";
import Corss from "../../assets/ModalIcon/Cross.svg";
import {
  useProfessionalAreaCheckServiceMutation,
  useProfessionalServiceMutation,
} from "../../app/services/professionalServices";
import UserLoginFrame from "../../screens/Frame/UserLoginFrame";
import { updateIsStepperVisible } from "../../app/slices/userStepper";
import ForgotPasswordFrame from "../../screens/Frame/ForgotPasswordFrame/ForgotPasswordFrame";
import OtpVerificationFrame from "../../screens/Frame/OtpVerificationFrame/OtpVerificationFrame";
import ResetPasswordFrame from "../../screens/Frame/ResetPasswordFrame/ResetPasswordFrame";
import PremiumButtonLogin from "../../screens/Frame/premiumButtonLogin/PremiumButtonLogin";
import {
  updateVisibleForPremiumButtonLogin,
  updateVisibleForSubscriptionModal,
} from "../../app/slices/professionalauthSlice";
import Subscription from "../../screens/Frame/Subscription/Subscription";
import { useProfessionalSignUpPatchMutation } from "../../app/services/professionalOauthApiServices";
import StartDesignFrame from "../../screens/Frame/StartDesignFrame/StartDesignFrame";

// import SelectLoginFrame from "../../screens/Frame/SelectLoginFrame/SelectLoginFrame";

const initialValuesUserStepper = {
  pincode: "",
  service: "Interior Design",
  property: "Residential House",
  rooms: "More than one room",
  email: "",
};

const userStepperSchema = Yup.object({
  pincode: Yup.string().required("This field is required."),
  service: Yup.string().required("This field is required."),
  property: Yup.string().required("This field is required."),
  rooms: Yup.string().required("This field is required."),
  email: Yup.string().required("This field is required."),
});

const userStepper = [
  {
    step: 2,
    title: "Enter your pincode",
    type: "number",
    placeholder: "Pincode",
    name: "pincode",
    value: 0,
  },
  {
    step: 2,
    title: "What type of service your’e looking for?",
    type: "radio",
    name: "service",
    preference: ["Interior Design", "Architecture Design"],
  },
  {
    step: 3,
    title: "What kind of property is this?",
    type: "radio",
    name: "property",
    preference: [
      "Residential House",
      "Commercial Property",
      "Residential Flat",
    ],
  },
  {
    step: 4,
    title: "Which rooms need designing?",
    type: "radio",
    name: "rooms",
    preference: ["Only one room", "More than one room", "Complete property"],
  },
  {
    step: 5,
    title: "Enter your email for sending quotation.",
    type: "text",
    name: "email",
    placeholder: "Email address",
  },
];

const Header = () => {
  const [professionalService, professionalServiceResponse] =
    useProfessionalServiceMutation();
  const [professionalAreaCheckService, ProfessionalAreaCheckServiceResponse] =
    useProfessionalAreaCheckServiceMutation();
  // const [professionalSignUpPatch, professionalSignUpPatchResponse] =
  //   useProfessionalSignUpPatchMutation();
  const navigate = useNavigate();
  let [openMenu, setOpenMenu] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentStepValue, setCurrentStepValue] = useState(userStepper);
  const [currentStep, setCurrentStep] = useState(0);
  // normal or professional
  const [currentStepper, setCurrentStepper] = useState("normal"); //can be 'normal' or 'professional' - used to know which steppers (professional/normal) to be displayed
  const [dashboardButtonVisible, setDashboardButtonVisible] = useState(false);
  const [professionalsAccSwitchingMsg, setProfessionalsAccSwitchingMsg] =
    useState(false);
  const [proButtonVisible, setProButtonVisible] = useState(true);
  const [visibleForProfessionalLogin, setVisibleForProfessionalLogin] =
    useState(false);
  const [visibleForProfessionalSignUp, setVisibleForProfessionalSignUp] =
    useState(false);
  const [visibleForUserSignUp, setVisibleForUserSignUp] = useState(false);

  // const [visibleForUserLogin, setVisibleForUserLogin] = useState(false)
  const { visibleForUserLogin } = useSelector((state) => state.user);
  const [visibleForForgotPassword, setvisibleForForgotPassword] =
    useState(false);
  const [visibleForOtpVerification, setVisibleForOtpVerification] =
    useState(false);
  const [visibleForResetPassword, setVisibleForResetPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  // const [stepperVisible, setStepperVisible] = useState(false)
  const { isStepperVisible } = useSelector((state) => state.userStepper);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [forgotPasswordSuccessModal, setForgotPasswordSuccessModal] =
    useState(false);

  const [proVisible, setProVisible] = useState(false);
  const [logoutSucces, setLogoutSuccess] = useState(false);
  const [DetailsVisible, setDetailsVisible] = useState(false);
  const location = useLocation();
  const [submitNormalUserSteppers, submittedSteppersData] =
    useSubmitSteppersMutation();
  const { isLoggedIn, userType, userId, selectLoginFrameActive } = useSelector(
    (state) => state.user
  );
  const [successfulLoginModal, setSuccessfulLoginModal] = useState(false);
  //to determine how forgot password.. customer or professional
  const [customerForgotPassword, setCustomerForgotPassword] = useState(false);
  // login frame when premium button click
  const { visibleForPremiumButtonLogin, visibleForSubscriptionModal } =
    useSelector((state) => state.professional);
  const setVisibleForPremiumButtonLogin = (bool) => {
    dispatch(updateVisibleForPremiumButtonLogin(bool));
  };

  // subscription modal
  const setVisibleForSubscription = (bool) => {
    dispatch(updateVisibleForSubscriptionModal(bool));
  };

  useEffect(() => {
    if (isLoggedIn) {
      setSuccessfulLoginModal(true);
      setTimeout(() => {
        setSuccessfulLoginModal(false);
      }, 3000);
    }
  }, [isLoggedIn]);

  let Token = localStorage.getItem("Token");
  useEffect(() => {
    if (Token) {
      setSuccessfulLoginModal(true);
      setTimeout(() => {
        setSuccessfulLoginModal(false);
      }, 2000);
    }
  }, [Token]);

  const dispatch = useDispatch();

  const setStepperVisible = (bool) => {
    dispatch(updateIsStepperVisible(bool));
  };

  const setVisibleForUserLogin = (bool) => {
    dispatch(updateVisibleForUserLogin(bool));
  };

  let LinksUrl = [
    { name: "HOME", link: "/" },
    { name: "SERVICE", link: "/services" },
    { name: "BLOG", link: "/blogs" },
    { name: "ABOUT US", link: "/about" },
    { name: "CONTACT US", link: "/contact" },
  ];

  useEffect(() => {
    if (
      location.pathname === "/professionals" ||
      location.pathname === "/professionals/list"
    ) {
      setProButtonVisible(false);
      setProfessionalsAccSwitchingMsg(true);
      setTimeout(() => {
        setProfessionalsAccSwitchingMsg(false);
      }, 1000);
    } else {
      setProButtonVisible(true);
    }

    if (isLoggedIn) {
      setDashboardButtonVisible(true);
    } else {
      setDashboardButtonVisible(false);
    }
    if (isLoggedIn && userType === "Customer") {
      setProButtonVisible(false);
    }
  }, [location, isLoggedIn]);

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

  const handleCheckboxChange = (name, val) => {
    // let { name } = e.target
    setFields({ ...fields, [name]: val });
  };

  const handleStepperIncrement = () => {
    setCurrentStep(currentStep + 1);
  };
  const handleStepperDecrement = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (values) => {
    if (currentStepper === "normal") {
      let postData = userStepper.map((stepper) => {
        return {
          question: stepper.title,
          choice: values[stepper.name],
        };
      });
      console.log(currentStepValue);

      let reqBody = {
        user: userId,
        pincode: parseInt(postData[0].choice),
        service_looking: currentStepValue[1].preference.indexOf(
          postData[1].choice
        ),
        property_type: currentStepValue[2].preference.indexOf(
          postData[2].choice
        ),
        email: postData[4].choice,
      };
      console.log(reqBody);
      submitNormalUserSteppers(reqBody)
        .then((res) => {
          if (res.data) {
            console.log("submitted");
            navigate("/professionals/list");
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
      setCurrentStep(0);
      setStepperVisible(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("access");
    dispatch(updateIsLoggedIn(false));
    dispatch(updateUserType(""));
    navigate("/");
  };
  const incCount = () => {
    if (count !== data.length - 1) {
      setCount(count + 1);
    } else {
      // console.log("Fields1", fields);
      // navigate("/professionals/questions");
      // setProVisible(false);

      if (fields.preference === "Yes") {
        let t = (fields.preference = true);
        setFields({ ...fields, preference: t });
        console.log("fields==>", fields);
        professionalService(fields);
        if (professionalServiceResponse.isSuccess) {
          setProVisible(false);
          navigate("/professionals/questions");
          console.log("professionalServiceResponse");
        }
        if (submittedSteppersData.isError) {
          setProVisible(true);
        }
      }
      if (fields.preference === "No") {
        let f = (fields.preference = false);
        setFields({ ...fields, preference: f });
        professionalService(fields);
        setProVisible(false);
        navigate("/professionals/questions");
        if (submittedSteppersData.isError) {
          setProVisible(true);
        }
      }
    }

    setDetailsVisible(true);
    setTimeout(() => {
      setDetailsVisible(false);
    }, 2000);
    // navigate("/professionals/questions");
  };

  useEffect(() => {}, []);

  const handleProfessionalLogout = () => {
    setLogoutSuccess(true);
    setTimeout(() => {
      setLogoutSuccess(false);
      navigate("/");
    }, 2000);
    localStorage.clear();
  };

  const decCount = () => {
    if (count > 0) {
      setCount(count - 1);
    } else return;
  };

  return (
    <div className="shadow-md w-full relative bg-white z-40">
      <div className="lg:flex items-center justify-between bg-white py-4 lg:px-24 px-5">
        <NavLink to="/" className="flex items-center">
          <img src={CasaLogo} alt="Logo" className={styles.navLogo} />
        </NavLink>

        <div
          onClick={() => setOpenMenu(!openMenu)}
          className={`text-3xl absolute right-8 cursor-pointer lg:hidden ${styles.hamburgerMenu}`}
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
                className={`text-primaryDark tracking-2 font-medium text-sm hover:border-b-2 border-primaryOrange`}
              >
                {link.name}
              </NavLink>
            </li>
          ))}

          {Token ? (
            <li>
              <ButtonField
                className="lg:ml-8 hover:bg-primaryOrange border-solid border-2 border-primaryOrange py-2 px-6 h-11 ease-linear duration-300 text-primaryOrange hover:text-white lg:my-0 my-3 w-11/12 lg:w-32"
                onClick={handleProfessionalLogout}
              >
                Logout
              </ButtonField>
            </li>
          ) : (
            <li>
              <ButtonField
                className="lg:ml-8 hover:bg-primaryOrange border-solid border-2 border-primaryOrange py-2 px-6 h-11 ease-linear duration-300 text-primaryOrange hover:text-white lg:my-0 my-3 w-11/12 lg:w-32"
                onClick={() => {
                  !isLoggedIn ? setVisible(!visible) : handleLogout();
                }}
              >
                {isLoggedIn ? "Logout" : "Login"}
              </ButtonField>
            </li>
          )}

          {Token ? (
            ""
          ) : (
            <li>
              {proButtonVisible && userType !== "Customer" && !isLoggedIn && (
                <Link to="/professionals">
                  <ButtonField className="lg:ml-8 bg-primaryOrange py-2 px-6 h-11 hover:border-solid border-2 border-primaryOrange hover:bg-white hover:text-primaryOrange lg:my-0 my-3 w-11/12 lg:w-auto">
                    Join as a Professional
                  </ButtonField>
                </Link>
              )}
            </li>
          )}
          <li>
            {dashboardButtonVisible && (
              <Link to="/dashboard">
                <ButtonField className="lg:ml-8 bg-primaryOrange py-2 px-6 h-11 hover:border-solid border-2 border-primaryOrange hover:bg-white hover:text-primaryOrange lg:my-0 my-3 w-11/12 lg:w-auto">
                  Dashboard
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
          setVisibleForUserLogin={setVisibleForUserLogin}
        />
      )}
      {selectLoginFrameActive && (
        <SelectLoginFrame
          setVisible={() => dispatch(updateSelectLoginFrameActive(false))}
          setProButtonVisible={setProButtonVisible}
          setVisibleForProfessionalLogin={setVisibleForProfessionalLogin}
          setVisibleForUserLogin={setVisibleForUserLogin}
          hideProfessionalButton={true}
        />
      )}

      {visibleForPremiumButtonLogin && (
        <PremiumButtonLogin
          setVisibleForPremiumButtonLogin={setVisibleForPremiumButtonLogin}
          setProButtonVisible={setProButtonVisible}
          setVisibleForProfessionalLogin={setVisibleForProfessionalLogin}
          setVisibleForUserLogin={setVisibleForUserLogin}
        />
      )}
      {visibleForSubscriptionModal && (
        <Subscription
          setVisibleForSubscription={setVisibleForSubscription}
          // setVisibleForUserLogin={setVisibleForUserLogin}
        />
      )}

      {successfulLoginModal && <SuccessModal massage="Successful Login" />}

      {visibleForUserLogin && (
        <UserLoginFrame
          setVisibleForUserSignUp={setVisibleForUserSignUp}
          setVisibleForUserLogin={setVisibleForUserLogin}
          setCurrentStepper={setCurrentStepper}
          setvisibleForForgotPassword={setvisibleForForgotPassword}
          handleLogout={handleLogout}
          setCustomerForgotPassword={setCustomerForgotPassword}
        />
      )}
      {visibleForUserSignUp && (
        <UserSignUpFrame
          setVisibleForUserSignUp={setVisibleForUserSignUp}
          setVisibleForUserLogin={setVisibleForUserLogin}
          setCurrentStepper={setCurrentStepper}
        />
      )}

      {visibleForForgotPassword && (
        <ForgotPasswordFrame
          setvisibleForForgotPassword={setvisibleForForgotPassword}
          setVisibleForOtpVerification={setVisibleForOtpVerification}
          setForgotPasswordEmail={setForgotPasswordEmail}
          setVisibleForUserLogin={
            customerForgotPassword
              ? setVisibleForUserLogin
              : setVisibleForProfessionalLogin
          }
        />
      )}
      {visibleForOtpVerification && (
        <OtpVerificationFrame
          setVisibleForOtpVerification={setVisibleForOtpVerification}
          forgotPasswordEmail={forgotPasswordEmail}
          setVisibleForResetPassword={setVisibleForResetPassword}
          setVisibleForUserLogin={
            customerForgotPassword
              ? setVisibleForUserLogin
              : setVisibleForProfessionalLogin
          }
        />
      )}
      {visibleForResetPassword && (
        <ResetPasswordFrame
          setVisibleForResetPassword={setVisibleForResetPassword}
          setVisibleForUserLogin={
            customerForgotPassword
              ? setVisibleForUserLogin
              : setVisibleForProfessionalLogin
          }
        />
      )}

      {visibleForProfessionalLogin && (
        <ProfessionalLoginFrame
          setVisibleForProfessionalLogin={setVisibleForProfessionalLogin}
          setVisibleForProfessionalSignUp={setVisibleForProfessionalSignUp}
          setCustomerForgotPassword={setCustomerForgotPassword}
          setvisibleForForgotPassword={setvisibleForForgotPassword}
          setProVisible={setProVisible}
        />
      )}
      {visibleForProfessionalSignUp && (
        <ProfessionalSignUp
          setVisibleForProfessionalSignUp={setVisibleForProfessionalSignUp}
          setSuccessModalVisible={setSuccessModalVisible}
          setProVisible={setProVisible}
        />
      )}

      {isStepperVisible && currentStepValue.length >= 1 && (
        <Formik
          initialValues={initialValuesUserStepper}
          onSubmit={handleSubmit}
          validationSchema={userStepperSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <Modal
              setVisible={setStepperVisible}
              description={currentStepValue[currentStep].title}
              className="pt-5 font-medium text-base md:text-lg lg:text-3xl"
              body={
                currentStepValue[currentStep].type === "radio" ? (
                  <div className="mt-4">
                    {currentStepValue[currentStep].preference.map(
                      (pref, idx) => {
                        return (
                          <InputRadio
                            key={idx}
                            name={currentStepValue[currentStep].name}
                            value={pref}
                            checkedValue={
                              values[currentStepValue[currentStep].name]
                            }
                            placeholder={
                              currentStepValue[currentStep].placeholder
                            }
                            id={currentStepValue[currentStep].name}
                            className="font-medium"
                            type={currentStepValue[currentStep].type}
                            label={
                              currentStepValue[currentStep].type === "radio"
                                ? pref
                                : ""
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isLast={
                              idx ===
                              currentStepValue[currentStep].preference.length -
                                1
                                ? true
                                : false
                            }
                            errorText={
                              errors.name && touched.name ? errors.name : null
                            }
                          />
                        );
                      }
                    )}
                  </div>
                ) : (
                  <InputField
                    name={currentStepValue[currentStep].name}
                    placeholder={currentStepValue[currentStep].placeholder}
                    id={currentStepValue[currentStep].name}
                    className="font-medium"
                    type={currentStepValue[currentStep].type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={errors.name && touched.name ? errors.name : null}
                  />
                )
              }
              footer={
                <div className="flex items-center justify-between">
                  {currentStep > 0 ||
                  currentStep > currentStepValue.length - 1 ? (
                    <>
                      <ButtonField
                        className="py-3 text-primaryGray   font-medium  outline-none focus:outline-none "
                        type="submit"
                        children="Back"
                        onClick={handleStepperDecrement}
                      />
                      {currentStep === currentStepValue.length - 1 ? (
                        <button
                          className={`px-5 py-3 bg-primaryOrange border-primaryOrange text-white font-medium outline-none focus:outline-none ease-linear transition-all duration-150`}
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      ) : (
                        <ButtonField
                          className={`px-5 py-3 bg-primaryOrange border-primaryOrange text-white font-medium outline-none focus:outline-none ease-linear transition-all duration-150 `}
                          type="submit"
                          children="Continue"
                          onClick={handleStepperIncrement}
                        />
                      )}
                    </>
                  ) : (
                    <button
                      className={`px-5 py-3 bg-primaryOrange border-primaryOrange text-white font-medium outline-none focus:outline-none ease-linear transition-all duration-150 disabled:opacity-60 `}
                      type="submit"
                      children="Continue"
                      onClick={handleStepperIncrement}
                      disabled={
                        currentStepValue[currentStep].name === "pincode"
                          ? values.pincode < 99999 || values.pincode > 1000000
                            ? true
                            : false
                          : currentStepValue[currentStep].name === "email"
                          ? values.email === ""
                            ? true
                            : false
                          : false
                      }
                    >
                      Continue
                    </button>
                  )}
                </div>
              }
            />
          )}
        </Formik>
      )}
      {professionalsAccSwitchingMsg && (
        <SuccessModal massage={"Switching to professional account"} />
      )}

      {successModalVisible && (
        <SuccessModal massage={"Professional User created SuccessFully"} />
      )}

      {forgotPasswordSuccessModal && (
        <SuccessModal
          massage={
            <div className="text-center px-2">
              <p className="mx-auto font-medium text-lg lg:text-2xl text-primaryExtraLightGray mb-2">
                Password Reset
              </p>
              <p className="font-bold text-sm text-black">
                Your password has been Reset successfully Click below to Login
              </p>
              <ButtonField
                className="bg-primaryOrange py-2 px-6 hover:border-solid border-2 border-primaryOrange hover:bg-white hover:text-primaryOrange leading-normal w-full text-normal font-semibold mt-51"
                onClick={() => setForgotPasswordSuccessModal(false)}
              >
                Continue
              </ButtonField>
            </div>
          }
          hideFooter={true}
        />
      )}

      {logoutSucces && <SuccessModal massage="Logout Successfully" />}

      {successModalVisible === false && (
        <>
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
                          {currData.type === "text" ||
                          currData.type === "email" ? (
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
                                  currData.name === "pincode"
                                    ? styles.loc_inp
                                    : ""
                                }`}
                                className={styles.text_inp}
                                autoComplete="off"
                              />
                            </>
                          ) : (
                            <>
                              {currData.options.map((ele, i) => {
                                return (
                                  <React.Fragment key={i}>
                                    <input
                                      type="checkbox"
                                      aria-hidden
                                      name={currData.name}
                                      id={currData.name}
                                      autoComplete="off"
                                    />

                                    <label
                                      htmlFor={currData.name}
                                      onClick={() => {
                                        handleCheckboxChange(
                                          currData.name,
                                          ele
                                        );
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
                                  </React.Fragment>
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
                          currData.name &&
                          fields[`${currData.name}`].length === 0
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
        </>
      )}

      {proVisible === false && (
        <>
          {DetailsVisible && (
            <SuccessModal massage={"Details Added Successfully"} />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
