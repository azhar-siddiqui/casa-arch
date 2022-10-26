import React, { useState, useEffect } from "react";
import ButtonField from "../ButtonsFields/ButtonField";
import { Link, NavLink, useLocation } from "react-router-dom";
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
import UserLoginFrame from "../../screens/Frame/UserLoginFrame";
import InputRadio from "../InputRadio/inputRadio";
import UserSignUpFrame from "../../screens/Frame/UserSignupFrame/UserSignUpFrame";
import { useGetQuestionsQuery, useSubmitSteppersMutation } from "../../app/services/userServices";
import { useSelector } from "react-redux";
// import Loc from "../../assets/ModalIcon/loc.svg";
// import SelectLoginFrame from "../../screens/Frame/SelectLoginFrame/SelectLoginFrame";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  companyName: "",
  companyWebsite: "",
};

const SignUpSchema = Yup.object({
  name: Yup.string().required("This field is required."),
  email: Yup.string()
    .email("Please Enter Valid Email")
    .required("This field is required."),
  password: Yup.string()
    .min(8, "Minimum 8 digits required.")
    .required("This field is required.")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character Abc@1234"
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  companyName: Yup.string().required("This field is required."),
});

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Please Enter Valid Email")
    .required("This field is required."),
  password: Yup.string()
    .min(8, "Minimum 8 digits required.")
    .required("This field is required.")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character Abc@1234"
    ),
});

const initialValuesLocation = {
  area: "",
};

const LocationSchema = Yup.object({
  area: Yup.string().required("This field is required."),
});


const initialValuesUserStepper = {
  pincode: "",
  service: "",
  property: "",
  rooms: "",
  email: "",
};

const userStepperSchema = Yup.object({
  pincode: Yup.string().required("This field is required."),
  service: Yup.string().required("This field is required."),
  property: Yup.string().required("This field is required."),
  rooms: Yup.string().required("This field is required."),
  email: Yup.string().required("This field is required."),
});

const stepper = [
  {
    step: 1,
    title: "Where do you serve your customers",
    placeholder: "Area,City,State...",
    type: "text",
    name: "text",
  },
  {
    step: 2,
    title: "Enter your pincode",
    type: "text",
    placeholder: "Pincode",
    name: "pincode",
  },
  {
    step: 3,
    title: "Do you prefer meeting remotely",
    type: "radio",
    name: "pincode",
    preference: ["Yes", "No"],
  },
];

