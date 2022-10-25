import React from "react";
import Styles from "./Contact.module.css";
import Location from "../../assets/ContactIcons/location.svg";
import Phone from "../../assets/ContactIcons/phone.svg";
import MapImg from "../../assets/ContactIcons/contact-map.svg";
import { useState } from "react";
// import { validateEmail } from '../../services/generalServices'

const Contact = () => {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState({
    err: false,
    mess: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!validateEmail(fields.email)) {
    //   setError({
    //     err: true,
    //     mess: 'Please enter a valid email'
    //   })
    //   window.scrollTo(0, 0)
    // }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  return (
    <>
      <div className={Styles.main_div}>
        <div className={Styles.orange_container}>
          <div className={Styles.intro_div}>
            <h2 className={Styles.heading1}>Contact us</h2>
            <p className={Styles.para1}>
              Our friendly team love to hear from you
            </p>
          </div>
          <div className={Styles.loc_info}>
            <img src={Location} alt="location" />
            <p>
              59, green park colony, near 48 chamber, civil lines Jhansi, Uttar
              Pradesh, India 284001
            </p>
          </div>
          <div className={Styles.loc_info}>
            <img src={Phone} alt="Phone" />
            <p>+91 9090909090</p>
          </div>
          <div className={Styles.loc_img}>
            <img src={MapImg} alt="location" />
          </div>
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className={`${Styles.small_dev} ${Styles.btn1}`}
            disabled={
              fields.email.length === 0 ||
              fields.name.length === 0 ||
              fields.message.length === 0
                ? true
                : false
            }
          >
            Submit
          </button>
        </div>
        <div className={Styles.details_container}>
          <h2 className={Styles.heading2}> Leave us a message</h2>
          <p className={Styles.para2}>
            {" "}
            Our friendly team love to hear from you
          </p>
          {error.err && (
            <div className={`error_message`}>
              <p>{error.mess}</p>
            </div>
          )}
          <form id={Styles.main_form}>
            <label htmlFor="name">Name</label>
            <input
              required
              value={fields.name}
              onChange={handleChange}
              type="text"
              id="name"
              name="name"
              placeholder="Enter your Name"
            />
            <label htmlFor="email">Email</label>
            <input
              required
              value={fields.email}
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
            />
            <label htmlFor="message">Message</label>
            <textarea
              required
              value={fields.message}
              onChange={handleChange}
              id={Styles.message}
              name="message"
              placeholder="Write your message..."
              style={{
                borderColor: `${fields.message.length > 0 ? "#f36c25" : ""}`,
              }}
            />
            <button
              onClick={handleSubmit}
              className={`${Styles.lg_dev} ${Styles.btn1}`}
              style={{ marginTop: `${error.err ? "1rem" : ""}` }}
              disabled={
                fields.email.length === 0 ||
                fields.name.length === 0 ||
                fields.message.length === 0
                  ? true
                  : false
              }
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
