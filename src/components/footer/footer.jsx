import React, { Fragment } from 'react';
import "./footer.css";
import logo from '../../assets/images/logo/logo.jpeg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Fragment>
      <footer className="footer-distributed">

        <div className="footer-left">
          <img 
            src={logo} 
            alt="logo img" 
            className="side-menu-logo" 
            style={{ borderBottom: "1px solid #ccc", width: "250px" }} 
          />
          <p className="footer-links">
            <Link to="/member-application" className="link-1">Member Application Form</Link>
            <Link to="/interview-sheet">Interview Sheet</Link>
            <Link to="/commitment-sheet">Commitment Sheet</Link>
            <Link to="/eoi-form">EOI Form</Link>
            <br />
            <a href="#">New Member Payment</a>
            <a href="#">Renewal Payment | </a>
            <a href="#" className="link-1">Renewal Payment With Late Fee</a>
            <a href="#">All Training Payments</a>
            <a href="#">Meeting Payment</a>
          </p>
          <p className="footer-company-name">BNI NEW Delhi © 2015</p>
        </div>

        <div className="footer-center" >
          <div>
            <i className="fa fa-map-marker" style={{backgroundColor:"white",color:"#d32f2f"}}></i>
            <p><span >Sunil Kuzhuvelil,</span> <span>ADI Corporate Training,</span> <span>Flat no. 09, Pocket-1,</span><span>Sector-19, Dwarka,</span><span>New Delhi - 110075, India.</span></p>
          </div>
          <div>
            <i className="fa fa-phone" style={{backgroundColor:"white",color:"#d32f2f"}}></i>
            <p>+91 9899789340</p>
          </div>
          <div>
            <i className="fa fa-envelope" style={{backgroundColor:"white",color:"#d32f2f"}}></i>
            <p ><a href="mailto:sunilk@bni-india.in" style={{color:"#d12031"}}>sunilk@bni-india.in</a></p>
          </div>
        </div>

        <div className="footer-right">
          <p className="footer-company-about" >
            <span >About the company</span>
            BNI is the World’s Largest professional networking organization. Over the past 38 Years, BNI has grown to over 300K members worldwide, in more than 77 different countries, from over 300 different types of professions, all of whom have benefited from increased referral business as a result of BNI.</p>
          <div className="footer-icons">
            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#"><i className="fa-brands fa-twitter"></i></a>
            <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="#"><i className="fa-brands fa-github"></i></a>
          </div>
        </div>

      </footer>
    </Fragment>
  );
};

export default Footer;
