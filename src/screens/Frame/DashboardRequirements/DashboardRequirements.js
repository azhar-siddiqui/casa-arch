import React from 'react'
import * as Yup from "yup";
import { Formik } from 'formik';

import ButtonField from '../../../components/ButtonsFields/ButtonField';
import InputField from '../../../components/InputField/InputField';
import TextAreaFields from '../../../components/TextAreaFields/TextAreaFields';
import InputSelect from '../../../components/InputSelect/InputSelect';
import { useSelector } from 'react-redux';
import { usePostRequirementsMutation } from '../../../app/services/userServices';

const initialValues = {
  projectName: '',
  projectLocation: '',
  projectBudget: '0-25000',
  aestheticRequirements: 'Bohemian',
  projectDetails: '',
}

const Schema = Yup.object({
  projectName: Yup.string().required("This field is required.")
    .matches(
      /^[A-Za-z]+$/,
      "Project name must only contain letters"
    )
    .max(40, "Only 40 characters are allowed"),
  projectLocation: Yup.string().required("This field is required.")
    .max(60, "Only 60 characters are allowed")
    .matches(
      /[A-Za-z0-9'\.\-\s\,]/,
      "Project Location must not contain special letters"
    ),
  projectBudget: Yup.string().required("This field is required."),
  aestheticRequirements: Yup.string().required("This field is required."),
  projectDetails: Yup.string().required("This field is required.")
    .max(100, "Only 100 characters are allowed"),
})

export default function DashboardRequirements({ displaySuccessModal, setRequirementsVisible, setIsRequirementPosted, requirementValues, budgetValues }) {

  const { userId } = useSelector(state => state.user)
  const [postRequirements, data] = usePostRequirementsMutation()

  const handleSubmit = async (values) => {

    const postData = {
      project_name: values.projectName,
      project_location: values.projectLocation,
      project_budget: budgetValues.indexOf(values.projectBudget),
      aesthetic_req: requirementValues.indexOf(values.aestheticRequirements),
      project_details: values.projectDetails,
      user: userId
    }
    console.log("Value", postData)
    postRequirements(postData)
      .then(res => {
        console.log(res)
        setRequirementsVisible(false)
        displaySuccessModal()
        setIsRequirementPosted(true)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
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
          <div className='p-4 border' >
            <p className='text-2xl font-bold mb-2'>
              Project Requirements
            </p>
            <p className='text-xs text-slate-500 mb-3 font-bold' >
              Help us UnderStand what Services you are Seeking, and we will help you find the best Professional for you.
            </p>
            <InputField
              name="projectName"
              label="Project Name"
              placeholder="Project Name"
              id={"projectname"}
              className="font-medium"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.projectName}
              errorText={errors.projectName && touched.projectName ? errors.projectName : null}
            />
            <InputField
              name="projectLocation"
              label="Project Location"
              placeholder="Project Location"
              id={"projectLocation"}
              className="font-medium"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.projectLocation}
              errorText={errors.projectLocation && touched.projectLocation ? errors.projectLocation : null}
            />
            <InputSelect name="projectBudget"
              label="Project Budget"
              optionData={budgetValues}
              placeholder="Enter your Project Budget"
              id={"projectBudget"}
              className="font-medium"
              type="number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.projectBudget}
              errorText={errors.projectBudget && touched.projectBudget ? errors.projectBudget : null}
            />

            <InputSelect
              name="aestheticRequirements"
              label="Aesthetic Requirements"
              optionData={requirementValues}
              placeholder="Aesthetic Requirements"
              id={"aestheticRequirements"}
              className="font-medium"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.aestheticRequirements}
              errorText={errors.aestheticRequirements && touched.aestheticRequirements ? errors.aestheticRequirements : null}
            />
            <TextAreaFields
              name="projectDetails"
              label="Project Details"
              placeholder="Project Details"
              id={"projectDetails"}
              className="font-medium mt-2"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.projectDetails}
              errorText={errors.projectDetails && touched.projectDetails ? errors.projectDetails : null}
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
  )
}
