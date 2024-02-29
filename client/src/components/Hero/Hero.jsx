import React from 'react';
import { Link } from 'react-router-dom';
import homeHero from "../../asset/homeHero.jpg";

function Hero() {
  return (
    <div className="hero min-h-screen flex flex-col justify-center items-center relative">
      <div className="bg-center bg-contain w-full h-full absolute top-0 left-0" style={{ backgroundImage: `url(${homeHero})` }}></div>
      <div className="bg-black opacity-50 w-full h-full absolute top-0 left-0"></div>
      <div className="hero-content flex flex-col w-full lg:w-2/5 text-center text-white relative z-10">
        <h1 className="text-5xl font-bold mb-6">Hello there</h1>
        <p className="mb-8 font-sans font-semibold">
          Welcome to our Full-Stack Authentication System! We are your premier destination for secure and efficient
          authentication solutions. With our expertise and dedication, we're here to safeguard your data and provide
          a seamless user experience.
        </p>
        <div className="flex gap-4">
          <Link to="/" className="btn btn-primary">Get Started</Link>
          <Link to="/" className="btn btn-secondary">Learn More</Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;