const userStepper = [
  {
    step: 2,
    title: "Enter your pincode",
    type: "text",
    placeholder: "Pincode",
    name: "pincode",
    value: 0
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
    preference: ["Residential House", "Commercial Property", "Residential Flat"],
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
  const [vpass, setVPass] = useState("password");
  const [vpassConfirm, setVPassConfirm] = useState("password");
  let [openMenu, setOpenMenu] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStepValue, setCurrentStepValue] = useState([]);
  // normal or professional
  const [currentStepper, setCurrentStepper] = useState('') //can be 'normal' or 'professional' - used to know which steppers (professional/normal) to be displayed

  const [proButtonVisible, setProButtonVisible] = useState(true);
  const [dashboardButtonVisible, setDashboardButtonVisible] = useState(false)
  const [rememberMeCheck, setRememberMeCheck] = useState(false);
  const [visibleForProfessionalLogin, setVisibleForProfessionalLogin] =
    useState(false);
  const [visibleForProfessionalSignUp, setVisibleForProfessionalSignUp] =
    useState(false);

  const [visibleForUserSignUp, setVisibleForUserSignUp] = useState(false)
  const [visibleForUserLogin, setVisibleForUserLogin] = useState(false)
  const [stepperVisible, setStepperVisible] = useState(false)

  const location = useLocation();
  const [submitNormalUserSteppers, data] = useSubmitSteppersMutation()
  const { isLoggedIn, userType } = useSelector(state => state.user)
  // const stepperData = useGetQuestionsQuery()
  // console.log(stepperData)

  let LinksUrl = [
    { name: "HOME", link: "/" },
    { name: "SERVICE", link: "/" },
    { name: "BLOG", link: "/blogs" },
    { name: "ABOUT US", link: "/about" },
    { name: "CONTACT US", link: "/contact" },
  ];

  useEffect(() => {
    if (location.pathname === "/professionals" || location.pathname === "/professionals/list") {
      setProButtonVisible(false);
    } else if(isLoggedIn && userType === 'NORMAL'){
      setProButtonVisible(false);
    }
    else {
      setProButtonVisible(true);
    }

    if(isLoggedIn && userType === 'NORMAL'){
      setDashboardButtonVisible(true)
    }else{
      setDashboardButtonVisible(false)
    }
  }, [location, isLoggedIn]);

  useEffect(() => {
    // console.log(currentStepValue);
    // console.log(currentStepValue[currentStep].title);
  }, [currentStep, currentStepValue]);

  useEffect(() => {
    if (currentStepper === '') return
    if (currentStepper === 'normal') return setCurrentStepValue(userStepper)
    if (currentStepper === 'professional') return setCurrentStepValue(stepper)
  }, [currentStepper]);

  const handleStepperIncrement = () => {
    setCurrentStep(currentStep + 1);
  };
  const handleStepperDecrement = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (values) => {
    if (currentStepper === 'normal') {
      let postData = userStepper.map(stepper => {
        return {
          question: stepper.title,
          choice: values[stepper.name]
        }
      })
      console.log(postData)
      submitNormalUserSteppers(postData)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err.response)
        })
      // setCurrentStep(0);
      // setStepperVisible(false)
    }
  };

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
          className={`lg:flex lg:items-center lg:pb-0 pb-12 absolute lg:static bg-white lg:z-auto z-[-1] left-0 w-full lg:w-auto lg:pl-0 pl-5 transition-all duration-500 ease-in ${openMenu ? "top-20 " : "top-[-490px]"
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
                !isLoggedIn &&  setVisible(!visible);
              }}
            >
              {isLoggedIn ? 'Logout' : 'Login' }
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

      {visibleForUserLogin && (
        <UserLoginFrame
          setVisibleForUserSignUp={setVisibleForUserSignUp}
          setVisibleForUserLogin={setVisibleForUserLogin}
          setStepperVisible={setStepperVisible}
          setCurrentStepper={setCurrentStepper}
        />
      )}
      {visibleForUserSignUp && (
        <UserSignUpFrame
          setVisibleForUserSignUp={setVisibleForUserSignUp}
          setVisibleForUserLogin={setVisibleForUserLogin}
          setStepperVisible={setStepperVisible}
          setCurrentStepper={setCurrentStepper}
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
        />
      )}

      {stepperVisible && currentStepValue.length >= 1 &&
        <Formik
          initialValues={currentStepper === 'normal' ? initialValuesUserStepper : initialValuesLocation}
          onSubmit={handleSubmit}
          validationSchema={currentStepper === 'normal' ? userStepperSchema : LocationSchema}
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
                currentStepValue[currentStep].type === 'radio' ?
                  <div className="mt-4">
                    {currentStepValue[currentStep].preference.map((pref, idx) => {
                      return <InputRadio
                        key={idx}
                        name={currentStepValue[currentStep].name}
                        value={pref}
                        placeholder={currentStepValue[currentStep].placeholder}
                        id={currentStepValue[currentStep].name}
                        className="font-medium"
                        type={currentStepValue[currentStep].type}
                        label={currentStepValue[currentStep].type === 'radio' ? pref : ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isLast={idx === currentStepValue[currentStep].preference.length - 1 ? true : false}
                        // value={}
                        errorText={errors.name && touched.name ? errors.name : null}
                      />
                    })}
                  </div>
                  :
                  <InputField
                    name={currentStepValue[currentStep].name}
                    placeholder={currentStepValue[currentStep].placeholder}
                    id={currentStepValue[currentStep].name}
                    className="font-medium"
                    type={currentStepValue[currentStep].type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // value={}
                    errorText={errors.name && touched.name ? errors.name : null}
                  />

              }
              footer={
                <div className="flex items-center justify-between">
                  {currentStep > 0 || currentStep > currentStepValue.length - 1 ? (
                    <>
                      <ButtonField
                        className="py-3 text-primaryGray   font-medium  outline-none focus:outline-none "
                        type="submit"
                        children="Back"
                        onClick={handleStepperDecrement}
                      />
                      {currentStep === currentStepValue.length - 1 ? (
                        // <ButtonField
                        //   className={`px-5 py-3 bg-primaryOrange border-primaryOrange text-white font-medium outline-none focus:outline-none ease-linear transition-all duration-150`}
                        //   type="submit"
                        //   children="Submit"
                        //   onClick={handleSubmit}
                        // />
                        <button
                          className={`px-5 py-3 bg-primaryOrange border-primaryOrange text-white font-medium outline-none focus:outline-none ease-linear transition-all duration-150`}
                          type='submit'
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
                    <ButtonField
                      className={`px-5 py-3 bg-primaryOrange border-primaryOrange text-white font-medium outline-none focus:outline-none ease-linear transition-all duration-150 `}
                      type="submit"
                      children="Continue"
                      onClick={handleStepperIncrement}
                    />
                  )}
                </div>
              }
            />
          )}
        </Formik>
      }
    </div>
  );
};

export default Header;