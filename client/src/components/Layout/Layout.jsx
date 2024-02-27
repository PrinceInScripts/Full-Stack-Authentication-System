import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

function Layout({children}) {
  return (
    <div className='min-h-90vh flex flex-col'>
        <Navbar/>
        <main className='flex-grow'>{children}</main>
        <Footer/>
      
    </div>
  )
}

export default Layout
