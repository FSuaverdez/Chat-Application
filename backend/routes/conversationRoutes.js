import express from 'express';
import Conversation from '../models/Conversation.js';
import User from '../models/User.js';

const router = express.Router();

// new conv
router.post('/', async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get conv

router.get('/:userId', async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.userId] },
    });

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get('/user/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
