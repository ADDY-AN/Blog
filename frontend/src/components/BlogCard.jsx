import React from "react";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white shadow rounded-xl p-4 hover:shadow-md transition duration-300">
      <img
        src={blog.thumbnail}
        alt={blog.title}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <h2 className="text-lg font-semibold mb-1">{blog.title}</h2>
      <p className="text-sm text-gray-600 line-clamp-3">{blog.description}</p>
      <span className="inline-block mt-2 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
        {blog.category}
      </span>
    </div>
  );
};

export default BlogCard;