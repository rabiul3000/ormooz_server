import Notification from "../../models/Notification.js";



const deleteNotificationById = async (req, res) => {
    const notificationId = req.params.id;
    console.log(notificationId);

    const notification = await Notification.findByIdAndDelete(notificationId);
    return res.status(200).json(notification);

}

export default deleteNotificationById;