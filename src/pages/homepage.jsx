import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/navbar';
import PaymentButtons from '../components/paymentButtons/paymentButtons';
import HomepageMainBanner from '../components/paymentButtons/banners/homepageBanner/homepageMainBanner';
import Footer from '../components/footer/footer';
import Copyright from '../components/footer/copyright';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import baseUrl from '../utils/baseurl';
import LoaderImg from '../components/loading/loading';

const Homepage = () => {
  const [loading, setLoading] = useState(false);
  const [navdata, setNavdata] = useState([]);

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


  // Create titles and links from navdata
  const titles = navdata.map(link => link.universal_link_name); // Extract titles
  const links = navdata.map(link => `${link.link_slug}/${link.ulid}`); // Create links with slug and id

  console.log(navdata); // Debug log for fetched navdata

  return (
    <>
      {loading ? (
        <LoaderImg /> // Show loading spinner while fetching data
      ) : (
        <>
          <ToastContainer />
          <Navbar />
          <PaymentButtons titles={titles} links={links} />
          <HomepageMainBanner />
          <Footer />
          <Copyright />
        </>
      )}
    </>
  );
  
}

export default Homepage;
