import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setloading, setUser } from '../redux/authSlice'



const Login = () => {
  const { loading } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [input, setInput] = useState({
    email: '',
    password: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setInput({
      ...input,
      [name]: value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(input)

    try {
      dispatch(setloading(true))
      const res = await axios.post('https://blog-4w1y.onrender.com/api/v1/user/login', input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true

      });
      if (res.data.success && res.data.user) {
        const { user, message, token } = res.data;// ✅ expect user object from backend
        dispatch(setUser(user));
        localStorage.setItem('token', token);
        // ⬇️ Save user
        dispatch(setUser({ ...user, token }));


        toast.success(message || "Login successful");
        navigate('/');
      } else {
        toast.error("Unexpected response from server.");
      }
    }

    catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message)
    }
    finally {
      dispatch(setloading(false))
    }

  }

  const [showPassword, setShowPassword] = React.useState(false)
  return (
    <div className="flex items-center h-screen md:pt-14 md:h-[760px] bg-emerald-50 dark:bg-gradient-to-t from-emerald-950 to-gray-950">
      <div className='hidden md:block'>
        <Card className="w-full max-w-md p-6 ml-125 shadow-lg rounded-2xl dark:bg-gray-950 dark:border-gray-600">
          <CardHeader>
            <CardTitle className="text-center text-xl font-bold font-mono text-gray-950 dark:text-gray-200">
              Login to your account
            </CardTitle>
            <p className='text-gray-950 dark:text-gray-300 mt-2 text-sm font-mono text-center'>Welcome Back!</p>
          </CardHeader>
          <CardContent>
            <form className='space-y-4 font-mono' onSubmit={handleSubmit}>
              <div>
                <Label className='mb-1 ml-2 text-gray-950 dark:text-gray-200'>Email</Label>
                <Input type='email' placeholder='Enter your email' name="email" className='dark:border-gray-600 dark:bg-gray-950 text-gray-950 dark:text-gray-100' value={input.email} onChange={handleChange} />
              </div>
              <div className='relative'>
                <Label className='mb-1 ml-2 text-gray-950 dark:text-gray-200'>Password</Label>
                <Input type={showPassword ? 'text' : 'password'} placeholder='Enter Your Password' name="password" value={input.password} onChange={handleChange} className='dark:border-gray-600 dark:bg-gray-950 text-gray-950 dark:text-gray-100' />
                <button onClick={() => setShowPassword(!showPassword)} type='button' className='absolute right-2 top-9 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <Button type='submit' className='w-full bg-emerald-600 hover:text-emerald-400 hover:bg-emerald-950 dark:hover:bg-gray-800 mt-2'>
                {
                  loading ? (
                    <>
                      <Loader2 className='mr-2 w-4 h-4 animate-spin' />
                      Please Wait...
                    </>
                  ) : ('Login')
                }
              </Button>
            </form>
            <p className='mt-4 text-sm font-mono text-center dark:text-gray-300'>Don't have an account? <a href="/signup" className='text-emerald-600 hover:underline hover:text-emerald-500'>Sign Up</a></p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login