import React, { useState, useEffect } from "react";
import { image1, image5, image6, image7 } from "../../assets/assets";

const HeaderCarousel = () => {
  const images = [image1, image5, image6, image7];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="pt-24 w-full pt-27">
      <div
        className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-white/100 via-transparent to-transparent"></div>

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <h1 className="text-gray-300 text-4xl sm:text-4xl md:text-5xl lg:text-10xl font-extrabold text-center ">
            Welcome to GoBook 
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HeaderCarousel;

