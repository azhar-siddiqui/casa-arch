import React from 'react'
import * as Yup from "yup";
import { Formik } from 'formik';

import ButtonField from '../../../components/ButtonsFields/ButtonField';
import InputField from '../../../components/InputField/InputField';
import TextAreaFields from '../../../components/TextAreaFields/TextAreaFields';
import InputSelect from '../../../components/InputSelect/InputSelect';
import { useSelector } from 'react-redux';
import { usePostRequirementsMutation } from '../../../app/services/userServices';
import Modal from '../../../components/Modal/Modal';

const initialValues = {
   name: '',
   email: '',
   phone: 0,
   subscriptionPlan: 'Bohemian',
   areaOfOperation: '',
   portfolioLink: '',
   socialMediaLink: ''
}

const Schema = Yup.object({
   name: Yup.string().required("This field is required."),
   email: Yup.string().required("This field is required."),
   phone: Yup.number().required("This field is required."),
   subscriptionPlan: Yup.string().required("This field is required."),
   areaOfOperation: Yup.string().required("This field is required."),
   portfolioLink: Yup.string().required("This field is required."),
   socialMediaLink: Yup.string().required("This field is required."),
})

const subscriptionPlans = [
   'sdsad', 'dasdsadas'
]
export default function Subscription({setPricingSubscriptionMoadl}) {

   const { userId } = useSelector(state => state.user)
   // const [postRequirements, data] = usePostRequirementsMutation()

   const handleSubmit = async (values) => {
      console.log("Value", values)

      //  const postData = {
      //    project_name: values.projectName,
      //    project_location: values.projectLocation,
      //    project_budget: budgetValues.indexOf(values.projectBudget),
      //    aesthetic_req: requirementValues.indexOf(values.aestheticRequirements),
      //    project_details: values.projectDetails,
      //    user: userId
      //  }
      //  postRequirements(postData)
      //    .then(res => {
      //      console.log(res)
      //    //   setRequirementsVisible(false)
      //    //   isRequirementPosted(true)
      //    })
      //    .catch(err => {
      //      console.log(err)
      //    })
   }

   return (
      <Modal
         setVisible={setPricingSubscriptionMoadl}
         ModalTitle="Subscription"
         description="Help us UnderStand what Services you are Seeking, and 
         we will help you find the best Professional for you."
         className="pt-5 font-normal"
         SignUpText=" SignUp now"
         body={
            <div className='max-w-601 mx-auto'>
               <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={Schema}
               >
                  {({
                     handleChange,
                     handleBlur,
                     handleSubmit,
                     values,
                     errors,
                     touched,
                  }) => (
                     <div className='p-4' >
                        {/* <p className='text-2xl font-bold mb-2'>
                           Subscription
                        </p>
                        <p className='text-xs text-slate-500 mb-3 font-bold' >
                           Help us UnderStand what Services you are Seeking, and
                           we will help you find the best Professional for you.
                        </p> */}
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
                           className="font-medium"
                           type="text"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.email}
                           errorText={errors.email && touched.email ? errors.email : null}
                        />
                        <InputField
                           name="phone"
                           label="Phone Number"
                           placeholder="Enter your Phone number"
                           id={"phone"}
                           className="font-medium"
                           type="text"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.phone}
                           errorText={errors.phone && touched.phone ? errors.phone : null}
                        />
                        <InputSelect name="subscriptionPlan"
                           label="Subscription Plan"
                           optionData={subscriptionPlans}
                           placeholder="Enter your Subscription Plan"
                           id={"subscriptionPlan"}
                           className="font-medium"
                           type="number"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.subscriptionPlan}
                           errorText={errors.subscriptionPlan && touched.subscriptionPlan ? errors.subscriptionPlan : null}
                        />

                        <InputSelect
                           name="areaOfOperation"
                           label="Area of Operation"
                           optionData={subscriptionPlans}
                           placeholder="Enter your Area of Operation"
                           id={"areaOfOperation"}
                           className="font-medium"
                           type="text"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.areaOfOperation}
                           errorText={errors.areaOfOperation && touched.areaOfOperation ? errors.areaOfOperation : null}
                        />
                        <InputField
                           name="portfolioLink"
                           label="portfolioLink"
                           placeholder="Enter your Portfolio Link"
                           id={"portfolioLink"}
                           className="font-medium"
                           type="text"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.portfolioLink}
                           errorText={errors.portfolioLink && touched.portfolioLink ? errors.portfolioLink : null}
                        />
                        <InputField
                           name="socialMediaLink"
                           label="socialMediaLink Number"
                           placeholder="Website/Social Media Link(optional)"
                           id={"socialMediaLink"}
                           className="font-medium"
                           type="text"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.socialMediaLink}
                           errorText={errors.socialMediaLink && touched.socialMediaLink ? errors.socialMediaLink : null}
                        />
                        <ButtonField
                           className="mt-6 bg-primaryOrange text-white hover:text-primaryOrange border border-primaryOrange hover:bg-white hover font-medium w-full px-6 py-3 outline-none focus:outline-none ease-linear transition-all duration-150"
                           type="submit"
                           children="Submit"
                           onClick={handleSubmit}
                        />

                     </div>
                  )}
               </Formik>
            </div>
         }
      />
   )
}
