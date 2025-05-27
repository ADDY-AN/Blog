import React from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import heroImg from '../assets/blog_girl.png'
import { useSelector } from 'react-redux'

const Hero = () => {
    const { user } = useSelector(store => store.auth)
    return (
        <div className="bg-emerald-100 dark:bg-gradient-to-b from-gray-950 to-emerald-950 text-emerald-900 dark:text-emerald-100 px-4 py-16">
            <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center h-[600px] my-10 md:my-0'>
                {/*Text section*/}
                <div className='max-w-2xl'>
                    <h1 className='font-serif text-4xl md:text-6xl font-bold mb-6 dark:text-emerald-50 text-emerald-950'>
                        Share <span className="font-mono text-emerald-600 dark:text-emerald-400">Stories</span> & Inspire <span className="font-mono text-emerald-600 dark:text-emerald-400">Journeys</span>.
                    </h1>
                    <p className='text-lg md:text-xl mb-6 opacity-90 dark:text-emerald-50 text-emerald-950 font-serif'>
                        Start your personal <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">travel journal</span>, explore others’ adventures, and relive memories from every corner of the world—<span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">forever documented</span>.
                    </p>
                    <div className='flex space-x-4'>
                        {user ? (
                            <Link to="dashboard/write-blog">
                            <Button className='font-mono font-normal dark:hover:border-1 text-lg  bg-emerald-500 hover:bg-emerald-950 hover:text-emerald-400 text-emerald-50 dark:bg-emerald-500 dark:text-black dark:hover:text-emerald-400 dark:hover:bg-transparent rounded-xl hover:scale-110 dark:hover:border-emerald-400'>
                                Write Post
                            </Button>
                        </Link>
                        ): (
                            <Link to="/signup">
                            <Button className='font-mono font-normal dark:hover:border-1 text-lg  bg-emerald-500 hover:bg-emerald-950 hover:text-emerald-400 text-emerald-50 dark:bg-emerald-500 dark:text-black dark:hover:text-emerald-400 dark:hover:bg-transparent rounded-xl hover:scale-110 dark:hover:border-emerald-400'>
                                Get Started
                            </Button>
                        </Link>
                        )}
                        
                        <Link to="/about">
                            <Button className='font-mono font-normal dark:hover:border-1 dark:border-emerald-500 border-white px-6 py-3 text-lg hover:text-emerald-400 hover:bg-emerald-950 dark:hover:bg-transparent dark:hover:text-emerald-400 text-white bg-emerald-900 dark:bg-emerald-50 dark:text-black rounded-xl hover:scale-110'>
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </div>
                {/*Image section*/}
                <div className='flex justify-center items-center aspect-square'>
                    <img
                        src={heroImg}
                        alt="hero"
                        className='w-70 md:w-100 lg:w-[600px] lg:h-[600px] aspect-square rounded'
                    />
                </div>
            </div>
        </div>
    )
}

export default Hero