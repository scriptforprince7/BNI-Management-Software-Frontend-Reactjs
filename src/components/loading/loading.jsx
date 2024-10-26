import loaderImg from "../../assets/images/loader/loader.gif";
const LoaderImg = () => {
  return (
    <>
      <div style={{display:"flex",justifyContent:"center",margin:"100px 0px"}}>
        <img src={loaderImg} className="img-fluid" alt="loading" style={{ maxWidth: "100px" }} />
      </div>
    </>
  );
};

export default LoaderImg;