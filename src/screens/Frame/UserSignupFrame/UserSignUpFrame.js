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

  const responseGoogle = async (googleData) => {
    let data = {
      // client_id: '150404684965-tqdd3gsmve64v2o63c86kc9igp7bq4ih.apps.googleusercontent.com',
      // client_secret: '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',
      client_id: 'Immucq4FCvfr93KsJc8wTYt1Z1zTNbPR0iuD3TcE',
      client_secret: '0u3kVQpS0JpU3NaQHr4tiCn6o70JrUCbeSI7Xf6oRt5NXIfW69YrshDdAnWS833YY7xJNaq3qUb8LC8895nBewmaBw9NjbU5bSfv3F8TBCKpQ7uieHvTxpaYj0R2Hm0o',
      grant_type: "convert_token",
      backend: "google-oauth2",
      token: googleData.accessToken, // which will get from google
    };
    // console.log(data)
    const accessToken = googleData.accessToken
    // console.log(accessToken)
    socialLogin(data)
      .then(res => {
        console.log(res.data.access_token)
        dispatch(updateIsLoggedIn(true))
        sessionStorage.setItem('access', res.data.access_token)
        fetchUserId(accessToken)
          .then((res) => {
            console.log(res.data);
            dispatch(updateUserId(res.data["user-id"]));
          })
        fetchUserType(accessToken)
          .then(res => {
            console.log(res)
            setVisibleForUserSignUp(false)
            if (res.data['user-type'] === 'Professional') {
              handleLogout()
              alert('Cant login as the account is registered as Professional')
              return
            }
            redirectToSteppers && dispatch(updateIsStepperVisible(true))
            dispatch(updateUserType(res.data['user-type']))
          })
          .catch(err => {
            console.log(err.response)
          })

      })

    // const res = await axios.post(`${domain}/social-auth/convert-token/`, data)
    // let response_data = await res.data
    // let token = JSON.stringify(response_data);
    // sessionStorage.setItem("access", token);
    // console.log(response_data)
    // setAuth(res.data);
    // window.location.reload();
  }
  const responseFacebook = async (fbData) => {
    console.log(fbData)
    let data = {
      client_id: 'Immucq4FCvfr93KsJc8wTYt1Z1zTNbPR0iuD3TcE',
      client_secret: '0u3kVQpS0JpU3NaQHr4tiCn6o70JrUCbeSI7Xf6oRt5NXIfW69YrshDdAnWS833YY7xJNaq3qUb8LC8895nBewmaBw9NjbU5bSfv3F8TBCKpQ7uieHvTxpaYj0R2Hm0o',
      grant_type: "convert_token",
      backend: "facebook",
      token: fbData.accessToken, // which will get from google
    };

    socialLogin(data)
      .then(res => {
        console.log(res.data.access_token)
        dispatch(updateIsLoggedIn(true))
        sessionStorage.setItem('access', res.data.access_token)
        fetchUserId(accessToken)
          .then((res) => {
            console.log(res.data);
            dispatch(updateUserId(res.data["user-id"]));
          })
        fetchUserType(accessToken)
          .then(res => {
            console.log(res)
            setVisibleForUserSignUp(false)
            if (res.data['user-type'] === 'Professional') {
              handleLogout()
              alert('Cant login as the account is registered as Professional')
              return
            }
            redirectToSteppers && dispatch(updateIsStepperVisible(true))
            dispatch(updateUserType(res.data['user-type']))
          })
          .catch(err => {
            console.log(err.response)
          })

      })

  }


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
                {/* <ButtonField
                  className="flex items-center  justify-center text-white bg-primaryBlue border border-primaryBlue hover:bg-primaryBlue hover:text-white w-full px-2 py-1  outline-none focus:outline-none ease-linear transition-all duration-150 mr-3 text-11.33 md:px-4 md:py-4 md:font-medium md:text-lg md:mr-8"
                  type="button"
                  // onClick={renderProps.onClick}
                  children={
                    <>
                      <img className="mr-1 md:mr-4" src={FacebookIcon} />
                      Login via Facebook
                    </>
                  }
                /> */}
                <FacebookLogin
                  appId='3258956814394095'
                  // autoLoad
                  callback={responseFacebook}
                  render={renderProps => (
                    <ButtonField
                      className="flex items-center  justify-center text-white bg-primaryBlue border border-primaryBlue hover:bg-primaryBlue hover:text-white w-full px-1 md:px-2 py-1  outline-none focus:outline-none ease-linear transition-all duration-150 mr-3  text-[9.75px] md:px-4 md:py-4 md:font-medium md:text-lg md:mr-8"
                      type="button"
                      onClick={renderProps.onClick}
                      children={
                        <>
                          <img className="mr-1 md:mr-4" src={FacebookIcon} />
                          Login via Facebook
                        </>
                      }
                    />
                  )}
                />

                <GoogleLogin
                  // clientId={process.env.GOOGLE_CLIENT_ID}
                  clientId='150404684965-tqdd3gsmve64v2o63c86kc9igp7bq4ih.apps.googleusercontent.com'
                  buttonText="Sign up with Google"
                  onSuccess={responseGoogle}
                  onFailure={err => console.log(err)}
                  cookiePolicy={"single_host_origin"}
                  render={(renderProps) => {
                    return (
                      <>
                        <ButtonField
                          className="flex items-center justify-center text-white  bg-primaryRed border border-primaryRed hover:bg-primaryRed hover:text-white w-full px-2 py-1 font-medium outline-none focus:outline-none ease-linear transition-all duration-150 text-[9.75px]
                          md:px-4 md:py-4 md:font-medium md:text-lg"
                          type="button"
                          onClick={renderProps.onClick}
                          children={
                            <>
                              <img className="mr-[6px] md:mr-4" src={GoogleIcon} />
                              Login via Google
                            </>
                          }
                        />
                      </>
                    );
                  }}
                />

                {/* <ButtonField
                  className="flex items-center text-white  bg-primaryRed border border-primaryRed hover:bg-primaryRed hover:text-white w-full px-2 py-1 font-medium outline-none focus:outline-none ease-linear transition-all duration-150 text-sm
                  md:px-4 md:py-4 md:font-medium md:text-lg"
                  type="button"
                  children={

                  }
                /> */}
              </div>
            </>
          }
        />
      )}
    </Formik>
  );
};

export default UserSignUpFrame;
