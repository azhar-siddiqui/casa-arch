import "./PreFooter.css";
import { NavLink } from "react-router-dom";
const PreFooter = () => {
  return (
    <div className="preFooterContainer">
      <p className="copyRight">Copyright 2022,All Right Reserved</p>
      <ul className="preNavLink">
        <li>
          <NavLink to="/">Terms</NavLink>
        </li>
        <li>
          <NavLink to="/">Privacy policy</NavLink>
        </li>
        <li>
          <NavLink to="/">Contact us</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default PreFooter;
