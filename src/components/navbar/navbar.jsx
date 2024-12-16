import React, { useState, useEffect } from "react";
import "./navbar.css";
import logo from "../../assets/images/logo/logo.jpeg";
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icons
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import baseUrl from "../../utils/baseurl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [navdata, setNavdata] = useState([]);

  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchNavdata = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseUrl}/api/universalLinks`);
        setNavdata(res.data); // Set the navdata state with the fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching regions:", error);
        setLoading(false);
        toast.error(error.message);
      }
    };

    fetchNavdata();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const togglePaymentDropdown = () => {
    setIsPaymentDropdownOpen(!isPaymentDropdownOpen);
  };

  const openModal = (url) => {
    setModalContent(url);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Handle navigation for each payment link using useNavigate
  const handleNavigation = (link) => {
    const url = `${link.link_slug}/${link.id}/${link.ulid}/${link.payment_gateway}`;
    navigate(`/${url}`); // Programmatically navigate to the constructed URL
    setIsMenuOpen(false); // Close the menu after navigation
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo img" className="logoImg" />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/eoi-form">EOI Form</Link>
        <Link to="/member-application">Member Application Form</Link>
        <Link to="/interview-sheet">Interview Sheet</Link>
        <Link to="/commitment-sheet">Commitment Sheet</Link>
        <Link to="/inclusionexclusion-sheet">
          Inclusion and Exclusion Sheet
        </Link>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? (
          <FaTimes className="icon-animation" />
        ) : (
          <FaBars className="icon-animation" />
        )}
      </div>
      <div className={`side-menu ${isMenuOpen ? "open" : "close"}`}>
        <img
          src={logo}
          alt="logo img"
          className="side-menu-logo"
          style={{ borderBottom: "1px solid #ccc" }}
        />

        {/* First Dropdown */}
        <div className="dropdown">
          <button
            className="dropdown-button"
            onClick={toggleDropdown}
            style={{ alignItems: "center" }}
          >
            Basic Services{" "}
            {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <div className={`dropdown-content ${isDropdownOpen ? "open" : ""}`}>
            <Link to="/eoi-form" onClick={toggleMenu}>
              EOI Form
            </Link>
            <Link to="/member-application" onClick={toggleMenu}>
              Member Application Form
            </Link>
            <Link to="/interview-sheet">Interview Sheet</Link>
            <Link to="/commitment-sheet">Commitment Sheet</Link>
            <Link to="/inclusionexclusion-sheet">
              Inclusion and Exclusion Sheet
            </Link>
          </div>
        </div>

        {/* Second Dropdown */}
        <div className="dropdown">
          <button
            className="dropdown-button"
            onClick={togglePaymentDropdown}
            style={{ alignItems: "center" }}
          >
            All Payments{" "}
            {isPaymentDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <div
            className={`dropdown-content ${isPaymentDropdownOpen ? "open" : ""}`}
          >
            {navdata.map((link) => {
              return (
                <a
                  key={link.id}
                  onClick={() => handleNavigation(link)} // Use handleNavigation to navigate programmatically
                >
                  {link.universal_link_name}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal for displaying PDF */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-modal" onClick={closeModal}>
              &times;
            </span>
            <iframe
              src={modalContent}
              title="PDF Viewer"
              width="100%"
              height="500px"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
