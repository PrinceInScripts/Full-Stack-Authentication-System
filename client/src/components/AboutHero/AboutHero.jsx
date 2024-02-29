import React from "react";
import { Link } from "react-router-dom";
import aboutHero from "../../asset/aboutHero.jpg";
import misson from "../../asset/misson.png";
import solution from "../../asset/solution.jpg";
import security from "../../asset/security.jpg";
import options from "../../asset/options.jpg";
import Layout from "../Layout/Layout";
import ContactForm from "../ContactForm/ContactForm";


function AboutHero() {
  return (
  
        <div className="hero min-h-[90vh] bg-white] w-full mx-auto">
          <div className="hero-content flex-col lg:flex-row-reverse items-center justify-between ">
            <div className="text-center w-full lg:text-left lg:w-1/2">
              <h1 className="text-5xl font-bold text-gray-900">About Us</h1>
              <p className="py-6 text-xl capitalize-first text-gray-800">
                <span className="text-4xl font-semibold">W</span>elcome to our
                full-stack authentication system! We are dedicated to providing
                secure and efficient authentication solutions for businesses of
                all sizes. Our team of experienced developers and security
                experts is committed to delivering top-notch services to meet
                your authentication needs.
              </p>
             <Link to={"/about"}><button className="btn btn-info">Learn More</button></Link> 
            </div>
            <div className="lg:w-1/2 lg:pl-8 flex justify-center">
              <div className="w-full lg:w-4/5 x-auto shadow-2xl overflow-hidden rounded-lg">
                <img className="" src={aboutHero} alt="Hero" />
              </div>
            </div>
          </div>
        </div>

        
  );
}

export default AboutHero;
