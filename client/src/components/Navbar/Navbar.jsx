import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { RiCloseFill } from "react-icons/ri";

function Navbar() {
  const [isMenuActive, setIsMenuActive] = useState(true);
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const isAdmin = useSelector((state) => state?.auth?.isAdmin);
  const isSuperAdmin = useSelector((state) => state?.auth?.isSuperAdmin);

  function showDropdown() {
    var dropdownContent = document.getElementById("dropdownContent");
    dropdownContent.style.display = "block";
    setIsMenuActive(!isMenuActive);
  }

  function hideDropdown() {
    var dropdownContent = document.getElementById("dropdownContent");
    dropdownContent.style.display = "none";
    setIsMenuActive(!isMenuActive);
  }
  useEffect(() => {
    console.log(isLoggedIn);
    console.log(isAdmin);
    console.log(isSuperAdmin);
  }, []);

  return (
    <div className="navbar bg-base-200 z-10 fixed">
      <div className="w-4/5  fixed top-0 left-1/2 transform -translate-x-1/2 ">
      <div className="navbar-start">
        <div class="dropdown lg:hidden dropdown-bottom">
          <div id="dropdownButton" tabIndex="0" role="button" class="btn m-1">
            {" "}
            {isMenuActive ? (
              <FiMenu size={20} onClick={() => showDropdown()} />
            ) : (
              <RiCloseFill size={20} onClick={() => hideDropdown()} />
            )}
          </div>
          <ul
            id="dropdownContent"
            tabIndex="0"
            class="dropdown-content z-50 menu opacity-100 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link to={"/dashboard"}>Dashboard</Link>
              </li>
            )}

            {isLoggedIn && (
              <li>
                <details>
                  <summary>Taking Action</summary>
                  <ul className="p-2">
                    {(isAdmin || isSuperAdmin) && (
                      <li>
                        <Link to={"/assign-role"}>Assign Role</Link>
                      </li>
                    )}

                    {(isAdmin || isSuperAdmin) && (
                      <li>
                        <Link to={"/update-roles"}>Update Roles</Link>
                      </li>
                    )}

                    {isSuperAdmin && (
                      <li>
                        <Link to={"/update-users"}>Update Users</Link>
                      </li>
                    )}
                  </ul>
                </details>
              </li>
            )}

            <li>
              <Link to={"/about"}>About</Link>
            </li>
            <li>
              <Link to={"/service"}>Service</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact Us</Link>
            </li>
          </ul>
        </div>

        <a className=" hidden lg:block text-4xl font-bold font-serif">
          Logo
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-lg font-semibold px-1">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link to={"/dashboard"}>Dashboard</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <details>
                <summary>Taking Action</summary>
                <ul className="p-2">
                  {(isAdmin || isSuperAdmin) && (
                    <li>
                      <Link to={"/assign-role"}>Assign Role</Link>
                    </li>
                  )}

                  {(isAdmin || isSuperAdmin) && (
                    <li>
                      <Link to={"/update-roles"}>Update Roles</Link>
                    </li>
                  )}

                  {isSuperAdmin && (
                    <li>
                      <Link to={"/update-users"}>Update Users</Link>
                    </li>
                  )}
                </ul>
              </details>
            </li>
          )}

          <li>
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            <Link to={"/service"}>Service</Link>
          </li>
          <li>
              <Link to={"/contact"}>Contact Us</Link>
            </li>
        </ul>
      </div>
      {isLoggedIn ? (
        <div className="navbar-end flex gap-2">
          <Link to={"/me"}>
            <button className="btn btn-primary">My Profile</button>
          </Link>
          <Link>
            <button className="btn">Logout</button>
          </Link>
        </div>
      ) : (
        <div className="navbar-end flex gap-2">
          <Link to={"/signup"}>
            <button className="btn btn-primary w-24">Sign Up</button>
          </Link>
          <Link to={"/login"}>
            <button className="btn btn-secondary">Login</button>
          </Link>
        </div>
      )}
      </div>
     
    </div>
  );
}

export default Navbar;
