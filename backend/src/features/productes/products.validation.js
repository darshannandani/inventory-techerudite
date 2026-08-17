import Joi from "joi";

const productSchema = Joi.object({
    name: Joi.string().required().trim(),
    description: Joi.string().required(),
    quantity: Joi.number().min(0).required(),
    categories: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).min(1).required()
});

const updateProductSchema = Joi.object({
    name: Joi.string().trim(),
    description: Joi.string(),
    quantity: Joi.number().min(0),
    categories: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).min(1)
});

export { productSchema, updateProductSchema }
