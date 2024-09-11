import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/images/logo/logo.jpeg';
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import icons
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const togglePaymentDropdown = () => {
        setIsPaymentDropdownOpen(!isPaymentDropdownOpen);
    };

    return (
        <div className="navbar">
            <div className="logo">
               <Link to="/"> <img src={logo} alt="logo img" className="logoImg" /></Link>
            </div>
            <div className="nav-links">
                <Link to="/member-application">Member Application Form</Link>
                <a href="/Interview Sheet- Template.pdf" rel="noopener noreferrer">Interview Sheet</a>
                <a href="/Commitment Sheet- Template.pdf" rel="noopener noreferrer">Commitment Sheet</a>
                <Link to="/eoi-form">EOI Form</Link>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                {isMenuOpen ? <FaTimes className="icon-animation" /> : <FaBars className="icon-animation" />}
            </div>
            <div className={`side-menu ${isMenuOpen ? 'open' : 'close'}`}>
                <img src={logo} alt="logo img" className="side-menu-logo" style={{borderBottom:"1px solid #ccc"}} />
                
                {/* First Dropdown */}
                <div className="dropdown">
                    <button className="dropdown-button" onClick={toggleDropdown} style={{alignItems:'center'}}>
                        Basic Services {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    <div className={`dropdown-content ${isDropdownOpen ? 'open' : ''}`}>
                        <Link to={"member-application"}>Member Application Form</Link>
                        <a href="src\assets\Interview Sheet- Template.pdf" onClick={toggleMenu} target="_blank" rel="noopener noreferrer">Interview Sheet</a>
                        <a href="src\assets\Commitment Sheet- Template.pdf" onClick={toggleMenu} target="_blank" rel="noopener noreferrer">Commitment Sheet</a>
                        <Link to="/eoi-form" onClick={toggleMenu}>EOI Form</Link>
                    </div>
                </div>

                {/* Second Dropdown */}
                <div className="dropdown">
                    <button className="dropdown-button" onClick={togglePaymentDropdown} style={{alignItems:'center'}}>
                        All Payments {isPaymentDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    <div className={`dropdown-content ${isPaymentDropdownOpen ? 'open' : ''}`}>
                        <Link to="/new-member-payment" onClick={toggleMenu}>New Member Payment</Link>
                        <Link to="/renewal-payment" onClick={toggleMenu}>Renewal Payment</Link>
                        <Link to="/renewal-payment-with-late-fee" onClick={toggleMenu}>Renewal Payment With Late Fee</Link>
                        <Link to="/all-training-payments" onClick={toggleMenu}>All Training Payments</Link>
                        <Link to="/meeting-payment" onClick={toggleMenu}>Meeting Payment</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
