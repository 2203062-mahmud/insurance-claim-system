import { Router } from 'express';
import { getAdjusterQueue } from '../controllers/adjusterController.js';

const router = Router();
router.get('/claims', getAdjusterQueue); // mounted at /api/adjuster
export default router;