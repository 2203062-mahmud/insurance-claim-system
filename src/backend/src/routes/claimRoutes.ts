import { Router } from 'express';
import { submitClaim, getMyClaims, withdrawClaim } from '../controllers/claimController.js';

const router = Router();
router.post('/', submitClaim);
router.get('/my-claims', getMyClaims);
router.patch('/:id/withdraw', withdrawClaim);

export default router;
