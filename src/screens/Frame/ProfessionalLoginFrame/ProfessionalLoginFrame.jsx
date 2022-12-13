import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal/Modal";
import InputField from "../../../components/InputField/InputField";
import EyeIcon from "../../../assets/InputFieldIcons/EyeIcon.svg";
import BlankCheck from "../../../assets/ModalIcon/blank.svg";
import Check from "../../../assets/ModalIcon/Right.svg";
import ButtonField from "../../../components/ButtonsFields/ButtonField";
import {
  useProfessionalLoginMutation,
  useProfessionalTypeMutation,
} from "../../../app/services/professionalOauthApiServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateOpenSubscriptionAfterLogin } from "../../../app/slices/professionalauthSlice";
import {
  useProfessionalAreaCheckPointsMutation,
  useProfessionalServiceCheckPointsMutation,
  useProfessionalSubscriptionCheckPointsMutation,
} from "../../../app/services/CheckPoints";

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

const ProfessionalLoginFrame = (props) => {
  const {
    setVisibleForProfessionalLogin,
    setVisibleForProfessionalSignUp,
    setvisibleForForgotPassword,
    setCustomerForgotPassword,
    setProVisible,
  } = props;
  const [professionalLogin, ProfessionalLoginResponse] =
    useProfessionalLoginMutation();

  const [professionalLoginType, ProfessionalLoginTypeResponse] =
    useProfessionalTypeMutation();

  const [professionalAreaCheckPoint, ProfessionalAreaCheckPointResponse] =
    useProfessionalAreaCheckPointsMutation();
  const [
    professionalServiceCheckPoints,
    ProfessionalServiceCheckPointsResponse,
  ] = useProfessionalServiceCheckPointsMutation();

  const [
    professionalSubscriptionCheckPoints,
    ProfessionalSubscriptionCheckPointsResponse,
  ] = useProfessionalSubscriptionCheckPointsMutation();

  const [vpass, setVPass] = useState("password");
  const [rememberMeCheck, setRememberMeCheck] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetch = async () => {
    if (ProfessionalLoginResponse.isSuccess) {
      let setToken = ProfessionalLoginResponse.data.access_token;
      localStorage.setItem("Token", setToken);
      await professionalLoginType(setToken);
      await professionalAreaCheckPoint(setToken);
      // await professionalServiceCheckPoints(setToken);
      // professionalServiceCheckPoints(setToken);
      // professionalSubscriptionCheckPoints(setToken);
      // if(ProfessionalLoginResponse.isSuccess)
      setVisibleForProfessionalLogin(false);

      if (ProfessionalLoginResponse.isSuccess !== true) return
      if (ProfessionalAreaCheckPointResponse.isSuccess !== true) return

      if (ProfessionalAreaCheckPointResponse?.data?.area !== null) {
        navigate("/professionals/landing");
      } else {
        // window.location.reload();
      }
    } else if (ProfessionalLoginResponse.isError) {
      alert("Something went wrong");
    }
  }

  useEffect(() => {
    fetch()
  }, [
    ProfessionalLoginResponse.isSuccess,
    ProfessionalLoginResponse.isError,

    ProfessionalAreaCheckPointResponse.isSuccess,
    ProfessionalAreaCheckPointResponse.isError,
  ]);

  // console.log(ProfessionalAreaCheckPointResponse)

  useEffect(() => {
    if (ProfessionalLoginTypeResponse.isSuccess) {
      if (ProfessionalLoginTypeResponse.data["user-type"] === "Professional") {
        if (ProfessionalServiceCheckPointsResponse.isSuccess) {
          if (
            ProfessionalServiceCheckPointsResponse.data.client_type === null
          ) {
            navigate("professionals/questions");
          } else {
            navigate("/");
          }
        }
        // navigate("/professionals/landing");
        // console.log("work2");
        // setVisibleForProfessionalLogin(false);
      } else {
        alert("User Type is Not Professional");
      }
    }
  }, [
    ProfessionalLoginTypeResponse.isSuccess,
    ProfessionalLoginTypeResponse.isError,
  ]);

  useEffect(() => {
    if (ProfessionalAreaCheckPointResponse.isSuccess) {
      console.log("Type Professional isSuccess");
      if (ProfessionalAreaCheckPointResponse.data["area"] === null) {
        setProVisible(true);
      } else {
        setProVisible(false);
      }
    } else if (ProfessionalAreaCheckPointResponse.isError) {
      console.log("ProfessionalAreaCheckPointResponse Something Went Wrong");
    }
  }, [
    ProfessionalAreaCheckPointResponse.isSuccess,
    ProfessionalAreaCheckPointResponse.isError,
  ]);

  useEffect(() => {
    if (ProfessionalServiceCheckPointsResponse.isSuccess) {
      // console.log("Type Professional isSuccess", ProfessionalServiceCheckPointsResponse);
      if (ProfessionalServiceCheckPointsResponse.data["client_type"] === null) {
        setProVisible(true);
        console.log("area");
      } else {
        setProVisible(false);
      }
    } else if (ProfessionalServiceCheckPointsResponse.isError) {
      console.log("ProfessionalAreaCheckPointResponse Something Went Wrong");
    }
  }, [
    ProfessionalServiceCheckPointsResponse.isSuccess,
    ProfessionalServiceCheckPointsResponse.isError,
  ]);

  // useEffect(() => {
  //   if (
  //     ProfessionalAreaCheckPointResponse.isSuccess &&
  //     ProfessionalServiceCheckPointsResponse.isSuccess &&
  //     ProfessionalLoginTypeResponse.isSuccess
  //   ) {
  //   }
  // }, [
  //   ProfessionalAreaCheckPointResponse.isSuccess,
  //   ProfessionalAreaCheckPointResponse.isError,
  //   ProfessionalServiceCheckPointsResponse.isSuccess,
  //   ProfessionalServiceCheckPointsResponse.isError,
  //   ProfessionalLoginTypeResponse.isSuccess,
  //   ProfessionalLoginTypeResponse.isError,
  // ]);

  const handleSubmit = (values) => {
    let userData = {
      ...values,
      client_id: "Immucq4FCvfr93KsJc8wTYt1Z1zTNbPR0iuD3TcE",
      client_secret:
        "0u3kVQpS0JpU3NaQHr4tiCn6o70JrUCbeSI7Xf6oRt5NXIfW69YrshDdAnWS833YY7xJNaq3qUb8LC8895nBewmaBw9NjbU5bSfv3F8TBCKpQ7uieHvTxpaYj0R2Hm0o",
      grant_type: "password",
      username: values.email,
      password: values.password,
    };
    professionalLogin(userData).then((res) => {
      //  setVisibleForProfessionalLogin(false);
    });
    // setVisibleForProfessionalLogin(false);
  };

  const handleViewPass = () => {
    if (vpass === "password") {
      setVPass("text");
    } else {
      setVPass("password");
    }
  };

  const handleSignUpModal = () => {
    setVisibleForProfessionalLogin(false);
    setVisibleForProfessionalSignUp(true);
  };

  const handleForgetLinkClick = () => {
    setCustomerForgotPassword(false);
    setvisibleForForgotPassword(true);
    setVisibleForProfessionalLogin(false);
  };

  const handleClose = () => {
    setVisibleForProfessionalLogin(false);
    dispatch(updateOpenSubscriptionAfterLogin(false));
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
          setVisible={handleClose}
          ModalTitle="Login"
          description="Welcome back!Please enter your details"
          className="pt-5 font-normal"
          SignUpText=" SignUp now"
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
            </>
          }
        />
      )}
    </Formik>
  );
};

export default ProfessionalLoginFrame;
