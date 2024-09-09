import React from 'react'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'
import Copyright from '../components/footer/copyright'
import Breadcrumb from '../components/breadcum/breadcrumb'
const InterviewSheet = () => {
  const link="interview-sheet"
 
 


  return (
    
    
    <>
      <Navbar />
      <Breadcrumb link={link}/>
    <Footer />
    <Copyright/>
    </>
  )
}

export default InterviewSheet