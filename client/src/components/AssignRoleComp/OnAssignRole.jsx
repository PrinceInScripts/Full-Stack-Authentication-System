import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { User } from '../../../../server/src/models/user.models'
import { assignRole, getUserById } from '../../redux/slice/authSlice'
import { toast } from 'react-toastify'

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
        const response=await dispatch(getUserById(userId));
        if(response.payload.data){
            setUser(response.payload.data)
            setNewRole(response.payload.data.role)
        }
    }

    const handleRoleChange = (event) => {
        setNewRole(event.target.value);
    };

    const handleRoleUpdate=async ()=>{
        const response=await dispatch(assignRole({userId,newRole}))
        if (response.payload.success) {
            navigate('/assign-role');
          } else {
            toast.error('Failed to update role');
          }
    }

    if (!user) return <div>Loading...</div>;

  return (
    <div className='bg-base-700 w-full min-h-screen px-40 py-10'>
    <div className='py-10'>
      <h1 className='text-2xl font-bold font-serif'>Assign Role</h1>
      <p className='text-gray-500 font-semibold font-sans'>Assign a new role to the user</p>
    </div>

    <div className='bg-white p-6 rounded-lg'>
      <h2 className='text-xl font-bold'>{user.username}</h2>
      <p className='text-gray-700'>Email: {user.email}</p>
      <p className='text-gray-700'>Current Role: {user.role}</p>

      <div className='mt-6'>
        <label className='block text-gray-700'>New Role</label>
        <select value={newRole} onChange={handleRoleChange} className='block w-full mt-2 p-2 border rounded'>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="SUPER_ADMIN">Super Admin</option>
          <option value="MANAGER">Manager</option>
        </select>
      </div>

      <button 
        onClick={handleRoleUpdate}
        className='mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg'
      >
        Update Role
      </button>
    </div>
  </div>
  )
}

export default OnAssignRole
