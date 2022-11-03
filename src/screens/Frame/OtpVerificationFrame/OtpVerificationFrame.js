import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal/Modal";
import InputField from "../../../components/InputField/InputField";
import ButtonField from "../../../components/ButtonsFields/ButtonField";
import EyeIcon from "../../../assets/InputFieldIcons/EyeIcon.svg";
import { useVerifyOtpMutation, useResendOtpMutation } from "../../../app/services/userServices";
import TickIcon from '../../../assets/ModalIcon/Tick.svg'
import Loading from "../../../assets/InputFieldIcons/LoadingIcon.svg";
import WrongIcon from "../../../assets/InputFieldIcons/wrong.svg";
import CorrectIcon from "../../../assets/InputFieldIcons/correct.svg";

const initialValues = {
   otp: '',
};

const schema = Yup.object({

   otp: Yup.string()
      .required("This field is required."),
});

export default function OtpVerificationFrame({ setVisibleForOtpVerification, forgotPasswordEmail, setVisibleForResetPassword }) {

   const [verifyOtp, verifyOtpResponse] = useVerifyOtpMutation()
   const [resendOtp, resendOtpData] = useResendOtpMutation()
   const [successModalVisible, setsuccessModalVisible] = useState(false)
   const [loading, setLoading] = useState(false)
   const [loadingIconActive, setLoadingIconActive] = useState(false)
   const [loadingIcon, setLoadingIcon] = useState({src: Loading, toSpin: true})


   const handleResendOtp = async (values) => {
      setLoading(true)

      resendOtp({ email: forgotPasswordEmail })
         .then(res => {
            setLoading(false)
            if (res.status === 400) {
               alert('No such email')
               return
            } else {
               setsuccessModalVisible(true)
               setTimeout(() => {
                  setsuccessModalVisible(false)
               }, 4000);
               console.log(res.data)
            }

            // setVisibleForResetPassword(true)
         })
   }

   const handleOtpChange = async (otp) => {
      const reqBody = { otp: `${otp}`, email: forgotPasswordEmail }

      if (otp.length === 4) {
         setLoadingIconActive(true)
         verifyOtp(reqBody)
         .then(res => {
            console.log(res)
            if (res.data.status === 400) {
               setLoadingIcon({src: WrongIcon, toSpin: false})
               return
            } else {
               setLoadingIcon({src: CorrectIcon, toSpin: false})
            }
         })
      }else{
         setLoadingIcon({src: Loading, toSpin: true})
         setLoadingIconActive(false)
      }
   }

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
            } else {
               setVisibleForResetPassword(true)
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
               classNameModal={"pt-[110px] flex-col"}
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
                        onChange={e => {
                           handleChange(e); handleOtpChange(e.target.value)
                        }}
                        onBlur={handleBlur}
                        value={values.otp}
                        errorText={errors.otp && touched.otp ? errors.otp : null}
                        loadingIconActive={loadingIconActive}
                        LoadingIcon={loadingIcon}
                     />

                     <p className="text-right text-primaryOrange font-semibold mt-2">
                        <span onClick={handleResendOtp}>
                           Resend the Otp
                        </span>
                     </p>
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
               secondModalVisible={successModalVisible}
               secondModalBody={
                  successModalVisible &&
                  <div className="py-6 px-4 flex items-center text-slate-500 text-2xl">
                     <img src={TickIcon} className='mr-4' />
                     <p className="font-semibold">

                        Otp sent to <span className="text-black inline-block" >
                           {`${forgotPasswordEmail}`} </span>
                     </p>
                  </div>
               }
            />
         )}
      </Formik>
   )
}
