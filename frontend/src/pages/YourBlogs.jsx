import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const YourBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (!user?._id) return;

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:8000/api/v1/blog/user/${user._id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBlogs(res.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [user]);

  return (
    <div className="pt-20 md:ml-[350px] min-h-screen bg-emerald-100 dark:bg-gradient-to-t from-emerald-950 to-gray-950 text-gray-900 dark:text-gray-100">
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-8">Your Blogs</h1>

        {blogs.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            You haven't posted any blogs yet.
          </p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {blogs.map((blog) => (
              <Card
                key={blog._id}
                className="bg-emerald-50 dark:bg-gray-950 w-full sm:w-[300px] cursor-pointer hover:shadow-xl transition-shadow font-mono dark:shadow-emerald-900 shadow-accent-foreground rounded-lg dark:border-0"
                onClick={() =>
                  setSelectedBlog({
                    ...blog,
                    user: typeof blog.user === "object" ? blog.user._id : blog.user,
                    author: blog.user?.name || user?.name || "Unknown Author",
                  })
                }
              >
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2 text-emerald-950 dark:text-emerald-50 font-semibold">
                    {blog.title || "Untitled Blog"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {blog.thumbnail && (
                    <img
                      src={blog.thumbnail}
                      alt={blog.title}
                      className="w-full h-40 object-cover rounded mb-2"
                    />
                  )}
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-2">
                    {blog.description}
                  </p>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold uppercase">
                    {blog.category || "Uncategorized"}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Modal for expanded blog */}
      {selectedBlog && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedBlog(null)}
        >
          <Card
            className="bg-emerald-50 dark:bg-gray-950 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-4 text-gray-700 dark:text-gray-300 text-2xl font-bold hover:text-red-600"
              onClick={() => setSelectedBlog(null)}
              aria-label="Close modal"
            >
              &times;
            </button>

            <CardHeader>
              <CardTitle className="text-emeral-950 dark:text-emerald-50 text-2xl">
                {selectedBlog.title || "Untitled Blog"}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {selectedBlog.thumbnail && (
                <img
                  src={selectedBlog.thumbnail}
                  alt={selectedBlog.title}
                  className="w-full h-64 object-cover rounded"
                />
              )}

              <p className="text-gray-700 dark:text-gray-300">
                {selectedBlog.description}
              </p>

              <div
                className="prose prose-emerald max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
              />

              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                <div>
                  <strong>Author:</strong>{" "}
                  <span className="text-emerald-700 dark:text-emerald-400">
                    {selectedBlog.author}
                  </span>
                </div>
                <div>
                  <strong>Category:</strong>{" "}
                  <span className="text-emerald-700 dark:text-emerald-400">
                    {selectedBlog.category || "Uncategorized"}
                  </span>
                </div>
              </div>

              {/* Edit button for the blog owner */}
             
                <div className="pt-4">
                  <Button
                    className="w-[100px] bg-emerald-950 dark:bg-transparent hover:bg-emerald-500 text-emerald-50 dark:text-emerald-400 hover:text-emerald-950 dark:hover:bg-transparent hover:border-2 hover:border-emerald-950 dark:hover:border-2 dark:hover:border-emerald-400 hover:scale-105 transition-all"
                    onClick={() =>
                      navigate(`/dashboard/write-blog/${selectedBlog._id}`)
                    }
                  >
                    Edit
                  </Button>
                </div>
              
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default YourBlogs;
