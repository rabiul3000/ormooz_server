import axios from "axios";



const sendPushNotification = async ({ externalUserId, title, message, url }) => {

    try {
        const res = await axios.post(`https://api.onesignal.com/notifications`, {
            app_id: process.env.ONESIGNAL_APP_ID,
            include_external_user_ids: [externalUserId],
            target_channel: "push",
            headings: { en: title },
            contents: { en: message },
            url,
        },
            {
                headers: {
                    Authorization: `Key ${process.env.ONESIGNAL_REST_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.error(
            "Push Error:",
            error.response?.data || error.message
        );
    }
};

export default sendPushNotification;