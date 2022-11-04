import { useState } from "react";
import styles from "./SubscriptionFrame.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../../components/InputField/InputField";
import Modal from "../../../components/Modal/Modal";
import ButtonField from "../../../components/ButtonsFields/ButtonField";
import SubDropIcon from "../../../assets/SubscriptionPlanIcon/SubscriptionDownIcon.svg";
import SubUpIcon from "../../../assets/SubscriptionPlanIcon/SubscriptionUpIcon.svg";

const subscriptionValues = [
  {
    id: 0,
    val: ["Monthly Plan", "₹ 799"],
  },
  {
    id: 1,
    val: ["Yearly Plan", "₹ 7999"],
  },
];

const areaOfOperationValues = [
  {
    id: 0,
    val: "Architecture",
  },
  {
    id: 1,
    val: "Interior Design",
  },
];

const SignUpSchema = Yup.object({
  name: Yup.string().required("This field is required."),
  email: Yup.string()
    .email("Please Enter Valid Email")
    .required("This field is required."),
  phone: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8, "The Number Should be 10 digits")
    .required("A phone number is required"),
});

const initialValueData = {
  name: "",
  email: "",
  phone: "",
  subscriptionPlan: { id: 0, val: "" },
  AreaOIfOperation: { id: 0, val: "" },
  portfolioLink: "",
  socialMedia: "",
};

const SubscriptionFrame = () => {
  const [subscription, setSubscriptionPlan] = useState(false);
  const [areaOfOperation, setAreaOIfOperation] = useState(false);

  const [initialValues, SetInitialValues] = useState(initialValueData);

  const toggleDropDownSubscription = () => {
    subscription ? setSubscriptionPlan(false) : setSubscriptionPlan(true);
  };
  const toggleDropDownAreaOIfOperation = () => {
    areaOfOperation ? setAreaOIfOperation(false) : setAreaOIfOperation(true);
  };

  const changeDropdownValue = (e) => {
    // let name = e.target.className;
    // console.log("name", name);
    let value = e.target.innerHTML;
    console.log(value);
    let id = parseInt(e.target.id);
    SetInitialValues({ ...initialValues, [initialValues]: { id, value } });
  };

  const handleSubmit = () => {
    console.log("Subscription Value", initialValues);
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
          //   setVisible={}
          classNameModal={"pt-[310px]"}
          ModalTitle="Subscription"
          description="Help us UnderStand what Services you are Seeking, and we will help you find the best Professional for you."
          body={
            <>
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
                placeholder="Enter your Phone number"
                id={"phone"}
                className="font-medium"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                errorText={errors.phone && touched.phone ? errors.phone : null}
              />
              <>
                <label htmlFor="subscription" className="block mt-5 mb-4">
                  Subscription Plan
                </label>
                <span onClick={toggleDropDownSubscription} className="relative">
                  <input
                    type="text"
                    name="subscription"
                    value={initialValues.subscriptionPlan.val}
                    readOnly
                    placeholder="Select your subscription plan"
                    className={`py-2.5 px-3 lg:px-6 ${styles.input}`}
                  />
                  {subscription ? (
                    <img
                      src={SubUpIcon}
                      alt="SubUpIcon"
                      className={styles.dropdown_icon}
                    />
                  ) : (
                    <img
                      src={SubDropIcon}
                      alt="SubDropIcon"
                      className={styles.dropdown_icon}
                    />
                  )}
                  {subscription && (
                    <ul className={styles.dropdown}>
                      {subscriptionValues.map((ele) => {
                        return (
                          <li
                            key={ele.id}
                            className="subscription hover:bg-[#CED4DA] hover:text-black px-3 md:px-6 py-3 text-[16px] flex justify-between"
                            onClick={changeDropdownValue}
                            id={ele.id}
                          >
                            <span>{ele.val[0]}</span>
                            <span>{ele.val[1]}</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </span>
              </>
              <>
                <label htmlFor="AreaOfOperation" className="block mt-5 mb-4">
                  Area of Operation
                </label>
                <span
                  onClick={toggleDropDownAreaOIfOperation}
                  className="relative"
                >
                  <input
                    type="text"
                    name="AreaOfOperation"
                    value={initialValues.AreaOIfOperation.val}
                    readOnly
                    placeholder="Select your subscription plan"
                    className={`py-2.5 px-3 lg:px-6 ${styles.input}`}
                  />
                  {areaOfOperation ? (
                    <img
                      src={SubUpIcon}
                      alt="SubUpIcon"
                      className={styles.dropdown_icon}
                    />
                  ) : (
                    <img
                      src={SubDropIcon}
                      alt="SubDropIcon"
                      className={styles.dropdown_icon}
                    />
                  )}
                  {areaOfOperation && (
                    <ul className={`${styles.dropdown}`}>
                      {areaOfOperationValues.map((ele) => {
                        return (
                          <li
                            key={ele.id}
                            className="subscription hover:bg-[#CED4DA] hover:text-black px-3 md:px-6 py-3 text-[16px] flex justify-between"
                            onClick={changeDropdownValue}
                            id={ele.id}
                          >
                            <span>{ele.val}</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </span>
              </>
              <InputField
                name="portfolioLink"
                label="Portfolio Link"
                placeholder="Enter your Portfolio link"
                id={"portfolioLink"}
                className="font-medium"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.portfolioLink}
                errorText={
                  errors.portfolioLink && touched.portfolioLink
                    ? errors.portfolioLink
                    : null
                }
              />
              <InputField
                name="socialMedia"
                label="Website/Social Media Link(optional)"
                placeholder="Enter your Website/Social media link"
                id={"socialMedia"}
                className="font-medium"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.socialMedia}
                errorText={
                  errors.socialMedia && touched.socialMedia
                    ? errors.socialMedia
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
                children="Complete Payment"
                onClick={() => {
                  handleSubmit();
                }}
              />
            </>
          }
        />
      )}
    </Formik>
  );
};

export default SubscriptionFrame;
