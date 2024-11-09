import { useEffect, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

function App({ url = '', limit = 5, page = 1 }) { 
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(getUrl);
      const data = await response.json();
      if (data) {
        setImages(data);
      }
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url !== '') fetchImages(url);
  }, [url, limit, page]); 

  if (loading) {
    return <div className="loader">Loading...</div>;
  }
  if (errorMsg !== null) {
    return <div className="error">Error {errorMsg}</div>;
  }

  function handlePrev() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }
  
  function handleNext() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }

  return (
    <div className="container">
      <FaArrowLeft className='arrow-left' onClick={handlePrev} />
      {images && images.length ? (
        images.map((imageItem, index) => (
          <img 
            key={imageItem.id} 
            src={imageItem.download_url} 
            alt={imageItem.download_url} 
            className={currentSlide === index ? 'current-image' : 'current-image hide-current-image'}
          />
        ))
      ) : (
        <div>No images found.</div>
      )}
      <FaArrowRight className='arrow-right' onClick={handleNext} />
      <span className='circle-indicators'>
        {
          images && images.length ? 
          images.map((_, index) => (
            <button
              key={index}
              className={
                currentSlide === index ? 'current-indicator' : 'current-indicator inactive-indicator'
              }
              onClick={() => setCurrentSlide(index)}
            ></button>
          )) : null
        }
      </span>
    </div>
  );
}

export default App;