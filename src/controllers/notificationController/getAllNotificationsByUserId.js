import Notification from "../../models/Notification.js";

const getAllNotificationsByUserId = async (req, res) => {
  const userId = req.user.id;
  const status = req.params.status;
  try {
    if (status === "all") {
      const notifications = await Notification.find({ to: userId }).sort({
        createdAt: -1,
      });
      if (!notifications) {
        return res.status(404).json({ message: "no notification found" });
      }
      return res.status(200).json(notifications);
    } else if (status === "read") {
      const notifications = await Notification.find({
        to: userId,
        isRead: true,
      }).sort({ createdAt: -1 });
      if (!notifications) {
        return res.status(404).json({ message: "no notification found" });
      }
      return res.status(200).json(notifications);
    } else if (status === "unread") {
      const notifications = await Notification.find({
        to: userId,
        isRead: false,
      }).sort({ createdAt: -1 });
      if (!notifications) {
        return res.status(404).json({ message: "no notification found" });
      }
      return res.status(200).json(notifications);
    } else {
      return res.status(400).json("notification loading failed");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default getAllNotificationsByUserId;
