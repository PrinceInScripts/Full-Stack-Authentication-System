import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Layout from "./components/Layout/Layout";
import Hero from "./components/Hero/Hero";

import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import ServiceHero from "./components/ServiceHero/ServiceHero";
import Service from "./Pages/Service/Service";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About/>}/>
      <Route path="/service" element={<Service/>}/>
      
    </Routes>
  );
}

export default App;
