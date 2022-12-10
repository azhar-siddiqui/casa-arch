import { useState, useEffect } from "react";
import styles from "./SubscriptionFrame.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../../components/InputField/InputField";
import Modal from "../../../components/Modal/Modal";
import ButtonField from "../../../components/ButtonsFields/ButtonField";
import SubDropIcon from "../../../assets/SubscriptionPlanIcon/SubscriptionDownIcon.svg";
import SubUpIcon from "../../../assets/SubscriptionPlanIcon/SubscriptionUpIcon.svg";
import { useProfessionalSubscribeMutation } from "../../../app/services/professionalServices";

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
  subscriptionPlan: { id: 0, val: "Monthly Plan ₹ 799" },
  AreaOfOperation: { id: 0, val: "Architecture" },
  portfolio: "",
  socialMedia: "",
};

const SubscriptionFrame = ({ setSubscriptionVisible }) => {
  let Token = localStorage.getItem("Token");
  const [subscription, setSubscriptionPlan] = useState(false);
  const [areaOfOperation, setAreaOfOperation] = useState(false);
  const toggleDropDownSubscription = () => {
    subscription ? setSubscriptionPlan(false) : setSubscriptionPlan(true);
  };
  const toggleDropDownAreaOIfOperation = () => {
    areaOfOperation ? setAreaOfOperation(false) : setAreaOfOperation(true);
  };
  const [professionalpayment, professionalpaymentResponse] =
    useProfessionalSubscribeMutation();

  const changeDropdownValue = (e, setFieldValue) => {
    // let name = e.target.className;
    // console.log("name", name);
    let value =
      e.currentTarget.firstElementChild.innerText +
      " " +
      e.currentTarget.lastElementChild.innerText;
    let id = parseInt(e.currentTarget.id);
    if (e.currentTarget.getAttribute("name") === "subscriptionPlan") {
      setFieldValue("subscriptionPlan", { id: id, val: value });
    } else if (e.currentTarget.getAttribute("name") === "AreaOfOperation") {
      setFieldValue("AreaOfOperation", { id: id, val: value });
    }
  };

  const handleSubmit = (values) => {
    let SubscriptionValue = {
      ...values,
      AreaOfOperation: values.AreaOfOperation.val,
      subscriptionPlan: values.subscriptionPlan.val,
    };
    let getIndex = (val, array) => {
      let idx = 0;
      array.map((item) => {
        if (item.val === val) {
          idx = item.id;
        }
      });
      return idx;
    };

    const getSubIndex = (val, array) => {
      let idx = 0;
      array.map((item) => {
        let str = `${item.val[0]} ${item.val[1]}`;
        if (str === val) {
          idx = item.id;
        }
      });
      return idx;
    };

    let bodydata = {
      name: SubscriptionValue.name,
      email: SubscriptionValue.email,
      phone: SubscriptionValue.phone,
      portfolio: SubscriptionValue.portfolio,
      website: SubscriptionValue.socialMedia,
      area_of_operation: getIndex(
        SubscriptionValue.AreaOfOperation.trim(),
        areaOfOperationValues
      ),
      subscription_type: getSubIndex(
        SubscriptionValue.subscriptionPlan,
        subscriptionValues
      ),
    };
    professionalpayment({ body: bodydata, token: Token });
    console.log("bodydata", bodydata);
  };

  useEffect(() => {
    console.log("professionalpaymentResponse", professionalpaymentResponse);
  }, [
    professionalpaymentResponse.isSuccess,
    professionalpaymentResponse.isError,
  ]);

  return (
    <Formik
      initialValues={initialValueData}
      onSubmit={handleSubmit}
      validationSchema={SignUpSchema}
    >
      {({
        handleChange,
        setFieldValue,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <Modal
          setVisible={setSubscriptionVisible}
          classNameModal={""}
          ModalTitle="Subscription"
          description="Help us understand what services you are seeking, and we will help you find the best Professional for you."
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
                    name="subscriptionPlan"
                    value={values.subscriptionPlan.val}
                    placeholder="Select your subscription plan"
                    className={`py-2.5 px-3 lg:px-6 ${styles.input}`}
                    onChange={() => {}}
                    autoComplete="off"
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
                            onClick={(e) => {
                              changeDropdownValue(e, setFieldValue);
                            }}
                            id={ele.id}
                            name="subscriptionPlan"
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
                    value={values.AreaOfOperation.val}
                    placeholder="Select your subscription plan"
                    className={`py-2.5 px-3 lg:px-6 ${styles.input}`}
                    onChange={() => {}}
                    id={"AreaOfOperation"}
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
                            id={ele.id}
                            onClick={(e) => {
                              changeDropdownValue(e, setFieldValue);
                            }}
                            name="AreaOfOperation"
                          >
                            <span>{ele.val}</span>
                            <span></span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </span>
              </>
              <InputField
                name="portfolio"
                label="Portfolio Link"
                placeholder="Enter your Portfolio link"
                id={"portfolio"}
                className="font-medium"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.portfolio}
                errorText={
                  errors.portfolio && touched.portfolio
                    ? errors.portfolio
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
