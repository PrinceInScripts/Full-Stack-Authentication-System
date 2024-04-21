import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import Layout from '../../components/Layout/Layout';

function Profiles() {
  const user=useSelector((state)=>state?.auth?.user)

  useEffect(()=>{
   console.log(user);
  },[])
    
  return (
    <Layout>
      hi
    </Layout>
  )
}

export default Profiles
