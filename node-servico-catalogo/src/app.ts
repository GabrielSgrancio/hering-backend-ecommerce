import express from 'express';
import authRoutes from './presentation/routes/auth.routes';
import productRoutes from './presentation/routes/product.routes';
import cartRoutes from './presentation/routes/cart.routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());


export default app;
