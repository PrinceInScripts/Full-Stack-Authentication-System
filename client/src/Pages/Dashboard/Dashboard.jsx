import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allUser, getAllUser } from '../../redux/slice/authSlice';
import { getMongoosePaginationOption, getPaginatePayload } from '../../helper/helpers';
import DashTable from './DashTable';

const DashboardOverview = () => {
    const userRole = useSelector((state) => state.auth.role);
    const [userList, setUserList] = useState([]);
    const [allUsers,setAllUsers]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalUsers,setTotalUsers]=useState(0);
    const [adminTotal,setAdminTotal]=useState(0);
    const [superAdminTotal,setSuperAdminTotal]=useState(0);
    const [managerTotal,setManagerTotal]=useState(0);
    const [userTotal,setUserTotal]=useState(0);
    const dispatch = useDispatch(); 


    const [isViewAllActive,setIsViewAllActive]=useState(true)
    const [isAllUserActive,setIsAllUserActive]=useState(false)
    const [isAdminActive,setIsAdminActive]=useState(false)
    const [isSuperAdminActive,setIsSuperAdminActive]=useState(false)
    const [isManagerActive,setIsManagerAdminActive]=useState(false)

    const [isActive,setIsActive]=useState({
      viewAll:isViewAllActive,
      allUser:isAllUserActive,
      admin:isAdminActive,
      superAdmin:isSuperAdminActive,
      Manager:isManagerActive,
    })
  
    useEffect(() => {
      fetchUsers();
    }, [userRole, currentPage,isAdminActive,isAllUserActive,isManagerActive,isSuperAdminActive,isViewAllActive]); 

    useEffect(()=>{
      fetchData();
    },[allUsers,currentPage])

    
    const fetchData = () => {
      if (allUsers.length > 0) {
        let adminCount = 0,
          superAdminCount = 0,
          managerCount = 0,
          userCount = 0;
    
        allUsers.forEach((user) => {
          switch (user.role) {
            case "ADMIN":
              adminCount++;
              break;
            case "SUPER_ADMIN":
              superAdminCount++;
              break;
            case "MANAGER":
              managerCount++;
              break;
            case "USER":
              userCount++;
              break;
            default:
              break;
          }
        });
    
        // Set counts and total users after calculating
        setAdminTotal(adminCount);
        setSuperAdminTotal(superAdminCount);
        setManagerTotal(managerCount);
        setUserTotal(userCount);
        setTotalUsers(allUsers.length);
        
      }

       

    };
  
    // const fetchUsers =async () => {
    //   const paginationOptions = getMongoosePaginationOption({
    //     page: currentPage, 
    //     limit: 10,
    //   });
  
    //   const response =await dispatch(getAllUser(paginationOptions)) 
    //   const response1 =await dispatch(allUser()) 
    //  console.log(response);
    //   setUserList(response.payload.data.allUser)
    //   setAllUsers(response1.payload.data)
    //   setTotalPages(response.payload.data.totalPages)
    //   console.log("UserList",userList);
    // };

    const fetchUsers = async () => {
      let filteredUsers = [];
    
      if (isViewAllActive) {
        // Fetch all users
        console.log("allUsers",allUsers);
        filteredUsers = allUsers;
      } else {
        // Filter users based on the active button
        filteredUsers = allUsers.filter((user) => {
          switch (user.role) {
            case 'ADMIN':
              return isAdminActive;
            case 'SUPER_ADMIN':
              return isSuperAdminActive;
            case 'MANAGER':
              return isManagerActive;
            default:
              return isAllUserActive;
          }
        });
      }

      console.log("filteredUsers",filteredUsers);
    
      // Update the userList state
      setUserList(filteredUsers);
    
      // Set total users count
      setTotalUsers(filteredUsers.length);
    
      // Set total pages based on filtered users count
      const totalPagesCount = Math.ceil(filteredUsers.length / 10);
      console.log("totalPagesCount",totalPagesCount);
      setTotalPages(totalPagesCount);
    
      // Fetch data based on pagination
      const paginationOptions = getMongoosePaginationOption({
        page: currentPage,
        limit: 10,
      });
    
             const response =await dispatch(getAllUser(paginationOptions)) 
      const response1 =await dispatch(allUser()) 
     console.log(response);
      // setUserList(response.payload.data.allUser)
      setAllUsers(response1.payload.data)
      // setTotalPages(response.payload.data.totalPages)
      console.log("UserList",userList);
    };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } 
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleButtonClick = (role) => {
    // Reset all active states
    setIsViewAllActive(false);
    setIsAllUserActive(false);
    setIsAdminActive(false);
    setIsSuperAdminActive(false);
    setIsManagerAdminActive(false);
  
    // Set active state based on role
    switch (role) {
      case 'ADMIN':
        setIsAdminActive(true);
        break;
      case 'SUPERADMIN':
        setIsSuperAdminActive(true);
        break;
      case 'MANAGER':
        setIsManagerAdminActive(true);
        break;
      default:
        setIsAllUserActive(true);
    }
  };

  return (
    <>
    <div className='bg-base-700 w-full min-h-screen px-40 py-10'>
      <div className='py-10'>
      <h1 className='text-2xl font-bold font-serif'>Dashboard</h1>
      <p className='text-gray-500 font-semibold font-sans'>Details of Users.....</p>
      </div>
     
      <div className='flex justify-between items-center bg-gray-200 px-6 py-4'>
        <div className='bg-white text-center px-4 py-2 rounded-lg flex flex-col items-center'>
          <p className='font-sans font-semibold text-sm'>Total Users</p> 
          <p className='font-serif font-bold'>{totalUsers}</p>
        </div>
        <div className='bg-white text-center px-4 py-2 rounded-lg flex flex-col items-center'>
          <p className='font-sans font-semibold text-sm'> Admin</p> 
          <p className='font-serif font-bold'>{adminTotal}</p>
        </div>
        <div className='bg-white text-center px-4 py-2 rounded-lg flex flex-col items-center'>
          <p className='font-sans font-semibold text-sm'>Super Admin</p> 
          <p className='font-serif font-bold'>{superAdminTotal}</p>
        </div>
        <div className='bg-white text-center px-4 py-2 rounded-lg flex flex-col items-center'>
          <p className='font-sans font-semibold text-sm'>Manager</p> 
          <p className='font-serif font-bold'>{managerTotal}</p>
        </div>
        <div className='bg-white text-center px-4 py-2 rounded-lg flex flex-col items-center'>
          <p className='font-sans font-semibold text-sm'>Users</p> 
          <p className='font-serif font-bold'>{userTotal}</p>
        </div>
        
      </div>

      <div className='mt-20'>
      <h1 className='text-2xl font-bold font-serif'>
        
  {
    isViewAllActive ? `All Users (${totalUsers})`
    : isAllUserActive ? `All User (${userTotal})` 
    : isAdminActive ? `Admins (${adminTotal})`
    : isSuperAdminActive ? `Super Admins (${superAdminTotal})`
    : isManagerActive ? `Managers (${managerTotal})` 
    : ''
  }
</h1>
    <div>
     
      <div className='flex gap-1 items-center py-4'>
       
        <div className=' text-center py-2 rounded-lg flex flex-col items-center'>
          <button className={`border-2 rounded-lg border-gray-400 px-4 py-1 ${isViewAllActive ? 'bg-blue-500 text-white' : ''}`} onClick={() => { handleButtonClick('VIEW_ALL'); setIsViewAllActive(true); setIsAllUserActive(false); setIsAdminActive(false); setIsSuperAdminActive(false); setIsManagerAdminActive(false);}}>View All</button>
        </div>
        <div className='bg-white text-center py-2 rounded-lg flex flex-col items-center'>
          <button className={`border-2 rounded-lg border-gray-400 px-4 py-1 ${isAllUserActive ? 'bg-blue-500 text-white' : ''}`} onClick={() => { handleButtonClick('ALL_USER'); setIsAllUserActive(true); }}>All User</button>
        </div>
        <div className='bg-white text-center py-2 rounded-lg flex flex-col items-center'>
          <button className={`border-2 rounded-lg border-gray-400 px-4 py-1 ${isAdminActive ? 'bg-blue-500 text-white' : ''}`} onClick={() => { handleButtonClick('ADMIN'); setIsAdminActive(true); }}>Admin</button>
        </div>
        <div className='bg-white text-center py-2 rounded-lg flex flex-col items-center'>
          <button className={`border-2 rounded-lg border-gray-400 px-4 py-1 ${isSuperAdminActive ? 'bg-blue-500 text-white' : ''}`} onClick={() => { handleButtonClick('SUPERADMIN'); setIsSuperAdminActive(true); }}>Super Admin</button>
        </div>
        <div className='bg-white text-center py-2 rounded-lg flex flex-col items-center'>
          <button className={`border-2 rounded-lg border-gray-400 px-4 py-1 ${isManagerActive ? 'bg-blue-500 text-white' : ''}`} onClick={() => { handleButtonClick('MANAGER'); setIsManagerAdminActive(true); }}>Manager</button>
        </div>
      </div>
    </div>
   <table className="w-full text-left text-sm font-light mt-8">
   <thead className="text-xs uppercase text-black">
     <tr >
       <th className="py-3">Name</th>
       <th className="py-3">Email</th>
       <th className="py-3 ">Role</th>
       <th className="py-3 ">Date</th>
     </tr>
   </thead>
   <tbody>
   {userList.map((user, index) => (
 <tr key={index} className={index % 2 === 0 ? 'bg-blue-200 border border-gray-400' : 'bg-gray-200 border border-gray-400'}>
    <td className='px-4 py-4 text-lg font-semibold font-sans'>@{user.username}</td>
    <td className='px-4 py-4 font-normal text-black font-serif'>{user.email}</td>
    <td className={`px-4 py-4 font-normal text-black font-serif ${user.role === 'ADMIN' ? 'bg-pink-200' : user.role === 'SUPERADMIN' ? 'bg-red-200' : user.role === 'MANAGER' ? 'bg-green-200' : 'bg-yellow-200'}`}>
      {user.role}
    </td>
    <td className='px-4 py-4 font-normal text-black font-serif'>{formatDate(user.createdAt)}</td>
  </tr>
))}
   </tbody>
 </table>

 <div className='flex justify-center'>
   <div className="join mt-10 ">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="btn-info join-item btn">«</button>
        <button className="join-item btn btn-success">{`Page ${currentPage} of ${totalPages}`}</button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn-info join-item btn">»</button>
    </div>
 </div>

    

      </div>

     
    </div>

   
    </>
   
  );
};

export default DashboardOverview;