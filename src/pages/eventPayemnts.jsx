import React, { Fragment } from 'react'
import Navbar from '../components/navbar/navbar'
import PaymentButtons from '../components/paymentButtons/paymentButtons'
import Footer from '../components/footer/footer'
import Copyright from '../components/footer/copyright'
import Breadcrumb from '../components/breadcum/breadcrumb'
import { ToastContainer } from 'react-toastify'
import EventPaymentForm from '../components/form/eventPaymentForm'


const EventPayments = () => {

const link="event-payments"

  return (
    
    
    <div >
  
      <Navbar />
    <Breadcrumb link={link}/>
    <EventPaymentForm/>
    
    <Footer />
    <Copyright/>
    </div>
  )
}

export default EventPayments