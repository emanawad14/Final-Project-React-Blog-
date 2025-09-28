import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

export default function MainLayout() {
  return (
   <>
   
   <Navbar/>

   <div className='bg-gray-200 min-h-screen pt-4'>
     <Outlet/>
   </div>
  
   <Footer/> 
   </>
  )
}
