
import jwt from 'jsonwebtoken';


export const isAuth = async (req, res, next) => {
    try {
        console.log("Cookies received:", req.cookies);  // <-- Check if token cookie is sent
        const token = req.cookies.token;
        if (!token) {
            console.log("No token cookie found");
            return res.status(401).json({
                message: "User not authenticated.",
                success: false,
            });
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            console.log("Token verification failed");
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }
        req.id = decode.userId;
        next();

    } catch (error) {
        console.log("Auth middleware error:", error.message);
        return res.status(401).json({
            message: "Authentication failed. Invalid or expired token.",
            success: false,
            error: error.message,
        });
    }
}