import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("https://blog-4w1y.onrender.com/api/v1/blog/explore", {
        withCredentials: true,
      });
      if (response.data.success) {
        setBlogs(response.data.blogs);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className='pt-24 px-4 md:px-20 min-h-screen bg-emerald-100 dark:bg-gradient-to-t from-emerald-950 to-gray-950'>
      <h1 className='text-4xl font-bold text-center text-emerald-900 dark:text-emerald-50 mb-10 font-serif'>
        Explore All Blogs
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {blogs.map(blog => (
          <Card
            key={blog._id}
            className='dark:bg-gray-950 bg-emerald-50 p-4 rounded-2xl shadow-md shadow-emerald-900 border dark:border-emerald-900'
          >
            <h2 className='text-xl font-bold text-emerald-950 dark:text-emerald-50 font-mono'>
              {blog.title}
            </h2>
            <p className='text-sm text-emerald-600 dark:text-emerald-400 font-mono mb-2'>
              {blog.category} • by {blog.user?.name || "Anonymous"}
            </p>
            <p className='text-md font-serif text-emerald-900 dark:text-emerald-200 mb-2'>
              {blog.subtitle}
            </p>
            {blog.thumbnail && (
              <img
                src={blog.thumbnail}
                alt="thumbnail"
                className='rounded-xl mb-4 h-40 w-full object-cover border border-emerald-900 dark:border-emerald-500'
              />
            )}

            <p className='text-sm text-emerald-800 dark:text-emerald-300 font-serif'>
              {blog.description.replace(/<[^>]+>/g, '').slice(0, 120)}...
            </p>

            <div className='flex justify-end mt-3'>
              <Link to={`/blog/${blog._id}`}>
                <Button
                  variant="ghost"
                  className='text-emerald-900 dark:text-emerald-300 hover:bg-transparent hover:scale-105 hover:text-emerald-400 dark:hover:text-emerald-400 dark:hover:bg-transparent transition-all duration-300 font-mono'
                >
                  Read More →
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;