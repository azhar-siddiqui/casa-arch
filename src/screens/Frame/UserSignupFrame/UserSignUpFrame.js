import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal/Modal";
import InputField from "../../../components/InputField/InputField";
import ButtonField from "../../../components/ButtonsFields/ButtonField";
import EyeIcon from "../../../assets/InputFieldIcons/EyeIcon.svg";
import { useJoinUserMutation, useLazyGetUserIdQuery, useLazyGetUserTypeQuery, useSocialLoginMutation } from "../../../app/services/userServices";
import Check from "../../../assets/ModalIcon/Right.svg";
import BlankCheck from "../../../assets/ModalIcon/blank.svg";
import FacebookIcon from "../../../assets/socialIcons/fb.svg";
import GoogleIcon from "../../../assets/socialIcons/google.svg";
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { gapi } from 'gapi-script';
import { useDispatch, useSelector } from "react-redux";
import { updateIsLoggedIn, updateUserId, updateUserType } from "../../../app/slices/user";
import { updateIsStepperVisible } from "../../../app/slices/userStepper";
import { useNavigate } from "react-router-dom";
import FacebookButton from "../../../components/SocialLogin/FacebookButton";
import GoogleButton from "../../../components/SocialLogin/GoogleButton";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
};

const SignUpSchema = Yup.object({
  first_name: Yup.string()
    .required("This field is required.")
    .max(20, 'Maximum 20 characters allowed')
    .min(2, "Minimum 2 characters required.")
    .matches(
      /^[a-zA-Z]*$/,
      "Name must only contain letters"
    ),
  last_name: Yup.string()
    .required("This field is required.")
    .max(20, 'Maximum 20 characters allowed')
    .min(2, "Minimum 2 characters required.")
    .matches(
      /^[a-zA-Z]*$/,
      "Name must only contain letters"
    ),
  email: Yup.string()
    .email("Please Enter Valid Email")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email address"
    )
    .required("This field is required."),
  password: Yup.string()
    .min(8, "Minimum 8 digits required.")
    .required("This field is required.")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character Abc@1234"
    ),
  confirmPassword: Yup.string()
    .required("This field is required.")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  phone: Yup.string().required("This field is required.")
    .min(8, "Minimum 8 digits required.")
    .max(12, 'Maximum 12 digits allowed'),
});

