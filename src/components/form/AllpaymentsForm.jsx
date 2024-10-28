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
import { useNavigate, useParams } from 'react-router-dom';
import { load } from '@cashfreepayments/cashfree-js';

const AllPaymentsForm = () => {
  const [formData, setFormData] = useState({
    region: "new-delhi",
    chapter: '',
    chapter_id:'',
    region_id:'',
    memberName: '',
    email: '',
    payment_note:'all-training-ans-meeting-payment',
    quarter: 'Jan-March',
    renewalYear: '1Year',
    category: '',
    mobileNumber: '',
    address: '',
    company: '',
    gstin: '',
    location: "",
    date: "",
    time: "",
    eventPrice: '',
    eventName: '',
    sub_total:'',
total_amount:"",
tax:"",
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
  const { ulid,universal_link_id,payment_gateway} = useParams()
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChapterChange =async (e) => {
 try {
  setLoading(true)
  const selectedChapter = e.target.value;
  setselectedChapter(e.target.value);


  // Update formData with the selected chapter
  setFormData({
    ...formData,
    chapter: selectedChapter,
    memberName: "",
    email: "",
    quarter:"",
    renewalYear: "1Year",
    category: "",
    mobileNumber: "",
    address: "",
    company: "",
    gstin: "",
    eventPrice: "",
  });

  const selectedChapterData = allChapterData?.find(
    (chapter) => chapter?.chapter_name === selectedChapter
  );
 
  setParticularChapterData(allChapterData[selectedChapter]);

  
  // Find the index of the selected chapter
  const selectedIndex = allChapterData?.findIndex(
    (chapter) => chapter.chapter_name === selectedChapter
  );
  setselectedChapter(allChapterData[selectedIndex]);
  // Call the function to handle the selected chapter data
  if (selectedIndex !== -1) {
    handleSelectedChapterData(selectedIndex);
  }
  const events= await axios.get(`${baseUrl}/api/allEvents`);
setEvents(events.data)
console.log(events)
setLoading(false)
 } catch (error) {
  setLoading(false)
  toast.error("Something went wrong try again")
 }

  };

  const handleRegionChange = async (e) => {
    const selectedIndex = e.target.value;
    const selectedRegionData = regionData[selectedIndex];

    // Update formData with the selected region name
    const updatedRegion = selectedRegionData?.region_name || e.target.value;
    setFormData({
      ...formData,
      region: updatedRegion, // Ensure formData includes selected region
      memberName: "",
      email: "",
      renewalYear: "1Year",
      category: "",
      mobileNumber: "",
      address: "",
      company: "",
      quarter:"",
      gstin: "",
      eventPrice: "",
    });
    setmemberData("")
    setSelectedRegion(selectedRegionData);
    setParticularRegionData(selectedRegionData);

    try {
      setLoading(true);

      // If "New Delhi" is selected, fetch all chapters
      if (updatedRegion.toLowerCase() === "new-delhi") {
        const res = await axios.get(`${baseUrl}/api/chapters`);
        setChapterData(res.data); // Display all chapters
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
  const eventChangeHandler = (e) => {
    const eventId = e.target.value; // Get the event_id from the selected option
    const selectedEvent = events[eventId] // Find the event based on event_id
    const eventPrice = Number(selectedEvent.event_price);
    if (selectedEvent) {
      // Convert event_date to a Date object
      const eventDate = new Date(selectedEvent.event_date);
  
      // Format the date as yyyy-MM-dd (required for input type="date")
      const formattedDate = eventDate.toISOString().split('T')[0]; // This will give you "yyyy-MM-dd"
      const subtotal = Number(eventPrice.toFixed(2)); // This will still return a string
      const eventTax = Number((eventPrice * 0.18).toFixed(2))
      // Update form data based on selected event
      setFormData({
        ...formData,
        eventName: selectedEvent.event_name,  // Set eventName to selected event's name
        location: selectedEvent.event_venue,  // Update location
        date: formattedDate,       
        eventPrice:selectedEvent.eventPrice,           // Set the formatted date in "yyyy-MM-dd" format
        time: selectedEvent.event_time || "16:00", // Update time if available, otherwise set a default value
        eventPrice: selectedEvent.event_price ,// Update event price
        tax:eventTax,
        sub_total:subtotal,
        total_amount:eventTax+subtotal


      });
  
    }
  };

  const memberDataHandler = async (index) => {
    setSelectedMember(true);
    const particularMember = memberData[index];

    formData.memberName =
      particularMember.member_first_name +
      " " +
      particularMember.member_last_name;
    formData.email = particularMember.member_email_address;
    (formData.mobileNumber = particularMember.member_phone_number),
      (formData.category = particularMember.member_category);
    formData.company = particularMember.member_company_name;
    formData.gstin = particularMember.member_gst_number;
    formData.renewalYear = "1Year";
    formData.chapter_id=particularMember.chapter_id;
    formData.region_id=particularMember.region_id;
  };

  const handleSelectedChapterData = async (index) => {
    setParticularChapterData(chapterData[index]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.renewalYear === "1Year") {
      const one_time_registration_fee =
        Number(particularChapterData.one_time_registration_fee) || 0;
      const membership_fee =
        Number(particularChapterData.chapter_membership_fee) || 0;
      const tax = (one_time_registration_fee + membership_fee) * 0.18;
      const total_amount = one_time_registration_fee + membership_fee + tax;

      // Log values for debugging

      setFormData((prevFormData) => ({
        ...prevFormData,
        one_time_registration_fee,
        membership_fee,
        tax,
        total_amount,
      }));
    }
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
          universallink_name:"new-member-payment",
          customer_id:`User${formData.member_id}`,
          payment_note: "new-member-payment",
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
          // `${baseUrl}/api/generate-cashfree-session`, 
          `http://localhost:5000/api/generate-cashfree-session`,
          data, // Make sure 'data' is the payload you want to send
          
        );
        console.log(res.data);
      

        let checkoutOptions = {
          paymentSessionId: res.data.payment_session_id,
          redirectTarget: "_self", //optional ( _self, _blank, or _top)
          // returnUrl: `https://bnipayments.nidmm.org/payment-status/${res.data.order_id}`,
          returnUrl: `http://localhost:5173/payment-status/${res.data.order_id}`,
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

  
  const validate = () => {
    const errors = {};
    if (!formData.region) errors.region = "BNI Region is required";
    if (!formData.chapter) errors.chapter = "BNI Chapter is required";
    if (!formData.memberName) errors.memberName = "Member Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.renewalYear) errors.renewalYear = "Renewal Year is required";
    // if (!formData.category) errors.category = "Category is required";
    if (!formData.mobileNumber)
      errors.mobileNumber = "Mobile Number is required";
    // if (!formData.address) errors.address = "Address is required";
    // if (!formData.company) errors.company = "Company is required";
    if (!formData.eventPrice) errors.eventPrice = "Payment Type is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
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
          setSelectedRegion("new-delhi")
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
  }, [formData.region,]);


 

  return (
<>
<ToastContainer />
    <ErrorBoundary>
        
     {loading? <LoaderImg/>: <div className="form-container">
        <div className="form-header">
          <h1> All TRAINING & EVENTS PAYMENTS</h1>
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
      <option value={index} key={index}>
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
                    <label htmlFor="memberName">Member Name :</label>
                    <input
                      type="text"
                      id="memberName"
                      name="memberName"
                      // onBlur={() => setSelectedMember(true)}
                      value={formData.memberName}
                      onChange={handleMemberNameChange}
                      placeholder="Enter Member Name"
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
                <label htmlFor="mobileNumber">Mobile Number :</label>
                <input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                  className={errors.mobileNumber ? 'error' : ''}
                  readOnly
                />
                {errors.mobileNumber && <small className="error-text">{errors.mobileNumber}</small>}
              </div>

   
              <div className="form-group">
      <label htmlFor="eventName">Select Event/Training</label>
      {events ? (
        <select
          id="eventName"
          name="eventName"
          value={ events?.findIndex(
            (event) => event.event_name === formData.eventName
          )||formData.eventName}  // Bind the selected event name to formData
          onChange={eventChangeHandler}
          className={errors.eventName ? 'error' : ''}
        >
          <option value="">Select Event/Training</option>
          {events.map((event, index) => (
            <option key={index} value={event.event_id}>
              {event.event_name}
            </option>
          ))}
        </select>
      ) : (
        <select disabled>
          <option>Please select region and chapter</option>
        </select>
      )}

      {errors.eventName && <small className="error-text">{errors.eventName}</small>}
    </div>


    {formData.eventName && (
      <div className="form-group">
        <label htmlFor="date">Event Date :</label>
        <input
          id="date"
          name="date"
          value={formData.date}  // Bind the date input to formData.date
          type="date"  // Corrected to "date"
          onChange={handleChange} // If you have a specific handler for changes
          placeholder='Event date fetch automatically on selecting event'
          className={errors.date ? 'error' : ''}
          readOnly // You can keep this readOnly if you don't want users to edit it
        />
        
        {errors.date && <small className="error-text">{errors.date}</small>}
      </div>
    )}
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
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
               
                  <option value="netBanking">Net Banking</option>
                </select>
                {errors.paymentType && <small className="error-text">{errors.paymentType}</small>}
              </div>
            </div>

            <div className="form-right">
     

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
                  readOnly
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
                  readOnly
                  className={errors.category ? 'error' : ''}
                />
                {errors.category && <small className="error-text">{errors.category}</small>}
              </div>

              {formData .eventName  && 
      <div className="form-group">
                <label htmlFor="location">Location :</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder=" Enter location  "
                  className={errors.location ? 'error' : ''}
                  readOnly
                />
                {errors.location && <small className="error-text">{errors.location}</small>}
              </div>}
       

{formData .eventName  && 
      <div className="form-group">
                <label htmlFor="company">Event Time :</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder=" Enter time  "
                  className={errors.time ? 'error' : ''}
                  readOnly
                />
                {errors.time && <small className="error-text">{errors.time}</small>}
              </div>}
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
{formData.eventPrice && <div className="summary-container">
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
                 
                  <span>  ₹  {formData.eventPrice
                          ? (
                              Number(
                                formData?.eventPrice||0
                              )
                            ).toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }) // Indian format
                          : "0.00"}</span>
                </p>
        
                <p>
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>GST (18%):</span>{" "}
                  <span>₹  {formData.eventPrice
                          ? (
                        Math.round(      Number(
                          (formData?.eventPrice)*0.18||0
                        ))
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
                            Convenience charges will be applicable
                          </span>
                        </p>
                </div>
                <p>₹  {formData.eventPrice
                          ? (
                             Math.round( Number(
                              Number(formData.eventPrice) + Number(formData.eventPrice) * 0.18
                            ))
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

export default AllPaymentsForm;