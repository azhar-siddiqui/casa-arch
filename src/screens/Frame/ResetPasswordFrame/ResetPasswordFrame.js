import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal/Modal";
import InputField from "../../../components/InputField/InputField";
import ButtonField from "../../../components/ButtonsFields/ButtonField";
import EyeIcon from "../../../assets/InputFieldIcons/EyeIcon.svg";
import { useJoinUserMutation } from "../../../app/services/userServices";

const initialValues = {
   password: "",
   confirmPassword: "",
};

const schema = Yup.object({

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
});

const ResetPasswordFrame = (props) => {
   const [createUser, data] = useJoinUserMutation()
   const { setVisibleForResetPassword } = props;
   const [vpass, setVPass] = useState("password");
   const [vpassConfirm, setVPassConfirm] = useState("password");

   console.log(data)

   const handleSubmit = async (values) => {
      console.log(values)
      // sendOtp(values)
      // .then(res=>{
      //    console.log(res)
      //    if(res.ststus === 400){
      //       alert('No such email')
      //       return
      //    }
      // })
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
         validationSchema={schema}
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
               setVisible={setVisibleForResetPassword}
               classNameModal={"pt-[110px]"}
               ModalTitle="Reset Password"
               description="Enter the new password for your account"
               body={
                  <>
                     
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
                           setVisibleForResetPassword(false);
                        }}
                     />
                  </>
               }
            />
         )}
      </Formik>
   );
};

export default ResetPasswordFrame;
