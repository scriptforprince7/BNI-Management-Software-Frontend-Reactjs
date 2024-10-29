import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import LoaderImg from '../components/loading/loading';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import baseUrl from '../utils/baseurl';

const PaymentStatusPage = () => {
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null); // Set initial state to null for checking
  const { order_id } = useParams();

  const tryAgainHandler = async () => {
    // Refresh the page
    window.location.reload();
  }

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseUrl}/api/getCashfreeOrderDataAndVerifyPayment/${order_id}`);

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
    if (!paymentData || paymentData.length === 0) return    <div style={{ display: 'flex', flexDirection: "column", alignItems: "center", width: "50%", margin: "50px auto", padding: "10px", }}>

    <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-illustration-download-in-svg-png-gif-file-formats--office-computer-digital-work-business-pack-illustrations-7265556.png?f=webp" alt="Success" width="400px" height="350px" />
    <h2 style={{ color: 'black' }}>No Data Found</h2>
    <Link onClick={tryAgainHandler} style={{ width: "200px" }}>
      <button className="pay-now-button" >
        {"Try Again"}
      </button></Link>
  </div>

    const payment = paymentData[0]; // If data is an array, access the first element
    const { payment_status } = payment; // Assuming the response has a 'transaction_status' field

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
          <div style={{ display: 'flex', flexDirection: "column", alignItems: "center", width: "50%", margin: "50px auto", padding: "10px", }}>

          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMavKuS3rbVnNeNPoto0_SBjSnt-nTCrBwY0yq4DCtJaY4EXCQvEijntwpuQRoS0h3SD0&usqp=CAU" alt="Success" width="400px" height="350px" />
          <h2 style={{ color: 'red' }}>Payment Failed</h2>
          <Link to="/" style={{ width: "200px" }}>
            <button className="pay-now-button" >
              {"Home"}
            </button></Link>
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
          <div style={{ display: 'flex', flexDirection: "column", alignItems: "center", width: "50%", margin: "50px auto", padding: "10px", }}>

          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMavKuS3rbVnNeNPoto0_SBjSnt-nTCrBwY0yq4DCtJaY4EXCQvEijntwpuQRoS0h3SD0&usqp=CAU" alt="Success" width="400px" height="350px" />
          <h2 style={{ color: 'red' }}>Payment Failed</h2>
          <Link to="/" style={{ width: "200px" }}>
            <button className="pay-now-button" >
              {"Home"}
            </button></Link>
        </div>
        );

      case "PENDING":
        return (
          <div style={{ display: 'flex', flexDirection: "column", alignItems: "center", width: "50%", margin: "50px auto", padding: "10px", }}>

          <img src="data:image/jpeg;base64,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" alt="Success" width="400px" height="350px" />
          <h2 style={{ color: 'red' }}>Payment Pending</h2>
          <Link to="/" style={{ width: "200px" }}>
            <button className="pay-now-button" >
              {"Home"}
            </button></Link>
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
