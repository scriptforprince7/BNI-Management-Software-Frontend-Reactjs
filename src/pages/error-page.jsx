import React from 'react'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <>
    <Navbar/>
    <div style={{ display: 'flex', flexDirection: "column", alignItems: "center", width: "50%", margin: "50px auto", padding: "10px", }}>

<img src="https://t4.ftcdn.net/jpg/05/24/04/51/360_F_524045110_UXnCx4GEDapddDi5tdlY96s4g0MxHRvt.jpg" alt="Success" width="400px" height="350px" />
<h2 style={{ color: 'red' }}>Something went wrong!</h2>
<Link to="/" style={{ width: "200px" }}>
  <button className="pay-now-button" >
    {"Home"}
  </button></Link>
</div>
    <Footer/>
    </>
  )
}

export default ErrorPage
