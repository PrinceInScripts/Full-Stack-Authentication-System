import React from 'react';
import { Link } from 'react-router-dom';
import hero from "../../asset/hero.jpg";

function Hero() {
  return (
    <div className="hero min-h-[80vh] pt-20 bg-base-900">
      <div className="hero-content flex-col lg:flex-row items-center justify-between px-6 lg:px-12">
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-5xl font-bold text-white">Hello there</h1>
          <p className="py-6 text-white">
            Welcome to our Full-Stack Authentication System! We are your premier destination for secure and efficient
            authentication solutions. With our expertise and dedication, we're here to safeguard your data and provide
            a seamless user experience.
          </p>
          <div className="flex gap-2">
            <Link to="/" className="text-white">
              <button className="btn btn-primary">Get Started</button>
            </Link>
            <Link to="/" className="text-white">
              <button className="btn btn-secondary">Learn More</button>
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 lg:pl-8 flex justify-center">
          <div className="max-w-md mx-auto">
            <img className="w-full rounded-lg shadow-lg" src={hero} alt="Hero" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;