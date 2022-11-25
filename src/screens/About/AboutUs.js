import React from "react";
import styles from "./AboutUs.module.css";

const AboutUs = () => {
  return (
    <div className="">
      <div className={styles.about_us_header}>About us</div>
      <div
        className="container"
        id={styles.my_container}
        style={{ maxHeight: "1180px" }}
      >
        <div className={styles.about_us_details}>
          <p className={styles.primary}>Return</p>
          <p className={styles.bold_text}>
            Product must be returned to us within ------- days from the date it
            has been delivered to the customer. Product must be returned with
            all tags attached in its original condition along with all packing
            material, courier receipt, invoice & other papers.
          </p>
          <p className={styles.primary}>Refund</p>
          <p>
            Once the Product is received to the company successfully,
            ----Company Name---will instantly initiate the refund to your source
            account or chosen method of refund within --- working days.
          </p>
          <div className={styles.big_device}>
            <p className={styles.primary}>
              Refund and Cancellation for Service Provider Company
            </p>
            <p>
              Due to service providers in nature “NO REFUND”,“NO CANCELLATION”
              will be entertained once the Payment has been made.
            </p>
          </div>
          <p className={styles.primary}>Cancellation Policy</p>
          <p>
            Please note an order can only be canceled within 24 hours of placing
            the order. Once the order is processed after 24 hours, no
            cancellation request will be entertained. However, return is
            possible for all orders/products.
          </p>
          <p className={styles.primary}>Shipping & Delivery Policies -</p>
          <p>
            Company Name- ships its products to almost all parts of India.
            Orders placed will be shipped within 24* hrs. We ship on all days
            except sundays and National Holidays.
          </p>
          <p>
            For all areas serviced by reputed couriers, the delivery time would
            be within 3 to 4 business days of shipping (business days exclude
            Sundays and other holidays). For other areas, the products will be
            shipped through --------------- and may take 1-2 weeks depending on
            location. At times there might be unexpected delays in the delivery
            of your order due to unavoidable and undetermined logistics
            challenges beyond our control for which --Company Name--is not
            liable and would request its users to cooperate as --Company Name--
            continuously tries to naught such instances. Also, ---Company Name--
            reserves the right to cancel your order at its sole discretion in
            cases where it takes longer than usual delivery time or the shipment
            is physically untraceable and refund the amount paid for canceled
            product(s) to your source account.
          </p>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default AboutUs;
