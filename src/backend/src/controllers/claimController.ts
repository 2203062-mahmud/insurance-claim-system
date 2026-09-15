import { Request, Response } from 'express';
import { store } from '../repository/store.js';
import { Claim } from '../models/types.js';

export function submitClaim(req: Request, res: Response) {
  const { policyId, incidentDate, incidentDescription, claimedAmount, evidenceUrls } = req.body;

  const policy = store.getPolicyById(policyId);
  if (!policy) {
    return res.status(404).json({ error: 'Validation Error', details: 'Policy not found' });
  }

  // Assuming claimant ID is passed or mocked. For MVP we can just check policy exists and is active.
  if (policy.status !== 'ACTIVE') {
    return res.status(422).json({ error: 'Validation Error', details: 'Policy is not active' });
  }

  const iDate = new Date(incidentDate);
  if (iDate > new Date()) {
    return res.status(422).json({ error: 'Validation Error', details: 'Incident date cannot be in the future' });
  }

  if (claimedAmount <= 0) {
    return res.status(422).json({ error: 'Validation Error', details: 'Claimed amount must be greater than 0' });
  }

  if (claimedAmount > policy.coverageLimit) {
    return res.status(422).json({ error: 'Validation Error', details: 'Claimed amount exceeds policy coverage limit' });
  }

  const claimCount = store.getClaims().length;
  const newClaimId = `CLM-2026-${(claimCount + 1).toString().padStart(3, '0')}`;

  const claim: Claim = {
    id: newClaimId,
    policyId: policy.id,
    policyType: policy.type,
    claimantId: policy.policyholderId,
    incidentDate,
    incidentDescription,
    claimedAmount,
    status: 'SUBMITTED',
    submissionDate: new Date().toISOString(),
    evidenceUrls: evidenceUrls || []
  };

  store.addClaim(claim);

  store.addAuditEntry({
    claimId: claim.id,
    actorId: claim.claimantId,
    actorName: 'Policyholder',
    actorRole: 'CLAIMANT',
    action: 'CLAIM_SUBMITTED',
    previousState: 'NONE',
    newState: 'SUBMITTED',
    remarks: 'Claim submitted by policyholder'
  });

  return res.status(201).json(claim);
}

export function getMyClaims(req: Request, res: Response) {
  // For demo, return all claims for a hardcoded user or all claims if not specified.
  // In a real app, this would use req.user.id
  const claimantId = req.query.claimantId as string || 'USR-001';
  const claims = store.getClaims().filter(c => c.claimantId === claimantId);
  res.json(claims);
}
