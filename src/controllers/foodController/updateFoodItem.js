import Food from "../../models/Food.js";


const updateFoodItem = async (req, res) => {
    const { _id, name, category, unit_price, total_price, description, image, rating, ingredients, piece } = req.body;

    const food = await Food.findByIdAndUpdate(_id, { name, category, unit_price, total_price, description, image, rating, ingredients, piece }, { new: true });

    if (!food) {
        return res.status(404).json({ message: "Food update failed!" });
    }
    return res.status(200).json(food);

}

export default updateFoodItem;