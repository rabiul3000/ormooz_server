import Food from "../../models/Food.js";



const getFoodItem = async (req, res) => {
    const { id } = req.params;
    const food = await Food.findById(id);

    return res.status(200).json(food);

}


export default getFoodItem;