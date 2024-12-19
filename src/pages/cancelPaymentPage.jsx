import React from "react";
import { useLocation } from "react-router-dom";

const CancelPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get("order_id");

  return (
    <div>
      <h1>Payment Canceled</h1>
      <p>You have canceled the payment process.</p>
      <p>Order ID: {orderId}</p>
    </div>
  );
};

export default CancelPage;
