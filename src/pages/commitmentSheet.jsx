import React from 'react'
import Navbar from '../components/navbar/navbar'
import PaymentButtons from '../components/paymentButtons/paymentButtons'
import Footer from '../components/footer/footer'
import Copyright from '../components/footer/copyright'
import Breadcrumb from '../components/breadcum/breadcrumb'

const CommitmentSheet = () => {
  const link="commitment-sheet"
  


  return (
    
    
    <>
      <Navbar />
      <Breadcrumb link={link}/>
    
    <Footer />
    <Copyright/>
    </>
  )
}

export default CommitmentSheet