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
            <p>Pune India</p>
          </div>
          <div className={Styles.loc_info}>
            <img src={Phone} alt="Phone" />
            <p>+91 9090909090</p>
          </div>
          <div className={Styles.loc_img}>
            {/* <img src={MapImg} alt="location" /> */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.508302308668!2d73.87421861468812!3d18.50591838741746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c040a0e98563%3A0x9dd3ef6ef8904dbd!2sAzam%20Campus!5e0!3m2!1sen!2sin!4v1671030990541!5m2!1sen!2sin"
              // width={360}
              // height={400}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mx-auto w-[300px] md:w-[350px] h-[400px]"
            />
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
