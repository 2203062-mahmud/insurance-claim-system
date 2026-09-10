import { Router } from 'express';
import { assignClaim, adjudicateClaim } from '../controllers/adjusterController.js';

const router = Router();
router.patch('/:id/assign', assignClaim);
router.post('/:id/adjudicate', adjudicateClaim);

export default router;