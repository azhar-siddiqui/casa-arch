import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal/Modal";
import InputField from "../../../components/InputField/InputField";
import ButtonField from "../../../components/ButtonsFields/ButtonField";
import EyeIcon from "../../../assets/InputFieldIcons/EyeIcon.svg";
import { useJoinUserMutation, useSendOtpMutation, useResendOtpMutation } from "../../../app/services/userServices";

const initialValues = {
   email: "",
};

const schema = Yup.object({

   email: Yup.string()
      .email("Please Enter Valid Email")
      .required("This field is required."),
});

const ForgotPasswordFrame = (props) => {
   const { setvisibleForForgotPassword, setVisibleForOtpVerification, setForgotPasswordEmail, setVisibleForUserLogin } = props;
 
   const [sendOtp, otpData] = useSendOtpMutation()
   const [loading, setLoading] = useState(false)

   const handleSubmit = async (values) => {
      console.log(values)
      setLoading(true)

      sendOtp(values)
         .then(res => {
            setLoading(false)
            console.log(res)
            if (res.status === 400) {
               alert('No such email')
               return
            }
            setForgotPasswordEmail(values.email)
            setvisibleForForgotPassword(false)
            setVisibleForOtpVerification(true)
         })
   };

   return (
      <>
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
               <>
                  <Modal
                     setVisible={setvisibleForForgotPassword}
                     classNameModal={"pt-[110px] flex-col"}
                     ModalTitle="Forgot Password"
                     description="Enter the email address associated with this account.We’ll send OTP verfication."
                     className='pt-2 text-xs md:text-base font-normal'
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

                        </>
                     }
                     footer={
                        <div className="flex flex-col items-center">
                           <ButtonField
                              className="bg-primaryOrange text-white hover:text-primaryOrange border border-primaryOrange hover:bg-white hover font-medium w-full px-6 py-3 outline-none focus:outline-none ease-linear transition-all duration-150"
                              type="submit"
                              children="Get OTP"
                              disabled={loading}
                              onClick={() => {
                                 handleSubmit();
                              }}
                           />
                           <ButtonField
                              className="text-primaryOrange underline bg-white px-6 py-1 mt-5 mb-2 font-medium outline-none focus:outline-none ease-linear transition-all duration-150"
                              type="button"
                              children="Back to Login"
                              onClick={() => {
                                 setvisibleForForgotPassword(false);
                                 setVisibleForUserLogin(true);
                              }}
                           />


                        </div>
                     }
                     
                  />

               </>

            )}
         </Formik>

      </>
   );
};

export default ForgotPasswordFrame;
