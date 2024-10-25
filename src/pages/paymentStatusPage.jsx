import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import LoaderImg from '../components/loading/loading';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const PaymentStatusPage = () => {
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null); // Set initial state to null for checking
  const { order_id } = useParams();

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/getCashfreeOrderDataAndVerifyPayment/${order_id}`);

        setPaymentData(res.data); // Assuming the status is part of this data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payment status:", error);
        setLoading(false);
        toast.error("Error fetching payment status");
      }
    };

    fetchPaymentStatus();
  }, [order_id]); // Make sure useEffect depends on order_id

  // Function to display the status message
  const renderPaymentStatus = () => {
    if (!paymentData || paymentData.length === 0) return <h2>No payment data found.</h2>;

    const payment = paymentData[0]; // If data is an array, access the first element
    const { payment_status } = payment; // Assuming the response has a 'transaction_status' field
console.log(payment_status)
    switch (payment_status) {
      case "SUCCESS":
        return <h2 style={{ color: 'green' }}>Payment Successful!</h2>;
      case "NOT_ATTEMPTED":
        return <h2 style={{ color: 'gray' }}>Payment Not Attempted</h2>;
      case "FAILED":
        return <h2 style={{ color: 'red' }}>Payment Failed</h2>;
      case "USER_DROPPED":
        return <h2 style={{ color: 'orange' }}>User Dropped Out</h2>;
      case "VOID":
        return <h2 style={{ color: 'purple' }}>Transaction Voided</h2>;
      case "CANCELLED":
        return <h2 style={{ color: 'darkred' }}>Transaction Cancelled</h2>;
      case "PENDING":
        return <h2 style={{ color: 'blue' }}>Payment Pending</h2>;
      default:
        return <h2>Unknown Payment Status</h2>;
    }
  };

  return (
    <div>
      <ToastContainer />
      <Navbar />
      {loading ? (
        <LoaderImg />
      ) : (
        <div>
          <h1>Payment Status Page</h1>
          {renderPaymentStatus()} {/* Render the payment status based on the response */}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PaymentStatusPage;
