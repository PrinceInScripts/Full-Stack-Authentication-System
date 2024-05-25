import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allUser, getAllUser } from '../../redux/slice/authSlice';
import { getMongoosePaginationOption } from '../../helper/helpers';

const DashboardOverview = () => {
    const dispatch = useDispatch(); 
    const userRole = useSelector((state) => state.auth.role);

    const [userList, setUserList] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [totalUsers, setTotalUsers] = useState(0);
    const [adminTotal, setAdminTotal] = useState(0);
    const [superAdminTotal, setSuperAdminTotal] = useState(0);
    const [managerTotal, setManagerTotal] = useState(0);
    const [userTotal, setUserTotal] = useState(0);

    const [activeRole, setActiveRole] = useState('VIEW_ALL');

    useEffect(() => {
        fetchAllUsers();
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [currentPage, activeRole, allUsers]);

    const fetchAllUsers = async () => {
        const response = await dispatch(allUser());
        if (response.payload.success) {
            setAllUsers(response.payload.data);
            calculateRoleTotals(response.payload.data);
        }
    };

    const fetchUsers = async () => {
      const filteredUsers = filterUsersByRole(allUsers, activeRole);
        setTotalUsers(filteredUsers.length);
        setTotalPages(Math.ceil(filteredUsers.length / 10));
        const paginatedUsers = paginateUsers(filteredUsers, currentPage, 10);
        setUserList(paginatedUsers);

       

    };

    const paginateUsers = (users, page, limit) => {
      const start = (page - 1) * limit;
      const end = start + limit;
      return users.slice(start, end);
  };
    

    const filterUsersByRole = (users, role) => {
        if (role === 'VIEW_ALL') {
            return users;
        }
        return users.filter(user => user.role === role);
    };

    const calculateRoleTotals = (users) => {
        let adminCount = 0,
            superAdminCount = 0,
            managerCount = 0,
            userCount = 0;

        users.forEach((user) => {
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

        setAdminTotal(adminCount);
        setSuperAdminTotal(superAdminCount);
        setManagerTotal(managerCount);
        setUserTotal(userCount);
        setTotalUsers(users.length);
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
        setActiveRole(role);
        setCurrentPage(1); 
    };

    return (
        <div className='bg-base-700 w-full min-h-screen px-40 py-10'>
            <div className='py-10'>
                <h1 className='text-2xl font-bold font-serif'>Dashboard</h1>
                <p className='text-gray-500 font-semibold font-sans'>Details of Users.....</p>
            </div>

            <div className='flex justify-between items-center bg-gray-200 px-6 py-4'>
                <div className='bg-white text-center px-4 py-2 rounded-lg flex flex-col items-center'>
                    <p className='font-sans font-semibold text-sm'>Total Users</p>
                    <p className='font-serif font-bold'>{adminTotal+superAdminTotal+managerTotal+userTotal}</p>
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
                        activeRole === 'VIEW_ALL' ? `All Users (${totalUsers})`
                        : activeRole === 'USER' ? `All Users (${userTotal})`
                        : activeRole === 'ADMIN' ? `Admins (${adminTotal})`
                        : activeRole === 'SUPER_ADMIN' ? `Super Admins (${superAdminTotal})`
                        : activeRole === 'MANAGER' ? `Managers (${managerTotal})`
                        : ''
                    }
                </h1>
                <div className='flex gap-1 items-center py-4'>
                    <button className={`border-2 rounded-lg border-gray-400 px-4 py-1 ${activeRole === 'VIEW_ALL' ? 'bg-blue-500 text-white' : ''}`} onClick={() => handleButtonClick('VIEW_ALL')}>View All</button>
                    <button className={`border-2 rounded-lg border-gray-400 px-4 py-1 ${activeRole === 'USER' ? 'bg-blue-500 text-white' : ''}`} onClick={() => handleButtonClick('USER')}>All User</button>
                    <button className={`border-2 rounded-lg border-gray-400 px-4 py-1 ${activeRole === 'ADMIN' ? 'bg-blue-500 text-white' : ''}`} onClick={() => handleButtonClick('ADMIN')}>Admin</button>
                    <button className={`border-2 rounded-lg border-gray-400 px-4 py-1 ${activeRole === 'SUPER_ADMIN' ? 'bg-blue-500 text-white' : ''}`} onClick={() => handleButtonClick('SUPER_ADMIN')}>Super Admin</button>
                    <button className={`border-2 rounded-lg border-gray-400 px-4 py-1 ${activeRole === 'MANAGER' ? 'bg-blue-500 text-white' : ''}`} onClick={() => handleButtonClick('MANAGER')}>Manager</button>
                </div>

                <table className="w-full text-left text-sm font-light mt-8">
                    <thead className="text-xs uppercase text-black">
                        <tr>
                            <th className="py-3">Name</th>
                            <th className="py-3">Email</th>
                            <th className="py-3">Role</th>
                            <th className="py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-blue-200 border border-gray-400' : 'bg-gray-200 border border-gray-400'}>
                                <td className='px-4 py-4 text-lg font-semibold font-sans'>@{user.username}</td>
                                <td className='px-4 py-4 font-normal text-black font-serif'>{user.email}</td>
                                <td className={`px-4 py-4 font-normal text-black font-serif ${user.role === 'ADMIN' ? 'bg-pink-200' : user.role === 'SUPER_ADMIN' ? 'bg-red-200' : user.role === 'MANAGER' ? 'bg-green-200' : 'bg-yellow-200'}`}>
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
    );
};

export default DashboardOverview;