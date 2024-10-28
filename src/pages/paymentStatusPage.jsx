import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import LoaderImg from '../components/loading/loading';
import { Link, useParams } from 'react-router-dom';
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
        return (
          <div style={{ display: 'flex', flexDirection: "column", alignItems: "center", width: "50%", margin: "50px auto", padding: "10px", }}>

            <img src="https://cdn.dribbble.com/users/1751799/screenshots/5512482/check02.gif" alt="Success" width="400px" height="350px" />
            <h2 style={{ color: 'green' }}>Payment Successful!</h2>
            <Link to="/" style={{ width: "200px" }}>
              <button className="pay-now-button" >
                {"Home"}
              </button></Link>
          </div>
        );

      case "NOT_ATTEMPTED":
        return (
          <div>
            <h2 style={{ color: 'gray' }}>Payment Not Attempted</h2>
            <img src="clock-icon.png" alt="Not Attempted" width="50" height="50" />
          </div>
        );

      case "FAILED":
        return (
          <div>
            <h2 style={{ color: 'red' }}>Payment Failed</h2>
            <img src="error-icon.png" alt="Failed" width="50" height="50" />
          </div>
        );

      case "USER_DROPPED":
        return (
          <div>
            <h2 style={{ color: 'orange' }}>User Dropped Out</h2>
            <img src="exit-icon.png" alt="User Dropped" width="50" height="50" />
          </div>
        );

      case "VOID":
        return (
          <div>
            <h2 style={{ color: 'purple' }}>Transaction Voided</h2>
            <img src="ban-icon.png" alt="Void" width="50" height="50" />
          </div>
        );

      case "CANCELLED":
        return (
          <div>
            <h2 style={{ color: 'darkred' }}>Transaction Cancelled</h2>
            <img src="cancel-icon.png" alt="Cancelled" width="50" height="50" />
          </div>
        );

      case "PENDING":
        return (
          <div>
            <h2 style={{ color: 'blue' }}>Payment Pending</h2>
            <img src="loading-icon.gif" alt="Pending" width="50" height="50" />
          </div>
        );

      default:
        return (
          <div>
            <h2>Unknown Payment Status</h2>
            <img src="question-mark-icon.png" alt="Unknown" width="50" height="50" />
          </div>
        );
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

          {renderPaymentStatus()} {/* Render the payment status based on the response */}

        </div>
      )}
      <Footer />
    </div>
  );
};

export default PaymentStatusPage;
