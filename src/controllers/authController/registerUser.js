import User from "../../models/User.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, contactNumber, image } = req.body;
    try {
        if (!firstName || !lastName || !email || !password || !contactNumber || !image) return res.status(400).json({ message: "Bad request" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const isUserExist = await User.findOne({ email });
        if (isUserExist) return res.status(400).json({ message: "User already exist" });
        const user = await User.create({ firstName, lastName, email, password: hashedPassword, contactNumber, image });
        return res.status(200).json({ message: "User registered successfully"});


    } catch (error) {
        return res.status(500).json(error);
    }
};

export default registerUser;
