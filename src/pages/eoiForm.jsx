import React from 'react'
import Navbar from '../components/navbar/navbar'
import PaymentButtons from '../components/paymentButtons/paymentButtons'
import Footer from '../components/footer/footer'
import MeetingPaymentsForm from '../components/form/EoiForm'
import Copyright from '../components/footer/copyright'
import Breadcrumb from '../components/breadcum/breadcrumb'
const EoiForm = () => {

  const link="eoi-form"
 

  return (
    
    
    <>
      <Navbar />
      <Breadcrumb link={link}/>
      <MeetingPaymentsForm/>
    <Footer />
    <Copyright/>
    </>
  )
}

export default EoiForm