import express from 'express';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const PORT = process.env.PORT || 3000;
dotenv.config();
import cors from 'cors';
import morgan from 'morgan';
import urlRoutes from './routes/url';
import analyticsRoutes from './routes/analytics';


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));


mongoose.connect(process.env.MONGO_URL as string).then(() => console.log('MongoDB is connected')).catch((err) => console.log(err));


app.use('/url', urlRoutes);
app.use('/analytics', analyticsRoutes);



app.listen(PORT, () => {
    console.log(`Server is listen in port http://localhost:${PORT}`);
});
