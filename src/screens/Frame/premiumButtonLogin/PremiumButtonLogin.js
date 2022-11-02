import { useEffect } from "react";
import Modal from "../../../components/Modal/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonField from "../../../components/ButtonsFields/ButtonField";

const PremiumButtonLogin = (props) => {
  const { setVisibleForPremiumButtonLogin, setProButtonVisible, setVisibleForProfessionalLogin, } =
    props;

  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === "/professionals") {
      setProButtonVisible(false);
    } else {
      setProButtonVisible(true);
    }
  }, [location, setProButtonVisible]);

  const handleLoginForProfessional = () => {
    setVisibleForPremiumButtonLogin(false);
    setVisibleForProfessionalLogin(true);
  };

  const handleJoinAsProfessional = () => {
    setVisibleForPremiumButtonLogin(false);
    navigate('/professionals')
    // setVisibleForUserLogin(true);
  };

  return (
    <>
      <Modal
        setVisible={setVisibleForPremiumButtonLogin}
        description="Select among the following?"
        className="md:text-2xl"
        body={
          <>
            <ButtonField
              children="Login"
              icons={">"}
              className="flex items-center justify-between text-primaryOrange w-full border border-primaryOrange text-left px-5 py-5 my-8 font-medium md:text-2xl hover:text-white hover:bg-primaryOrange"
              onClick={handleLoginForProfessional}
            />

            <ButtonField
              children="Join as Professional"
              icons={">"}
              className="flex items-center justify-between text-primaryOrange w-full border 
               border-primaryOrange text-left px-5 py-5 mt-8 font-medium md:text-2xl hover:text-white hover:bg-primaryOrange"
              onClick={handleJoinAsProfessional}
            />
          </>
        }
      />
    </>
  );
};

export default PremiumButtonLogin;
