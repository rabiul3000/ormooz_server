import Food from "../../models/Food.js";



const getFoodItem = async (req, res) => {
    const { _id } = req.params;
    const food = await Food.findById(_id)

    return res.status(200).json(food);

}


export default getFoodItem;