import { Request, Response } from 'express';
import { store } from '../repository/store.js';

export const getAnalytics = (req: Request, res: Response) => {
  const claims = store.getClaims();

  const analytics = {
    totalClaims: claims.length,
    pendingReviewCount: claims.filter(c => c.status === 'SUBMITTED' || c.status === 'UNDER_REVIEW').length,
    approvedCount: claims.filter(c => c.status === 'APPROVED').length,
    rejectedCount: claims.filter(c => c.status === 'REJECTED').length,
    settledCount: claims.filter(c => c.status === 'SETTLED').length,
    totalClaimedValue: claims.reduce((sum, c) => sum + (c.claimedAmount || 0), 0),
    totalDisbursedValue: claims.filter(c => c.status === 'SETTLED').reduce((sum, c) => sum + (c.claimedAmount || 0), 0),
    averageTurnaroundHours: 24, // Mocked for now

    claimsByCategory: {
      AUTO: claims.filter(c => c.policyType === 'AUTO').length,
      HEALTH: claims.filter(c => c.policyType === 'HEALTH').length,
      HOME: claims.filter(c => c.policyType === 'HOME').length,
      LIFE: claims.filter(c => c.policyType === 'LIFE').length,
    }
  };

  res.json(analytics);
};

export const getAuditTrail = (req: Request, res: Response) => {
  const { id } = req.params;
  const trail = store.getAuditTrail(id);
  res.json(trail);
};

export const disburseClaim = (req: Request, res: Response) => {
  const { id } = req.params;
  const { paymentMethod } = req.body;
  
  const claim = store.getClaimById(id);
  if (!claim) {
    return res.status(404).json({ error: 'Claim not found' });
  }

  if (claim.status !== 'APPROVED') {
    return res.status(400).json({ error: 'Only approved claims can be disbursed' });
  }

  const updatedClaim = store.updateClaimPartial(id, {
    status: 'SETTLED',
  });

  store.addAuditEntry({
    claimId: id,
    action: 'DISBURSED',
    actorId: 'USR-004',
    actorRole: 'ADMIN',
    actorName: 'Dana White',
    details: `Funds disbursed via ${paymentMethod || 'Wire Transfer'}`,
    previousState: 'APPROVED',
    newState: 'SETTLED',
  });

  res.json(updatedClaim);
};

export const resetSeed = (req: Request, res: Response) => {
  store.resetToSeed();
  res.json({ message: 'Seed data reset successfully' });
};

export const getAllClaims = (req: Request, res: Response) => {
  const claims = store.getClaims();
  res.json(claims);
};

export const getAllAuditLogs = (req: Request, res: Response) => {
  // @ts-ignore
  const logs = store.getAllAuditTrails();
  res.json(logs);
};
