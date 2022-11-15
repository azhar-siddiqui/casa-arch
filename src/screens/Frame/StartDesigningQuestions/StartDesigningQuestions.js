import React, { useState } from 'react'
import ButtonField from "../../../components/ButtonsFields/ButtonField";

import { Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../../components/InputField/InputField";
import Modal from "../../../components/Modal/Modal";
import InputRadio from "../../../components/InputRadio/inputRadio";
import { useProjectChoicesMutation } from '../../../app/services/userServices';
import { useSelector } from 'react-redux';
// import ButtonField from '../../../components/ButtonsFields/ButtonField';

const initialValuesUserStepper = {
   selectFollowing: "Architecture",
   location: "",
   propertyType: "House",
   rooms: "Only one house"
};

const userStepper = [
   {
      step: 1,
      title: "Select among the following?",
      type: "radio",
      name: "selectFollowing",
      value: 0,
      preference: ["Residential Design", "Commercial Design", "Architecture", "Landscaping", "Restaurant Design", "Office Design "],
   },
   {
      step: 2,
      title: "Which city is the property located?",
      placeholder: 'Enter your City',
      type: "text",
      name: "location",
      value: '',
   },
   {
      step: 3,
      title: "What is the property type?",
      type: "radio",
      name: "propertyType",
      preference: [
         "Flat",
         "House",
      ],
   },
   {
      step: 4,
      title: "Which rooms do you wish to design?",
      type: "radio",
      name: "rooms",
      preference: ["Only one house", "Full house"],
   }
];

const userStepperSchema = Yup.object({
   selectFollowing: Yup.string().required("This field is required."),
   location: Yup.string().required("This field is required."),
   propertyType: Yup.string().required("This field is required."),
   rooms: Yup.string().required("This field is required."),
});

export default function StartDesigningQuestions({ setStartDesigningQuestionsActive, showSuccessModal }) {

   const [currentStepValue, setCurrentStepValue] = useState(userStepper);
   const [currentStep, setCurrentStep] = useState(0);
   const { isLoggedIn, userType, userId } = useSelector((state) => state.user);
   const [submitProjectChoices, response] = useProjectChoicesMutation()

   const handleStepperIncrement = () => {
      setCurrentStep(currentStep + 1);
   };
   const handleStepperDecrement = () => {
      setCurrentStep(currentStep - 1);
   };

   const handleSubmit = (values) => {
      let postData = userStepper.map((stepper) => {
         return {
            question: stepper.title,
            choice: values[stepper.name],
         };
      });
      let reqBody = {
         user: userId,
         design_type: currentStepValue[0].preference.indexOf(postData[0].choice),
         location: postData[1].choice,
         property_type: currentStepValue[2].preference.indexOf(postData[2].choice),
         rooms: currentStepValue[3].preference.indexOf(postData[3].choice),
      };
      console.log(reqBody);

      submitProjectChoices(reqBody)
         .then(res => {
            if (res.data) {
               console.log(res)
               // navigate('/professionals/list')
               showSuccessModal(true)
               setCurrentStep(0);
               setStartDesigningQuestionsActive(false)
            }
         })
         .catch(err => {
            console.log(err.response)
         })
   };

   return (
      <>
         <Formik
            initialValues={initialValuesUserStepper}
            onSubmit={handleSubmit}
            validationSchema={userStepperSchema}
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
                  setVisible={() => setStartDesigningQuestionsActive(false)}
                  description={currentStepValue[currentStep].title}
                  className="pt-5 font-medium text-base md:text-lg lg:text-3xl"
                  body={
                     currentStepValue[currentStep].type === "radio" ? (
                        <div className="mt-4">
                           {currentStepValue[currentStep].preference.map(
                              (pref, idx) => {
                                 return (
                                    <InputRadio
                                       key={idx}
                                       name={currentStepValue[currentStep].name}
                                       value={pref}
                                       checkedValue={
                                          values[currentStepValue[currentStep].name]
                                       }
                                       placeholder={
                                          currentStepValue[currentStep].placeholder
                                       }
                                       id={currentStepValue[currentStep].name}
                                       className="font-medium"
                                       type={currentStepValue[currentStep].type}
                                       label={
                                          currentStepValue[currentStep].type === "radio"
                                             ? pref
                                             : ""
                                       }
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       isLast={
                                          idx ===
                                             currentStepValue[currentStep].preference.length -
                                             1
                                             ? true
                                             : false
                                       }
                                       // value={}
                                       errorText={
                                          errors.name && touched.name ? errors.name : null
                                       }
                                    />
                                 );
                              }
                           )}
                        </div>
                     ) : (
                        <InputField
                           name={currentStepValue[currentStep].name}
                           placeholder={currentStepValue[currentStep].placeholder}
                           id={currentStepValue[currentStep].name}
                           className="font-medium"
                           type={currentStepValue[currentStep].type}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           // value={}
                           errorText={errors.name && touched.name ? errors.name : null}
                        />
                     )
                  }
                  footer={
                     <div className="flex items-center justify-between">
                        {currentStep > 0 ||
                           currentStep > currentStepValue.length - 1 ? (
                           <>
                              <ButtonField
                                 className="py-3 text-primaryGray   font-medium  outline-none focus:outline-none "
                                 type="submit"
                                 children="Back"
                                 onClick={handleStepperDecrement}
                              />
                              {currentStep === currentStepValue.length - 1 ? (
                                 <button
                                    className={`px-5 py-3 bg-primaryOrange border-primaryOrange text-white font-medium outline-none focus:outline-none ease-linear transition-all duration-150`}
                                    type="submit"
                                    onClick={handleSubmit}
                                 >
                                    Submit
                                 </button>
                              ) : (
                                 <ButtonField
                                    className={`px-5 py-3 bg-primaryOrange border-primaryOrange text-white font-medium outline-none focus:outline-none ease-linear transition-all duration-150 `}
                                    type="submit"
                                    children="Continue"
                                    onClick={handleStepperIncrement}
                                    disabled={
                                       currentStepValue[currentStep].name === 'location' ?
                                          values.location === '' ? true : false
                                          : currentStepValue[currentStep].name === 'email' ?
                                             values.email === '' ? true : false
                                             : false
                                    }
                                 />
                              )}
                           </>
                        ) : (
                           <button
                              className={`px-5 py-3 bg-primaryOrange border-primaryOrange text-white font-medium outline-none focus:outline-none ease-linear transition-all duration-150 disabled:opacity-60 `}
                              type="submit"
                              children="Continue"
                              onClick={handleStepperIncrement}
                              disabled={
                                 currentStepValue[currentStep].name === 'location' ?
                                    values.location === '' ? true : false
                                    : currentStepValue[currentStep].name === 'email' ?
                                       values.email === '' ? true : false
                                       : false
                              }
                           >
                              Continue
                           </button>

                        )}
                     </div>
                  }
               />
            )}
         </Formik>
      </>

   )
}
