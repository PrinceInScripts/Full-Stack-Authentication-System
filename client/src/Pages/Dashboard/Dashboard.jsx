import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allUser, getAllUser } from '../../redux/slice/authSlice';
import { getMongoosePaginationOption, getPaginatePayload } from '../../helper/helpers';

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
  
    useEffect(() => {
      fetchUsers();
    }, [userRole, currentPage]); 

    useEffect(()=>{
      fetchData();
    },[allUsers])

    
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
            case "SUPERADMIN":
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
  
    const fetchUsers =async () => {
      const paginationOptions = getMongoosePaginationOption({
        page: currentPage, 
        limit: 10,
      });
  
      const response =await dispatch(getAllUser(paginationOptions)) 
      const response1 =await dispatch(allUser()) 
     console.log(response);
      setUserList(response.payload.data.allUser)
      setAllUsers(response1.payload.data)
      setTotalPages(response.payload.data.totalPages)
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

  return (
    <>
    <div className='bg-blue-100 w-full min-h-screen px-40'>
      <h1>Dashboard</h1>
      <div className='flex justify-between items-center'>
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

      <table className="w-full text-left text-sm font-light">
      <thead className="text-xs uppercase text-black">
        <tr>
          <th className="py-3 px-6">Name</th>
          <th className="py-3 px-6">Role</th>
          <th className="py-3 px-6">Projects</th>
          <th className="py-3 px-6">Status</th>
          <th className="py-3 px-6">Date</th>
        </tr>
      </thead>
      <tbody>
        
      </tbody>
    </table>
    </div>

   
    </>
    // <div>
    //   <h2>Dashboard Overview</h2>
    //  <div>
    //   <p>{adminTotal}</p>
    //   <p>{totalUsers}</p>
    //   <p>{userTotal}</p>
    //   <p>{superAdminTotal}</p>
    //   <p>{managerTotal}</p>
    //  </div>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Username</th>
    //         <th>Email</th>
    //         <th>Role</th>
    //         <th>Registration Date</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {userList.map((user) => (
    //         <tr key={user.id}>
    //           <td>{user.username}</td>
    //           <td>{user.email}</td>
    //           <td>{user.role}</td>
    //           <td>{formatDate(user.createdAt)}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>

      
     
    //   <div className="join">
    //     <button onClick={handlePrevPage} disabled={currentPage === 1} className="btn-info join-item btn">«</button>
    //     <button className="join-item btn btn-success">{`Page ${currentPage} of ${totalPages}`}</button>
    //     <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn-info join-item btn">»</button>
    // </div>
    // </div>
  );
};

export default DashboardOverview;