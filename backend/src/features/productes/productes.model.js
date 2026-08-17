import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    quantity:{
        type : Number,
        required: true,
        default: 0,
        min: 0
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }]
}
,{
    timestamps: true
})

productSchema.index({ name: 'text' });

export const Product = mongoose.model("Product", productSchema)