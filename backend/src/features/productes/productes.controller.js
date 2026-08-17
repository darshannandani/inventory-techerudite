import mongoose from 'mongoose';
import { createProduct, deleteProduct, getProductByName, getProducts, updateProduct } from './productes.services.js';
import { productSchema, updateProductSchema } from './products.validation.js';



const getAllProductsController = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { search, categories } = req.query;

        const result = await getProducts({ page, limit, search, categories });
        res.success(result, "Products fetched successfully");
    }
    catch (error) {
        next(error);
    }
};

const createProductController = async (req, res, next) => {
    try {
        const { error, value } = productSchema.validate(req.body);
        if (error) {
            error.isJoi = true;
            throw error;
        }

        const existingProduc = await getProductByName(value.name);

        if (existingProduc) {
            return res.error("Product already exists", 400);
        }

        const product = await createProduct(value);

        res.success(product, "Product created successfully", 201);

    }
    catch (error) {
        next(error)
    }
}

const deleteProductController = async (req, res, next) => {
    try {

        if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.error("Invalid product ID", 400);
        }

        const product = await deleteProduct(req.params.id)

        if (!product) {
            return res.error("Product not found", 400);
        }

        return res.success(null, "Product deleted successfully");
    }
    catch (error) {
        next(error)
    }
}

const updateProductController = async (req, res, next) => {
    try {
        if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.error("Invalid product ID", 400);
        }

        const { error, value } = updateProductSchema.validate(req.body);
        if (error) {
            error.isJoi = true;
            throw error;
        }

        if (value.name) {
            const existingProduc = await getProductByName(value.name);
            if (existingProduc && existingProduc._id.toString() !== req.params.id) {
                return res.error("Product with this name already exists", 400);
            }
        }

        const updatedProduct = await updateProduct(req.params.id, value);

        if (!updatedProduct) {
            return res.error("Product not found", 404);
        }

        return res.success(updatedProduct, "Product updated successfully");
    }
    catch (error) {
        next(error)
    }
}

export { getAllProductsController, createProductController, deleteProductController, updateProductController }