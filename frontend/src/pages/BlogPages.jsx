import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";

const BlogPage = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://blog-4w1y.onrender.com/api/v1/blog/${blogId}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setBlog(response.data.blog);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [blogId]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-emerald-200 via-emerald-400 to-emerald-300 dark:from-gray-800 dark:via-gray-900 dark:to-black">
        <p className="text-xl text-emerald-900 dark:text-emerald-300 font-semibold animate-pulse">
          Loading blog...
        </p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-rose-200 via-rose-400 to-rose-300 dark:from-red-900 dark:via-red-800 dark:to-black">
        <p className="text-xl text-red-700 dark:text-red-400 font-semibold">
          Sorry, blog not found.
        </p>
        <Button
          variant="outline"
          className="ml-4"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-emerald-100 dark:bg-gradient-to-t from-emerald-950 to-gray-950  px-6 md:px-20 py-12 flex flex-col items-center">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="self-start mb-8 mt-10 dark:hover:bg-transparent text-emerald-900 dark:text-emerald-600 hover:text-emerald-700 dark:hover:text-emerald-400 flex items-center gap-2 font-semibold"
      >
        <ArrowLeft size={20} /> Back
      </Button>

      <article className="bg-white dark:bg-gray-950 rounded-3xl shadow-2xl shadow-emerald-500/30 dark:shadow-emerald-800/50 max-w-4xl w-full overflow-hidden">
        {blog.thumbnail && (
          <div className="h-60 sm:h-80 md:h-96 w-full overflow-hidden rounded-t-3xl">
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-full object-cover transform hover:scale-105 transition duration-500 ease-in-out"
              loading="lazy"
            />
          </div>
        )}

        <div className="p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900 dark:text-emerald-100 font-serif tracking-wide leading-tight mb-4">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center text-sm md:text-base font-mono text-emerald-800 dark:text-emerald-300 mb-8 gap-4">
            <span className="uppercase font-semibold tracking-wider bg-emerald-200 dark:bg-emerald-900 px-3 py-1 rounded-full">
              {blog.category}
            </span>
            <span>by <strong>{blog.author?.name || "Anonymous"}</strong></span>
            <span>•</span>
            <time dateTime={blog.createdAt} className="italic text-emerald-800 dark:text-emerald-300">
              {new Date(blog.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <p className="text-xl md:text-2xl text-emerald-800 dark:text-emerald-300 italic font-serif mb-8 tracking-wide">
            {blog.subtitle}
          </p>

          <section
            className="prose text-emerald-800 dark:text-emerald-100 prose-emerald max-w-none dark:prose-invert font-serif text-lg md:text-xl leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
        </div>
      </article>
    </div>
  );
};

export default BlogPage;