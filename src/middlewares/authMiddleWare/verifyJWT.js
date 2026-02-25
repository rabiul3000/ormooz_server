import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyJWT = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
        return res.status(404).json({ message: "Not token found" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(500).json(error);
    }
};

export default verifyJWT;
