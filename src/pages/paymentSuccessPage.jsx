import React from "react";
import { useLocation } from "react-router-dom";

const SuccessPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get("order_id");

  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Thank you for your payment!</p>
      <p>Order ID: {orderId}</p>
    </div>
  );
};

export default SuccessPage;
