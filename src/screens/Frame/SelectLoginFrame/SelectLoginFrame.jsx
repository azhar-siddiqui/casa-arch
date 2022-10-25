import { useEffect } from "react";
import Modal from "../../../components/Modal/Modal";
import { useLocation } from "react-router-dom";
import ButtonField from "../../../components/ButtonsFields/ButtonField";

const SelectLoginFrame = (props) => {
  const { setVisible, setProButtonVisible, setVisibleForProfessionalLogin } =
    props;

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/professionals") {
      setProButtonVisible(false);
    } else {
      setProButtonVisible(true);
    }
  }, [location, setProButtonVisible]);

  const handleLoginForProfessional = () => {
    setVisible(false);
    setVisibleForProfessionalLogin(true);
  };

  return (
    <>
      <Modal
        setVisible={setVisible}
        description="Select among the following?"
        className="md:text-2xl"
        body={
          <>
            {location.pathname === "/professionals" ? (
              <ButtonField
                children="Login for Professional"
                icons={">"}
                className="flex items-center justify-between text-primaryOrange w-full border border-primaryOrange text-left px-5 py-5 my-8 font-medium md:text-2xl hover:text-white hover:bg-primaryOrange"
                onClick={handleLoginForProfessional}
              />
            ) : (
              <>
                <ButtonField
                  children="Login for Customer"
                  icons={">"}
                  className="flex items-center justify-between text-primaryOrange w-full border 
               border-primaryOrange text-left px-5 py-5 mt-8 font-medium md:text-2xl hover:text-white hover:bg-primaryOrange"
                />
                <ButtonField
                  children="Login for Professional"
                  icons={">"}
                  className="flex items-center justify-between text-primaryOrange w-full border border-primaryOrange text-left px-5 py-5 my-8 font-medium md:text-2xl hover:text-white hover:bg-primaryOrange"
                  onClick={handleLoginForProfessional}
                />
              </>
            )}
          </>
        }
      />
    </>
  );
};

export default SelectLoginFrame;
