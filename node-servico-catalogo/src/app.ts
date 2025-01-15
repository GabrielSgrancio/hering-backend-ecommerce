import express from 'express';
import authRoutes from './presentation/routes/auth.routes';
import productRoutes from './presentation/routes/product.routes';
import cartRoutes from './presentation/routes/cart.routes';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

export default app;
