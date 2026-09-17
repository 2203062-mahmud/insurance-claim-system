import { Router } from 'express';
import { getAnalytics, getAuditTrail, disburseClaim, resetSeed, getAllClaims, getAllAuditLogs } from '../controllers/governanceController.js';

const router = Router();

// We will mount this on /api
router.get('/analytics/overview', getAnalytics);
router.get('/claims/:id/audit-trail', getAuditTrail);
router.post('/claims/:id/disburse', disburseClaim);
router.get('/claims', getAllClaims, getAllAuditLogs);
router.post('/system/reset-seed', resetSeed, getAllClaims, getAllAuditLogs);

export default router;
