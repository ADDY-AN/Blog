import React, { useState } from 'react'
import auth11 from '../assets/auth11.png'
import auth12 from '../assets/auth12.png'
import auth13 from '../assets/auth13.png'
import auth14 from '../assets/auth14.png'
import auth15 from '../assets/auth15.png'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { FaArrowLeft } from "react-icons/fa6"
import { FaArrowRight } from "react-icons/fa6";
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "../components/ui/carousel"
import { useDispatch, useSelector } from 'react-redux'
import { setloading } from '../redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
  const dispatch = useDispatch()
  const {loading} = useSelector(store => store.auth)
  const navigate = useNavigate()
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(user)

    try {
      dispatch(setloading(true))
      const res = await axios.post('http://localhost:8000/api/v1/user/register', user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      if (res.data.success) {
        toast.success('Account created successfully')
        navigate('/login')
      }
      else {
        toast.error(res.data.message)
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
    finally {
      dispatch(setloading(false))
    }

  }
  const [showPassword, setShowPassword] = useState(false)
  const images = [
    auth11,
    auth12,
    auth13,
    auth14,
    auth15,
  ];
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => setCurrentIndex((currentIndex + 1) % images.length)
  const prevImage = () => setCurrentIndex((currentIndex - 1 + images.length) % images.length)

  return (
    <div className="flex h-screen items-center justify-center bg-emerald-50 dark:bg-gradient-to-t from-emerald-950 to-gray-950">

      <div className="hidden md:flex w-1/2 justify-center items-center relative overflow-hidden bg-transparent mx-6">
       
        <Carousel className="w-full h-full">
          <div className="absolute top-10 left-43 text-2xl font-mono font-semibold text-emerald-900 dark:text-emerald-50">Welcome to Forever Journal.</div>
          <CarouselContent className="w-full h-full">
            {images.map((_image, index) => (
              <CarouselItem key={index} className="w-full h-full">
                <img
                  src={images[currentIndex]}  
                  alt={`auth carousel ${currentIndex}`}
                  className="h-[600px] w-[1000px] object-cover opacity-90 transition rounded-2xl"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <Button onClick={prevImage} className="absolute top-1/2 left-8 bg-transparent shadow-none text-emerald-950 hover:bg-transparent dark:bg-transparent hover:text-emerald-500 dark:text-emerald-50 p-2 transition"><FaArrowLeft  /></Button>
          <Button onClick={nextImage} className="absolute top-1/2 right-12 bg-transparent shadow-none text-emerald-950 dark:text-emerald-50 hover:text-emerald-500 hover:bg-transparent dark:bg-transparent p-2 transition"><FaArrowRight/></Button>
          <div className="absolute bottom-4 left-85 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${currentIndex === index ? 'bg-emerald-600' : 'bg-gray-300'}`}
                onClick={() => setCurrentIndex(index)}
              ></button>
            ))}
          </div>
        </Carousel>
      </div>
      {/* Right - Signup Form (unchanged) */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-6 ">
        <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl  dark:bg-gray-950 dark:border-gray-600">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-xl font-mono font-semibold text-gray-950 dark:text-gray-200">Create an account</h1>
            </CardTitle>
            <p className="mt-2 text-sm font-mono text-center text-gray-950 dark:text-gray-200">
              Enter your details below to create your account
            </p>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col space-y-4 font-mono text-gray-950 dark:text-gray-200" onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <div className="w-1/2">
                  <Label className="mb-1 ml-2 ">First Name</Label>
                  <Input type="text" name="firstName" placeholder="First Name" className="dark:border-gray-600 dark:bg-gray-950 " value={user.firstName}
                    onChange={handleChange} />
                </div>
                <div className="w-1/2">
                  <Label className="mb-1 ml-2">Last Name</Label>
                  <Input type="text" name="lastName" placeholder="Last Name" className="dark:border-gray-600 dark:bg-gray-950" value={user.lastName}
                    onChange={handleChange} />
                </div>
              </div>
              <div>
                <Label className="mb-1 ml-2">Email</Label>
                <Input type="email" name="email" value={user.email} onChange={handleChange} placeholder="john.doe@example.com" className="dark:border-gray-600 dark:bg-gray-950" />
              </div>
              <div className="relative">
                <Label className="mb-1 ml-2">Password</Label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a Password"
                  className="dark:border-gray-600 dark:bg-gray-950"
                  value={user.password}
                  onChange={handleChange}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  className="absolute right-2 top-9 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:text-emerald-400 hover:bg-emerald-950 dark:hover:bg-gray-800 mt-2">
              {
                loading ? (
                  <>
                  <Loader2 className='mr-2 w-4 h-4 animate-spin' />
                  Please Wait...
                  </>
                ) : ('Sign Up')
              }
              </Button>
            </form>
            <p className="mt-4 text-sm font-mono text-center dark:text-gray-300">
              Already have an account?{' '}
              <a href="/login" className="text-emerald-600 hover:underline hover:text-emerald-500">
                Login
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Signup