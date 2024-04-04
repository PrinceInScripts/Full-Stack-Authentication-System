import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");

  async function handleFormSubmit(e) {
    e.preventDefault();
    const loadingToastId = toast.loading("Sending Reset Link...");

    try {
      await dispatch(forgotPassword({ usernameOrEmail }));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      toast.dismiss(loadingToastId);
    }

    setUsernameOrEmail("");
    navigate("/");
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-center font-serif text-2xl font-bold mb-6">
          Forgot Password
        </h1>
        <p className="mb-6">
          Enter your registered email, we will send you a verification link on
          your registered email from which you can reset your password.
        </p>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="usernameOrEmail" className="text-sm font-medium">
              Email Address
            </label>
            <input
              required
              type="text"
              name="usernameOrEmail"
              id="usernameOrEmail"
              placeholder="Enter your registered email or username"
              className="bg-gray-200 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              value={usernameOrEmail}
              onChange={(event) => setUsernameOrEmail(event.target.value)}
            />
          </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            Get Verification Link
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account ?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
