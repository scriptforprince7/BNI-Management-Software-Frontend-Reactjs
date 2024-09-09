import React, { Fragment } from 'react'
import "./homepageBanner.css"
const HomepageMainBanner = () => {
  return (
    <Fragment>
      <div className='banner-container'>
        <div className="container" ><div className='text-container'>
          <h1>BNI Payment Simplified: </h1>
          <h3>Everything You Need In One Location</h3>
          <div className='link-buttons'>
            <a href='https://selfie.nidmm.org' target='_blank'><button >BNI Selfie</button></a>
            <a href='https://bni-scorecard.codersgallery.com/' target='_blank'><button>Check MTL</button></a>
          </div>
        </div></div>
      </div>
    </Fragment>
  )
}

export default HomepageMainBanner