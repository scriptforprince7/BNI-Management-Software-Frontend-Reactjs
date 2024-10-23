import React, { useState, useEffect } from "react";
import "./form.css";
import border from "../../assets/images/form icons/border.png";
import axios from "axios";
import ErrorBoundary from "../error/ErrorBoundary";
import baseUrl from "../../utils/baseurl";
import LoaderImg from "../loading/loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {load} from '@cashfreepayments/cashfree-js';
import ModalBox from "../modal/modal";
const BNIPaymentForm = () => {
  const [formData, setFormData] = useState({
    region: "new-delhi",
    chapter: "",
    memberName: "",
    email: "",
    renewalYear: "1Year",
    category: "",
    mobileNumber: "",
    company: "",
    gstin: "",
    paymentType: "",
    one_time_registration_fee: "",
    membership_fee: "",
    tax: "",
    latefee: "",
    total_amount: "",
  });

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
  const [paymentLoading, setPaymentLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChapterChange = (e) => {
    const selectedChapter = e.target.value;

    setselectedChapter(e.target.value);
    console.log(allChapterData);
    // Update formData with the selected chapter
    setFormData({
      ...formData,
      chapter: selectedChapter,
      memberName: "",
      email: "",
      renewalYear: "1Year",
      category: "",
      mobileNumber: "",
      company: "",
      gstin: "",
      paymentType: "",
    });

    const selectedChapterData = allChapterData?.find(
      (chapter) => chapter?.chapter_name === selectedChapter
    );

    console.log(selectedChapterData);
    setParticularChapterData(selectedChapterData);

    console.log(particularChapterData);
    // Find the index of the selected chapter
    const selectedIndex = allChapterData?.findIndex(
      (chapter) => chapter.chapter_name === selectedChapter
    );
    console.log(selectedIndex);
    setselectedChapter(allChapterData[selectedIndex]);
    console.log(selectedIndex);
    setParticularChapterData(allChapterData[selectedIndex]);

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
          console.log(particularChapterData);
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
    formData.email = particularMember.member_email_address;
    (formData.mobileNumber = particularMember.member_phone_number),
      (formData.category = particularMember.member_category);
    formData.company = particularMember.member_company_name;
    formData.gstin = particularMember.member_gst_number;
    formData.renewalYear = "1Year";
  };

  const handleSelectedChapterData = async (index) => {
    setParticularChapterData(chapterData[index]);
  };

  const handleRenewalYearChange = (e) => {
    const { value } = e.target;
    console.log(value);
    setFormData({ ...formData, renewalYear: value });

    let one_time_registration_fee = 0;
    let membership_fee = 0;
    let tax = 0;
    let total_amount = 0;

    if (value === "1Year") {
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

    if (value === "2Year") {
      const one_time_registration_fee =
        Number(particularChapterData.one_time_registration_fee) || 0;
      const membership_fee =
        Number(particularChapterData.chapter_membership_fee_two_year) || 0;

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

    // Show the modal if the selected year is "5Years"
    if (value === "5Year") {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
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
      const data = {
        order_amount: formData.total_amount.toString(),
        order_currency: "INR",
        customer_details: {
          ...formData,
          customer_id: "User1",
          Customer_name: formData.memberName,
          customer_email: formData.email,
          customer_phone: formData.mobileNumber,
        },
        order_meta: {
          notify_url:
            "https://webhook.site/790283fa-f414-4260-af91-89f17e984ce2",
        },
      };

      try {

        


const cashfree = await  load({
    mode: "sandbox" // or "production"
});
        setPaymentLoading(true);
        const res = await axios.post(
          "http://localhost:5000/api/generate-cashfree-session",
          data
        );
        console.log(res.data)
        let checkoutOptions = {
          paymentSessionId: res.data.payment_session_id,
          redirectTarget: "_self", //optional ( _self, _blank, or _top)
          returnUrl: "http://localhost:5173/",
        };

     await cashfree.checkout(checkoutOptions).then((result) => {
          if (result.error) {
           
            console.log(
              "User has closed the popup or there is some payment error, Check for Payment Status"
            );
            console.log(result.error);
            setPaymentLoading(false);
            alert(result.error);
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
    if (!formData.category) errors.category = "Category is required";
    if (!formData.mobileNumber)
      errors.mobileNumber = "Mobile Number is required";
    if (!formData.company) errors.company = "Company is required";
    if (!formData.paymentType) errors.paymentType = "Payment Type is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCloseModal = () => {
    setShowModal(false);
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

  

 

  return (
    <>
      <ToastContainer />

      <ErrorBoundary>
        {loading ? (
          <LoaderImg />
        ) : (
          <div className="form-container">
            <div className="form-header">
              <h1> NEW MEMBER PAYMENT</h1>
              <img src={border} alt="" style={{ width: "250px" }} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <form
                action=""
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  margin: "",
                }}
              >
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
                  <label htmlFor="chapter" style={{ textAlign: "center" }}>
                    BNI Chapter:
                  </label>
                  <select
                    id="chapter"
                    name="chapter"
                    value={formData.chapter}
                    onChange={handleChapterChange} // Detect chapter change
                    className={errors.chapter ? "error" : ""}
                  >
                    <option value="">Select Chapter</option>

                    {chapterData &&
                      chapterData.map((chapter, index) => (
                        <option value={chapter.chapter_name} key={index}>
                          {chapter.chapter_name}
                        </option>
                      ))}
                  </select>

                  {errors.chapter && (
                    <small className="error-text">{errors.chapter}</small>
                  )}
                </div>
              </form>
            </div>
            <div className="box-container">
              <form className="form-content" onSubmit={handleSubmit}>
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
                      className={errors.mobileNumber ? "error" : ""}
                      readOnly
                    />
                    {errors.mobileNumber && (
                      <small className="error-text">
                        {errors.mobileNumber}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="renewalYear">Select Membership </label>
                    <select
                      id="renewalYear"
                      name="renewalYear"
                      value={formData.renewalYear}
                      onChange={handleRenewalYearChange}
                      className={errors.renewalYear ? "error" : ""}
                    >
                      <option value="">Select Membership </option>
                      <option value="1Year">1 Year</option>
                      <option value="2Year">2 Years</option>
                      <option value="5Year">5 Years</option>
                    </select>
                    {formData.renewalYear === "5Year" && (
                      <ModalBox
                        title="Note !"
                        message="Please contact your regional office for assistance."
                        show={showModal}
                        handleClose={handleCloseModal}
                      />
                    )}
                    {errors.renewalYear && (
                      <small className="error-text">{errors.renewalYear}</small>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="paymentType">Payment Type :</label>
                    <select
                      id="paymentType"
                      name="paymentType"
                      value={formData.paymentType}
                      onChange={handleChange}
                      className={errors.paymentType ? "error" : ""}
                    >
                      <option value="">Choose Payment Type</option>
                      <option value="credit">Credit (1.25%)</option>
                      <option value="debit">Debit (1.25%)</option>
                      <option value="netBanking">Net Banking (1.25%)</option>
                    </select>
                    {errors.paymentType && (
                      <small className="error-text">{errors.paymentType}</small>
                    )}
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
                      readOnly
                      className={errors.email ? "error" : ""}
                    />
                    {errors.email && (
                      <small className="error-text">{errors.email}</small>
                    )}
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
                      className={errors.category ? "error" : ""}
                      readOnly
                    />
                    {errors.category && (
                      <small className="error-text">{errors.category}</small>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">Company :</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Enter Company Name"
                      className={errors.company ? "error" : ""}
                    />
                    {errors.company && (
                      <small className="error-text">{errors.company}</small>
                    )}
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
                    <p style={{ fontSize: "12px", color: "red" }}>
                      *Please fill null if you don't have GST Number
                    </p>
                  </div>
                </div>
              </form>
              {particularChapterData && formData.renewalYear === "1Year" && (
                <div className="summary-container">
                  <div className="summary">
                    <h5 className="summary-heading">Summary</h5>
                    <hr
                      style={{
                        borderBottom: "1px solid rgb(204, 204, 204)",
                        marginTop: "-5px",
                      }}
                    />
                    <div className="summary-content">
                      <p>
                        <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                          One Time Registration Fee:
                        </span>{" "}
                        <span>
                          ₹
                          {particularChapterData &&
                          particularChapterData.one_time_registration_fee
                            ? Number(
                                particularChapterData.one_time_registration_fee
                              ).toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }) // Indian format
                            : ""}
                        </span>
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                          Membership Fee:
                        </span>{" "}
                        <span>
                          ₹
                          {particularChapterData &&
                          particularChapterData.chapter_membership_fee
                            ? Number(
                                particularChapterData.chapter_membership_fee
                              ).toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }) // Indian format
                            : ""}{" "}
                        </span>
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                          Subtotal:
                        </span>{" "}
                        <span>
                          ₹
                          {particularChapterData
                            ? (
                                Number(
                                  particularChapterData.one_time_registration_fee ||
                                    0
                                ) +
                                Number(
                                  particularChapterData.chapter_membership_fee ||
                                    0
                                )
                              ).toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }) // Indian format
                            : ""}
                        </span>
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                          GST (18%):
                        </span>{" "}
                        <span>
                          ₹
                          {particularChapterData
                            ? Math.round(
                                (Number(
                                  particularChapterData.one_time_registration_fee
                                ) +
                                  Number(
                                    particularChapterData.chapter_membership_fee
                                  )) *
                                  0.18
                              ).toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }) // Indian format
                            : ""}
                        </span>
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          flexDirection: "column",
                        }}
                      >
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
                      <p>
                        ₹
                        {particularChapterData
                          ? Math.round(
                              Number(
                                particularChapterData.chapter_membership_fee ||
                                  0
                              ) +
                                Number(
                                  particularChapterData.one_time_registration_fee ||
                                    0
                                ) +
                                (Number(
                                  particularChapterData.one_time_registration_fee ||
                                    0
                                ) +
                                  Number(
                                    particularChapterData.chapter_membership_fee ||
                                      0
                                  )) *
                                  0.18
                            ).toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }) // Indian format
                          : "0.00"}
                      </p>
                    </div>
                  </div>
                  <button className="pay-now-button" onClick={handleSubmit}>
                    {loading ? "Loading..." : " PAY NOW"}
                  </button>
                </div>
              )}

              {particularChapterData && formData.renewalYear === "2Year" && (
                <div className="summary-container">
                  <div className="summary">
                    <h5 className="summary-heading">Summary</h5>
                    <hr
                      style={{
                        borderBottom: "1px solid rgb(204, 204, 204)",
                        marginTop: "-5px",
                      }}
                    />
                    <div className="summary-content">
                      <p>
                        <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                          One Time Registration Fee:
                        </span>{" "}
                        <span>
                          ₹
                          {particularChapterData &&
                          particularChapterData.one_time_registration_fee
                            ? Number(
                                particularChapterData.one_time_registration_fee
                              ).toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }) // Indian format
                            : ""}
                        </span>
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                          Membership Fee:
                        </span>{" "}
                        <span>
                          ₹
                          {particularChapterData &&
                          particularChapterData.chapter_membership_fee_two_year
                            ? Number(
                                particularChapterData.chapter_membership_fee_two_year
                              ).toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }) // Indian format
                            : ""}{" "}
                        </span>
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                          Subtotal:
                        </span>{" "}
                        <span>
                          ₹
                          {particularChapterData
                            ? (
                                Number(
                                  particularChapterData.one_time_registration_fee ||
                                    0
                                ) +
                                Number(
                                  particularChapterData.chapter_membership_fee_two_year ||
                                    0
                                )
                              ).toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }) // Indian format
                            : ""}
                        </span>
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                          GST (18%):
                        </span>{" "}
                        <span>
                          ₹
                          {particularChapterData
                            ? Math.round(
                                (Number(
                                  particularChapterData.one_time_registration_fee
                                ) +
                                  Number(
                                    particularChapterData.chapter_membership_fee_two_year
                                  )) *
                                  0.18
                              ).toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }) // Indian format
                            : ""}
                        </span>
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          flexDirection: "column",
                        }}
                      >
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
                      <p>
                        ₹
                        {particularChapterData
                          ? Math.round(
                              Number(
                                particularChapterData.chapter_membership_fee_two_year ||
                                  0
                              ) +
                                Number(
                                  particularChapterData.one_time_registration_fee ||
                                    0
                                ) +
                                (Number(
                                  particularChapterData.one_time_registration_fee ||
                                    0
                                ) +
                                  Number(
                                    particularChapterData.chapter_membership_fee_two_year ||
                                      0
                                  )) *
                                  0.18
                            ).toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }) // Indian format
                          : "0.00"}
                      </p>
                    </div>
                  </div>
                  <button className="pay-now-button" onClick={handleSubmit}>
                    {paymentLoading ? "Loading..." : "PAY NOW"}
                  </button>
                </div>
              )}

              {formData.renewalYear === "5Year" && (
                <div className="summary-container">
                  <div className="summary">
                    <hr
                      style={{
                        borderBottom: "1px solid rgb(204, 204, 204)",
                        marginTop: "-5px",
                      }}
                    />
                  </div>
                  <button
                    className="pay-now-button"
                    onClick={() => setShowModal(true)}
                  >
                    For Membership Of 5 Years Please Contact Regional Office
                  </button>
                </div>
              )}
            </div>

            <div className="form-note">
              <p>{/* <span style={{ color: "red" }}>NOTE:</span>  */}</p>
            </div>
          </div>
        )}
      </ErrorBoundary>
    </>
  );
};

export default BNIPaymentForm;
