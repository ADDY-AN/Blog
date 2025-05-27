import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { FaFeatherAlt, FaUsers, FaGlobeAsia, FaHeart } from 'react-icons/fa'
import aboutImage from '../assets/about.jpeg'

const About = () => {
    const { user } = useSelector((store) => store.auth)

    return (
        <div className="bg-emerald-100 dark:bg-gradient-to-b from-gray-950 to-emerald-950 text-emerald-900 dark:text-emerald-100 px-4 py-16">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 mb-16">
                <div className="max-w-2xl">
                    <h1 className="text-5xl font-bold font-serif mb-6">
                        Discover, Write, Connect.
                    </h1>
                    <p className="text-xl font-serif mb-4">
                        At WanderWords, we empower travelers, dreamers, and storytellers to capture their journeys and inspire others with their words.
                    </p>
                    {!user && (
                        <Link to="/signup">
                            <Button className="mt-4 text-lg bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:text-black dark:hover:bg-transparent dark:hover:border-2 dark:hover:border-emerald-400 dark:hover:text-emerald-400 px-6 py-3 rounded-xl hover:scale-105 transition">
                                Join the Community
                            </Button>
                        </Link>
                    )}
                </div>
                <div>
                    <img
                        src={aboutImage}
                        alt="About"
                        className="rounded-xl shadow-lg w-full max-w-md"
                    />
                </div>
            </div>

            {/* Mission Card */}
            <div className="max-w-6xl mx-auto bg-white dark:bg-emerald-900 rounded-xl p-8 shadow-lg mb-16">
                <h2 className="text-3xl font-bold mb-4 font-serif">Our Mission</h2>
                <p className="text-lg font-serif leading-relaxed">
                    Our mission is to provide a digital space for authentic travel storytelling. We believe that everyone has a story worth sharing—and that through shared experiences, we can spark inspiration, foster empathy, and celebrate the beauty of global cultures.
                </p>
            </div>

            {/* Features Cards */}
            <div className="max-w-7xl mx-auto mb-20">
                <h2 className="text-4xl font-bold text-center font-serif mb-12">What You Can Do</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <FaFeatherAlt size={28} />,
                            title: 'Write Your Journey',
                            desc: 'Craft beautifully formatted travel blogs with our rich text editor and image support.'
                        },
                        {
                            icon: <FaUsers size={28} />,
                            title: 'Build Community',
                            desc: 'Follow fellow travelers, read their stories, and leave encouraging comments.'
                        },
                        {
                            icon: <FaGlobeAsia size={28} />,
                            title: 'Explore Stories',
                            desc: 'Discover journeys across continents, filtered by region, category, or tags.'
                        }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white dark:bg-emerald-900 rounded-xl p-6 shadow-md hover:shadow-xl dark:shadow-none dark:shadow-emerald-950 transition">
                            <div className="mb-4 text-emerald-600 dark:text-emerald-400">{feature.icon}</div>
                            <h3 className="text-xl font-bold font-serif mb-2">{feature.title}</h3>
                            <p className="text-md font-serif leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Core Values */}
            <div className="max-w-7xl mx-auto mb-20">
                <h2 className="text-4xl font-bold text-center font-serif mb-12 ">What We Value</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        {
                            icon: <FaHeart size={26} />,
                            title: 'Authenticity',
                            desc: 'Genuine stories from real people, not polished marketing posts.'
                        },
                        {
                            icon: <FaUsers size={26} />,
                            title: 'Community',
                            desc: 'Meaningful connections between storytellers and readers.'
                        },
                        {
                            icon: <FaFeatherAlt size={26} />,
                            title: 'Creativity',
                            desc: 'Freedom to express your travel experiences in your own voice.'
                        },
                        {
                            icon: <FaGlobeAsia size={26} />,
                            title: 'Diversity',
                            desc: 'Celebrating cultures, destinations, and backgrounds from all over the world.'
                        }
                    ].map((value, idx) => (
                        <div key={idx} className="bg-white dark:bg-emerald-900 p-6 rounded-xl shadow-md dark:shadow-none dark:shadow-emerald-950 hover:shadow-xl ">
                            <div className="text-emerald-600 dark:text-emerald-400 mb-3 flex justify-center">{value.icon}</div>
                            <h3 className="text-xl font-bold font-serif mb-2">{value.title}</h3>
                            <p className="text-md font-serif">{value.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default About