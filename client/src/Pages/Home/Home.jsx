import React from "react";
import Hero from "../../components/Hero/Hero";
import Layout from "../../components/Layout/Layout";
import AboutHero from "../../components/AboutHero/AboutHero";
import ServiceHero from "../../components/ServiceHero/ServiceHero";
import ContactComp from "../../components/ContactComp/ContactComp";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../redux/slice/authSlice";

function Home() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getCurrentUser())
  },[dispatch])
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
