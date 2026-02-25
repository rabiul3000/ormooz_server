import axios from "axios";

const geocodeConvert = async (req, res, next) => {
    try {
        if (!req.body?.order?.deliveryAddress) {
            return res.status(400).json({ message: "Delivery address missing" });
        }

        const location = req.body.order.deliveryAddress;
        const { district, thana, street } = location;

        const fullAddress = `${street}, ${thana}, ${district}, Bangladesh`;

        const response = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
                params: {
                    street: street,
                    county: thana,     
                    state: district,
                    country: "Bangladesh",
                    format: "json",
                    limit: 1,
                },
                headers: {
                    "User-Agent": "ormooz-map",
                },
            }
        );

        console.log(fullAddress)
        console.log(response.data);

        if (!response.data || response.data.length === 0) {
            return res.status(404).json({ message: "Location not found" });
        }

        const { lat, lon } = response.data[0];

        const order = {
            ...req.body.order,
            deliveryAddress: {
                ...location,
                lat: Number(lat),
                lon: Number(lon),
            },
        };

        req.body.order = order;

        next();
    } catch (error) {
        console.error("Geocoding error:", error.message);
        res.status(500).json({ message: "Geocoding failed" });
    }
};

export default geocodeConvert;
