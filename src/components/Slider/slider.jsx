import Carousel from 'react-bootstrap/Carousel';
import image from '../../assets/images/banners/Member-Of-Region.jpg'
import image2 from '../../assets/images/banners/Member-Of-Month.jpg'
import Member_of_the_region from "../../assets/images/banners/member_of_the_region.png"
import Member_of_the_month from "../../assets/images/banners/member_of_the_month.png"
import "../../components/paymentButtons/banners/homepageBanner/homepageBanner.css"
function Slider() {
  return (
    <Carousel data-bs-theme="dark">
          <Carousel.Item>
         <div className='banner-container'>
         <div className="container">
          <div className="text-container">
            <h1>BNI Payment Simplified: </h1>
            <h3>Everything You Need In One Location</h3>
            <div className="link-buttons">
              <a href="https://selfie.nidmm.org" target="_blank">
                <button>BNI Selfie</button>
              </a>
              <a
                href="https://bni-scorecard.codersgallery.com/"
                target="_blank"
              >
                <button>Check MTL</button>
              </a>
            </div>
          </div>
          
        </div>
        
         </div>
    </Carousel.Item>
    <Carousel.Item>
         <div className='banner-container1'>
         <div className="container">
          <div className="text-container">
            <h1>Member Of The Region: </h1>
            <h3>"Congrats to our Region Member of the Month"</h3>
          </div>
          <img className="d-block w-100" src={Member_of_the_region} alt="Second slide" style={{width:"100%",height:"100%"}} />
        </div>
        
         </div>
    </Carousel.Item>
    <Carousel.Item>
         <div className='banner-container1'>
         <div className="container">
          <div className="text-container">
            <h1>Member Of The Month: </h1>
            <h3>"Congrats to our Member of the Month for their outstanding support"</h3>
           
          </div>
          <img className="d-block w-100" src={Member_of_the_month} alt="Second slide" style={{width:"100%",height:"100%"}} />
        </div>
        
         </div>
    </Carousel.Item>
    
  
 
  </Carousel>
  );
}

export default Slider;