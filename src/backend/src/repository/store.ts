import { User, Policy, Claim, AuditEntry } from '../models/types.js';
import { seedUsers, seedPolicies, seedClaims } from '../data/seedData.js';

let users: User[] = [...seedUsers];
let policies: Policy[] = [...seedPolicies];
let claims: Claim[] = [...seedClaims];
let auditLog: AuditEntry[] = [];
let logCounter = 1;

export const store = {
  getUsers: () => users,
  getUserById: (id: string) => users.find(u => u.id === id),

  getPolicies: () => policies,
  getPolicyById: (id: string) => policies.find(p => p.id === id),
  addPolicy: (policy: Policy) => {
    policies.push(policy);
    return policy;
  },

  getClaims: () => claims,
  getClaimById: (id: string) => claims.find(c => c.id === id),
  updateClaim: (claim: Claim) => {
    const idx = claims.findIndex(c => c.id === claim.id);
    if (idx !== -1) {
      claims[idx] = claim;
    }
  },
  updateClaimPartial: (id: string, updates: Partial<Claim>) => {
    const claim = claims.find(c => c.id === id);
    if (!claim) return undefined;
    Object.assign(claim, updates, { updatedAt: new Date().toISOString() });
    return claim;
  },
  addClaim: (claim: Claim) => {
    claims.push(claim);
    return claim;
  },

  addAuditEntry: (entry: Omit<AuditEntry, 'logId' | 'timestamp'>) => {
    const full: AuditEntry = {
      ...entry,
      logId: \`LOG-\${5000 + logCounter++}\`,
      timestamp: new Date().toISOString(),
    };
    auditLog.push(full);
    return full;
  },
  getAuditTrail: (claimId: string) => auditLog.filter(a => a.claimId === claimId),

  resetToSeed: () => {
    users = [...seedUsers];
    policies = [...seedPolicies];
    claims = [...seedClaims];
    auditLog = [];
    logCounter = 1;
  },
};
