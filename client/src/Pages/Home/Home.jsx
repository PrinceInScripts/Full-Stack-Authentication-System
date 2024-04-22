import React from "react";
import Hero from "../../components/Hero/Hero";
import Layout from "../../components/Layout/Layout";
import AboutHero from "../../components/AboutHero/AboutHero";
import ServiceHero from "../../components/ServiceHero/ServiceHero";
import ContactComp from "../../components/ContactComp/ContactComp";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, refreshAccessToken } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const isTokenExpired = () => {
    const expiryTimestamp = parseInt(localStorage.getItem("tokenExpiry"), 10);
    console.log(expiryTimestamp);
    if (!expiryTimestamp) {
      
      return true;
    }
    const currentTime = Date.now();
    return currentTime >= expiryTimestamp;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenExpiry");
    navigate("/login");
  };

  useEffect(() => {
    if (isLoggedIn && isTokenExpired()) {
      dispatch(refreshAccessToken())
        .then(() => {
          dispatch(getCurrentUser());
        })
        .catch(() => {
          logout();
        });
    } else if (isLoggedIn) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isLoggedIn]); 

  useEffect(() => {
    if (isLoggedIn) dispatch(getCurrentUser());
  }, [dispatch, isLoggedIn]);

  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        <Hero />
        <AboutHero />
        <ServiceHero/>
        <ContactComp/>
      </div>
    </Layout>
  );
}

export default Home;
