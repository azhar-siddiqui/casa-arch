import "./Footer.css";
import LocationIcon from "../../assets/FooterIcons/Location.svg";
import Call from "../../assets/FooterIcons/Call.svg";
import Mail from "../../assets/FooterIcons/Mail.svg";
import CasaLogo from "../../assets/FooterIcons/FooterCasaLogo.svg";
import Rectangle from "../../assets/FooterIcons/Rectangle.svg";
import Google from "../../assets/FooterIcons/Google.svg";
import Instagram from "../../assets/FooterIcons/Instagram.svg";
import Twitter from "../../assets/FooterIcons/Twitter.svg";
import Facebook from "../../assets/FooterIcons/Facebook.svg";
import Subscription from "../../assets/FooterIcons/Vector-3.svg";
import { Link, NavLink } from "react-router-dom";
import PreFooter from "./PreFooter/PreFooter";
import { useSubscribeNewsletterMutation } from "../../app/services/blogs";
import { useEffect, useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribe, subscribeResp] = useSubscribeNewsletterMutation();
  const [disabled, setDisabled] = useState(false);

  const onSubmit = () => {
    subscribe({ email }).then((res) => {
      console.log(res);
      if (res.data) {
        if (res.data["status code"] === 200) {
          alert("Email sent");
        }
      }
      setEmail("");
    });
  };

  const validateEmail = (email) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(email);
  };

  useEffect(() => {
    let res = validateEmail(email);
    setDisabled(!res);
  }, [email]);

  return (
    <>
      <div className="footerMainContainer">
        <div className="contactDetailsContainer">
          <div className="locationDetails">
            <img src={LocationIcon} alt="locationIcon" />
            <div className="contactContainer">
              <h3>Find us</h3>
              <p>Pune</p>
            </div>
          </div>
          <div className="locationDetails center">
            <img src={Call} alt="CallIcon" />
            <div className="contactContainer ">
              <h3 className="call">Call us</h3>
              <a
                className="cursor-pointer text-white inline-block pt-[10px]"
                href="tel:9090909090"
              >
                +91 9090909090
              </a>
            </div>
          </div>
          <div className="locationDetails">
            <img src={Mail} alt="mailIcon" />
            <div className="contactContainer">
              <h3 className="call">Mail</h3>
              <a
                className="cursor-pointer text-white inline-block pt-[10px]"
                href="mailto:abc@gmail.com"
              >
                abc@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="contactDetailsContainerSecond">
          <div className="secFooter">
            <NavLink to="/" className="footerLogo">
              LOGO
            </NavLink>
            <p>
              Architects believe in designing buildings that reflect the time in
              which they are built.
            </p>
            <div className="network">
              <h5>Follow us</h5>
              <img src={Rectangle} alt="Rectangle" width={"64px"} />
              <div className="FollowUs flex mt-2">
                <Link
                  to="/"
                  target="_blank"
                  onClick={() => window.open("https://instagram.com")}
                >
                  <img src={Instagram} alt="googleLogo" />
                </Link>
                <Link to="/" target="_blank">
                  <img src={Twitter} alt="twitterLogo" />
                </Link>
                <Link to="/" target="_blank">
                  <img src={Facebook} alt="facebookLogo" />
                </Link>
              </div>
            </div>
          </div>
          <div className="respod">
            <div
              className="webLinks second"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              <h5>Useful Links</h5>
              <img src={Rectangle} alt="Rectangle" width={"64px"} />
              <NavLink to="/">Home</NavLink>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/blogs">Blog</NavLink>
              <NavLink to="/contact">Contact us</NavLink>
              <NavLink to="/about">About us</NavLink>
            </div>
            <div className="network">
              <h5>Follow us</h5>
              <img src={Rectangle} alt="Rectangle" width={"64px"} />
              <div className="FollowUs flex mt-3.5">
                <Link
                  to="/"
                  target="_blank"
                  onClick={() => window.open("https://instagram.com")}
                >
                  <img src={Instagram} alt="googleLogo" />
                </Link>
                <Link to="/" target="_blank">
                  <img src={Twitter} alt="twitterLogo" />
                </Link>
                <Link to="/" target="_blank">
                  <img src={Facebook} alt="facebookLogo" />
                </Link>
              </div>
            </div>
          </div>
          <div className="subscrition2">
            <h5 className="mb-1">Subscribe</h5>
            <img src={Rectangle} alt="Rectangle" width={"64px"} />
            <p>
              Dont miss to subscribe for our newsletter <br />
              and stay updated for your projects.
            </p>

            <div className="subscriptionContainer">
              <input
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="subscriptionBtn"
                disabled={disabled}
                onClick={onSubmit}
              >
                <img src={Subscription} alt="subscriptbtn" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <PreFooter />
    </>
  );
};

export default Footer;
