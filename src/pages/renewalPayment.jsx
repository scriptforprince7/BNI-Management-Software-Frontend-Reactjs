import React from 'react'
import Navbar from '../components/navbar/navbar'
import PaymentButtons from '../components/paymentButtons/paymentButtons'
import Footer from '../components/footer/footer'
import RenewalPaymentForm from '../components/form/renewalPayment'
import Copyright from '../components/footer/copyright'
import Breadcrumb from '../components/breadcum/breadcrumb'

const RenewalPayment = () => {
  const link="renewal-payment"
 
  return (
    
    
    <>
      <Navbar />
      <Breadcrumb link={link}/>
   <RenewalPaymentForm />
    <Footer />
    <Copyright/>
    </>
  )
}

export default RenewalPayment