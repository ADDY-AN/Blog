import { CreditCard, Keyboard, SquareUser } from 'lucide-react'
import React from 'react'
import { MdOutlineInsertComment } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className=' hidden mt-10 fixed md:block  dark:bg-gray-950 bg-emerald-50 border-0 shadow-sm dark:border-gray-600 w-[350px] p-10 space-y-2 h-screen'>
            <div className=' text-center pt-10 px-3 space-y-2'>
                <NavLink to='/dashboard/profile' className={({ isActive }) => `text-2xl ${isActive ? "bg-emerald-800 dark:bg-gray-900 text-emerald-50 dark:text-emerald-500" : "bg-transparent text-emerald-950"} 
            flex items-center gap-2 font-semibold coursor-pointer font-mono  dark:text-emerald-50 rounded-lg p-2 hover:bg-emerald-950 hover:dark:bg-transparent hover:text-emerald-400  transition-all duration-300`}>
                    <div className='flex flex-row gap-2 items-center justify-center'>
                        <SquareUser />
                        <span>Profile</span>
                    </div>
                </NavLink>
                <NavLink to='/dashboard/your-blogs' className={({ isActive }) => `text-2xl ${isActive ? "bg-emerald-800 dark:bg-gray-900 text-emerald-50 dark:text-emerald-500" : "bg-transparent text-emerald-950"} 
            flex items-center gap-2 font-semibold coursor-pointer font-mono  dark:text-emerald-50 rounded-lg p-2 hover:bg-emerald-950 hover:dark:bg-transparent hover:text-emerald-400  transition-all duration-300`}>
                    <div className='flex flex-row gap-2 items-center justify-center'>
                        <CreditCard />
                        <span>Your Blogs</span>
                    </div>
                </NavLink>
                
                <NavLink to='/dashboard/write-blog' className={({ isActive }) => `text-2xl ${isActive ? "bg-emerald-800 dark:bg-gray-900 text-emerald-50 dark:text-emerald-500" : "bg-transparent text-emerald-950"} 
            flex items-center gap-2 font-semibold coursor-pointer font-mono  dark:text-emerald-50 rounded-lg p-2 hover:bg-emerald-950 hover:dark:bg-transparent hover:text-emerald-400  transition-all duration-300`}>
                    <div className='flex flex-row gap-2 items-center justify-center'>
                        <Keyboard />
                        <span>Write Blog</span>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar