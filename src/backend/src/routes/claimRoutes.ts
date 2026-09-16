import { Router } from 'express';
import { submitClaim, getMyClaims, withdrawClaim } from '../controllers/claimController.js';
import { assignClaim, adjudicateClaim } from '../controllers/adjusterController.js';

const router = Router();
router.post('/', submitClaim);
router.get('/my-claims', getMyClaims);
router.patch('/:id/withdraw', withdrawClaim);
router.patch('/:id/assign', assignClaim);
router.post('/:id/adjudicate', adjudicateClaim);

export default router;
