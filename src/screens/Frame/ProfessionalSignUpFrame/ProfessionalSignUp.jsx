import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal/Modal";
import InputField from "../../../components/InputField/InputField";
import ButtonField from "../../../components/ButtonsFields/ButtonField";
import EyeIcon from "../../../assets/InputFieldIcons/EyeIcon.svg";
import { useProfessionalSignUpMutation } from "../../../app/services/professionalOauthApiServices";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  company_name: "",
  company_website: "",
};

const SignUpSchema = Yup.object({
  name: Yup.string()
    .required("This field is required.")
    .max(20, 'Maximum 20 characters allowed')
    .min(2, "Minimum 2 characters required.")
    .matches(
      /^[a-zA-Z\s]*$/,
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
  company_name: Yup.string().required("This field is required."),
  company_website: Yup.string()
    .matches(
      // /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Invalid Website URL"
    )
});

const ProfessionalSignUp = (props) => {
  let Token = localStorage.getItem("Token");
  const {
    setVisibleForProfessionalSignUp,
    setSuccessModalVisible,
    setProVisible,
  } = props;
  const [signUpProfessionalSignUp, professionalSignUpResponse] =
    useProfessionalSignUpMutation();
  const [vpass, setVPass] = useState("password");
  const [vpassConfirm, setVPassConfirm] = useState("password");

  useEffect(() => {
    if (professionalSignUpResponse.isSuccess) {
      console.log(
        "professionalSignUpResponse",
        professionalSignUpResponse.data
      );
      localStorage.setItem(
        "Token",
        professionalSignUpResponse.data.data.access_token
      );
      setVisibleForProfessionalSignUp(false);
      setSuccessModalVisible(true);
      setProVisible(true);
      setTimeout(() => {
        setSuccessModalVisible(false);
      }, 2000);
    } else if (professionalSignUpResponse.isError) {
      alert("Email is already registered. Login to continue");
    }
  }, [
    professionalSignUpResponse.isSuccess,
    professionalSignUpResponse.isError,
  ]);

  const handleSubmit = (values) => {
    console.log("SignUp Value", values);
    signUpProfessionalSignUp({ ...values });
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

  return (
    <>
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
            setVisible={setVisibleForProfessionalSignUp}
            classNameModal={"pt-15"}
            className='text-xs'

            ModalTitle="Tell us about yourself"
            description="You're one step away from seeing our Architecture
                leads"
            body={
              <>
                <InputField
                  name="name"
                  label="Name"
                  placeholder="Enter your Name"
                  id={"name"}
                  className="font-medium"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  errorText={errors.name && touched.name ? errors.name : null}
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
                  errorText={
                    errors.email && touched.email ? errors.email : null
                  }
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
                  name="company_name"
                  label="Company Name"
                  placeholder="Enter your Company Name"
                  id={"company_name"}
                  className="font-medium"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.company_name}
                  errorText={
                    errors.company_name && touched.company_name
                      ? errors.company_name
                      : null
                  }
                />
                <InputField
                  name="company_website"
                  label="Company Website(Optional)"
                  placeholder="Enter your Company Website"
                  id={"company_website"}
                  className="font-medium"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.company_website}
                  errorText={
                    errors.company_website && touched.company_website ? errors.company_website : null
                  }
                />
              </>
            }
            footer={
              <>
                <ButtonField
                  className="bg-primaryOrange text-white hover:text-primaryOrange border border-primaryOrange hover:bg-white hover font-medium w-full px-6 py-3 outline-none focus:outline-none ease-linear transition-all duration-150"
                  type="submit"
                  children="Submit"
                  disabled={professionalSignUpResponse.isLoading}
                  onClick={() => {
                    handleSubmit();
                  }}
                />
                <ButtonField
                  className="text-primaryOrange bg-white border border-primaryOrange hover:bg-primaryOrange hover:text-white w-full px-6 py-3 mt-3 font-medium outline-none focus:outline-none ease-linear transition-all duration-150"
                  type="button"
                  children="Cancel"
                  disabled={professionalSignUpResponse.isLoading}
                  onClick={() => {
                    setVisibleForProfessionalSignUp(false);
                  }}
                />
              </>
            }
          />
        )}
      </Formik>
    </>
  );
};

export default ProfessionalSignUp;
