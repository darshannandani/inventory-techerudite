import { Product } from "./productes.model.js";

const createProduct = async (productData) => {
    const product = new Product(productData);
    await product.save();
    return await product.populate('categories', 'name');
};

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};


const getProductByName = async (name) => {
    return await Product.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
};

 
const getProducts = async (params) => {

    const { page = 1, limit = 10, serach, categories } = params

    const skip = (page - 1 ) * limit
    const query = {}

    if(serach){
        query.name = {$regex : serach, $option: 'i'}
    }
    
    if(categories){
        const cateforArray = categories.split(",")
        if(cateforArray.length > 0){
            query.categories = {$in : cateforArray}
        }
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
    .populate("categories", "name")
    .sort({createdAt : -1})
    .skip(skip)
    .limit(limit);

    const hasMore = skip + products.length < total

  return {
    data: products,
    page,
    totalPages: Math.ceil(total / limit),
    total,
    hasMore,
  };

}


const updateProduct = async (id, updateData) => {
    return await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).populate('categories', 'name');
};


export {createProduct, deleteProduct, getProductByName, getProducts, updateProduct} 