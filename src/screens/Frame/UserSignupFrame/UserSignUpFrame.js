import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal/Modal";
import InputField from "../../../components/InputField/InputField";
import ButtonField from "../../../components/ButtonsFields/ButtonField";
import EyeIcon from "../../../assets/InputFieldIcons/EyeIcon.svg";
import { useJoinUserMutation } from "../../../app/services/userServices";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
};

const SignUpSchema = Yup.object({
  first_name: Yup.string().required("This field is required."),
  last_name: Yup.string().required("This field is required."),
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
  confirmPassword: Yup.string()
    .required("This field is required.")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  phone: Yup.string().required("This field is required."),
});

const UserSignUpFrame = (props) => {
  const [createUser, createUserResponse] = useJoinUserMutation();
  const { setVisibleForUserSignUp } = props;
  const [vpass, setVPass] = useState("password");
  const [vpassConfirm, setVPassConfirm] = useState("password");
  console.log("createUserResponse", createUserResponse);
  const handleSubmit = async (values) => {
    console.log("Value", values);
    await createUser(values);
    console.log("submitted..");
    setVisibleForUserSignUp(false);
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
          classNameModal={"pt-[210px]"}
          ModalTitle="Tell us about yourself"
          description="You're one step away from seeing our Architecture
                leads"
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
              <ButtonField
                className="bg-primaryOrange text-white hover:text-primaryOrange border border-primaryOrange hover:bg-white hover font-medium w-full px-6 py-3 outline-none focus:outline-none ease-linear transition-all duration-150"
                type="submit"
                children="Submit"
                onClick={() => {
                  handleSubmit();
                }}
              />
              <ButtonField
                className="text-primaryOrange bg-white border border-primaryOrange hover:bg-primaryOrange hover:text-white w-full px-6 py-3 mt-3 font-medium outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                children="Cancel"
                onClick={() => {
                  setVisibleForUserSignUp(false);
                }}
              />
            </>
          }
        />
      )}
    </Formik>
  );
};

export default UserSignUpFrame;
