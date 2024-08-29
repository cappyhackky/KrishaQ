'use client';
import React, { useEffect, useState } from 'react';
import { carousel_images } from '../../data/carousel';

const HomeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const handlePrevClick = () => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? carousel_images.length - 1 : prevIndex - 1));
      setTransitioning(false);
    }, 1000); // Match this duration with the Tailwind transition duration
  };

  const handleNextClick = () => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === carousel_images.length - 1 ? 0 : prevIndex + 1));
      setTransitioning(false);
    }, 1000); // Match this duration with the Tailwind transition duration
  };
   // Function to go to the next slide
   const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === carousel_images.length - 1 ? 0 : prevIndex + 1));
  };

   // Handle automatic transition every second
   useEffect(() => {
    const interval = setInterval(() => {
      if (!transitioning) {
        setTransitioning(true);
        goToNextSlide();
        setTimeout(() => {
          setTransitioning(false);
        }, 1000); // Match this duration with the Tailwind transition duration
      }
    }, 1000); // Automatic transition interval

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [transitioning]);
  return (
    <div className="relative w-full overflow-hidden my-3 p-2">
      <div className="relative h-64 md:h-96">
        {carousel_images.map((img, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity ease-in-out ${ index === currentIndex ?  'opacity-100 z-10' : 'opacity-0 z-0'}`} >
            <img src={img.img_url} className="w-full h-full object-scale-down" alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      {/* <div className="absolute flex justify-between transform -translate-y-1/2 left-0 right-0 top-1/2 px-2 z-20">
        <button onClick={handlePrevClick} className="btn md:ms-12 py-12 bg-white bg-opacity-50 text-black hover:bg-gray-200 border-none" > ❮ </button>
        <button onClick={handleNextClick} className="btn md:me-12 py-12 bg-white bg-opacity-50 text-black hover:bg-gray-200 border-none" > ❯ </button>
      </div> */}
    </div>
  );
};

export default HomeCarousel;
