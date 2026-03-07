const verifyAdmin = async (req, res, next) => {

    const role = req.user.role;
    const allowedRoles = ["admin"];

    if (!role) throw new Error("no role found");
    try {
        if (!allowedRoles.includes(role)) return res.status(401).json({ message: "Unauthorized" });
        next();
    } catch (error) {
        return res.status(500).json(error);
    }
};

export default verifyAdmin;
