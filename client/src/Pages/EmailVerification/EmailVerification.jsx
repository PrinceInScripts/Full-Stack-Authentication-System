import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { verifyEmail } from "../../redux/slice/authSlice";

function EmailVerification() {
  const dispatch = useDispatch();
  const { verificationToken } = useParams();

  useEffect(() => {
    if (verificationToken) {
      dispatch(verifyEmail(verificationToken))
    }
  }, [dispatch, verificationToken]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-semibold mb-4">Email Verification</h2>
      <p className="mb-6">Congratulations! Your email has been successfully verified.</p>
      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
        Go to Home Page
      </Link>
    </div>
  );
}

export default EmailVerification;