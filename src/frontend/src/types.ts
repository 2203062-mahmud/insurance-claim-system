export type ClaimStatus =
  | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'SETTLED' | 'WITHDRAWN';

export interface Claim {
  id: string;
  claimNumber: string;
  policyId: string;
  policyholderName: string;
  policyType: string;
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
}