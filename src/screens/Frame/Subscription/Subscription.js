import React from 'react'
import * as Yup from "yup";
import { Formik } from 'formik';

import ButtonField from '../../../components/ButtonsFields/ButtonField';
import InputField from '../../../components/InputField/InputField';
import TextAreaFields from '../../../components/TextAreaFields/TextAreaFields';
import InputSelect from '../../../components/InputSelect/InputSelect';
import { useSelector } from 'react-redux';
import Modal from '../../../components/Modal/Modal';
import { useProfessionalSubscribeMutation } from '../../../app/services/professionalServices';
import { useNavigate } from 'react-router-dom';

const initialValues = {
   name: '',
   email: '',
   phone: 0,
   subscriptionPlan: 'sub 1',
   areaOfOperation: 'area 1',
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
   'sub 1', 'sub 2'
]
const areaOfOperations = [
   'area 1', 'area 2'
]

export default function Subscription({ setVisibleForSubscription }) {

   const { userId } = useSelector(state => state.user)
   const [subscribe, subscribeResponse] = useProfessionalSubscribeMutation()
   const navigate = useNavigate()

   const handleSubmit = async (values) => {
      // console.log("Value", values)

      const body = {
         name: values.name,
         email: values.email,
         phone: parseInt(values.phone),
         portfolio: values.portfolioLink,
         website: values.socialMediaLink,
         area_of_operation: areaOfOperations.indexOf(values.areaOfOperation),
         subscription_type: subscriptionPlans.indexOf(values.subscriptionPlan),
         is_paid: false
      }
      console.log(body)
      subscribe(body)
         .then(res => {
            console.log(res)
            if (res.error) {
               return alert('Something went wrong')
            } else {
               if (res.data) {
                  window.open(res.data.msg)
                  setVisibleForSubscription(false)
               }
            }
         })
         .catch(err => {
            console.log(err)
         })
   }

   return (
      <Modal
         setVisible={setVisibleForSubscription}
         ModalTitle="Subscription"
         headerClassName='mt-0 md:mt-4'
         description="Help us UnderStand what Services you are Seeking, and 
         we will help you find the best Professional for you."
         className="pt-2 md:pt-2 text-sm md:text-base font-normal"
         SignUpText=" SignUp now"
         maxWidthClass='max-w-601'
         body={
            <div className=''>
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
                     <div className='p-0 md:[&>*]:pb-4' >
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
                           optionData={areaOfOperations}
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
                           label="Portfolio Link"
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
                           label="Website/Social Media Link(optional)"
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
                           children="Complete Payment"
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
