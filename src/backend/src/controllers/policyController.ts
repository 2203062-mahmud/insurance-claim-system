import { Request, Response } from 'express';
import { store } from '../repository/store.js';
import { Policy } from '../models/types.js';

export function getPolicies(req: Request, res: Response) {
  const policies = store.getPolicies();
  res.json(policies);
}

export function getPolicyById(req: Request, res: Response) {
  const id = req.params.id;
  const policy = store.getPolicyById(id);
  if (!policy) {
    return res.status(404).json({ error: 'Not Found', details: 'Policy not found' });
  }
  res.json(policy);
}

export function createPolicy(req: Request, res: Response) {
  const { type, title, description, coverageLimit, deductible, premiumAmount } = req.body;

  if (!type || !title || !coverageLimit) {
    return res.status(400).json({ error: 'Validation Error', details: 'Missing required fields' });
  }

  const policyCount = store.getPolicies().length;
  const newId = `POL-${type}-${200 + policyCount}`;
  
  const newPolicy: Policy = {
    id: newId,
    policyNumber: `PN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    type,
    title,
    description: description || 'Custom user generated policy',
    coverageLimit: Number(coverageLimit),
    deductible: Number(deductible || 500),
    premiumAmount: Number(premiumAmount || 1000),
    startDate: new Date().toISOString().split('T')[0],
    endDate: '2027-01-01',
    status: 'ACTIVE'
  };

  store.addPolicy(newPolicy);
  
  // Also link it to USR-001 for demo purposes
  const users = store.getUsers();
  const alice = users.find(u => u.id === 'USR-001');
  if (alice) {
    alice.policyIds.push(newPolicy.id);
  }

  res.status(201).json(newPolicy);
}
