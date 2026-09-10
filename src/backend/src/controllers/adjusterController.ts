import { Request, Response } from 'express';
import { store } from '../repository/store.js';
import { AdjudicationPayload } from '../models/types.js';

// GET /api/adjuster/claims?status=SUBMITTED&category=AUTO
export function getAdjusterQueue(req: Request, res: Response) {
  const { status, category } = req.query;
  let result = store.getClaims();

  if (status) result = result.filter(c => c.status === status);
  if (category) result = result.filter(c => c.policyType === category);

  res.json(result);
}

// PATCH /api/claims/:id/assign
export function assignClaim(req: Request, res: Response) {
  const id = req.params.id as string;
  const { adjusterId, adjusterName } = req.body;

  const claim = store.getClaimById(id);
  if (!claim) return res.status(404).json({ error: 'Not Found', details: 'Claim does not exist' });

  if (claim.status !== 'SUBMITTED') {
    return res.status(422).json({ error: 'Validation Error', details: 'Claim is not in SUBMITTED state' });
  }

  const updated = store.updateClaim(id, {
    status: 'UNDER_REVIEW',
    assignedAdjusterId: adjusterId,
  });

  store.addAuditEntry({
    claimId: id,
    actorId: adjusterId,
    actorName: adjusterName,
    actorRole: 'ADJUSTER',
    action: 'STATUS_CHANGE',
    previousState: 'SUBMITTED',
    newState: 'UNDER_REVIEW',
    remarks: `Claim assigned to ${adjusterName} for review.`,
  });

  res.json(updated);
}

// POST /api/claims/:id/adjudicate
export function adjudicateClaim(req: Request, res: Response) {
  const id = req.params.id as string;
  const payload: AdjudicationPayload = req.body;

  const claim = store.getClaimById(id);
  if (!claim) return res.status(404).json({ error: 'Not Found', details: 'Claim does not exist' });

  if (claim.status !== 'UNDER_REVIEW' && claim.status !== 'SUBMITTED') {
    return res.status(422).json({ error: 'Validation Error', details: 'Claim cannot be adjudicated in its current state' });
  }

  const policy = store.getPolicyById(claim.policyId);
  if (!policy) return res.status(404).json({ error: 'Not Found', details: 'Associated policy missing' });

  if (payload.decision === 'APPROVE') {
    const { assessedLoss, approvedAmount, deductibleApplied, adjusterNotes } = payload;

    if (approvedAmount === undefined || assessedLoss === undefined) {
      return res.status(422).json({ error: 'Validation Error', details: 'assessedLoss and approvedAmount are required' });
    }
    if (approvedAmount > policy.coverageLimit) {
      return res.status(422).json({ error: 'Validation Error', details: 'approvedAmount exceeds policy coverage limit' });
    }
    if (approvedAmount > assessedLoss) {
      return res.status(422).json({ error: 'Validation Error', details: 'approvedAmount cannot exceed assessedLoss' });
    }

    const updated = store.updateClaim(id, {
      status: 'APPROVED',
      assessedLoss,
      approvedAmount,
      deductibleApplied: deductibleApplied ?? policy.deductible,
      adjusterNotes,
    });

    store.addAuditEntry({
      claimId: id,
      actorId: claim.assignedAdjusterId || 'USR-003',
      actorName: 'Adjuster',
      actorRole: 'ADJUSTER',
      action: 'CLAIM_APPROVED',
      previousState: claim.status,
      newState: 'APPROVED',
      remarks: `Approved for $${approvedAmount}. ${adjusterNotes}`,
    });

    return res.json(updated);
  }

  if (payload.decision === 'REJECT') {
    const { rejectionReason, rejectionCategory, adjusterNotes } = payload;
    if (!rejectionReason) {
      return res.status(422).json({ error: 'Validation Error', details: 'rejectionReason is required' });
    }

    const updated = store.updateClaim(id, {
      status: 'REJECTED',
      rejectionReason,
      rejectionCategory,
      adjusterNotes,
    });

    store.addAuditEntry({
      claimId: id,
      actorId: claim.assignedAdjusterId || 'USR-003',
      actorName: 'Adjuster',
      actorRole: 'ADJUSTER',
      action: 'CLAIM_REJECTED',
      previousState: claim.status,
      newState: 'REJECTED',
      remarks: `Rejected: ${rejectionReason}`,
    });

    return res.json(updated);
  }

  res.status(422).json({ error: 'Validation Error', details: 'decision must be APPROVE or REJECT' });
}