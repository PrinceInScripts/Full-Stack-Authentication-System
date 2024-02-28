import React, { useState } from "react";
import emailjs from "emailjs-com"
import Layout from "../Layout/Layout";
import contactImage from "../../asset/contactImage.jpg";
import { toast } from "react-toastify";

function ContactForm() {
    const [contactDetails, setContactDetails] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    
      function onchange(e) {
        const { name, value } = e.target;
        setContactDetails((prevData) => {
          return {
            ...prevData,
            [name]: value,
          };
        });
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
        if (!contactDetails.name) {
          toast.error("Please enter your name.");
          return;
        }
        if (!contactDetails.email) {
          toast.error("Please enter your email.");
          return;
        }
        if (!contactDetails.phone) {
          toast.error("Please enter your phone number.");
          return;
        }
        if (!contactDetails.message) {
          toast.error("Please enter your message.");
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
          .sendForm(process.env.REACT_APP_EMAIL_SERVICE_KEY, process.env.REACT_APP_EMAIL_TEMPLATE_KEY, event.target)
          .then((response) => {
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
   
      <div className="hero min-h-[80vh] bg-base-900">
        <div className="hero-content flex-col lg:flex-row-reverse gap-40">
          <div className="hidden lg:block relative">
            <img
              src={contactImage}
              alt="Contact Us"
              className="object-cover w-96 rounded-lg"
            />
            
          </div>
          <div className="text-center lg:text-left lg:w-1/2 p-10">
            <h1 className="text-5xl font-bold ">Contact Us</h1>
            <p className="py-6 ">
              Ready to take your authentication system to the next level?
              Contact us today to learn more about our services and how we can
              help your business succeed.
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
                    onChange={onchange}
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
                    onChange={onchange}
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
                    onChange={onchange}
                    name="phone"
                  />
                </div>
                <div className="form-control">
                  <textarea
                    type="text"
                    placeholder="Message"
                    className="input input-bordered"
                    value={contactDetails.message}
                    onChange={onchange}
                    name="message"
                  ></textarea>
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default ContactForm;