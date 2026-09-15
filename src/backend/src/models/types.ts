export type UserRole = 'POLICYHOLDER' | 'ADJUSTER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  policyIds: string[];
  createdAt: string;
}

export type PolicyType = 'HEALTH' | 'AUTO' | 'HOME' | 'LIFE';
export type PolicyStatus = 'ACTIVE' | 'EXPIRED' | 'SUSPENDED';

export interface Policy {
  id: string;
  policyNumber: string;
  type: PolicyType;
  title: string;
  description: string;
  coverageLimit: number;
  deductible: number;
  premiumAmount: number;
  startDate: string;
  endDate: string;
  status: PolicyStatus;
}

export type ClaimStatus =
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'SETTLED'
  | 'WITHDRAWN';

export interface Claim {
  id: string;
  claimNumber: string;
  policyId: string;
  policyholderId: string;
  policyholderName: string;
  policyType: PolicyType;

  incidentDate: string;
  submissionDate: string;
  claimedAmount: number;
  incidentLocation: string;
  description: string;
  evidenceUrls: string[];

  status: ClaimStatus;
  assignedAdjusterId?: string;
  assessedLoss?: number;
  deductibleApplied?: number;
  approvedAmount?: number;
  adjusterNotes?: string;
  rejectionReason?: string;
  rejectionCategory?: 'POLICY_EXCLUSION' | 'INSUFFICIENT_PROOF' | 'FRAUD_SUSPICION' | 'EXPIRED_POLICY';

  settlementDate?: string;
  transactionRef?: string;

  createdAt: string;
  updatedAt: string;
}

export interface AdjudicationPayload {
  decision: 'APPROVE' | 'REJECT';
  assessedLoss?: number;
  approvedAmount?: number;
  deductibleApplied?: number;
  adjusterNotes: string;
  rejectionReason?: string;
  rejectionCategory?: 'POLICY_EXCLUSION' | 'INSUFFICIENT_PROOF' | 'FRAUD_SUSPICION' | 'EXPIRED_POLICY';
}

export interface AuditEntry {
  logId: string;
  claimId: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  previousState: ClaimStatus | 'NONE';
  newState: ClaimStatus;
  remarks: string;
}