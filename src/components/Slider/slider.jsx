import Carousel from 'react-bootstrap/Carousel';
import image from '../../assets/images/banners/Member-Of-Region.jpg'
import image2 from '../../assets/images/banners/Member-Of-Month.jpg'
function Slider() {
  return (
    <Carousel data-bs-theme="dark">
    <Carousel.Item>
      <img className="d-block w-100" src={image} alt="First slide" />
      <Carousel.Caption>
        {/* <h5>First slide label</h5>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img className="d-block w-100" src={image2} alt="Second slide" />
      <Carousel.Caption>
      
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img className="d-block w-100" src={image} alt="Third slide" />
      <Carousel.Caption>
   
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  );
}

export default Slider;