import express from 'express';
const router = express.Router();

import { createShortUrl, redirectLink } from '../controllers/url';

router.post('/create-url', createShortUrl);
router.get('/:urlCode', redirectLink);



export default router;