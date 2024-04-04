
import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Service from "./Pages/Service/Service";
import Contact from "./Pages/Contact/Contact";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import ForgotPassword from "./Pages/forgotPassword/forgotPassword";
import ResetPassword from "./Pages/resertPassword/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About/>}/>
      <Route path="/service" element={<Service/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/reset-password/:resetPasswordToken" element={<ResetPassword/>}/>
      
    </Routes>
  );
}

export default App;
