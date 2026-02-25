import Notification from "../../models/Notification.js";


const markAsReadByUser = async (req, res) => {

    const userId = req.user.id;
    const notificationId = req.body.notificationId;

    const notification = await Notification.findById(notificationId);

    if (!notification) {
        return res.status(404).json({ message: "Notification not found" });
    }

    if (notification.to.toString() !== userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    notification.isRead = true;
    await notification.save();

    return res.status(200).json(notification);



}

export default markAsReadByUser;