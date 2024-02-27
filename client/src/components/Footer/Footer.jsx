import React from "react";
import { FaTwitter, FaYoutube, FaFacebookF } from "react-icons/fa";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Service</a>
        <a className="link link-hover"></a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <FaTwitter size={24} />
          <FaYoutube size={24} />
          <FaFacebookF size={24} />
        </div>
      </nav>
      <aside>
        <p>Copyright © {year} - All right reserved by Authentication System</p>
      </aside>
    </footer>
  );
}

export default Footer;
