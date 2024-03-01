import React from "react";
import Layout from "../Layout/Layout";
import serviceHero from "../../asset/serviceHero.jpg";

function ServiceHero() {
  return (
   
      <div className="hero mt-14 lg:mt-0 min-h-[80vh] bg-white w-full mx-auto">
        <div className="hero-content flex-col lg:flex-row items-center justify-between ">
          <div className="text-center mx-auto w-full lg:text-left lg:w-1/2 font-sans">
            <h1 className="lg:text-5xl text-4xl font-bold text-gray-900 font-serif mb-4">
              Our Service
            </h1>
            <ul className=" text-gray-700">
            <li className="mb-2">
                <span className="lg:text-xl text-lg font-semibold font-serif">
                  Full-Stack Authentication System:
                </span>{" "}
                Our flagship service, designed to provide end-to-end
                authentication solutions for businesses. From user registration
                and login to role-based access control, we've got you covered.
              </li>
              <li className="mb-2">
              <span className="text-xl font-semibold font-serif">
              Role Management:
                </span>{" "} Empower your administrators with the ability to
                assign different roles to users, ensuring secure access to
                sensitive information.
              </li>
              <li className="mb-2">
              <span className="text-xl font-semibold font-serif">
              User Management:
                </span>{" "}  Streamline your user management processes with
                our intuitive tools for adding, updating, and removing users.
              </li>
              <li className="mb-2">
              <span className="text-xl font-semibold font-serif">
              Security Audits:
                </span>{" "}  Stay ahead of potential security threats with
                regular security audits conducted by our team of experts.
              </li>
              <li className="mb-2">
              <span className="text-xl font-semibold font-serif">
              Custom Development:
                </span>{" "} Need a tailored solution? Our team can work
                with you to develop custom authentication features to meet your
                unique requirements.
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2 lg:pl-8 flex justify-center">
            <div className="w-full lg:w-4/5 x-auto shadow-2xl overflow-hidden rounded-lg">
              <img className="" src={serviceHero} alt="Hero" />
            </div>
          </div>
        </div>
      </div>
   
  );
}

export default ServiceHero;
