import { useEffect, useState } from "react";
import { CCheckbox } from "../../../components/CircularCheckbox/CCheckbox";
import Modal from "../../../components/Modal/Modal";
import styles from "./TypeOfClientProfessional.module.css";

const TypeOfClientProfessional = () => {
  const [modalFields, setModalFields] = useState({});
  const [count, setCount] = useState(0);
  const [currStepperData, setCurrStepperData] = useState({
    id: "",
    name: "",
    heading: "",
    type: "",
    options: [],
  });

  const data = [
    {
      id: 1,
      name: "typeOfClients",
      heading: "What type of clients are you looking for?",
      options: ["Individual residents", "Commercial groups"],
    },
    {
      id: 2,
      name: "typeOfProperties",
      heading: "What kind of properties do you have expertise in?",
      options: [
        "Commercial Units",
        "Residential Flats",
        "Farm Houses/Villas",
        "Professional Cubicles",
      ],
    },
    {
      id: 3,
      name: "budget",
      heading: "What is your Budget Scale to work with?",
      options: ["Only High Profile", "Not defined"],
    },
  ];

  const handleBoxChange = (name, val) => {
    // let { name } = e.target;
    setModalFields({ ...modalFields, [name]: val });
  };

  useEffect(() => {
    setCurrStepperData(data[count]);
  }, [count]);

  const incCount = () => {
    if (count !== data.length - 1) {
      setCount(count + 1);
    } else return;
  };
  const decCount = () => {
    if (count > 0) {
      setCount(count - 1);
    } else return;
  };

  const handleGetData = () => {
    console.log("incCount", modalFields);
  };
  return (
    <Modal
      description={`${currStepperData.heading}`}
      className="text-[16px] sm:text-[32px] "
      body={
        <>
          {currStepperData.options.map((ele, i) => {
            return (
              // <div key={i} className={styles.input_div}>
              <div key={i}>
                <input
                  type="radio"
                  aria-hidden
                  name={currStepperData.name}
                  id={i}
                  hidden
                />
                <label
                  htmlFor={i}
                  onClick={() => {
                    handleBoxChange(currStepperData.name, ele);
                  }}
                  style={{
                    borderColor: `${
                      modalFields[currStepperData.name] === ele ? "#F36C25" : ""
                    }`,
                  }}
                  className={styles.checkbox_label}
                >
                  <CCheckbox
                    checked={modalFields[currStepperData.name] === ele}
                  />
                  <p
                    className={styles.checkbox_text}
                    style={{
                      color: `${
                        modalFields[currStepperData.name] === ele
                          ? ""
                          : "#939CA3"
                      }`,
                    }}
                  >
                    {ele}
                  </p>
                </label>
              </div>
            );
          })}
        </>
      }
      footer={
        <div className={styles.bottom}>
          <p className={styles.back} onClick={decCount}>
            Back
          </p>
          {count === 2 ? (
            <button
              className={styles.btn}
              onClick={() => {
                handleGetData();
              }}
            >
              Continue
            </button>
          ) : (
            <button
              className={styles.btn}
              onClick={incCount}
              disabled={
                currStepperData.name &&
                currStepperData[`${currStepperData.name}`]?.length === 0
                  ? true
                  : false
              }
            >
              Next
            </button>
          )}
        </div>
      }
    />
  );
};

export default TypeOfClientProfessional;
