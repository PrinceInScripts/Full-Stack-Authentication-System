import React, { useState } from "react";
import emailjs from "emailjs-com";
import contactImage from "../../asset/contactImage.jpg";
import contact from "../../asset/contact.jpg"
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ContactForm() {
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  function onChange(e) {
    const { name, value } = e.target;
    setContactDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !contactDetails.name ||
      !contactDetails.email ||
      !contactDetails.phone ||
      !contactDetails.message
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(contactDetails.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!isValidPhone(contactDetails.phone)) {
      toast.error("Please enter a valid phone number (10 digits).");
      return;
    }

    emailjs.init(process.env.REACT_APP_EMAIL_API_KEY);

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAIL_SERVICE_KEY,
        process.env.REACT_APP_EMAIL_TEMPLATE_KEY,
        event.target
      )
      .then(() => {
        event.target.reset();
        toast.success("Form Submitted Successfully");
      })
      .catch((error) => {
        console.log("FAILED...", error);
        toast.error("Form Submission Failed! Try Again");
      });

    setContactDetails({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <>
    <div className="hero min-h-[80vh] bg-base-900">
      <div className="hero-content flex-col lg:flex-row-reverse lg:justify-between gap-40 items-center mx-4 lg:mx-36">
        <div className="hidden lg:block relative">
          <img
            src={contactImage}
            alt="Contact Us"
            className="object-cover w-96 rounded-lg"
          />
        </div>
        <div className="text-center lg:text-left lg:w-1/2 lg:pl-0">
          <h1 className="text-5xl font-bold">Contact Us</h1>
          <p className="py-6">
          <span className="text-4xl font-semibold">R</span>eady to take your authentication system to the next level? Contact
            us today to learn more about our services and how we can help your
            business succeed.
          </p>
          <div className="card shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                  value={contactDetails.name}
                  onChange={onChange}
                  name="name"
                />
              </div>
              <div className="form-control">
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                  value={contactDetails.email}
                  onChange={onChange}
                  name="email"
                />
              </div>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Phone"
                  className="input input-bordered"
                  required
                  value={contactDetails.phone}
                  onChange={onChange}
                  name="phone"
                />
              </div>
              <div className="form-control">
                <textarea
                  type="text"
                  placeholder="Message"
                  className="input input-bordered"
                  value={contactDetails.message}
                  onChange={onChange}
                  name="message"
                ></textarea>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>


     
    </div>

    <div className="hero mt-40 min-h-screen flex flex-col justify-center items-center relative">
          <div className="bg-center bg-cover w-full h-full absolute top-0 left-0" style={{ backgroundImage: `url(${contact})` }}></div>
          <div className="bg-black opacity-50 w-full h-full absolute top-0 left-0"></div>
          <div className="hero-content flex flex-col w-full lg:w-2/5 text-center text-white relative">
          <p className="mb-2 font-sans font-semibold">
           Contact us today to learn more about our services
          </p>
            <h1 className="text-5xl font-bold mb-6">Let's work together to make it amazing</h1>
          </div>
        </div>
    </>
  );
}

export default ContactForm;