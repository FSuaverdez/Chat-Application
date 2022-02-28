import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import conversationRoutes from './routes/conversationRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { startSocketServer } from './socket/index.js';
dotenv.config();

const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Chat API');
});

app.use('/user', userRoutes);
app.use('/conversation', conversationRoutes);
app.use('/message', messageRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(conn => {
    console.log(`MongoDB Conencted: ${conn.connection.host}`);
    app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
    startSocketServer();
  })
  .catch(error => {
    console.log(error.message);
  });
