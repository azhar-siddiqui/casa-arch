import "./PreFooter.css";
import { NavLink } from "react-router-dom";
const PreFooter = () => {

  const scrollToTop=()=>{
    window.scrollTo(0, 0)
  }
  return (
    <div className="preFooterContainer">
      <p className="copyRight">Copyright 2022. All Right Reserved</p>
      <ul
        className="preNavLink"
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        <li>
          <NavLink onClick={scrollToTop} to="/terms-and-conditions">Terms</NavLink>
        </li>
        <li>
          <NavLink onClick={scrollToTop} to="/refund-and-return">Refund & Return</NavLink>
        </li>
        <li>
          <NavLink onClick={scrollToTop} to="/privacy-policy">Privacy policy</NavLink>
        </li>
        <li>
          <NavLink onClick={scrollToTop} to="/contact">Contact us</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default PreFooter;
