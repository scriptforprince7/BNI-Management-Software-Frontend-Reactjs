import React from 'react';
import Navbar from '../components/navbar/navbar';
import PaymentButtons from '../components/paymentButtons/paymentButtons';
import HomepageMainBanner from '../components/paymentButtons/banners/homepageBanner/homepageMainBanner';
import Footer from '../components/footer/footer';
import Copyright from '../components/footer/copyright';

const Homepage = () => {
    const titles = [
        "New Member Payment",
        "Renewal Payment",
        "Renewal Payment With Late Fee",
        "All Training Payments",
        "Meeting Payment"
    ];

    const links = [
        "new-member-payment",
        "renewal-payment",
        "renewal-payment-with-late-fee",
        "all-training-payments",
        "meeting-payment"
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
