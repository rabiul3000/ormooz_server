import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Bad request" });
    }


    const savedUser = await User.findOne({ email }).select("+password");
    if (!savedUser) return res.status(400).json({ message: "No user found" });
    const dbPassword = savedUser.password;
    const passwordMatch = await bcrypt.compare(password, dbPassword);
    if (!passwordMatch) return res.status(400).json({ message: "Invalid password or email" });

    // Create JWT payload (minimal data)
    const payload = {
      id: savedUser._id,
      role: savedUser.role,
    };

    // Sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // 🍪 Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,          // REQUIRED for HTTPS (Railway uses HTTPS)
      sameSite: "none",      // REQUIRED for cross-domain
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const user = savedUser.toObject();
    delete user.password;
    return res.status(200).json({ message: "User logged in successfully", user });

  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
};

export default loginUser;
