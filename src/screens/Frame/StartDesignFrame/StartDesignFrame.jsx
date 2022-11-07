import { useState } from "react";
import Modal from "../../../components/Modal/Modal";
import { CCheckbox } from "../../../components/CircularCheckbox/CCheckbox";
import styles from "./StartDesignFrame.module.css";

const StartDesignFrame = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [innerCurrentStep, setInnerCurrentStep] = useState(0);
  // const [innerCurrentStep1, setInnerCurrentStep1] = useState(0);
  // const [selectedDesignType, setSelectedDesignType] = useState(null);

  const [data, setData] = useState([
    {
      id: 1,
      design_type: "Residential Design",
      isActive: false,
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
                        let dataCpy = [...data];
                        dataCpy.forEach((item, i) => {
                          if (item.id === ele.id) {
                            item.isActive = true;
                          } else {
                            item.isActive = false;
                          }
                        });
                        setData(dataCpy);
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
    default:
      return <></>;
  }
};

export default StartDesignFrame;
