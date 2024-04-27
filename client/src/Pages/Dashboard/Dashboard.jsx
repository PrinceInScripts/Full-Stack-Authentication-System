// import React, { useEffect, useState } from 'react'
// import Layout from '../../components/Layout/Layout'
// import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';
// import { getAllUser } from '../../redux/slice/authSlice';

// function Dashboard() {
//     const [userList,setUserList]=useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//     const dispatch=useDispatch();

//     async function loadData(){
//         const loadingToastingId=toast.loading("Loading Data...");
//         try {
//             const response=await dispatch(getAllUser());
//             console.log(response);
//             setUserList(response.payload.allUser)
//         } catch (error) {
//             toast.error(error?.response?.data?.message);
//         } finally{
//             toast.dismiss(loadingToastingId)
//         }
//     }

//     useEffect(()=>{
//         loadData()
//         console.log(userList);
//     },[dispatch])

//   return (
//     <Layout>
//     <div className="flex flex-col min-h-screen">
        
//        <table>
//         <thead>
//           <tr>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Registration Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {userList.map((user) => (
//             <tr key={user.id}>
//               <td>{user.username}</td>
//               <td>{user.email}</td>
//               <td>{user.role}</td>
//               <td>{user.registrationDate}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </Layout>
//   )
// }

// export default Dashboard

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from '../../redux/slice/authSlice';
import { getMongoosePaginationOption, getPaginatePayload } from '../../helper/helpers';

const DashboardOverview = () => {
    const userRole = useSelector((state) => state.auth.role);
    const [userList, setUserList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalUsers,setTotalUsers]=useState(0);
    const dispatch = useDispatch(); 
  
    useEffect(() => {
      fetchUsers();
      fetchData();
    }, [userRole, currentPage]); 

    const fetchData=()=>{
      // setTotalUsers(userList)
      console.log(userList.length);
    }
  
    const fetchUsers =async () => {
      const paginationOptions = getMongoosePaginationOption({
        page: currentPage,
        limit: 10,
      });
  
      const response =await dispatch(getAllUser(paginationOptions)) // Pass pagination options as payload
      console.log(response);
      setUserList(response.payload.data.allUser)
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

  return (
    <div>
      <h2>Dashboard Overview</h2>
     
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Registration Date</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.registrationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      
     
      <div className="join">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="btn-info join-item btn">«</button>
        <button className="join-item btn btn-success">{`Page ${currentPage} of ${totalPages}`}</button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn-info join-item btn">»</button>
    </div>
    </div>
  );
};

export default DashboardOverview;