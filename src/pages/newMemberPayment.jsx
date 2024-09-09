import React from 'react'
import Navbar from '../components/navbar/navbar'
import PaymentButtons from '../components/paymentButtons/paymentButtons'
import Footer from '../components/footer/footer'
import BNIPaymentForm from '../components/form/bniPaymentForm'
import Copyright from '../components/footer/copyright'
import Breadcrumb from '../components/breadcum/breadcrumb'

const NewMemberPayment = () => {
  const link="new-member-payment"
  
  return (
    
    
    <>
      <Navbar />
    {/* <PaymentButtons titles={titles} links={links} /> */}
  <Breadcrumb link={link}/>
    <BNIPaymentForm/>
    <Footer />
    <Copyright/>
    </>
  )
}

export default NewMemberPayment