import { Avatar, AvatarImage } from '../components/ui/avatar'
import { Card } from '../components/ui/card'
import React, { useState } from 'react'
import userlogo from '../assets/userlogo.png'
import { Link } from 'react-router-dom'
import { FaGithub, FaInstagram, FaLinkedin, FaMeta } from 'react-icons/fa6'
import { Label } from '@radix-ui/react-label'
import { Button } from '../components/ui/button'
import { Input } from "../components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog"
import { Textarea } from '../components/ui/textarea'
import { useDispatch, useSelector } from 'react-redux'
import { setloading, setUser } from '../redux/authSlice'
import { toast } from 'sonner'
import axios from 'axios'




const Profile = () => {
    const [open, setOpen] =useState(false)
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [input, setInput] = useState({
        firstName: user?.firstName,
        lastName: user?.lastName,
        occupation: user?.occupation,
        bio: user?.bio,
        meta: user?.meta,
        linkedin: user?.linkedin,
        github: user?.github,
        instagram: user?.instagram,
        file: user?.photoUrl
    })

    const changeEventHandler=(e)=>{
        const {name, value} = e.target;
        setInput((prev)=>({
            ...prev,
            [name] : value
        }))
    }

    const changeFileHandler = (e)=>{
        setInput({...input, file:e.target.files?.[0]})
    }

    const submitHandler = async (e)=>{
        e.preventDefault()
        console.log(input);
        const formData = new FormData();
        formData.append("firstName", input.firstName)
        formData.append("lastName", input.lastName)
        formData.append("bio", input.bio)
        formData.append("occupation", input.occupation)
        formData.append("meta", input.meta)
        formData.append("linkedin", input.linkedin)
        formData.append("instagram", input.instagram)
        formData.append("github", input.github)
        if(input?.file){
            formData.append("file", input.file)
        }
        try {
            dispatch(setloading(true))
            const res = await axios.put('https://blog-4w1y.onrender.com/api/v1/user/profile/update', formData, {
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true
            })
            if(res.data.success){
                setOpen(false);
                toast.success(res.data.message)
                dispatch(setUser(res.data.user))
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to Update Profile.")
            
        } finally{
            dispatch(setloading(false))
        }
    }

    console.log(user)
    console.log(user.firstName)
    return (
        <div className='pt-20 md:ml-[350px] md:h-screen bg-emerald-100 dark:bg-gradient-to-t from-emerald-950 to-gray-950'>
            <div className='max-w-[1050px] mx-auto mt-8'>
                <Card className='flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-950 bg-emerald-50 shadow-sm shadow-emerald-950 rounded-2xl dark:border-1 dark:border-emerald-950'>
                    <div className='flex flex-col items-center justify-center md:w-[400px]'>
                        <Avatar className='w-40 h-40 border-0 dark:border-emerald-950 border-emerald-950 hover:scale-110 hover:border-emerald-500 transition-all duration-300 shadow-sm shadow-emerald-800 hover:shadow-emerald-900 dark:shadow-emerald-300 hover:shadow-lg dark:hover:shadow-emerald-500'>
                            <AvatarImage src={user.photoUrl || userlogo} className='bg-emerald-950  ' />
                        </Avatar>
                        <h1 className='text-center font-semibold text-xl text-emerald-950 font-mono dark:text-emerald-50 hover:text-emerald-500 my-3'>{user.occupation || "Blogger"} </h1>
                        <div className='flex gap-4 items-center'>
                            <Link to={user.meta}><FaMeta className='w-6 h-6 text-emerald-950 dark:text-gray-300 hover:text-emerald-500' /> </Link>
                            <Link to={user.linkedin}><FaLinkedin className='w-6 h-6 text-emerald-950 dark:text-gray-300 hover:text-emerald-500' /> </Link>
                            <Link to={user.github}><FaGithub className='w-6 h-6 text-emerald-950 dark:text-gray-300 hover:text-emerald-500' /> </Link>
                            <Link to={user.instagram}><FaInstagram className='w-6 h-6 text-emerald-950 dark:text-gray-300 hover:text-emerald-500' /> </Link>
                        </div>
                    </div>

                    <div className='font-mono text-emerald-950 '>
                    <h1 className=' font-bold text-center md:text-start text-4xl md-7  mb-2 dark:text-gray-300'>Welcome {user?.firstName || "Guest"}!</h1>
                    <p className='dark:text-emerald-400'><span className='dark:text-gray-200 font-semibold'>Email : </span>{user?.email || "Not available"}</p>
                        <div className='flex gap-2 flex-col items-start justify-start my-5 '>
                            <Label className='font-semibold dark:text-gray-300'>About Me</Label>
                            <p className=' hover:border-emerald-500 shadow-sm shadow-emerald-950 border-1 hover:border-1 text-emerald-950 border-gray-300 dark:border-emerald-950 p-6 font-serif rounded-lg dark:text-gray-200 font-light'>
                                {user.bio || "Nothing to Share..."} 
                            </p>
                        </div>
                        <Dialog open={open} onOpenChange= {setOpen}>
                            <DialogTrigger asChild>
                                <Button onClick={()=>setOpen(true)} variant="outline" className='bg-emerald-800 dark:bg-emerald-600 dark:border-0 dark:text-emerald-50 font-bold  text-emerald-50 hover:bg-emerald-950 hover:text-emerald-400 dark:hover:bg-transparent dark:hover:border-2 dark:hover:border-emerald-500 hover:scale-105'>Edit Profile</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[450px] font-mono">
                                <DialogHeader>
                                    <DialogTitle className='text-center'>Edit profile</DialogTitle>
                                    <DialogDescription className='text-center'>
                                        Make changes to your profile here. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className='flex gap-2'>
                                        <div >
                                            <Label htmlFor="name" className="text-left ml-1">
                                                First Name
                                            </Label>
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                placeholder="First Name"
                                                className="col-span-3 text-gray-900"
                                                type="text"
                                                value={input.firstName}
                                                onChange={changeEventHandler}
                                            />
                                        </div>
                                        <div >
                                            <Label htmlFor="name" className="text-left ml-1">
                                                Last Name
                                            </Label>
                                            <Input
                                                id="lastName"
                                                name="lastName"
                                                placeholder="Last Name"
                                                className="col-span-3 text-gray-900"
                                                type="text"
                                                value={input.lastName}
                                                onChange={changeEventHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <div >
                                            <Label htmlFor="name" className="text-left ml-1">
                                                Meta
                                            </Label>
                                            <Input
                                                id="meta"
                                                name="meta"
                                                placeholder="Enter URL"
                                                className="col-span-3 text-gray-900"
                                                type="text"
                                                value={input.meta}
                                                onChange={changeEventHandler}
                                            />
                                        </div>
                                        <div >
                                            <Label htmlFor="name" className="text-left ml-1">
                                                Instagram
                                            </Label>
                                            <Input
                                                id="instagram"
                                                name="instagram"
                                                placeholder="Enter URL"
                                                className="col-span-3 text-gray-900"
                                                type="text"
                                                value={input.instagram}
                                                onChange={changeEventHandler}

                                            />
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <div >
                                            <Label htmlFor="name" className="text-left ml-1">
                                                Linkedin
                                            </Label>
                                            <Input
                                                id="linkedin"
                                                name="linkedin"
                                                placeholder="Enter URL"
                                                className="col-span-3 text-gray-900"
                                                type="text"
                                                value={input.linkedin}
                                                onChange={changeEventHandler}
                                            />
                                        </div>
                                        <div >
                                            <Label htmlFor="name" className="text-left ml-1">
                                                GitHub
                                            </Label>
                                            <Input
                                                id="github"
                                                name="github"
                                                placeholder="Enter URL"
                                                className="col-span-3 text-gray-900"
                                                type="text"
                                                value={input.github}
                                                onChange={changeEventHandler}

                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label className='text-left ml-1'>Bio</Label>
                                        <Textarea className='cols-span-3 text-gray-900'
                                        placeholder="Enter your Bio"
                                        id="bio"
                                        name="bio"
                                        value={input.bio}
                                                onChange={changeEventHandler}
                                        />
                                    </div>
                                <div>
                                <Label className='text-left ml-1'>Picture</Label>
                                <Input
                                id="file"
                                type="file"
                                accept="image/*"
                                className='w-[277px]'
                                onChange={changeFileHandler}
                                />
                                </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" className='font-mono' onClick={submitHandler}>Update</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </Card>
            </div>
        </div>
        
    )
}

export default Profile