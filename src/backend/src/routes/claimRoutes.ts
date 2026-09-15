import { Router } from 'express';
import { submitClaim, getMyClaims } from '../controllers/claimController.js';

const router = Router();
router.post('/', submitClaim);
router.get('/my-claims', getMyClaims);

export default router;
