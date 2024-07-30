import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/config/database';
import productRoutes from './src/routes/productRoutes';
import authRoutes from './src/routes/authRoutes';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
