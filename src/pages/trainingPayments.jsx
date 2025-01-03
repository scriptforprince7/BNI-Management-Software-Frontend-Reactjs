import React, { Fragment } from 'react'
import Navbar from '../components/navbar/navbar'
import PaymentButtons from '../components/paymentButtons/paymentButtons'
import Footer from '../components/footer/footer'
import AllPaymentsForm from '../components/form/trainingpaymentsForm'
import Copyright from '../components/footer/copyright'
import Breadcrumb from '../components/breadcum/breadcrumb'
import { ToastContainer } from 'react-toastify'


const TrainingPayments = () => {

const link="training-payments"

  return (
    
    
    <div >
  
      <Navbar />
    <Breadcrumb link={link}/>
    <AllPaymentsForm/>
    
    <Footer />
    <Copyright/>
    </div>
  )
}

export default TrainingPayments