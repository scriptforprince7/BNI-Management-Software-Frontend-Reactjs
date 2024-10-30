import React, { useState, useEffect } from 'react';
import './form.css';
import border from "../../assets/images/form icons/border.png"
import axios from 'axios';
import ErrorBoundary from '../error/ErrorBoundary';
import baseUrl from '../../utils/baseurl';
import LoaderImg from '../loading/loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import paymentHandler from '../../utils/paymentHandler';
import { load } from '@cashfreepayments/cashfree-js';
import { useNavigate, useParams } from 'react-router-dom';
import redirectUrl from '../../utils/redirectUrl';


const Visitor = () => {
  const [formData, setFormData] = useState({
    region: "new-delhi",
    chapter: '',
    memberName: '',
    visitorName:'',
    email: '',
    category: '',
    mobileNumber: '',
    address: '',
    company: '',
    hasGst:'',
    gstin: '',
    location: "",
    date: "",
    time: "",
    payment_note:"Visitor-payment-fee",
    eventPrice: '',
    business:'',
    paymentType:"",
    eventName: ''
  });
  
  
const navigate=useNavigate();
const [errors, setErrors] = useState({});
  const [regionData, setRegionData] = useState();
  const [allChapterData, setallChapterData] = useState();
  const [chapterData, setChapterData] = useState();
  const [selectedChapter, setselectedChapter] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [memberData, setmemberData] = useState();
  const [particularChapterData, setParticularChapterData] = useState();
  const [particularRegionData, setParticularRegionData] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMember, setSelectedMember] = useState(false);
  const [memberloading, setMemberLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [events,setEvents]=useState();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [selctedEvent,setSelctedEvent]=useState();
  const[hasGst,sethasGst]=useState(false);
  const { ulid,universal_link_id,payment_gateway} = useParams()


    const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };



  const handleChapterChange = async(e) => {
    const selectedChapter = e.target.value;

    setselectedChapter(e.target.value);
    const selectedChapterData = allChapterData?.find(
      (chapter) => chapter?.chapter_name === selectedChapter
    );
     setParticularChapterData(selectedChapterData);
    // Update formData with the selected chapter
   setFormData({
      ...formData,
      memberName: "",
      email: "",
      category: "",
      mobileNumber: "",
      company: "",
      gstin: "",
      paymentType: "",
      
    });


    // Find the index of the selected chapter
    const selectedIndex = allChapterData?.findIndex(
      (chapter) => chapter.chapter_name === selectedChapter
    );

    setselectedChapter(allChapterData[selectedIndex]);

    setParticularChapterData(allChapterData[selectedIndex]);

   
    const kitty_fee = particularChapterData.chapter_visitor_fees;
    const tax = (particularChapterData.chapter_visitor_fees * 0.18).toFixed(2);
    const total_amount = (parseFloat(tax) + parseFloat(kitty_fee)).toFixed(2);
      setFormData((prevFormData) => ({
        ...prevFormData,
        chapter: selectedChapter,
        total_amount:total_amount,
        sub_total:kitty_fee,
        tax:tax,
        
      }));
    
    
  };

  const handleRegionChange = async (e) => {
    const selectedIndex = e.target.value;
    const selectedRegionData = regionData[selectedIndex];

    // Update formData with the selected region name
    const updatedRegion = selectedRegionData?.region_name || e.target.value;
    console.log(updatedRegion);
    setFormData({
      ...formData,
      region: updatedRegion, // Ensure formData includes selected region
      memberName: "",
      email: "",
      renewalYear: "1Year",
      category: "",
      mobileNumber: "",

      company: "",
      gstin: "",
      paymentType: "",
    });

    setSelectedRegion(selectedRegionData);
    setParticularRegionData(selectedRegionData);

    setselectedChapter("");
    formData.chapter = "";
    try {
      setLoading(true);

      // If "New Delhi" is selected, fetch all chapters
      if (updatedRegion.toLowerCase() === "new-delhi") {
        const res = await axios.get(`${baseUrl}/api/chapters`);
        // setChapterData(res.data); // Display all chapters
        setallChapterData(res.data);
      } else {
        // Filter chapters based on selected region's region_id
        const res = await axios.get(`${baseUrl}/api/chapters`);
        const filteredChapters = res.data.filter(
          (item) => item.region_id === selectedRegionData?.region_id
        );
        setChapterData(filteredChapters);
        setallChapterData(res.data);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching chapters:", error);
      setLoading(false);
    }
  };


  const handleMemberNameChange = async (e) => {
    setSelectedMember(false);
    const { name, value } = e.target;

    // Update formData with the member's name
    setFormData({
      ...formData,
      [name]: value,
    });

    try {
      setMemberLoading(true);

      // Fetch the list of members
      const memberRes = await axios.get(`${baseUrl}/api/members`);

      let filteredMembers;

      // If the selected region is "new-delhi", show all members
      if (formData.region.toLowerCase() === "new-delhi") {
        // Set to all members
        // console.log(memberRes.data)
        filteredMembers = memberRes.data.filter((item) => {
       
          return (
            // Match by chapter or region, and also check if the name starts with or includes the input value
            item.chapter_id === particularChapterData?.chapter_id &&
            (item.member_first_name
              .toLowerCase()
              .startsWith(value.toLowerCase()) ||
              item.member_first_name
                .toLowerCase()
                .includes(value.toLowerCase()))
          );
        });
        setmemberData(filteredMembers);
        setMemberLoading(false);
      } else {
        // Otherwise, filter members based on chapter, region, and name
        filteredMembers = memberRes.data.filter((item) => {
          return (
            // Match by chapter or region, and also check if the name starts with or includes the input value
            (item.chapter_id === particularChapterData?.chapter_id ||
              item.region_id === particularRegionData?.region_id) &&
            (item.member_first_name
              .toLowerCase()
              .startsWith(value.toLowerCase()) ||
              item.member_first_name
                .toLowerCase()
                .includes(value.toLowerCase()))
          );
        });
      }

      // Update the member data state with the filtered members
      setmemberData(filteredMembers);
      setMemberLoading(false);

      // Debugging: log the filtered result
      console.log("Filtered Members:", filteredMembers);
    } catch (error) {
      setMemberLoading(false);
      console.error("Something went wrong:", error);
    }
  };

  const memberDataHandler = async (index) => {
    setSelectedMember(true);
    const particularMember = memberData[index];

    formData.memberName =
      particularMember.member_first_name +
      " " +
      particularMember.member_last_name;
   
  };

  const handleSelectedChapterData = async (index) => {
    setParticularChapterData(chapterData[index]);
  };

  const handleGstChange = (e) => {
    const { name, value } = e.target;

const isGst=!formData.hasGst
sethasGst(!hasGst)
    setFormData({
      ...formData,
    hasGst:isGst
    });
  
  };



  
  

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseUrl}/api/regions`);
        setRegionData(res.data);

        // If "New Delhi" is the default region, fetch all chapters
        if (formData.region === "new-delhi") {
          const chapterRes = await axios.get(`${baseUrl}/api/chapters`);
          setChapterData(chapterRes.data);
          setParticularChapterData(chapterRes.data[0])
          setallChapterData(chapterRes.data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching regions:", error);
        setLoading(false);
        toast.error(error.message);
      }
    };

    fetchRegions();
  }, [formData.region]);

  const validate = () => {
    const errors = {};
    if (!formData.region) errors.region = "BNI Region is required";
    if (!formData.chapter) errors.chapter = "BNI Chapter is required";
    if (!formData.memberName) errors.memberName = "Member Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.visitorName) errors.visitorName = "Visitor's Name is required";
    if (!formData.date) errors.date = "Visiting date is required";
    if (!formData.mobileNumber)
      errors.mobileNumber = "Mobile Number is required";
    if (!formData.address) errors.address = "Address is required";
    if (!formData.paymentType) errors.paymentType = "Payment mode is required";
    if(hasGst){
 if (!formData.company) errors.company = "Company is required";
    if (!formData.gstin) errors.gstin = "GSTIN is required";
    }
   
    if (!formData.business) errors.business = "Business Type is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(particularChapterData)
      // Log values for debugging
      const kitty_fee = particularChapterData.chapter_visitor_fees;
      const tax = (particularChapterData.chapter_visitor_fees * 0.18).toFixed(2);
      const total_amount = (parseFloat(tax) + parseFloat(kitty_fee)).toFixed(2);
      setFormData((prevFormData) => ({
        ...prevFormData,
   total_amount:total_amount,
   sub_total:kitty_fee,
   tax:tax,
  

      }));
    
      console.log(particularChapterData)
    if (validate()) {
      // Create form data
      console.log(formData)
    
      const data = {
        order_amount: formData.total_amount.toString(),
        order_note: formData.payment_note.toString(),
        order_currency: "INR",
        customer_details: {
          ...formData,
          ulid_id:`${ulid}`,
          universallink_name:"meeting-payments",
          customer_id:`User${formData.member_id}`,
          payment_note: "meeting-payments",
          Customer_name: formData.memberName,
          customer_email: formData.email,
          customer_phone: formData.mobileNumber,
          chapter_id: particularChapterData?.chapter_id,
          universal_link_id:`${universal_link_id}`,
          payment_gateway_id:`${payment_gateway}`,
      region_id: particularChapterData?.region_id,
        },

        order_meta: {
          payment_note:formData.payment_note,
          notify_url:
            "https://webhook.site/790283fa-f414-4260-af91-89f17e984ce2",
        },
      };

console.log(data);

      try {


        setPaymentLoading(true);

        const cashfree = await load({
          mode: "sandbox" // or "production"
        });
       
        const res = await axios.post(
          `${baseUrl}/api/generate-cashfree-session`, 
          data, // Make sure 'data' is the payload you want to send
          
        );
        console.log(res.data);
      

        let checkoutOptions = {
          paymentSessionId: res.data.payment_session_id,
          redirectTarget: "_self", //optional ( _self, _blank, or _top)
          // returnUrl: `https://bnipayments.nidmm.org/payment-status/${res.data.order_id}`,
          returnUrl: `${redirectUrl}/payment-status/${res.data.order_id}`,
        };

        await cashfree.checkout(checkoutOptions).then((result) => {
          if (result.error) {

            console.log(
              "User has closed the popup or there is some payment error, Check for Payment Status"
            );
            console.log(result.error);
            setPaymentLoading(false);
            alert(result.error.error);
          }
          if (result.redirect) {

            console.log("Payment will be redirected");
            setPaymentLoading(false);
          }
          if (result.paymentDetails) {

            console.log("Payment has been completed, Check for Payment Status");
            console.log(result.paymentDetails.paymentMessage);
            setPaymentLoading(false);
          }
        });
        // Handle the response data
      } catch (error) {
        setPaymentLoading(false);
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        alert(error.message);
      }
    } else {
      alert("Please fill all the required feilds");
    }
  };

  return (
<>
<ToastContainer />
    <ErrorBoundary>
        
     {loading? <LoaderImg/>: <div className="form-container">
        <div className="form-header">
          <h1>VISITORS PAYMENTS</h1>
          <img src={border} alt="" style={{ width: "250px" }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent:'space-between',alignItems:'center', }}>
          <form action="" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <div className="form-group" style={{ padding: "0px 20px" }}>
                  <label htmlFor="region" style={{ textAlign: "center" }}>
                    BNI Region :
                  </label>
                  <select
                    id="region"
                    name="region"
                    value={
                      formData.region
                        ? regionData?.findIndex(
                            (region) => region.region_name === formData.region
                          )
                        : "new-delhi"
                    } // Use index as the value
                    onChange={handleRegionChange}
                    className={errors.region ? "error" : ""}
                  >
                    {/* Add "New Delhi" as a default option */}
                    <option value="new-delhi">N E W Delhi</option>

                    {regionData &&
                      regionData.map((region, index) => (
                        <option value={index} key={index}>
                          {region.region_name}
                        </option>
                      ))}
                  </select>
                  {errors.region && (
                    <small className="error-text">{errors.region}</small>
                  )}
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
      <option value={chapter.chapter_name} key={index}>
        {chapter.chapter_name}
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
             

            <div className="form-group">
                    <label htmlFor="memberName">Invited  By :</label>
                    <input
                      type="text"
                      id="memberName"
                      name="memberName"
                      // onBlur={() => setSelectedMember(true)}
                      value={formData.memberName}
                      onChange={handleMemberNameChange}
                      placeholder="Enter Invited Member Name"
                      className={errors.memberName ? "error" : ""}
                    />

                    {/* Automatically display member names once data is fetched */}
                    {memberData && !selectedMember && (
                      <ul
                        className="member-list"
                        style={{ border: "1px solid red" }}
                      >
                        {selectedRegion || selectedChapter ? (
                          memberloading ? (
                            // Display loading message when loading is true
                            <p>Loading...</p>
                          ) : memberData.length > 0 ? (
                            // Display member data once loaded
                            memberData.map((member, index) => (
                              <li
                                key={index}
                                className="member-item"
                                onClick={() => memberDataHandler(index)}
                              >
                                {member.member_first_name +
                                  " " +
                                  member.member_last_name}
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

                    {errors.memberName && (
                      <small className="error-text">{errors.memberName}</small>
                    )}
                </div>



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
                <label htmlFor="business">Business/Profession :</label>
                <input
                  type="text"
                  id="business"
                  name="business"
                  value={formData.business}
                  onChange={handleChange}
                  placeholder="Enter business Address"
                  className={errors.business ? 'error' : ''}
               
                />
                {errors.business && <small className="error-text">{errors.business}</small>}
              </div>


      
  <div >
  <input
      id="hasGst"
      name="hasGst"
      type="checkbox"  // Correct type for checkbox
      checked={formData.hasGst}  // Bind the checkbox state to formData.hasGst
      onChange={handleGstChange} // Handles checkbox state changes
    // Remove readOnly to allow changes
    />
    <label htmlFor="hasGst" style={{marginLeft:"5px"}}> Has GST :</label>
   
   
  </div>

{hasGst &&   <div className="form-group" style={{marginTop:"10px"}}>
                <label htmlFor="company">Company Name :</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter company Address"
                  className={errors.company ? 'error' : ''}
               
                />
                {errors.company && <small className="error-text">{errors.company}</small>}
              </div>}

          

        
            </div>

            <div className="form-right">
     

            <div className="form-group">
                <label htmlFor="visitorName">Visitor Name :</label>
                <input
                  type="text"
                  id="visitorName"
                  name="visitorName"
                  value={formData.visitorName}
                  onChange={handleChange}
                  placeholder="Enter visitorName Address"
                  className={errors.visitorName ? 'error' : ''}
               
                />
                {errors.visitorName && <small className="error-text">{errors.visitorName}</small>}
              </div>
       

              <div className="form-group">
                <label htmlFor="date">Date :</label>
                <input
                  type="Date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="Enter date"
                 
                  className={errors.date ? 'error' : ''}
                />
                {errors.date && <small className="error-text">{errors.date}</small>}
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
                  <option value="credit">Credit </option>
                  <option value="debit">Debit </option>
               
                  <option value="netBanking">Net Banking </option>
                </select>
                {errors.paymentType && <small className="error-text">{errors.paymentType}</small>}
              </div>
             <div className="form-group" style={{marginTop:"10px"}}>
                <label htmlFor="address">Member Address :</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address Address"
                  className={errors.address ? 'error' : ''}
               
                />
                {errors.address && <small className="error-text">{errors.address}</small>}
              </div>

              {hasGst &&   <div className="form-group" style={{marginTop:"50px"}}>
                <label htmlFor="gstin">Comapny GSTIN :</label>
                <input
                  type="text"
                  id="gstin"
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleChange}
                  placeholder="Enter gstin Address"
                  className={errors.gstin ? 'error' : ''}
               
                />
                {errors.gstin && <small className="error-text">{errors.gstin}</small>}
              </div>}

            </div>
          </form>
{  formData.chapter && <div className="summary-container">
            <div className="summary">
              <h5 className="summary-heading">Summary</h5>
              <hr
                style={{ borderBottom: "1px solid rgb(204, 204, 204)", marginTop: "-5px" }}
              />
              <div className="summary-content">
           
                 <p>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                   Event/Training Fee:
                  </span>{" "}
                 
                  <span>  ₹  {formData
                          ? (
                              Number(
                                1000
                              )
                            ).toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }) // Indian format
                          : "0.00"}</span>
                </p>
        
                <p>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>GST (18%):</span>{" "}
                  <span>₹  {formData
                          ? (
                              Number(
                                (1000)*0.18||0
                              )
                            ).toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }) // Indian format
                          : "0.00"}</span>
                </p>
            
              </div>
              <div style={{ display: "flex", justifyContent: "space-between",}}>
                <div style={{ display: "flex", flexDirection: "column",alignItems:"flex-start" }}>
                  <span className="total">Total Amount</span>
                  <span>(Including GST:)</span>
                  <p>
                          <span
                            style={{
                              color: "red",
                              fontSize: "12px",
                              fontWeight: "400",
                            }}
                          >
                            Note:
                          </span>
                          <span
                            style={{
                              color: "black",
                              fontSize: "12px",
                              fontWeight: "400",
                            }}
                          >
                            convenience  charges will be applicable
                          </span>
                        </p>
                </div>
                <p>₹  {formData
                          ? (
                              Number(
                                1000 + (1000) * 0.18
                              )
                            ).toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }) // Indian format
                          : "0.00"}</p>
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

      </div>}
    </ErrorBoundary>
    </>
  );
};

export default Visitor;