import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        unit_price: {
            type: Number,
            required: true,
            min: 0
        },

        total_price: {
            type: Number,
            required: true,
            min: 0
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        image: {
            type: String,
            required: true
        },

        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },

        ingredients: {
            type: [String],
            required: true
        },

        piece: {
            type: Number,
            default: 1,
            min: 1
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Food", foodSchema);

