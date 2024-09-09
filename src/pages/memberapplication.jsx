import React from 'react'
import Navbar from '../components/navbar/navbar'
import PaymentButtons from '../components/paymentButtons/paymentButtons'
import Footer from '../components/footer/footer'
import Copyright from '../components/footer/copyright'
import Breadcrumb from '../components/breadcum/breadcrumb'
import MemberApplicationForm from '../components/form/memberApplicationForm'
const MemberApplication = () => {
  const link="member-application"
  

  return (
    
    
    <>
      <Navbar />
      <Breadcrumb link={link}/>
    <MemberApplicationForm />
    <Footer />
    <Copyright/>
    </>
  )
}

export default MemberApplication