import 'dotenv/config';
import mongoose from 'mongoose';
import { Category } from './features/categories/categories.model.js';
import { connectDB } from './config/db.js';

const categories = [
  { name: 'Electronics' },
  { name: 'Clothing' },
  { name: 'Books' },
  { name: 'Home & Kitchen' },
  { name: 'Sports' },
  { name: 'Toys' },
];

const seedCategories = async () => {
  try {
    await connectDB();

    await Category.deleteMany({});
    console.log('Cleared existing categories');

    await Category.insertMany(categories);
    console.log('Categories seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
};

seedCategories();
