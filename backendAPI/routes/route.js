// routes/dataRoutes.js
import express from 'express';
import { saveData } from '../controllers/post.js';

const router = express.Router();

// Generic data endpoint
router.post('/data', saveData);

export default router;