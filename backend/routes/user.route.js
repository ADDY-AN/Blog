import express from 'express'
import { register, updateProfile } from '../controllers/user.controller.js'
import { login, logout } from '../controllers/user.controller.js'
import { isAuth } from '../middleware/isAuth.js'
import { singleUpload } from '../middleware/multer.js'

const router = express.Router()


router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile/update").put(isAuth, singleUpload, updateProfile)

export default router