import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal/Modal";
import InputField from "../../../components/InputField/InputField";
import EyeIcon from "../../../assets/InputFieldIcons/EyeIcon.svg";
import BlankCheck from "../../../assets/ModalIcon/blank.svg";
import Check from "../../../assets/ModalIcon/Right.svg";
import ButtonField from "../../../components/ButtonsFields/ButtonField";

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
  const { setVisibleForProfessionalLogin, setVisibleForProfessionalSignUp } =
    props;
  const [vpass, setVPass] = useState("password");
  const [rememberMeCheck, setRememberMeCheck] = useState(false);

  const handleSubmit = (values) => {
    console.log("Value Login", values);
    setVisibleForProfessionalLogin(false);
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
          setVisible={setVisibleForProfessionalLogin}
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
                  className={`ml-3 font-medium ${
                    rememberMeCheck === true ? `text-black` : `text-primaryGray`
                  }  `}
                >
                  Remember me
                </span>
              </p>
              <ButtonField
                className={` w-full px-6 py-3 ${
                  rememberMeCheck === false
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