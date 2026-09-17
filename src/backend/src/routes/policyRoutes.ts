import { Router } from 'express';
import { getPolicies, getPolicyById, createPolicy } from '../controllers/policyController.js';

const router = Router();

router.get('/', getPolicies);
router.get('/:id', getPolicyById);
router.post('/', createPolicy);

export default router;
