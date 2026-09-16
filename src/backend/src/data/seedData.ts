import { User, Policy, Claim } from '../models/types.js';

export const seedUsers: User[] = [
  {
    id: 'USR-001', name: 'Alice Johnson', email: 'alice@ruet.ac.bd',
    role: 'POLICYHOLDER', phone: '01700000001',
    policyIds: ['POL-AUTO-101', 'POL-HLTH-202', 'POL-HOME-303'], 
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'USR-003', name: 'Charlie Miller', email: 'charlie@ruet.ac.bd',
    role: 'ADJUSTER', phone: '01700000003',
    policyIds: [], createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'USR-004', name: 'Dana White', email: 'dana@ruet.ac.bd',
    role: 'ADMIN', phone: '01700000004',
    policyIds: [], createdAt: '2026-01-01T00:00:00Z',
  },
];

export const seedPolicies: Policy[] = [
  {
    id: 'POL-AUTO-101', policyNumber: 'PN-2026-9812', type: 'AUTO',
    title: 'Comprehensive Vehicle Protection',
    description: 'Covers collision, theft, and third-party damage.',
    coverageLimit: 25000, deductible: 500, premiumAmount: 1200,
    startDate: '2026-01-01', endDate: '2027-01-01', status: 'ACTIVE',
  },
  {
    id: 'POL-HLTH-202', policyNumber: 'PN-2026-5544', type: 'HEALTH',
    title: 'Family Health Protection Tier 1',
    description: 'Covers emergency medical, hospitalization, and surgical costs.',
    coverageLimit: 150000, deductible: 1000, premiumAmount: 4500,
    startDate: '2026-01-01', endDate: '2027-01-01', status: 'ACTIVE',
  },
  {
    id: 'POL-HOME-303', policyNumber: 'PN-2026-1122', type: 'HOME',
    title: 'Homeowners Shield (All-Risk)',
    description: 'Covers fire, theft, and natural disaster structural damage.',
    coverageLimit: 350000, deductible: 2500, premiumAmount: 1800,
    startDate: '2026-01-01', endDate: '2027-01-01', status: 'ACTIVE',
  },
];

export const seedClaims: Claim[] = [
  {
    id: 'CLM-1001', claimNumber: 'CLAIM-2026-001',
    policyId: 'POL-AUTO-101', policyholderId: 'USR-001',
    policyholderName: 'Alice Johnson', policyType: 'AUTO',
    incidentDate: '2026-09-01', submissionDate: '2026-09-02T10:00:00Z',
    claimedAmount: 2500, incidentLocation: 'Station Road, Rajshahi',
    description: 'Rear bumper damaged in minor parking collision.',
    evidenceUrls: ['https://example.com/receipt.jpg'],
    status: 'SUBMITTED',
    createdAt: '2026-09-02T10:00:00Z', updatedAt: '2026-09-02T10:00:00Z',
  },
];
