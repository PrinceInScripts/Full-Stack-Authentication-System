import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';

function App() {

  
  return (
   <Routes>
    <Route path='/' element={<Footer/>}/>
   </Routes>
  );
}

export default App;
