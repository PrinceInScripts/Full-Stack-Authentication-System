import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function App() {

  useEffect(()=>{
     toast.error("sucess")
  },[])
  return (
   <div className="text-blue-500">hoo</div>
  );
}

export default App;
