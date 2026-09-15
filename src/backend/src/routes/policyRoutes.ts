import { Router } from 'express';
import { getPolicies, getPolicyById } from '../controllers/policyController.js';

const router = Router();
router.get('/', getPolicies);
router.get('/:id', getPolicyById);

export default router;
