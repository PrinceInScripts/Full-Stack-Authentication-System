import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CgProfile, CgEditBlackPoint } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateAvatar } from '../../redux/slice/authSlice';


function ProfileComp() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user = useSelector((state) => state?.auth?.user);

    const [image,setImage]=useState({
        avatar:"",
    })


       async function onAvatarSubmit(e) {
        e.preventDefault();
        const uploadImage = e.target.files[0];
    
        if (!uploadImage) {
            toast.error("Avatar is required");
            return;
        }
    
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadImage);
        fileReader.onload = async function () {
            const imageDataUrl = fileReader.result;
            setImage({
                ...image,
                avatar: imageDataUrl 
            });
    
            const loadingToastId = toast.loading("Uploading Image...");
    
            try {
                const formData = new FormData();
                formData.append("avatar", uploadImage); 
    
                const response = await dispatch(updateAvatar(formData)); 
                console.log(response);
                if (response.payload?.data?.success) {
                    toast.success("Avatar uploaded successfully");
                }
            } catch (error) {
                toast.error(error?.response?.data?.message);
            } finally {
                toast.dismiss(loadingToastId);
                setImage({
                    avatar: "" 
                });
                navigate("/me")
            }
        };
    }
    useEffect(()=>{
     console.log(user);
    },[])

    return (
        <div className="px-10 py-6 flex flex-col gap-5 bg-gray-200">
           <div className="flex items-center space-x-4">
           <div className='relative'>
                    {user?.avatar ? 
                        <img src={user.avatar} alt="User Avatar" className="w-10 h-10 rounded-full" /> :
                        <CgProfile size={75} className="rounded-full" />
                    }
                    <div className="absolute top-14 right-4 transform translate-x-2/4 -translate-y-2/4 bg-white rounded-full p-1 cursor-pointer">
                      <label htmlFor="avatar" className='cursor-pointer'><FaEdit size={20} /></label>  
                      <input type="file" id='avatar' className='hidden' onChange={onAvatarSubmit}/>
                    </div>
            </div>
        </div>

            <div className="flex items-center space-x-4">
                <div>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="text"
                        defaultValue={user.firstName} 
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="lastName">
                        Last Name *
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="lastName"
                        type="text"
                        defaultValue={user.lastName} 
                    />
                </div>
            </div>
            <div className="mt-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    defaultValue={user.email} 
                />
            </div>
            <div className="mt-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                    IN +91 {' '}
                </label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    type="tel"
                    defaultValue={user.phone} 
                />
            </div>
            <div className="mt-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Save changes
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4">
                    Delete Account
                </button>
            </div>
        </div>
    )
}

export default ProfileComp