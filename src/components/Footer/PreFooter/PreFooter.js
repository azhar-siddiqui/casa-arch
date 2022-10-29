import "./PreFooter.css";
import { NavLink } from "react-router-dom";
const PreFooter = () => {
  return (
    <div className="preFooterContainer">
      <p className="copyRight">Copyright 2022,All Right Reserved</p>
      <ul
        className="preNavLink"
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        <li>
          <NavLink to="/about">Terms</NavLink>
        </li>
        <li>
          <NavLink to="/">Refund & Return</NavLink>
        </li>
        <li>
          <NavLink to="/about">Privacy policy</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact us</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default PreFooter;
