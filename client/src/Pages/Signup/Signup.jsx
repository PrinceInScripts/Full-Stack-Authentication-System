import React from 'react'
import SignupComp from '../../components/SignupComp/SignupComp'

function Signup() {
  return (
   
    <div className="flex flex-col min-h-screen justify-center items-center">
      <h1 className='text-4xl font-extrabold font-serif'>Register Now !</h1>
      <SignupComp/>
    </div>

  )
}

export default Signup;
