import express from 'express';
import { isAuth } from '../middleware/isAuth.js';
import { getBlogById } from '../controllers/blog.controller.js';
import { singleUpload } from '../middleware/multer.js';
import {
  createBlog,
  updateBlog,
  getUserBlogs,
  deleteBlog,
  getAllBlogs
} from '../controllers/blog.controller.js';

const router = express.Router();

router.post("/", isAuth, singleUpload, createBlog);
router.put("/:blogId", isAuth, singleUpload, updateBlog);
router.get("/user/:userId", isAuth, getUserBlogs);
router.delete("/delete/:id", isAuth, deleteBlog); 
router.get("/explore", isAuth, getAllBlogs);
router.get('/:blogId', getBlogById);
export default router;