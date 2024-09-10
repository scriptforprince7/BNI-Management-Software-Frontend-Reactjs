import React, { useState, useEffect } from 'react';
import './form.css';
import border from "../../assets/images/form icons/border.png"
import axios from 'axios';
import ErrorBoundary from '../error/ErrorBoundary';
import baseUrl from '../../utils/baseurl';

const AllPaymentsForm = () => {
  const [formData, setFormData] = useState({
    region: '',
    chapter: '',
    memberName: '',
    email: '',
    renewalYear: '1Year',
    category: '',
    mobileNumber: '',
    address: '',
    company: '',
    gstin: '',
    paymentType: ''
  });

  const [errors, setErrors] = useState({});
  const [regionData, setRegionData] = useState();
  const [chapterData, setChapterData] = useState();
  const[selectedChapter,setselectedChapter]=useState('');
  const[selectedRegion,setSelectedRegion]=useState('')
  const [memberData, setmemberData] = useState();
  const [particularChapterData,setParticularChapterData]=useState();

  const[selectedMember,setSelectedMember]=useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });


  };

  const handleChapterChange = (e) => {
    const selectedChapter = e.target.value;
  setselectedChapter(e.target.value)
    // Update formData with the selected chapter
    setFormData({ ...formData, chapter: selectedChapter });
  
    // Find the index of the selected chapter
    const selectedIndex = chapterData.findIndex(chapter => chapter.chapterName === selectedChapter);
  
    // Call the function to handle the selected chapter data
    if (selectedIndex !== -1) {
      handleSelectedChapterData(selectedIndex);
    }
  };
  
  
  

  const handleRegionChange = async (e) => {
    try {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
      setSelectedRegion(e.target.value)

      const res = await axios.get(`${baseUrl}/api/getChapters`);
      console.log("hello555")
      console.log(res.data.data)
   
      const result = res.data.data.filter(item => item.region.regionName === e.target.value);

      setChapterData(result);
      console.log("chpaterdata",result)
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  };

  const handleMemberNameChange = async (e) => {
    setSelectedMember(false)
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })

    try {
      const member = await axios.get(`${baseUrl}/api/getmembers`);
      const result = member.data.data.filter(item => 
        item.firstname.toLowerCase().startsWith(e.target.value.toLowerCase())|| item.firstname.toLowerCase().includes(e.target.value.toLowerCase())
      );
    
      console.log(selectedChapter,selectedRegion)
            setmemberData(result)
      // console.log(result)
    }
    catch {
      console.log("something went wrong ")
    }
  }

  const memberDataHandler=async(index)=>{
    setSelectedMember(true)
const particularMember=memberData[index]
console.log(particularMember)
formData.memberName=particularMember.firstname+" "+particularMember.lastname;
formData.email=particularMember.alternateEmailAddress;
formData.mobileNumber=particularMember.phone,
formData.category=particularMember.companyCategory;
formData.company=particularMember.companyCategory;
formData.gstin=particularMember.gstNumber;
formData.renewalYear="1Year"
  }


  const handleSelectedChapterData=async(index)=>{
setParticularChapterData(chapterData[index]);
console.log(particularChapterData)
  }

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/getregions`);

        setRegionData(res.data.data);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };

    fetchRegions();
  }, [selectedChapter,selectedRegion])


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

    <ErrorBoundary>
      <div className="form-container">
        <div className="form-header">
          <h1> All TRAINING/MEETING PAYMENTS</h1>
          <img src={border} alt="" style={{ width: "250px" }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <form action="" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: "" }}>
            <div className="form-group" style={{ margin: "0px 50px" }}>
              <label htmlFor="region" style={{ textAlign: 'center' }}>BNI Region :</label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleRegionChange}
                className={errors.region ? 'error' : ''}
              >
                <option value="">Select Region</option>
                {regionData && regionData.map((region, index) => (
                  <option value={region.regionName} key={index}>
                    {region.regionName}
                  </option>
                ))}
              </select>
              {errors.region && <small className="error-text">{errors.region}</small>}
            </div>

            <div className="form-group">
  <label htmlFor="chapter" style={{ textAlign: 'center' }}>BNI Chapter :</label>
  <select
    id="chapter"
    name="chapter"
    value={formData.chapter}
    onChange={handleChapterChange} // This is where the chapter change is detected
    className={errors.chapter ? 'error' : ''}
  >
    <option value="">Select Chapter</option>
    {chapterData && chapterData.map((chapter, index) => (
      <option value={chapter.chapterName} key={index}>
        {chapter.chapterName}
      </option>
    ))}
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
                  // onBlur={() => setSelectedMember(true)}
                  value={formData.memberName}
                  onChange={handleMemberNameChange}
                  placeholder="Enter Member Name"
                  className={errors.memberName ? 'error' : ''}
                />

                {/* Automatically display member names once data is fetched */}
{memberData && !selectedMember && (
  <ul className="member-list" style={{ border: "1px solid red" }}>
    {selectedRegion && selectedChapter ? (
      memberData.length > 0 ? (
        memberData.map((member, index) => (
          <li key={index} className="member-item" onClick={() => memberDataHandler(index)}>
            {member.firstname + " " + member.lastname}
          </li>
        ))
      ) : (
        // If no member data is found
        <p>No data found</p>
      )
    ) : (
      // If regionData or chapterData is missing
      <p>Please select Chapter and Region</p>
    )}
  </ul>
)}




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
                <label htmlFor="renewalYear">Select Membership </label>
                <select
                  id="renewalYear"
                  name="renewalYear"
                  value={formData.renewalYear}
                  onChange={handleChange}
                  className={errors.renewalYear ? 'error' : ''}
                >
                  <option value="">Select Membership </option>
                  <option value="1Year">1 Year</option>
                  <option value="2Year">2 Years</option>
                  <option value="5Year">5 Years</option>
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
                <p style={{ fontSize: "12px", color: 'red' }}>
                  *Please fill null if you don't have GST Number
                </p>
              </div>
            </div>
          </form>
{formData.renewalYear==="1Year" && <div className="summary-container">
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
                  <span>₹{particularChapterData && particularChapterData.oneTimeReg ||"5999"}</span>
                </p>
                <p>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>Membership Fee:</span>{" "}
                  <span>₹{particularChapterData && particularChapterData.oneYearMembership ||"35,309"}</span>
                </p>
                <p>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>Subtotal:</span>{" "}
                  <span>₹{particularChapterData && particularChapterData.oneYearSubtotal||"41,308"}</span>
                </p>
                <p>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>GST (18%):</span>{" "}
                  <span>₹{ particularChapterData && particularChapterData.newMemberGstOneYear||"7,435"}</span>
                </p>
                <p>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>Gateway Charges (1.25%):</span>{" "}
                  <span>₹{( particularChapterData && particularChapterData.totalNewMembershipOneYear * 0.0125)?.toFixed(2) || "609"}</span>
                  </p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className="total">Total Amount</span>
                  <span>(Including GST:)</span>
                </div>
                <p>₹{((particularChapterData && particularChapterData.totalNewMembershipOneYear + (particularChapterData.totalNewMembershipOneYear * 0.0125)) || 49352).toFixed(2)}</p>
                </div>
            </div>
            <button className="pay-now-button" onClick={handleSubmit}>
              PAY NOW
            </button>
          </div>}

          {formData.renewalYear==="2Year" &&  <div className="summary-container">
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
                  <span>₹{particularChapterData && particularChapterData.oneTimeReg ||"5999"}</span>
                </p>
                <p>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>Membership Fee:</span>{" "}
                  <span>₹{particularChapterData && particularChapterData.twoYearMembership ||"56,499"}</span>
                </p>
                <p>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>Subtotal:</span>{" "}
                  <span>₹{particularChapterData && particularChapterData.twoYearSubtotal||"62,498"}</span>
                </p>
                <p>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>GST (18%):</span>{" "}
                  <span>₹{particularChapterData && particularChapterData.newMemberGstTwoYear||"11,250"}</span>
                </p>
                <p>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>Gateway Charges (1.25%):</span>{" "}
                  <span>₹{(particularChapterData && particularChapterData.totalNewMembershipTwoYear * 0.0125)?.toFixed(2) || "921"}</span>
                  </p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className="total">Total Amount</span>
                  <span>(Including GST:)</span>
                </div>
                <p>₹{((particularChapterData && particularChapterData.totalNewMembershipTwoYear + (particularChapterData && particularChapterData.totalNewMembershipTwoYear * 0.0125)) || 49352).toFixed(2)}</p>
                </div>
            </div>
            <button className="pay-now-button" onClick={handleSubmit}>
              PAY NOW
            </button>
          </div>}
          {formData.renewalYear==="5Year"&& <div className="summary-container">
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
                  <span>₹{particularChapterData && particularChapterData.oneTimeReg ||"5999"}</span>
                </p> 
                <p>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>Membership Fee:</span>{" "}
                  <span>₹{particularChapterData && particularChapterData.fiveYearMembership ||"1,23,581"}</span>
                </p>
                <p>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>Subtotal:</span>{" "}
                  <span>₹{particularChapterData && particularChapterData.fiveYearSubtotal||"1,29,580"}</span>
                </p>
                <p>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>GST (18%):</span>{" "}
                  <span>₹{particularChapterData && particularChapterData.newMemberGstFiveYear||"23,324"}</span>
                </p>
                <p>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>Gateway Charges (1.25%):</span>{" "}
                  <span>₹{(particularChapterData && particularChapterData.totalNewMembershipFiveYear * 0.0125)?.toFixed(2) || "1,911"}</span>
                  </p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className="total">Total Amount</span>
                  <span>(Including GST:)</span>
                </div>
                <p>₹{((particularChapterData && particularChapterData.totalNewMembershipFiveYear + (particularChapterData && particularChapterData.totalNewMembershipFiveYear * 0.0125)) || 49352).toFixed(2)}</p>
                </div>
            </div>
            <button className="pay-now-button" onClick={handleSubmit}>
              PAY NOW
            </button>
          </div>}
          
        </div>

        <div className="form-note">
          <p>
            <span style={{ color: "red" }}>NOTE:</span> All the payment done on this
            page will directly go through the HDFC payment gateway.
          </p>
        </div>

      </div>
    </ErrorBoundary>

  );
};

export default AllPaymentsForm;