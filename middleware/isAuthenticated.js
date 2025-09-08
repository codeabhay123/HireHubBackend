// In your middleware/isAuthenticated.js file
import jwt from "jsonwebtoken"; // ✅ Add this import

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }
        
        const decode = jwt.verify(token, process.env.SECRET_KEY); // Now jwt is defined
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }
        
        req.userId = decode.userId; 
      //  console.log("✅ Middleware set req.userId to:", req.userId);
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({
            message: "Invalid token",
            success: false
        });
    }
};

export default isAuthenticated;