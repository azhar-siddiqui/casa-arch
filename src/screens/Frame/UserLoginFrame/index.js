import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal/Modal";
import InputField from "../../../components/InputField/InputField";
import EyeIcon from "../../../assets/InputFieldIcons/EyeIcon.svg";
import BlankCheck from "../../../assets/ModalIcon/blank.svg";
import Check from "../../../assets/ModalIcon/Right.svg";
import ButtonField from "../../../components/ButtonsFields/ButtonField";
import { useLazyGetUserIdQuery, useLazyGetUserTypeQuery, useLoginUserMutation } from "../../../app/services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { updateIsLoggedIn, updateToken, updateUserId, updateUserType } from "../../../app/slices/user";
import { updateIsStepperVisible } from "../../../app/slices/userStepper";
import FacebookButton from "../../../components/SocialLogin/FacebookButton";
import GoogleButton from "../../../components/SocialLogin/GoogleButton";

const initialValues = {
  email: "",
  password: "",
};

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

const UserLoginFrame = (props) => {
  const { setVisibleForUserLogin, setVisibleForUserSignUp, setvisibleForForgotPassword, handleLogout, setCustomerForgotPassword } = props;
  const [vpass, setVPass] = useState("password");

  const [rememberMeCheck, setRememberMeCheck] = useState(false);

  const dispatch = useDispatch()
  const { redirectToSteppers } = useSelector(state => state.user)
  const [loginUser, loginUserResponse] = useLoginUserMutation()
  const [fetchUserId, result] = useLazyGetUserIdQuery()
  const [fetchUserType, userTypeFetched] = useLazyGetUserTypeQuery()

  // console.log(loginUserResponse);
  // Qwerty.123456
  useEffect(() => {
    const { isUninitialized, isSuccess, isError, error, data } = loginUserResponse

    if (isUninitialized === true) return
    if (isError) {
      if (error.data) {
        alert(error.data.error_description)
        return
      }
    }
    if (isSuccess) {
      setVisibleForUserLogin(false);
      dispatch(updateIsLoggedIn(true))
      sessionStorage.setItem('access', data.access_token)
      fetchUserId()
        .then((res) => {
          console.log(res.data);
          dispatch(updateUserId(res.data["user-id"]));
        })
      fetchUserType()
        .then(res => {
          console.log(res)
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
    }
  }, [
    loginUserResponse.isUninitialized,
    loginUserResponse.isSuccess,
    loginUserResponse.isError,
    loginUserResponse.error,
    loginUserResponse.data,
  ])

  const handleSubmit = async (values) => {
    let userData = {
      ...values,
      username: values.email,
      client_id: 'Immucq4FCvfr93KsJc8wTYt1Z1zTNbPR0iuD3TcE',
      client_secret: '0u3kVQpS0JpU3NaQHr4tiCn6o70JrUCbeSI7Xf6oRt5NXIfW69YrshDdAnWS833YY7xJNaq3qUb8LC8895nBewmaBw9NjbU5bSfv3F8TBCKpQ7uieHvTxpaYj0R2Hm0o',
      grant_type: 'password'
    }
    await loginUser(userData)
      .then(res => {
        // console.log(res)
        // if (res.error) {
        //   alert(res.error.data.error_description)
        //   return
        // }
        // setVisibleForUserLogin(false);
        // dispatch(updateIsLoggedIn(true))
        // sessionStorage.setItem('access', res.data.access_token)
        // redirectToSteppers && dispatch(updateIsStepperVisible(true))
        // await fetchUserId()
        //   .then((res) => {
        //     console.log(res.data);
        //     dispatch(updateUserId(res.data["user-id"]));
        //   })
        // await fetchUserType()
        //   .then(res => {
        //     console.log(res)
        //     if (res.data['user-type'] === 'Professional') {
        //       handleLogout()
        //       alert('Cant login as the account is registered as Professional')
        //       return
        //     }
        //     dispatch(updateUserType(res.data['user-type']))
        //   })
        //   .catch(err => {
        //     console.log(err.response)
        //   })
      })

  };

  const handleViewPass = () => {
    if (vpass === "password") {
      setVPass("text");
    } else {
      setVPass("password");
    }
  };

  const handleSignUpModal = () => {
    setVisibleForUserLogin(false);
    setVisibleForUserSignUp(true);
  };

  const handleForgetLinkClick = () => {
    setCustomerForgotPassword(true)
    setvisibleForForgotPassword(true)
    setVisibleForUserLogin(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={LoginSchema}
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
          setVisible={setVisibleForUserLogin}
          ModalTitle="Login"
          description="Welcome back!Please enter your details"
          className="pt-2 font-normal"
          SignUpText=" SignUp now"
          footerClassName='px-4 md:px-5'
          body={
            <>
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
                forgetLink="Forgot Password?"
                forgetLinkOnclick={handleForgetLinkClick}
                value={values.password}
                errorText={
                  errors.password && touched.password ? errors.password : null
                }
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
                  className={`ml-3 font-medium ${rememberMeCheck === true ? `text-black` : `text-primaryGray`
                    }  `}
                >
                  Remember me
                </span>
              </p>
              <ButtonField
                className={` w-full px-6 py-3 ${rememberMeCheck === false
                  ? `bg-primaryExtraLight text-white border border-primaryExtraLight`
                  : `bg-primaryOrange hover:text-primaryOrange text-white  border border-primaryOrange hover:bg-white font-medium w-full px-6 py-3 outline-none focus:outline-none ease-linear transition-all duration-150`
                  }`}
                type="submit"
                children="Login now"
                disabled={rememberMeCheck === false ? true : false}
                onClick={() => {
                  handleSubmit();
                }}
              />
              <p className="text-center pt-5 font-medium text-primaryGray ">
                Not a member?{" "}
                <span
                  className="text-primaryOrange border-b-2 border-primaryOrange cursor-pointer"
                  onClick={handleSignUpModal}
                >
                  SignUp now
                </span>
              </p>
              <div className="flex items-center my-4 md:my-7">
                <div className="flex-1  border-b border-slate-700"></div>
                <p className="text-sm md:text-base px-5 md:px-8 font-semibold">Or</p>
                <div className="flex-1  border-b border-slate-700"></div>
              </div>
              <div className="flex items-center">
                <FacebookButton setVisible={setVisibleForUserLogin} handleLogout={handleLogout} />
                <GoogleButton setVisible={setVisibleForUserLogin} handleLogout={handleLogout} />
              </div>

            </>
          }
        />
      )}
    </Formik>
  );
};

export default UserLoginFrame;
