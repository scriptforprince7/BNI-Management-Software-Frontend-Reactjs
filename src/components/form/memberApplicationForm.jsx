import React, { useState, useEffect } from 'react';
import './form.css';
import axios from 'axios';
import border from "../../assets/images/form icons/border.png"
import qrCode from "../../assets/images/form icons/qr.png"
import baseUrl from '../../utils/baseurl';
import LoaderImg from '../loading/loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MemberApplicationForm = () => {
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
  const [regionData, setRegionData] = useState([]);
  const [chapterData, setChapterData] = useState([]);
  const [eoiLink, setEoiLink] = useState("");
  const[loading,setLoading]=useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRegionChange = async (e) => {
    try {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });

      // Fetch chapters for selected region
      const res = await axios.get(`${baseUrl}/api/getChapters`);
      const result = res.data.data.filter(item => item.region.regionName === value);

      setChapterData(result);
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  };

  const handleChapterChange = (e) => {
    const selectedChapterIndex = e.target.selectedIndex - 1; // Adjust for the placeholder option
    if (selectedChapterIndex >= 0) {
      const selectedChapter = chapterData[selectedChapterIndex];
      setFormData({
        ...formData,
        chapter: selectedChapter.chapterName
      });
      setEoiLink(selectedChapter.memberAppLink);
    }
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

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${baseUrl}/api/getregions`);

        setRegionData(res.data.data);
         setLoading(false)
      } catch (error) {
        console.error("Error fetching regions:", error);
        setLoading(false)
        toast.error(error.message);
      }
    };

    fetchRegions();
  }, [])

  return (
    <>
    <ToastContainer />
    {loading? <LoaderImg/>: <div className="form-container" style={{ backgroundColor: '#f4f4f4' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: "" }}>
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
              onChange={handleChapterChange}
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

      {regionData && chapterData && eoiLink && <div className="form-header">
        <img src={qrCode} alt="QR Code" style={{ width: "400px" }} />
        <p>
          {eoiLink ? (
            <a href={eoiLink} target="_blank" rel="noopener noreferrer">
              {eoiLink}
            </a>
          ) : (
            <p>Your Member Application Form  link will display here on selecting Region and Chapter</p>
          )}
        </p>
      </div>}

      <div className="form-note">
        <p>
          <span style={{ color: "red" }}>NOTE:</span> Choose BNI region and BNI chapter for generating QR Code. <br />Please check the generated QR code after scanning.
        </p>
      </div>
    </div>
        }
        </>
  );
};

export default MemberApplicationForm;
