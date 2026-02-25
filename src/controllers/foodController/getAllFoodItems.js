import Food from "../../models/Food.js";



const getAllFoodItems = async (req, res) => {
    const foods = await Food.find();

    return res.status(200).json(foods);



}


export default getAllFoodItems;