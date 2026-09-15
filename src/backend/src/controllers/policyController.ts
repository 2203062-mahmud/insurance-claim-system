import { Request, Response } from 'express';
import { store } from '../repository/store.js';

export function getPolicies(req: Request, res: Response) {
  // For demo, return all policies.
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
