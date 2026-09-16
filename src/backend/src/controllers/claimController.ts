import { Request, Response } from 'express';
import { store } from '../repository/store.js';
import { Claim } from '../models/types.js';

export function submitClaim(req: Request, res: Response) {
  const { policyId, incidentDate, incidentDescription, claimedAmount, evidenceUrls } = req.body;

  const policy = store.getPolicyById(policyId);
  if (!policy) {
    return res.status(404).json({ error: 'Validation Error', details: 'Policy not found' });
  }

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
    claimNumber: `CLAIM-2026-${(claimCount + 1).toString().padStart(3, '0')}`,
    policyId: policy.id,
    policyholderId: 'USR-001',
    policyholderName: 'Alice Johnson',
    policyType: policy.type,
    incidentDate,
    submissionDate: new Date().toISOString(),
    claimedAmount,
    incidentLocation: 'Unknown',
    description: incidentDescription,
    evidenceUrls: evidenceUrls || [],
    status: 'SUBMITTED',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  store.addClaim(claim);

  store.addAuditEntry({
    claimId: claim.id,
    actorId: claim.policyholderId,
    actorName: 'Policyholder',
    actorRole: 'POLICYHOLDER',
    action: 'CLAIM_SUBMITTED',
    previousState: 'NONE',
    newState: 'SUBMITTED',
    remarks: 'Claim submitted by policyholder'
  });

  return res.status(201).json(claim);
}

export function getMyClaims(req: Request, res: Response) {
  const claimantId = req.query.claimantId as string || 'USR-001';
  const claims = store.getClaims().filter(c => c.policyholderId === claimantId);
  res.json(claims);
}

export function withdrawClaim(req: Request, res: Response) {
  const { id } = req.params;
  const claim = store.getClaimById(id);
  if (!claim) return res.status(404).json({ error: 'Not Found' });

  if (claim.status !== 'SUBMITTED') {
    return res.status(422).json({ error: 'Validation Error', details: 'Can only withdraw claims in SUBMITTED state' });
  }

  claim.status = 'WITHDRAWN';
  claim.updatedAt = new Date().toISOString();
  store.updateClaim(claim);

  store.addAuditEntry({
    claimId: claim.id,
    actorId: claim.policyholderId,
    actorName: 'Policyholder',
    actorRole: 'POLICYHOLDER',
    action: 'CLAIM_WITHDRAWN',
    previousState: 'SUBMITTED',
    newState: 'WITHDRAWN',
    remarks: 'Claim withdrawn by policyholder'
  });

  res.json(claim);
}
