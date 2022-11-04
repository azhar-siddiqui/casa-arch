import { useState, useEffect } from "react";
import Modal from "../../../components/Modal/Modal";
import { CCheckbox } from "../../../components/CircularCheckbox/CCheckbox";
import styles from "./StartDesignFrame.module.css";

const StartDesignFrame = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [innerCurrentStep, setInnerCurrentStep] = useState(0);
  const [innerCurrentStep1, setInnerCurrentStep1] = useState(0);
  const [selectedDesignType, setSelectedDesignType] = useState(null);

  const [data, setData] = useState([
    {
      id: 1,
      design_type: "Residential Design",
      isActive: false,
      options: [
        {
          id: 1,
          heading: "Which city is the property located at?",
          placeholder: "Enter your City",
          type: "text",
        },
        {
          id: 2,
          heading: "What is the property type?",
          type: "radio",
          name: "propertyType",
          options: [
            {
              id: 1,
              design_type: "Flat",
            },
            {
              id: 2,
              design_type: "House",
            },
          ],
        },
        {
          id: 3,
          heading: "Which rooms do you wish to design?",
          type: "radio",
          name: "designType",
          options: [
            {
              id: 1,
              design_type: "Only one house",
            },
            {
              id: 2,
              design_type: "Full house",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      design_type: "Commercial Design",
      isActive: false,
    },
    {
      id: 3,
      design_type: "Architecture",
      isActive: false,
    },
    {
      id: 4,
      design_type: "Landscaping",
      isActive: false,
    },
    {
      id: 5,
      design_type: "Restaurant Design",
      isActive: false,
    },
    {
      id: 6,
      design_type: "Office Design ",
      isActive: false,
    },
  ]);

  const handleBoxChange = () => {};

  switch (currentStep) {
    case 1:
      return (
        <Modal
          description="Select among the following?"
          className="text-[16px] sm:text-[32px]"
          body={
            <>
              {data.map((ele, i) => {
                return (
                  <div key={i}>
                    <input
                      type="radio"
                      aria-hidden
                      name={"design_type"}
                      id={i + "radio"}
                      hidden
                      onInput={() => {
                        let datacpy = [...data];
                        datacpy.forEach((item, i) => {
                          if (item.id === ele.id) {
                            item.isActive = true;
                          } else {
                            item.isActive = false;
                          }
                        });
                        setData(datacpy);
                        setCurrentStep(currentStep + 1);
                      }}
                    />
                    <label
                      htmlFor={i + "radio"}
                      className={styles.checkbox_label}
                    >
                      <CCheckbox checked={ele.isActive} />
                      <p className={styles.checkbox_text}>{ele.design_type}</p>
                    </label>
                  </div>
                );
              })}
            </>
          }
        />
      );
    case 2:
      return data.map(
        (item) =>
          item.isActive && (
            <Modal
              description={item.options[innerCurrentStep].heading}
              className="text-[16px] sm:text-[32px]"
              key={item.id}
              body={
                item.options[innerCurrentStep].type === "text" ? (
                  <input
                    type={`${item.options[innerCurrentStep].type}`}
                    // onChange={}
                    // value={}
                    // name={}
                    placeholder={item.options[innerCurrentStep].placeholder}
                    // id={}
                    className={styles.text_inp}
                    autoComplete="off"
                  />
                ) : (
                  // console.log(item.options[innerCurrentStep].options)

                  item.options[innerCurrentStep].options.map((ele, i) => {
                    return (
                      <div key={i}>
                        <input
                          type="radio"
                          aria-hidden
                          name={"design_type"}
                          id={i + "radio"}
                          hidden
                          onInput={() => {
                            let datacpy = [...data];
                            datacpy.forEach((item, i) => {
                              if (item.id === ele.id) {
                                item.isActive = true;
                              } else {
                                item.isActive = false;
                              }
                            });
                            setData(datacpy);
                          }}
                        />
                        <label
                          htmlFor={i + "radio"}
                          className={styles.checkbox_label}
                        >
                          <CCheckbox checked={ele.isActive} />
                          <p className={styles.checkbox_text}>
                            {ele.design_type}
                          </p>
                        </label>
                      </div>
                    );
                  })
                )
              }
              footer={
                <div className={styles.bottom}>
                  <p className={styles.back} onClick={() => alert("ds")}>
                    Back
                  </p>
                  {/* {innerCurrentStep ===
                  item.options[innerCurrentStep].options?.length ? (
                    <button className={styles.btn}>Continue</button>
                  ) : (
                  )} */}
                  <button
                    className={styles.btn}
                    onClick={() => {
                      setInnerCurrentStep(innerCurrentStep + 1);
                    }}
                  >
                    Next
                  </button>
                </div>
              }
            />
          )
      );

    default:
      return <></>;
  }
};

export default StartDesignFrame;
