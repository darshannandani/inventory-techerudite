import { Category } from "./categories.model.js";

const getAllCategories = async () => {
    return await Category.find().sort({name : 1});
}

export {getAllCategories }