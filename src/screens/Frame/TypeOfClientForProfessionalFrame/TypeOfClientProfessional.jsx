import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjectChoiceMutation } from "../../../app/services/proQuestion";
import { CCheckbox } from "../../../components/CircularCheckbox/CCheckbox";
import Modal from "../../../components/Modal/Modal";
import SuccessModal from "../../../components/SuccessModal/SuccessModal";
import styles from "./TypeOfClientProfessional.module.css";

const TypeOfClientProfessional = ({ SetVisibleTypeOfClient }) => {
  const [projectChoice, projectChoiceResponse] = useProjectChoiceMutation();
  const [modalFields, setModalFields] = useState({});
  const [count, setCount] = useState(0);
  const [currStepperData, setCurrStepperData] = useState({
    id: "",
    name: "",
    heading: "",
    type: "",
    options: [],
  });
  const [successVisible, setsuccessVisible] = useState(false);

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

    console.log("COunt", count);
    console.log("modalFields", modalFields);
    console.log("currStepperData", currStepperData.name);
    console.log("Object.keys(modalFields).length", Object.keys(modalFields));
  };
  const decCount = () => {
    if (count > 0) {
      setCount(count - 1);
    } else return;
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (projectChoiceResponse.isSuccess) {
      setsuccessVisible(true);
      setTimeout(() => {
        SetVisibleTypeOfClient(false);
        setsuccessVisible(false);
      }, 2000);
      navigate("/leadsListing/1");
    } else if (projectChoiceResponse.isError) {
      // SetVisibleTypeOfClient(true);
      setsuccessVisible(false);
    }
  }, [projectChoiceResponse.isSuccess, projectChoiceResponse.isError]);

  let Token = localStorage.getItem("Token");
  const handleGetData = () => {
    // console.log(modalFields);
    const body = {
      client_type: data[0].options.indexOf(modalFields.typeOfClients),
      property_type: data[1].options.indexOf(modalFields.typeOfProperties),
      budget_type: data[2].options.indexOf(modalFields.budget),
    }
    console.log(body);
    projectChoice({ modalFields: body, Token: Token });
  };

  // console.log(currStepperData.options.length);
  // console.log(currStepperData.options);
  return (
    <>
      <Modal
        setVisible={SetVisibleTypeOfClient}
        description={`${currStepperData.heading}`}
        className="text-[16px] sm:text-[32px] "
        img=" "
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
                        modalFields[currStepperData.name] === ele
                          ? "#F36C25"
                          : ""
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
                disabled={
                  count === 2 && Object.keys(modalFields).length !== 3
                    ? true
                    : false
                }
              >
                Continue
              </button>
            ) : (
              <button
                className={styles.btn}
                onClick={incCount}
                disabled={
                  count === 0 && Object.keys(modalFields).length !== 1
                    ? true
                    : count === 1 && Object.keys(modalFields).length !== 2
                    ? true
                    : count === 2 && Object.keys(modalFields).length !== 3
                    ? true
                    : false
                }
                // disabled={
                //   currStepperData.name &&
                //   currStepperData[`${currStepperData.name}`]?.length === 0
                //     ? true
                //     : false
                // }
              >
                Next
              </button>
            )}
          </div>
        }
      />

      {successVisible && (
        <SuccessModal massage="Finding suitable clients for you" />
      )}
    </>
  );
};

export default TypeOfClientProfessional;
