import React from 'react'
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
//import { FaMoon, FaSun } from "react-icons/fa";
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { setloading } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { logout } from '../redux/authSlice'
import { toast } from 'sonner'
import { GiAbstract039 } from "react-icons/gi";
import { MdOutlineInsertComment } from "react-icons/md";
import userlogo from '../assets/userlogo.png'
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"




const Navbar = () => {
  const { loading } = useSelector(store => store.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth)
  const info = [
    'Hi, Welcome to Forever Journal Blog!',
    'This Project is made using MERN Stack.',
    'This is an original work.',
    'Try out Authetication Pages, Admin Dashboard, Create Post, etc.',
    'Try changing the system theme (light/dark)',
    'Watch out for more templates coming soon.',
    'This is a Full Stack Blog template developed by Aditya Anand.',

  ];
  let i = 0;
  const showToast = async () => {

    if (i < info.length) {
      toast.message(info[i])
    }
    else {
      i = 0;
      toast.message(info[i])
    }
    i++;
  }
  const logoutHandler = async () => {
    try {
      dispatch(setloading(true));
      const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
      if (res.data.success) {
        dispatch(logout())

        toast.success(res.data.message);
        navigate('/login');
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error);
    }
    finally {
      dispatch(setloading(false));
    }
  }

  return (
    <div className='py-3 fixed w-full dark:bg-gray-950 dark:border-b-gray-500 shadow-green-900 drop-shadow-sm bg-emerald-50 z-50'>
      <div className='max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0'>

        {/* Logo and Search */}
        <div className='flex gap-15 items-center'>
          <Link to="/">
            <div className='flex gap-2 items-center'>
              <img src={Logo} alt="logo" className='w-7 h-7 md:w-10 md:h-10 dark:invert scale-140 absolute left-5' />
              <h1 className='font-bold text-3xl md:text-4xl text-teal-950 dark:text-teal-50 font-serif absolute left-20'>FJ</h1>
            </div>
          </Link>
          <div className='relative hidden md:block ml-1'>
            <Input
              type="text"
              placeholder="People, topics, or keywords..."
              className="font-mono w-[400px] h-10 pl-10 pr-4 text-sm bg-emerald-100 border-1 dark:bg-gray-950 border-emerald-950 dark:border-1 rounded-xl shadow-sm dark:text-emerald-100 dark:placeholder:text-emerald-50 dark:border-gray-600"
            />
            <Button className="absolute right-0 top-0.5 hover:text-emerald-400 hover:bg-transparent bg-transparent dark:hover:text-emerald-400 hover:scale-110 text-emerald-950 dark:text-emerald-50">
              <Search strokeWidth={3} />
            </Button>
          </div>
        </div>

        {/* Navigation & Buttons */}
        <nav className='hidden md:flex gap-5'>
          <ul className='hidden md:flex gap-7 items-center text-lg font-normal text-emerald-800 dark:text-emerald-50'>
            <Link to="/"><li className='font-mono hover:text-emerald-400 dark:hover:text-emerald-400'>Home</li></Link>
            <Link to="/blogs"><li className='font-mono hover:text-emerald-400 dark:hover:text-emerald-400'>Blogs</li></Link>
            <Link to="/about"><li className='font-mono hover:text-emerald-400 dark:hover:text-emerald-400'>About</li></Link>
          </ul>
          {
            user ? (
              <div className=' flex gap-5 items-center'>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className='hover:scale-120 hover:border-1 hover:border-emerald-400 transition'>
                      <AvatarImage src={user.photoUrl || userlogo} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 font-mono">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    
                    <DropdownMenuGroup>
                    <Link to="/dashboard/profile">
                      <DropdownMenuItem>
                        
                        <User />
                        
                        <span>Profile</span>
                       
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      </Link>
                      <Link to="/dashboard/your-blogs">
                      <DropdownMenuItem>
                        
                        <CreditCard />
                        
                        <span>Your Blogs</span>
                       
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      </Link>
                      
                      <Link to="/dashboard/write-blog">
                      <DropdownMenuItem>
                        
                        <Keyboard />
                        <span>Write Blog</span>
                        
                        <DropdownMenuShortcut>⌘G</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                  
                    <DropdownMenuItem onClick={logoutHandler}>
                      <LogOut />
                      <span>Log out</span>
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button onClick={showToast} className=' scale-150 hover:scale-200 bg-transparent hover:bg-transparent shadow-none text-emerald-700  dark:text-emerald-400 '>
                  {
                    loading ? (
                      <>
                        <Loader2 className='mr-2 w-4 h-4 animate-spin' />
                        Please Wait...
                      </>
                    ) : (<GiAbstract039 size={20} className=' animate-spin' />)
                  }
                </Button>
              </div>
            ) : (
              <div className='ml-2 md:flex gap-3'>
                <Button onClick={showToast} className=' scale-150 hover:scale-200 bg-transparent hover:bg-transparent shadow-none text-emerald-400   dark:text-emerald-400 transition'>
                  {
                    <GiAbstract039 size={20} className=' animate-spin' />
                  }
                </Button>
                <Link to="/login">
                  <Button className='transition font-mono font-semibold hover:text-emerald-400 hover:bg-emerald-950 dark:hover:bg-gray-950 dark:hover:text-emerald-400 text-white bg-emerald-900 dark:bg-emerald-50 dark:text-black rounded-xl hover:scale-110 dark:hover:border-2 dark:hover:border-emerald-400'>Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className='transition font-mono font-semibold bg-emerald-500 hover:bg-emerald-950 hover:text-emerald-400 text-emerald-50 dark:bg-emerald-500 dark:text-black dark:hover:text-emerald-400 dark:hover:bg-gray-950 rounded-xl hover:scale-110 dark:hover:border-2 dark:hover:border-emerald-400'>Sign Up</Button>
                </Link>

              </div>
            )
          }
        </nav>
      </div>
    </div>
  )
}

export default Navbar
