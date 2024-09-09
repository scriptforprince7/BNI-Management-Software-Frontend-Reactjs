import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "./PaymentButton.css";

const PaymentButtons = ({ titles, links }) => {
  return (
    <div className='btn-container'>
      {titles && links && titles.map((title, index) => (
        <Link key={links[index]} to={`/${links[index]}`}>
          <button className='payment-btn'>{title}</button>
        </Link>
      ))}
    </div>
  );
}

export default PaymentButtons;
