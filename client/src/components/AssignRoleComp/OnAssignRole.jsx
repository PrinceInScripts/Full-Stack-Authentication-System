import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { assignRole, getUserById } from '../../redux/slice/authSlice'
import { toast } from 'react-toastify'
import { CgProfile } from 'react-icons/cg'

function OnAssignRole() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {userId}=useParams()

    const [user,setUser]=useState(null)
    const [newRole,setNewRole]=useState('')
    
    useEffect(()=>{
        fetchUserDetails();
    },[userId,dispatch])

    const fetchUserDetails=async()=>{
        const response=await dispatch(getUserById(userId));
        console.log(response);
        if(response?.payload?.data){
            setUser(response?.payload?.data)
            setNewRole(response?.payload?.data.role)
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
    <>
   
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
             <div className='py-5 flex items-start flex-col'>
      <h1 className='text-2xl font-bold font-serif'>Assign Role</h1>
      <p className='text-gray-500 font-semibold font-sans'>Assign a new role to the user</p>
    </div>

      <div className=" p-8 rounded-lg  max-w-md w-full">
        <div className="flex items-center justify-center">
          {user?.avatar ? (
            <img src={user.avatar} alt="User Avatar" className="w-24 h-24 rounded-full" />
          ) : (
            <CgProfile size={96} className="text-gray-500" />
          )}
        </div>
        <h1 className="text-3xl font-bold text-center mt-4">{user.username}</h1>
        <p className="text-gray-700 text-center mt-2">{user.email}</p>
        <p className="text-gray-700 text-center mt-1">Current Role: {user.role}</p>

        <div className="mt-6">
          <label className="block text-gray-700">New Role</label>
          <select
            value={newRole}
            onChange={handleRoleChange}
            className="block w-full mt-2 p-2 border rounded-lg focus:ring focus:ring-blue-300"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="SUPER_ADMIN">Super Admin</option>
            <option value="MANAGER">Manager</option>
          </select>
        </div>

        <button
          onClick={handleRoleUpdate}
          className="mt-6 bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Update Role
        </button>
      </div>
    </div>
    </>
  )
}

export default OnAssignRole
