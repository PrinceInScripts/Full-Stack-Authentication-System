import React from 'react'

function DashTable() {
  return (
    <div className='mt-20'>
    <h1 className='text-2xl font-bold font-serif'>All User </h1>
    <div>
     <div className='flex gap-2'>
       <button className='border-2 border-gray-400 px-4 py-1'>View All</button>
       <button  className='border-2 border-gray-400 px-4 py-1'>All User</button>
       <button  className='border-2 border-gray-400 px-4 py-1'>Admin</button>
       <button  className='border-2 border-gray-400 px-4 py-1'>Super Admin</button>
       <button  className='border-2 border-gray-400 px-4 py-1'>Manager</button>
     </div>
    </div>
   <table className="w-full text-left text-sm font-light mt-8">
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
  )
}

export default DashTable
