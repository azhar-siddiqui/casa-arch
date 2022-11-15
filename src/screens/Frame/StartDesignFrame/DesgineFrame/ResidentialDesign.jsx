import React, { useState, useEffect } from "react";
import ButtonField from "../../../../components/ButtonsFields/ButtonField";
import { CCheckbox } from "../../../../components/CircularCheckbox/CCheckbox";
import Modal from "../../../../components/Modal/Modal";
import styles from "../StartDesignFrame.module.css";

let data = [
  {
    id: 1,
    type: "text",
    name: "City",
    heading: "Which City is the property located?",
    placeholder: "Enter your City",
  },
  {
    id: 2,
    type: "radio",
    name: "propertyType",
    heading: "What is the property type?",
    options: ["Flat", "House"],
  },
  {
    id: 3,
    type: "radio",
    name: "designType",
    heading: "Which rooms do you wish to design?",
    options: ["Only one house", "Full house"],
  },
];
const ResidentialDesign = () => {
  const [stepper, setStepper] = useState(0);
  const [propertyType, setPropertyType] = useState("");

  const [currData, setCurrData] = useState({
    type: "",
    name: "",
    heading: "",
    options: [],
    placeholder: "",
  });

  useEffect(() => {
    setCurrData(data[stepper]);
  }, [stepper]);

  const handleChange = (e) => {};

  return (
    <Modal
      description={currData.heading}
      className="text-[16px] sm:text-[32px] pb-2 sm:pb-0"
      body={
        currData.type === "text" ? (
          <>
            <input
              type="text"
              name={currData.name}
              id={currData.name}
              value={propertyType}
              placeholder={currData.placeholder}
              className="w-full outline-none py-4 px-6 border border-[#CED4DA] text-[14px] text-[#08090A] font-semibold"
              autoComplete="off"
              onChange={(e) => {
                setPropertyType(e.target.value);
              }}
            />
          </>
        ) : (
          <>
            {currData.options.map((value, i) => (
              <React.Fragment key={i}>
                <div key={i}>
                  <input
                    type="radio"
                    aria-hidden
                    name={"design_type"}
                    id={i + "radio"}
                    hidden
                    // onInput={() => {
                    //   let dataCpy = [...data];
                    //   dataCpy.forEach((item, i) => {
                    //     if (item.id === ele.id) {
                    //       item.isActive = true;
                    //     } else {
                    //       item.isActive = false;
                    //     }
                    //   });
                    //   setData(dataCpy);
                    //   setCurrentStep(currentStep + 1);
                    // }}
                  />
                  <label
                    htmlFor={i + "radio"}
                    className={styles.checkbox_label}
                  >
                    <CCheckbox checked={value.isActive} />
                    <p className={styles.checkbox_text}>{value}</p>
                  </label>
                </div>
              </React.Fragment>
            ))}
          </>
        )
      }
      footer={
        <div className="flex justify-between">
          {stepper > 0 && (
            <ButtonField
              children="Back"
              className={"text-[#6D747A] font-medium text-[16px]"}
              onClick={() => {
                setStepper(stepper - 1);
              }}
            />
          )}
          {stepper === 2 ? (
            <ButtonField
              children="Continue"
              className={
                "text-white bg-primaryOrange font-medium text-[16px] px-6 py-2"
              }
              onClick={() => {
                console.log(propertyType);
              }}
            />
          ) : (
            <ButtonField
              children="Next"
              className={
                "text-white bg-primaryOrange font-medium text-[16px] px-6 py-2"
              }
              onClick={() => {
                setStepper(stepper + 1);
              }}
            />
          )}
        </div>
      }
    />
  );
};

export default ResidentialDesign;
