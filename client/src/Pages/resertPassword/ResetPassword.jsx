import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { isValidPassword } from "../../helper/RegexMatcher";
import { resetPassword } from "../../redux/slice/authSlice";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetPasswordToken } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!data.password || !data.confirmPassword) {
      toast.error("All fields are mandatory");
      return;
    }

    if (!isValidPassword(data.password)) {
      toast.error(
        "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol"
      );
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Both passwords should be the same");
      return;
    }

    const response = await dispatch(
      resetPassword({ ...data, resetPasswordToken })
    );

    if (response?.payload?.success) {
      navigate("/login");
    }
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }
  function toggleShowConfPassword() {
    setShowConfPassword(!showConfPassword);
  }


  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
        <h1 className="text-center text-2xl font-bold mb-4">Reset Password</h1>
        <div className="w-96 mx-4 lg:mx-auto mt-10">
        <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="mb-4">
        <label className="input input-bordered flex items-center gap-2">
        <FaKey />
              <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Enter your new password"
              className="grow"
              value={data.password}
              onChange={handleUserInput}
            />
            {showPassword ? (
              <FaEyeSlash
                className="cursor-pointer"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaEye className="cursor-pointer" onClick={toggleShowPassword} />
            )}
            </label>
           
          </div>
          <div>
          <label className="input input-bordered flex items-center gap-2">              
          <FaKey />
          <input
              required
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your new password"
              className="grow"
              value={data.confirmPassword}
              onChange={handleUserInput}
            />
            {showPassword ? (
              <FaEyeSlash
                className="cursor-pointer"
                onClick={toggleShowConfPassword}
              />
            ) : (
              <FaEye
                className="cursor-pointer"
                onClick={toggleShowConfPassword}
              />
            )}
            </label>
          
          </div>
          <button className="btn btn-primary w-full" type="submit">
            Reset Password
          </button>
        </form>
      </div>
      </div>
    
  );
}

export default ResetPassword;
