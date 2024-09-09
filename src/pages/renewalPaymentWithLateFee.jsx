import React from 'react'
import Navbar from '../components/navbar/navbar'
import PaymentButtons from '../components/paymentButtons/paymentButtons'
import Footer from '../components/footer/footer'
import RenewalPaymentLateFeeForm from '../components/form/renewalPaymentLateFee'
import Copyright from '../components/footer/copyright'
import Breadcrumb from '../components/breadcum/breadcrumb'

const RenewalPaymentWithLateFee = () => {
  
   const link="renewal-payment-with-late-fee"


  return (
    
    
    <>
      <Navbar />
      <Breadcrumb link={link}/>
      <RenewalPaymentLateFeeForm/>
    <Footer />
    <Copyright/>
    </>
  )
}

export default RenewalPaymentWithLateFee