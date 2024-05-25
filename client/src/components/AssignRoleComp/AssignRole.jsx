import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { allUser } from '../../redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';

function AssignRole() {
    const dispatch = useDispatch(); 
    const navigate=useNavigate()
    const userRole = useSelector((state) => state.auth.role);

    const [userList, setUserList] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchEmail,setSearchEmail]=useState('');
    const [searchUsername,setSearchUsername]=useState('');


    useEffect(() => {
        fetchAllUsers();
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [currentPage, allUsers,searchEmail,searchUsername]);

    const fetchAllUsers = async () => {
        const response = await dispatch(allUser());
        if (response.payload.success) {
            setAllUsers(response.payload.data);
        }
    };

    const fetchUsers = async () => {
      const filteredUsers = filterUsersBySearch(allUsers,searchEmail,searchUsername);
        setTotalPages(Math.ceil(filteredUsers.length / 10));
        const paginatedUsers = paginateUsers(filteredUsers, currentPage, 10);
        setUserList(paginatedUsers);
    };

    const paginateUsers = (users, page, limit) => {
      const start = (page - 1) * limit;
      const end = start + limit;
      return users.slice(start, end);
  };
    

    const filterUsersBySearch = (users,email,username) => {
        return users.filter(user => 
            (email ? user.email.includes(email) : true) &&
            (username ? user.username.includes(username) : true)
        );
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

    const handleUserClick = (user) => {
        navigate(`/assign-role/${user.id}`);
    };

  return (
    <div className='bg-base-700 w-full min-h-screen px-40 py-10'>
            <div className='py-10'>
                <h1 className='text-2xl font-bold font-serif'>Assign Roles</h1>
                <p className='text-gray-500 font-semibold font-sans'>Search and assign roles to users</p>
            </div>

            <div className='flex justify-center align-center mb-10'>
                <input
                    type="text"
                    placeholder="Search by email"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="input input-bordered input-primary w-full max-w-xs mr-4"
                />
                <input
                    type="text"
                    placeholder="Search by username"
                    value={searchUsername}
                    onChange={(e) => setSearchUsername(e.target.value)}
                    className="input input-bordered input-primary w-full max-w-xs"
                />
            </div>

            <table className="w-full text-left text-sm font-light mt-8">
                <thead className="text-xs uppercase text-black">
                    <tr>
                        <th className="py-3">Name</th>
                        <th className="py-3">Email</th>
                        <th className="py-3">Role</th>
                        <th className="py-3">Date</th>
                        <th className="py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((user, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-blue-200 border border-gray-400' : 'bg-gray-200 border border-gray-400'}>
                            <td className='px-4 py-4 text-lg font-semibold font-sans'>@{user.username}</td>
                            <td className='px-4 py-4 font-normal text-black font-serif'>{user.email}</td>
                            <td className='px-4 py-4 font-normal text-black font-serif'>{user.role}</td>
                            <td className='px-4 py-4 font-normal text-black font-serif'>{new Date(user.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                            <td className='px-4 py-4 font-normal text-black font-serif'>
                                <button 
                                    onClick={() => handleUserClick(user)}
                                    className='bg-blue-500 text-white px-4 py-2 rounded-lg'
                                >
                                    Assign Role
                                </button>
                            </td>
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
  )
}

export default AssignRole
