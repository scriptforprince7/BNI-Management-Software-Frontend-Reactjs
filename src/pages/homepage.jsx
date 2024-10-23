import React, {useEffect} from 'react';
import Navbar from '../components/navbar/navbar';
import PaymentButtons from '../components/paymentButtons/paymentButtons';
import HomepageMainBanner from '../components/paymentButtons/banners/homepageBanner/homepageMainBanner';
import Footer from '../components/footer/footer';
import Copyright from '../components/footer/copyright';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Homepage = () => {
    
    const titles = [
        "New Member Payment",
        "Renewal Payment",
        "Training & Events Payments",
        "Meeting Payment",
        "Visitors Payments"
    ];

    const links = [
        "new-member-payment",
        "renewal-payment",
        "all-training-payments",
        "meeting-payment",
        "visitors-payments"
    ];
    

    

    return (
        <>
    
            <Navbar />
            <PaymentButtons titles={titles} links={links} />
            <HomepageMainBanner />
            <Footer />
            <Copyright/>
        </>
    );
}

export default Homepage;
