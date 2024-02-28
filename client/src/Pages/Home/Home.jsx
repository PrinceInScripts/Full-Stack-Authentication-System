import React from "react";
import Hero from "../../components/Hero/Hero";
import Layout from "../../components/Layout/Layout";
import AboutHero from "../../components/AboutHero/AboutHero";

function Home() {
  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        <Hero />
        <AboutHero />
      </div>
    </Layout>
  );
}

export default Home;
