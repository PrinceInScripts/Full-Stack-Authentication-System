import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { RiCloseFill } from "react-icons/ri";
import { logoutUser } from "../../redux/slice/authSlice";

function Navbar() {
  const [isMenuActive, setIsMenuActive] = useState(true);
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const isAdmin = useSelector((state) => state?.auth?.isAdmin);
  const isSuperAdmin = useSelector((state) => state?.auth?.isSuperAdmin);
  const user=useSelector((state)=>state?.auth?.user) 
  const dispatch = useDispatch();
  const navigate = useNavigate();


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

 const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
      
        navigate("/login");
      });
  };


  return (
    <div className="navbar bg-base-200 z-10 fixed w-full">
      <div className="w-full lg:w-4/5 flex justify-between  fixed top-0 left-1/2 transform -translate-x-1/2 ">
      <div className="navbar-start w-full lg:w-4/5 flex items-center justify-between">
        <div class="dropdown lg:hidden dropdown-bottom">
          <div id="dropdownButton" tabIndex="0" role="button" class="btn m-1">
            {" "}
            {isMenuActive ? (
              <FiMenu size={20} onClick={() => showDropdown()} />
            ) : (
              <RiCloseFill size={24} onClick={() => hideDropdown()} />
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
            {isLoggedIn && (user.role!=='USER') && (
              <li>
                <Link to={"/dashboard"}>Dashboard</Link>
              </li>
            )}

            {isLoggedIn && (user.role!=='USER') && (
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
            <li className="border-b-2">
              <Link to={"/contact"}>Contact Us</Link>
            </li>
           
            {isLoggedIn ? (
        <li className="flex flex-row">
          <Link to={"/me"}>
            My Profile
          </Link>
          <Link to={"/logout"}  onClick={handleLogout}>
           Logout
          </Link>
        </li>
      ) : (
        <li className="flex flex-row">
          <Link className="" to={"/signup"}>
           Sign Up
          </Link>
          <Link to={"/login"}>
           Login
          </Link>
        </li>
      )}
            
          </ul>
        </div>


        <div>
         <Link to={"/"}>
        <button className=" btn  text-4xl font-bold font-serif">
          Logo
        </button>
        </Link> 
        </div>
        
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-lg font-semibold px-1">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          {isLoggedIn && (user.role!=='USER') && (
            <li>
              <Link to={"/dashboard"}>Dashboard</Link>
            </li>
          )}

          {isLoggedIn && (user.role!=='USER') && (
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
        <div className="navbar-end hidden lg:flex gap-2">
          <Link to={"/me"}>
            <button className="btn btn-primary">My Profile</button>
          </Link>
          <Link>
          <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
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
