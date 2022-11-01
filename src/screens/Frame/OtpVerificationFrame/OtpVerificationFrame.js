import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal/Modal";
import InputField from "../../../components/InputField/InputField";
import ButtonField from "../../../components/ButtonsFields/ButtonField";
import EyeIcon from "../../../assets/InputFieldIcons/EyeIcon.svg";
import { useVerifyOtpMutation } from "../../../app/services/userServices";


const initialValues = {
   otp: '',
};

const schema = Yup.object({

   otp: Yup.string()
      .required("This field is required."),
});

export default function OtpVerificationFrame({ setVisibleForOtpVerification, forgotPasswordEmail }) {

   const [verifyOtp, verifyOtpResponse] = useVerifyOtpMutation()

   const handleSubmit = async (values) => {
      // console.log(values)
      const reqBody = { otp: `${values.otp}`, email: forgotPasswordEmail }
      console.log(reqBody)
      
      verifyOtp(reqBody)
         .then(res => {
            console.log(res)
            if (res.data.status === 400) {
               alert('Wrong otp')
               return
            }

         })
   }

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
               setVisible={setVisibleForOtpVerification}
               classNameModal={"pt-[110px]"}
               ModalTitle="OTP verification"
               description={`Please enter your OTP that sent to ${forgotPasswordEmail}`}
               body={
                  <>

                     <InputField
                        name="otp"
                        label="OTP"
                        placeholder="Enter your otp"
                        id={"otp"}
                        className="font-medium "
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.otp}
                        errorText={errors.otp && touched.otp ? errors.otp : null}
                     />

                  </>
               }
               footer={
                  <>
                     <ButtonField
                        className="bg-primaryOrange text-white hover:text-primaryOrange border border-primaryOrange hover:bg-white hover font-medium w-full px-6 py-3 outline-none focus:outline-none ease-linear transition-all duration-150"
                        type="submit"
                        children="Reset Password"
                        onClick={() => {
                           handleSubmit();
                        }}
                     />
                     <ButtonField
                        className="text-primaryOrange bg-white border border-primaryOrange hover:bg-primaryOrange hover:text-white w-full px-6 py-3 mt-3 font-medium outline-none focus:outline-none ease-linear transition-all duration-150"
                        type="button"
                        children="Back to Login"
                        onClick={() => {
                           setVisibleForOtpVerification(false);
                        }}
                     />
                  </>
               }
            />
         )}
      </Formik>
   )
}
