

import { useNavigate } from 'react-router-dom';
export default async function paymentHandler(req, res) {
    const navigate = useNavigate();
    alert("Payment successful!");
    // Redirect to home or any other route after success
    navigate("/");
}

// Example placeholder for your payment processing logic

