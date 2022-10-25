import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/Modal/Modal";
import InputField from "../../../components/InputField/InputField";
import TextAreaFields from "../../../components/TextAreaFields/TextAreaFields";
import ButtonField from "../../../components/ButtonsFields/ButtonField";
import { useGetInTouchMutation } from "../../../app/services/getInTouchServices";

const initialValues = {
  fname: "",
  lname: "",
  email: "",
  phone: "",
  query: "",
};

const GetInTouchSchema = Yup.object({
  fname: Yup.string().required("This field is required."),
  lname: Yup.string().required("This field is required."),
  email: Yup.string()
    .email("Please Enter Valid Email")
    .required("This field is required."),
  phone: Yup.string()
    .required("This field is required.")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    ),
  query: Yup.string().required("This field is required."),
});

const GetInTouchFrame = (props) => {
  const { setVisibleGetInTouch } = props;
  const [getInTouchPost] = useGetInTouchMutation();
  // console.log("Get", getInTouchPost);
  // console.log("response", response);

  const handleSubmit = (values) => {
    console.log(values);
    getInTouchPost(values);
    setVisibleGetInTouch(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={GetInTouchSchema}
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
          setVisible={setVisibleGetInTouch}
          classNameModal={"pt-[110px]"}
          ModalTitle="Get In Touch"
          body={
            <>
              <InputField
                name="fname"
                label="Firstname"
                placeholder="Enter your Firstname"
                id={"fname"}
                className="font-medium"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fname}
                errorText={errors.fname && touched.fname ? errors.fname : null}
              />
              <InputField
                name="lname"
                label="Lastname"
                placeholder="Enter your Lastname"
                id={"lname"}
                className="font-medium"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lname}
                errorText={errors.lname && touched.lname ? errors.lname : null}
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
                name="phone"
                label="Phone Number"
                placeholder="Enter your number"
                id={"phone"}
                className="font-medium "
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                errorText={errors.phone && touched.phone ? errors.phone : null}
              />
              <TextAreaFields
                name="query"
                label="Query"
                id="query"
                placeholder="Enter your query"
                className="h-36 mt-4"
                onChange={handleChange}
                onBlur={handleBlur}
                errorText={errors.query && touched.query ? errors.query : null}
              />
            </>
          }
          footer={
            <div className="flex justify-center">
              <ButtonField
                className="bg-primaryOrange text-white hover:text-primaryOrange border border-primaryOrange hover:bg-white hover font-medium px-6 py-3 outline-none focus:outline-none ease-linear transition-all duration-150"
                type="submit"
                children="Submit"
                onClick={() => {
                  handleSubmit();
                }}
              />
            </div>
          }
        />
      )}
    </Formik>
  );
};

export default GetInTouchFrame;