const UserSignUpFrame = (props) => {
  const [createUser, data] = useJoinUserMutation();
  const { setVisibleForUserSignUp, setVisibleForUserLogin } = props;
  const [vpass, setVPass] = useState("password");
  const [vpassConfirm, setVPassConfirm] = useState("password");
  const [rememberMeCheck, setRememberMeCheck] = useState(false)
  const [socialLogin, socialLoginResp] = useSocialLoginMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [fetchUserId, result] = useLazyGetUserIdQuery()
  const [fetchUserType, userTypeFetched] = useLazyGetUserTypeQuery()
  const { redirectToSteppers } = useSelector(state => state.user)

  const handleSubmit = async (values) => {
    console.log("Value", values);
    await createUser(values)
      .then(res => {
        if (res.error) {
          alert('User registered! login to continue')
          alert('Email is already registered. Please login to continue')
          return
        } else {
          setVisibleForUserLogin(true)
          setVisibleForUserSignUp(false)
        }
      })
  };

  const handleViewPass = () => {
    if (vpass === "password") {
      setVPass("text");
    } else {
      setVPass("password");
    }
  };

  const handleViewConfirmPass = () => {
    if (vpassConfirm === "password") {
      setVPassConfirm("text");
    } else {
      setVPassConfirm("password");
    }
  };

  useEffect(() => {
    console.log('q')
    const initClient = () => {
      gapi.client.init({
        clientId: process.env.GOOGLE_CLIENT_ID,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  });

  const handleLogout = () => {
    sessionStorage.removeItem("access");
    dispatch(updateIsLoggedIn(false));
    dispatch(updateUserType(""));
    navigate("/");
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={SignUpSchema}
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
          setVisible={setVisibleForUserSignUp}
          classNameModal={"pt-16 px:"}
          className='text-xs md:text-base pt-2 md:pt-3 pb:5'
          ModalTitle="Create your account"
          description="Sign up to get started!"
          body={
            <>
              <InputField
                name="first_name"
                label="First name"
                placeholder="Enter your First Name"
                id={"firstname"}
                className="font-medium"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.first_name}
                errorText={
                  errors.first_name && touched.first_name
                    ? errors.first_name
                    : null
                }
              />
              <InputField
                name="last_name"
                label="Last name"
                placeholder="Enter your Last Name"
                id={"lastname"}
                className="font-medium"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.last_name}
                errorText={
                  errors.last_name && touched.last_name
                    ? errors.last_name
                    : null
                }
              />
              <InputField
                name="email"
                label="Email"
                placeholder="Enter your Email"
                id={"email"}
                className="font-medium "
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                errorText={errors.email && touched.email ? errors.email : null}
              />
              <InputField
                handleViewPassword={handleViewPass}
                name="password"
                label="Password"
                EyeIcon={EyeIcon}
                placeholder="Enter your Password"
                id={"password"}
                className="font-medium "
                type={vpass}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                errorText={
                  errors.password && touched.password ? errors.password : null
                }
              />
              <InputField
                handleViewPassword={handleViewConfirmPass}
                name="confirmPassword"
                label="Confirm password"
                EyeIcon={EyeIcon}
                placeholder="Enter your Confirm password"
                id={"confirmPassword"}
                className="font-medium"
                type={vpassConfirm}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                errorText={
                  errors.confirmPassword && touched.confirmPassword
                    ? errors.confirmPassword
                    : null
                }
              />
              <InputField
                name="phone"
                label="Phone"
                placeholder="Enter your Phone Number"
                id={"phone"}
                className="font-medium"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                errorText={errors.phone && touched.phone ? errors.phone : null}
              />
            </>
          }
          footer={
            <>
              <p className="flex items-center mb-8 cursor-pointer">
                {rememberMeCheck ? (
                  <img
                    src={Check}
                    alt="Check"
                    onClick={() => {
                      setRememberMeCheck(!rememberMeCheck);
                    }}
                  />
                ) : (
                  <img
                    src={BlankCheck}
                    alt="BlankCheck"
                    onClick={() => {
                      setRememberMeCheck(!rememberMeCheck);
                    }}
                  />
                )}
                <span
                  className={`ml-3 font-medium ${rememberMeCheck === true ? `text-black` : `text-primaryGray text-sm`
                    }  `}
                >
                  I agree with the <span className="text-primaryOrange underline"> Terms of services  </span> {'  '} and {'  '} <span className="text-primaryOrange underline"> Privacy Policy </span>
                </span>
              </p>
              <ButtonField
                className="bg-primaryOrange text-white hover:text-primaryOrange border border-primaryOrange hover:bg-white hover font-medium w-full px-6 py-2 md:py-4 outline-none focus:outline-none ease-linear transition-all duration-150 h-45 md:h-auto"
                type="submit"
                children="Register now"
                onClick={() => {
                  handleSubmit();
                }}
              />
              <div className="flex items-center my-4 md:my-7">
                <div className="flex-1  border-b border-slate-700"></div>
                <p className="text-sm md:text-base px-5 md:px-8 font-semibold">Or</p>
                <div className="flex-1  border-b border-slate-700"></div>
              </div>
              <div className="flex items-center">

                <FacebookButton setVisible={setVisibleForUserSignUp} handleLogout={handleLogout} />
                <GoogleButton setVisible={setVisibleForUserSignUp} handleLogout={handleLogout} />

              </div>
            </>
          }
        />
      )}
    </Formik>
  );
};

export default UserSignUpFrame;
