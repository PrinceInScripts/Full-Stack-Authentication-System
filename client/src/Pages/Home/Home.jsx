import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, refreshAccessToken } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import Layout from "../../components/Layout/Layout";
import AboutHero from "../../components/AboutHero/AboutHero";
import ServiceHero from "../../components/ServiceHero/ServiceHero";
import ContactComp from "../../components/ContactComp/ContactComp";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loginTime");
    navigate("/login");
  };

  const calculateTimeDifference = () => {
    const loginTime = parseInt(localStorage.getItem("loginTime"), 10);
    
    const currentTime = Date.now();
    const timeDifference = currentTime - loginTime;
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    return timeDifference >= twentyFourHours;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (isLoggedIn && calculateTimeDifference()) {
          const newLoginTime = await handleRefreshToken();
          localStorage.setItem("loginTime", newLoginTime);
        } else if (isLoggedIn) {
          await dispatch(getCurrentUser());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch, isLoggedIn]);

  const handleRefreshToken = async () => {
    try {
      const newLoginTime = Date.now();
      await dispatch(refreshAccessToken());
      await dispatch(getCurrentUser());
      return newLoginTime;
    } catch (error) {
      throw error;
    }
  };



  return (
    <Layout>
    <div className="flex flex-col min-h-screen">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Hero />
          <AboutHero />
          <ServiceHero />
          <ContactComp />
        </>
      )}
    </div>
  </Layout>
  );
}

export default Home;