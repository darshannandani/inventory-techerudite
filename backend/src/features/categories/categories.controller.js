import * as categoriesService from './categories.service.js';

export const getCategories = async (req, res, next) => {
  try {
    const categories = await categoriesService.getAllCategories();
    res.success(categories, "Categories fetched successfully");
  } catch (error) {
    next(error);
  }
};
