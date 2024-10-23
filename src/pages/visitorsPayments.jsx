import React, { Fragment } from 'react'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'
import VisitorPaymentForm from '../components/form/visitorpaymentForm'

const VisitorsPayments = () => {
  return (
   <Fragment>
  <Navbar/>
 <VisitorPaymentForm/>
  <Footer/>
   </Fragment>
  )
}

export default VisitorsPayments