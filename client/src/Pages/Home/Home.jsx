import React, { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import Layout from "../../components/Layout/Layout";
import AboutHero from "../../components/AboutHero/AboutHero";
import ServiceHero from "../../components/ServiceHero/ServiceHero";
import ContactComp from "../../components/ContactComp/ContactComp";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, refreshAccessToken } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isLoading, setIsLoading] = useState(false);

  const isTokenExpired = () => {
    const expiryTimestamp = parseInt(localStorage.getItem("tokenExpiry"), 10);
    return !expiryTimestamp || Date.now() >= expiryTimestamp;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenExpiry");
    navigate("/login");
  };

  const handleRefreshToken = async () => {
    try {
      setIsLoading(true);
      await dispatch(refreshAccessToken());
      await dispatch(getCurrentUser());
    } catch (error) {
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (isLoggedIn && isTokenExpired()) {
          await handleRefreshToken();
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