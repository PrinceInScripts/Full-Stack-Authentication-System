import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import Layout from '../../components/Layout/Layout';
import ProfileComp from '../../components/ProfileComp/ProfileComp';

function Profiles() {
  const user=useSelector((state)=>state?.auth?.user)

  useEffect(()=>{
   console.log(user);
  },[])
    
  return (
    <Layout>
     <div className="flex items-center justify-center min-h-screen">
        <div className="w-full px-auto">
          <ProfileComp />
        </div>
      </div>
    </Layout>
  )
}

export default Profiles
