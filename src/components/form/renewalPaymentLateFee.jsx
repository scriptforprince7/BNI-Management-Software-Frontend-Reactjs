import React, { useState } from 'react'
import './form.css';
import border from "../../assets/images/form icons/border.png"

export const RenewalPaymentLateFee = () => {
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
        <div className="form-container">
        <div className="form-header">
          <h1>MEMBER RENEWAL PAYMENT WITH LATE FEE</h1>
          <img src={border} alt="" style={{ width: "250px" }} />
        </div>
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
        <div className="box-container" >
          <form className="form-content" onSubmit={handleSubmit} >
            <div className="form-left">
              {/* <div className="form-group">
                <label htmlFor="region">BNI Region :</label>
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
              </div> */}
      
              <div className="form-group">
                <label htmlFor="memberName">Member Name :</label>
                <input
                  type="text"
                  id="memberName"
                  name="memberName"
                  value={formData.memberName}
                  onChange={handleChange}
                  placeholder="Enter Member Name"
                  className={errors.memberName ? 'error' : ''}
                />
                {errors.memberName && <small className="error-text">{errors.memberName}</small>}
              </div>
      
            
      
              <div className="form-group">
                <label htmlFor="mobileNumber">Mobile Number :</label>
                <input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                  className={errors.mobileNumber ? 'error' : ''}
                />
                {errors.mobileNumber && <small className="error-text">{errors.mobileNumber}</small>}
              </div>
      
              <div className="form-group">
                <label htmlFor="renewalYear">Select Membership :</label>
                <select
                  id="renewalYear"
                  name="renewalYear"
                  value={formData.renewalYear}
                  onChange={handleChange}
                  className={errors.renewalYear ? 'error' : ''}
                >
                 <option value=""> Select Membership </option>
              <option value="1Year">1 Year</option>
              <option value="2Year">2 Year</option>
              <option value="3Year">5 Year</option>
                </select>
                {errors.renewalYear && <small className="error-text">{errors.renewalYear}</small>}
              </div>
          
      
              <div className="form-group">
                <label htmlFor="paymentType">Payment Type :</label>
                <select
                  id="paymentType"
                  name="paymentType"
                  value={formData.paymentType}
                  onChange={handleChange}
                  className={errors.paymentType ? 'error' : ''}
                >
                  <option value="">CREDIT / DEBIT / NET BANKING</option>
                  <option value="credit">Credit (1.25%)</option>
                  <option value="debit">Debit (1.25%)</option>
                  <option value="netBanking">UPI (free)</option>
                  <option value="netBanking">Net Banking (1.25%)</option>
                </select>
                {errors.paymentType && <small className="error-text">{errors.paymentType}</small>}
              </div>
            </div>
      
            <div className="form-right">
              {/* <div className="form-group">
                <label htmlFor="chapter">BNI Chapter :</label>
                <select
                  id="chapter"
                  name="chapter"
                  value={formData.chapter}
                  onChange={handleChange}
                  className={errors.chapter ? 'error' : ''}
                >
                  <option value="">Select Chapter</option>
                  <option value="Chapter 1">Chapter 1</option>
                  <option value="Chapter 2">Chapter 2</option>
                </select>
                {errors.chapter && <small className="error-text">{errors.chapter}</small>}
              </div> */}
      
              <div className="form-group">
                <label htmlFor="email">Email :</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <small className="error-text">{errors.email}</small>}
              </div>
      
              <div className="form-group">
                <label htmlFor="category">Category :</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Enter Category"
                  className={errors.category ? 'error' : ''}
                />
                {errors.category && <small className="error-text">{errors.category}</small>}
              </div>
{/*       
              <div className="form-group">
                <label htmlFor="address">Address :</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter Address"
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && <small className="error-text">{errors.address}</small>}
              </div> */}
      
      <div className="form-group">
                <label htmlFor="company">Company :</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter Company Name"
                  className={errors.company ? 'error' : ''}
                />
                {errors.company && <small className="error-text">{errors.company}</small>}
              </div>
              <div className="form-group">
                <label htmlFor="gstin">GSTIN No. :</label>
                <input
                  type="text"
                  id="gstin"
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleChange}
                  placeholder="Enter GSTIN Number (or enter 'null' if not available)"
                />
                <p style={{ fontSize: "12px",color:'red' }}>
                  *Please fill null if you don't have GST Number
                </p>
              </div>
            </div>
          </form>
      
          <div className="summary-container">
            <div className="summary">
              <h5 className="summary-heading">Summary</h5>
              <hr
                style={{ borderBottom: "1px solid rgb(204, 204, 204)", marginTop: "-5px" }}
              />
              <div className="summary-content">
                <p>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                    One Time Registration Fee:
                  </span>{" "}
                  <span>₹0</span>
                </p>
                <p>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>Membership Fee:</span>{" "}
                  <span>₹35,309/-</span>
                </p>
                <p>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>Subtotal:</span>{" "}
                  <span>₹35,309/-</span>
                </p>
                <p>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>Late Fee:</span>{" "}
                  <span>₹1,000/-</span>
                </p>
                <p>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>GST (18%):</span>{" "}
                  <span>₹6,535/-</span>
                </p>
                <p>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>Gateway Charges (1.25%):</span>{" "}
                  <span>₹523.05/-</span>
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className="total">Total Amount</span>
                  <span>(Including GST:)</span>
                </div>
                <p>₹42,367/-</p>
              </div>
            </div>
            <button className="pay-now-button" onClick={handleSubmit}>
              PAY NOW
            </button>
          </div>
        </div>
      
        <div className="form-note">
          <p>
            <span style={{ color: "red" }}>NOTE:</span> All the payment done on this
            page will directly go through the HDFC payment gateway.
          </p>
        </div>
      
      </div>
      
      );
}
export default RenewalPaymentLateFee;