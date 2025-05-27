import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required. "
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long."
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email."
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword
        })

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials.",
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials.",
            });
        }

        const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" })
        const userObj = user.toObject();
        delete userObj.password;
        const userData = userObj;
        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "None",
            secure: true,
        }).json({
            success: true,
            message: `Welcome back ${userData.firstName}`,
            user: userData
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const logout = async (_, res) => {
    try {
        return res.status(200).cookie("token", null, { maxAge: 0 }).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
      const userId = req.id;
      const { firstName, lastName, occupation, bio, instagram, meta, linkedin, github } = req.body;
      const file = req.file;
  
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }
  
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (occupation) user.occupation = occupation;
      if (instagram) user.instagram = instagram;
      if (meta) user.meta = meta;
      if (linkedin) user.linkedin = linkedin;
      if (github) user.github = github;
      if (bio) user.bio = bio;
  
      // Upload photo only if file is provided
      if (file) {
        const fileUri = getDataUri(file);
        if (fileUri) {
          const cloudResponse = await cloudinary.uploader.upload(fileUri);
          user.photoUrl = cloudResponse.secure_url;
        }
      }
  
      await user.save();
  
      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

 
