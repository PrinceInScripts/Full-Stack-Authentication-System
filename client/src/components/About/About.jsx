import React from "react";
import { Link } from "react-router-dom";
import aboutHero from "../../asset/aboutHero.png";
import misson from "../../asset/misson.png";
import solution from "../../asset/solution.jpg";
import security from "../../asset/security.jpg";
import options from "../../asset/options.jpg";
import Layout from "../Layout/Layout";

function About() {
  return (
    <Layout>
      <div className="flex flex-col">
        <div className="hero min-h-[80vh] bg-base-900 border-b-2">
          <div className="hero-content flex-col lg:flex-row-reverse items-center justify-between px-6 lg:px-12">
            <div className="text-center lg:text-left lg:w-1/2">
              <h1 className="text-5xl font-bold">About Us</h1>
              <p className="py-6 text-xl capitalize-first">
                <span className="text-4xl font-semibold">W</span>elcome to our
                full-stack authentication system! We are dedicated to providing
                secure and efficient authentication solutions for businesses of
                all sizes. Our team of experienced developers and security
                experts is committed to delivering top-notch services to meet
                your authentication needs.
              </p>
            </div>
            <div className="lg:w-1/2 lg:pl-8 flex justify-center">
              <div className="max-w-sm mx-auto shadow-2xl overflow-hidden rounded-lg">
                <img className="" src={aboutHero} alt="Hero" />
              </div>
            </div>
          </div>
        </div>

        <div className="hero min-h-[80vh] bg-base-900">
          <div className="hero-content flex-col lg:flex-row items-center gap-10 justify-between px-6 lg:px-12">
            <div className="text-center lg:text-left lg:w-1/2">
              <h1 className="text-5xl font-bold">Our Mission</h1>
              <p className="py-6 text-xl capitalize-first">
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
      </div>
      <div className="flex mx-36 my-36 justify-between gap-10 items-center">
        <div className="flex flex-col gap-5 px-10 items-center justify-center">
          <img src={solution} alt="" className="w-48 mx-auto rounded-lg" />
          <h1>Authentication Solutions</h1>
          <p className="text-center">
            We offer a wide range of authentication services tailored to your
            specific requirements.
          </p>
        </div>
        <div className="flex flex-col gap-5 px-10 items-center justify-center">
          <img src={security} alt="" className="w-48 mx-auto rounded-lg" />
          <h1>Security and Reliability</h1>
          <p className="text-center">
            Our systems are built with the latest security protocols to ensure
            the safety of your data.
          </p>
        </div>
        <div className="flex flex-col gap-5 px-10 items-center justify-center">
          <img src={options} alt="" className="w-48 mx-auto rounded-lg" />
          <h1>Customization Options</h1>
          <p className="text-center">
            We understand that every business is unique, which is why we provide
            customizable solutions to meet your individual needs.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default About;
