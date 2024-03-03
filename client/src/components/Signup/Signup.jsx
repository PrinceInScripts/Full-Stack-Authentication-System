import React, { useState } from 'react'
import { toast } from "react-toastify";
import { isEmail, isValidPassword } from '../../helper/RegexMatcher';

function Signup() {
    const [signupDetials,setSignupDetials]=useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const onChangeInput=(e)=>{
        const {name,value}=e.target;

        setSignupDetials({
            ...setSignupDetials,
            [name]:value
        })
    }

   async function onHandleSubmit(e){
    e.preventDefault()

    if(!signupDetials.username){
        toast.error("username is required")
        return;
    }

    if(!signupDetials.email){
        toast.error("email is required")
        return;
    }

    if(!signupDetials.password){
        toast.error("password is required")
        return;
    }

    if(!signupDetials.confirmPassword){
        toast.error("confirmPassword is required")
        return;
    }

    if(signupDetials.username.length < 5){
        toast.error("username should be atleast 5 character")
    }

    if(!isEmail(signupDetials.email)){
        toast.error("Email is invalid")
    }

    if(!isValidPassword(signupDetials.password)){
        toast.error("Invalid password provided, password should 6-16 character long with atleast a number and a special character")
    }
   }
  return (
    <div>
      
    </div>
  )
}

export default Signup
