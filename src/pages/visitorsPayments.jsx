import React, { Fragment } from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import VisitorPaymentForm from "../components/form/visitorpaymentForm";
import Breadcrumb from "../components/breadcum/breadcrumb";

const VisitorsPayments = () => {
  const link="visitors-payment"
  return (
    <Fragment>
      <Navbar />
      <Breadcrumb link={link} />
      <VisitorPaymentForm />
      <Footer />
    </Fragment>
  );
};

export default VisitorsPayments;
