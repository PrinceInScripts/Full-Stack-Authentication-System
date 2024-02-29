import React from 'react'
import { Link } from 'react-router-dom';
import contact from "../../asset/contact.jpg"

function ContactComp() {
    return (
        <div className="hero min-h-screen flex flex-col justify-center items-center relative">
          <div className="bg-center bg-cover w-full h-full absolute top-0 left-0" style={{ backgroundImage: `url(${contact})` }}></div>
          <div className="bg-black opacity-50 w-full h-full absolute top-0 left-0"></div>
          <div className="hero-content flex flex-col w-full lg:w-2/5 text-center text-white relative z-10">
          <p className="mb-2 font-sans font-semibold">
           Contact us today to learn more about our services
          </p>
            <h1 className="text-5xl font-bold mb-6">Let's work together to make it amazing</h1>
            <div className="flex gap-4">
              <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
            </div>
          </div>
        </div>
      );
}

export default ContactComp
