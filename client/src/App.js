
import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Service from "./Pages/Service/Service";
import Contact from "./Pages/Contact/Contact";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import ForgotPassword from "./Pages/forgotPassword/forgotPassword";
import ResetPassword from "./Pages/resertPassword/ResetPassword";
import EmailVerification from "./Pages/EmailVerification/EmailVerification";
import Profiles from "./Pages/Profile/Profiles";
import ProfileComp from "./components/ProfileComp/ProfileComp";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AssignRole from "./components/AssignRoleComp/AssignRole";
import OnAssignRole from "./components/AssignRoleComp/OnAssignRole";
import AssignRolePage from "./Pages/AssignRole/AssignRole";
// import DashboardOverview from "./Pages/Dashboard/Dashboard";

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
      <Route path="/verify-email/:verificationToken" element={<EmailVerification/>}/>
      <Route path="/me" element={<Profiles/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/assign-role" element={<AssignRolePage/>}/>
      <Route path="/assign-role/:userId" element={<OnAssignRole/>}/>
      {/* <Route path="/dashboard" element={<DashboardOverview/>}/> */}
    </Routes>
  );
}

export default App;
