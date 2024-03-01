import React from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import Layout from "../../components/Layout/Layout";
import ServiceHero from "../../components/ServiceHero/ServiceHero";
import consultation from "../../asset/consultation.jpg"
import implementation from "../../asset/implementation.jpg"
import support from "../../asset/support.jpg"
import development from "../../asset/development.jpg"
import ContactComp from "../../components/ContactComp/ContactComp";

function Service() {
  return (
    <Layout>
      <div className="flex flex-col ">
        {/* Hero section */}
        <ServiceHero />

        {/* Cards section */}
        <div className="lg:w-4/5 w-full flex flex-col items-center mx-1 lg:mx-auto">
          <div>
            <h1 className="text-3xl lg:text-4xl font-semibold mb-6">
              How It Works
            </h1>
          </div>
          <div className="flex flex-col lg:flex-row mx-4 lg:mx-auto my-10 lg:my-36 justify-between gap-10 items-center">
            {/* Card 1 */}
            <div className="flex flex-col gap-5 px-2 lg:px-4 py-8 lg:py-6 bg-white rounded-lg shadow-md text-center">
              <img
                src={consultation}
                alt="Authentication Solutions"
                className="w-full mx-auto rounded-lg"
              />
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
                Consultation
              </h2>
              <p className="text-sm lg:text-base text-gray-800">
                We begin with a consultation to understand your authentication
                needs and requirements.
              </p>
            </div>
            {/* Card 2 */}
            <div className="flex flex-col gap-5 px-2 lg:px-4 py-8 lg:py-6 bg-white rounded-lg shadow-md text-center">
              <img
                src={development}
                alt="Security and Reliability"
                className="w-full mx-auto rounded-lg"
              />
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
                Development
              </h2>
              <p className="text-sm lg:text-base text-gray-800">
                Our team of experts will design and develop a customized
                solution tailored to your specifications.
              </p>
            </div>
            {/* Card 3 */}
            <div className="flex flex-col px-2 lg:px-4 py-8 lg:py-3 bg-white rounded-lg shadow-md text-center">
              <img
                src={implementation}
                alt="Customization Options"
                className="w-4/5 mx-auto rounded-lg"
              />
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
                Implementation
              </h2>
              <p className="text-sm lg:text-base text-gray-800">
              Once development is complete, we'll assist you with the implementation and integration of the authentication system into your existing infrastructure.
              </p>
            </div>
            {/* Card 4 */}
            <div className="flex flex-col px-2 lg:px-4 py-8 lg:py-5 bg-white rounded-lg shadow-md text-center">
              <img
                src={support}
                alt="Customization Options"
                className="w-4/5 mx-auto rounded-lg"
              />
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
              Support and Maintenance
              </h2>
              <p className="text-sm lg:text-base text-gray-800">
              We provide ongoing support and maintenance to ensure the continued security and reliability of your authentication system.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact form section */}
      <ContactComp />
    </Layout>
  );
}

export default Service;
