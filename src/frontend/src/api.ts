import type { Claim } from './types';

const BASE_URL = 'http://localhost:5000/api';

export async function getAdjusterQueue(status?: string): Promise<Claim[]> {
  const url = status ? `${BASE_URL}/adjuster/claims?status=${status}` : `${BASE_URL}/adjuster/claims`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch queue');
  return res.json();
}

export async function assignClaim(id: string, adjusterId: string, adjusterName: string): Promise<Claim> {
  const res = await fetch(`${BASE_URL}/claims/${id}/assign`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ adjusterId, adjusterName }),
  });
  if (!res.ok) throw new Error('Failed to assign claim');
  return res.json();
}

export async function adjudicateClaim(id: string, payload: object): Promise<Claim> {
  const res = await fetch(`${BASE_URL}/claims/${id}/adjudicate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to adjudicate claim');
  return res.json();
}