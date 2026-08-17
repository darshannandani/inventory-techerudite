import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';

import { categoryRoutes } from './features/categories/categories.routes.js';
import { productRoutes } from './features/productes/productes.routes.js';
import { responseHandler } from './middlewares/responseHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express()
const PORT = process.env.PORT || 5000

connectDB();

app.use(cors())
app.use(express.json())

app.use(responseHandler);

app.get("/health", (req, res) => {
    res.success(null, "Server working FINE");
})

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});