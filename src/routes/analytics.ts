import express from 'express';
const router = express.Router();

import { getAnalytics } from '../controllers/analytics';

router.get('/:urlCode', getAnalytics);


export default router;