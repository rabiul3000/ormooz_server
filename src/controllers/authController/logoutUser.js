
const logoutUser = (req, res) => {
  try {
    res.clearCookie("token");
    req.user = null;
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }

};

export default logoutUser;
