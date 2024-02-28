import React from "react";
import { Link } from "react-router-dom";
import aboutHero from "../../asset/aboutHero.png";
import misson from "../../asset/misson.png";
import solution from "../../asset/solution.jpg";
import security from "../../asset/security.jpg";
import options from "../../asset/options.jpg";
import Layout from "../Layout/Layout";
import ContactForm from "../ContactForm/ContactForm";


function About() {
  return (
    <Layout>
      <div className="flex flex-col ">
        {/* Hero section */}
        <div className="hero min-h-[80vh] bg-white border-b-2 w-full mx-auto">
          <div className="hero-content flex-col lg:flex-row-reverse items-center justify-between ">
            <div className="text-center lg:text-left lg:w-1/2">
              <h1 className="text-5xl font-bold text-gray-900">About Us</h1>
              <p className="py-6 text-xl capitalize-first text-gray-800">
                <span className="text-4xl font-semibold">W</span>elcome to our
                full-stack authentication system! We are dedicated to providing
                secure and efficient authentication solutions for businesses of
                all sizes. Our team of experienced developers and security
                experts is committed to delivering top-notch services to meet
                your authentication needs.
              </p>
            </div>
            <div className="lg:w-1/2 lg:pl-8 flex justify-center">
              <div className="max-w-sm x-auto shadow-2xl overflow-hidden rounded-lg">
                <img className="" src={aboutHero} alt="Hero" />
              </div>
            </div>
          </div>
        </div>

        {/* Mission section */}
        <div className="hero min-h-[80vh] bg-white w-full mx-auto">
          <div className="hero-content flex-col lg:flex-row items-center gap-10 justify-between">
            <div className="text-center lg:text-left lg:w-1/2">
              <h1 className="text-5xl font-bold text-gray-900">Our Mission</h1>
              <p className="py-6 text-xl capitalize-first text-gray-800">
                <span className="text-4xl font-semibold">A</span>t our company,
                our mission is to ensure the highest level of security and
                reliability for your authentication system. We strive to empower
                businesses with robust authentication solutions that protect
                sensitive information and provide a seamless user experience.
              </p>
            </div>
            <div className="lg:w-1/2 lg:pl-8 flex justify-center">
              <img className="w-96" src={misson} alt="Hero" />
            </div>
          </div>
        </div>

        {/* Cards section */}
        <div className="lg:w-4/5 w-full flex flex-col items-center mx-1 lg:mx-auto">
            <div>
            <h1 className="text-3xl lg:text-4xl font-semibold mb-6">Why Choose Us?</h1>
            </div>
          <div className="flex w-4/5 flex-col lg:flex-row mx-4 lg:mx-auto my-10 lg:my-36 justify-between gap-10 items-center">
                   {/* Card 1 */}
          <div className="flex flex-col gap-5 px-2 lg:px-4 py-8 lg:py-6 bg-white rounded-lg shadow-md text-center">
            <img
              src={solution}
              alt="Authentication Solutions"
              className="w-full mx-auto rounded-lg"
            />
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
              Authentication Solutions
            </h2>
            <p className="text-sm lg:text-base text-gray-800">
              We offer a wide range of authentication services tailored to your
              specific requirements.
            </p>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col gap-5 px-2 lg:px-4 py-8 lg:py-6 bg-white rounded-lg shadow-md text-center">
            <img
              src={security}
              alt="Security and Reliability"
              className="w-full mx-auto rounded-lg"
            />
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
              Security and Reliability
            </h2>
            <p className="text-sm lg:text-base text-gray-800">
              Our systems are built with the latest security protocols to ensure
              the safety of your data.
            </p>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col gap-5 px-2 lg:px-4 py-8 lg:py-6 bg-white rounded-lg shadow-md text-center">
            <img
              src={options}
              alt="Customization Options"
              className="w-4/5 mx-auto rounded-lg"
            />
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
              Customization Options
            </h2>
            <p className="text-sm lg:text-base text-gray-800">
              We understand that every business is unique, which is why we
              provide customizable solutions to meet your individual needs.
            </p>
          </div>
          </div>
         
         
        </div>
      </div>

      {/* Contact form section */}
      <ContactForm />
    </Layout>
  );
}

export default About;
