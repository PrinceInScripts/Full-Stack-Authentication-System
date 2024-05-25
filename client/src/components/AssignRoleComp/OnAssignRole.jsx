import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

function OnAssignRole() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {userId}=useParams()

    const [user,setUser]=useState(null)
    const [newRole,setNewRole]=useState('')
    
    useEffect(()=>{
        fetchUserDetails();
    },[userId])

    const fetchUserDetails=async()=>{
        
    }

  return (
    <div>
      
    </div>
  )
}

export default OnAssignRole
