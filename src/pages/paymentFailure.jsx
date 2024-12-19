import React from "react";
import { useLocation } from "react-router-dom";

const FailurePage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get("order_id");

  return (
    <div>
      <h1>Payment Failed</h1>
      <p>Unfortunately, your payment could not be processed.</p>
      <p>Order ID: {orderId}</p>
    </div>
  );
};

export default FailurePage;
