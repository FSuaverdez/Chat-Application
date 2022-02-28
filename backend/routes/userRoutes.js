import express from 'express';
import { userAuth } from '../controllers/authController.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/auth', userAuth);
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
