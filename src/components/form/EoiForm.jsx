import React, { useState } from 'react';
import './form.css';
import border from "../../assets/images/form icons/border.png"
import qrCode from "../../assets/images/form icons/qr.png"

const BNIPaymentForm = () => {
  const [formData, setFormData] = useState({
    region: '',
    chapter: '',
    memberName: '',
    email: '',
    renewalYear: '',
    category: '',
    mobileNumber: '',
    address: '',
    company: '',
    gstin: '',
    paymentType: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.region) errors.region = 'BNI Region is required';
    if (!formData.chapter) errors.chapter = 'BNI Chapter is required';
    if (!formData.memberName) errors.memberName = 'Member Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.renewalYear) errors.renewalYear = 'Renewal Year is required';
    if (!formData.category) errors.category = 'Category is required';
    if (!formData.mobileNumber) errors.mobileNumber = 'Mobile Number is required';
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.company) errors.company = 'Company is required';
    if (!formData.paymentType) errors.paymentType = 'Payment Type is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="form-container" style={{ backgroundColor: '#f4f4f4' }}>
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
          <form action="" style={{display:'flex',flexDirection:'row',justifyContent:'center',margin:""}}>
          <div className="form-group" style={{margin:"0px 50px"}}>
                <label htmlFor="region" style={{textAlign:'center'}}>BNI Region :</label>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className={errors.region ? 'error' : ''}
                >
                 <option value="">Select Region</option>
                  <option value="Region 1">North Delhi</option>
                  <option value="Region 2">East Delhi</option>
                  <option value="Region 1">West Delhi</option>
                  <option value="Region 1">All Region</option>
                </select>
                {errors.region && <small className="error-text">{errors.region}</small>}
              </div>

              <div className="form-group">
                <label htmlFor="chapter" style={{textAlign:'center'}}>BNI Chapter :</label>
                <select
                  id="chapter"
                  name="chapter"
                  value={formData.chapter}
                  onChange={handleChange}
                  className={errors.chapter ? 'error' : ''}
                >
                  <option value="">Select Chapter</option>
                  <option value="Amigos">Amigos</option>
  <option value="Beyond">Beyond</option>
  <option value="BNI Capital">BNI Capital</option>
  <option value="BNI Elixir">BNI Elixir</option>
  <option value="BNI Fantom">BNI Fantom</option>
  <option value="BNI Iconic">BNI Iconic</option>
  <option value="BNI Impulse">BNI Impulse</option>
  <option value="BNI Logik">BNI Logik</option>
  <option value="BNI Nexus">BNI Nexus</option>
  <option value="BNI Opulence">BNI Opulence</option>
  <option value="BNI UNO">BNI UNO</option>
  <option value="Impetus">Impetus</option>
  <option value="Javelin">Javelin</option>
  <option value="Prolific">Prolific</option>
  <option value="Revenue">Revenue</option>
  <option value="Zeal">Zeal</option>
                </select>
                {errors.chapter && <small className="error-text">{errors.chapter}</small>}
              </div>
              
          </form>
        </div>
        <div className="form-header">
      {/* <h1> NEW MEMBER  PAYMENT</h1> */}
      {/* <img src={border} alt="" style={{ width: "250px" }} /> */}
    </div>

    <div className="form-header">
      {/* <h1> NEW MEMBER  PAYMENT</h1> */}
      <img src={qrCode} alt="" style={{ width: "400px" }} />
     <p><a href="https://bni-delhiwest.in/en-IN/index" target="_blank">https://bni-delhiwest.in/en-IN/index</a></p> 
    </div>
    
  
    <div className="form-note">
      <p>
        <span style={{ color: "red" }}>NOTE:</span> Choose BNI region and BNI chapter for generating QR Code. <br />Please check the generated QR code after scanning.
      </p>
    </div>
  
  </div>
  
  );
};

export default BNIPaymentForm;