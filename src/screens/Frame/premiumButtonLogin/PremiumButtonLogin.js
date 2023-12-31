import { useEffect } from "react";
import Modal from "../../../components/Modal/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonField from "../../../components/ButtonsFields/ButtonField";
import { useDispatch } from "react-redux";
import { updateOpenSubscriptionAfterLogin } from "../../../app/slices/professionalauthSlice";

const PremiumButtonLogin = (props) => {
  const { setVisibleForPremiumButtonLogin, setProButtonVisible, setVisibleForProfessionalLogin, } =
    props;

  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch()

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

  const handleClose = () => {
    dispatch(updateOpenSubscriptionAfterLogin(false))
    setVisibleForPremiumButtonLogin(false)
  }

  return (
    <>
      <Modal
        setVisible={handleClose}
        description="Are you a professional?"
        className="md:text-2xl"
        body={
          <>
            <ButtonField
              children="Login"
              icons={">"}
              className="flex items-center justify-between text-primaryOrange w-full border border-primaryOrange text-left px-5 py-5 mt-4 md:mt-0 font-medium md:text-2xl hover:text-white hover:bg-primaryOrange"
              onClick={handleLoginForProfessional}
            />

            <ButtonField
              children="Join as Professional"
              icons={">"}
              className="flex items-center justify-between text-primaryOrange w-full border 
               border-primaryOrange text-left px-5 py-5 mt-8 md:mb-4 font-medium md:text-2xl hover:text-white hover:bg-primaryOrange"
              onClick={handleJoinAsProfessional}
            />
          </>
        }
      />
    </>
  );
};

export default PremiumButtonLogin;
