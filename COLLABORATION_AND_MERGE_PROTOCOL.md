# Developer Collaboration & Git Merge Protocol

> **Course:** RUET CSE 3206 (Software Engineering Sessional)  
> **Team:** Group 21 (`Section B, Group#01`)  
> **Process Model:** Waterfall Model  
> **Purpose:** Practical guide for all 3 equal teammates to implement their subsystems on separate branches with **zero merge conflicts** when merging into `main`.

---

## 👥 1. Equal 3-Way Subsystem Distribution

As defined in [`TEAM_WORK_DISTRIBUTION.md`](./TEAM_WORK_DISTRIBUTION.md), **all 3 members have equal academic contribution (~33% full-stack code each)**. No member has a formal title (no "leads" or "specialists")—each member builds both the backend API and frontend views for their assigned domain slice:

| Subsystem Slice | Assigned Branch | Backend Domain (APIs & Controllers) | Frontend Domain (UI Components) |
| :--- | :--- | :--- | :--- |
| **Subsystem 1: Policy & Intake** | `feature/policy-claimant-intake` | Policy catalog, Claim filing intake, Boundary validation | Policy cards, Multi-step filing wizard, My-claims tracking table |
| **Subsystem 2: Adjudication & Loss** | `feature/adjudication-loss-assessment` | Adjuster queue, Adjudication calculation, Deductible logic | Claims inspection queue, Side-by-side studio, Approve/Reject modals |
| **Subsystem 3: Governance & Settlement** | `feature/governance-settlement-analytics` | Immutable audit logger, Treasury payout service, Executive KPIs | Executive analytics dashboard, Settlement queue, Audit trail timeline |

---

## 🛡️ 2. How to Avoid Merge Conflicts (The File Ownership Rule)

Conflicts in Git only happen when two people edit the **same lines in the same file**.  
To guarantee clean merges into `main`, **each member strictly writes inside their own files**:

### 📁 Dedicated Subsystem Files (Safe to edit freely)

```text
src/
├── backend/src/
│   ├── controllers/
│   │   ├── policyController.ts      <-- Member 1 only
│   │   ├── claimController.ts       <-- Member 1 only
│   │   ├── adjusterController.ts    <-- Member 2 only
│   │   ├── settlementController.ts  <-- Member 3 only
│   │   └── analyticsController.ts   <-- Member 3 only
│   └── routes/
│       ├── policyRoutes.ts          <-- Member 1 only
│       ├── claimRoutes.ts           <-- Member 1 only
│       ├── adjusterRoutes.ts        <-- Member 2 only
│       ├── settlementRoutes.ts      <-- Member 3 only
│       └── analyticsRoutes.ts       <-- Member 3 only
│
└── frontend/src/
    └── components/
        ├── claimant/                <-- Member 1 only (Policyholder views & forms)
        ├── adjuster/                <-- Member 2 only (Adjuster workspace & modals)
        └── admin/                   <-- Member 3 only (Executive & treasury views)
```

---

## ⚠️ 3. Shared Foundation Files (Do Not Overwrite)

These shared files tie the 3 subsystems together. **Do not overwrite them with subsystem-only code**:

### 1. `src/frontend/src/App.tsx` (Shared App Shell)
* **Problem:** If Member 1 renders only `<ClaimantPortal />` and Member 2 renders only `<AdjusterQueue />`, merging will fail.
* **Solution:** `App.tsx` contains a simple tab/role switcher so teachers and teammates can view all 3 subsystems in one running app:
  ```tsx
  // App.tsx switches between the 3 equal subsystems
  {activeTab === 'CLAIMANT' && <ClaimantPortal />}
  {activeTab === 'ADJUSTER' && <AdjusterPortal />}
  {activeTab === 'ADMIN'    && <AdminPortal />}
  ```

### 2. `src/backend/src/server.ts` (Shared Route Mounting)
* Each member imports their own router and mounts it to their assigned prefix:
  ```typescript
  app.use('/api/policies', policyRoutes);      // Subsystem 1
  app.use('/api/claims', claimRoutes);          // Subsystem 1
  app.use('/api/adjuster', adjusterRoutes);    // Subsystem 2
  app.use('/api/settlement', settlementRoutes);// Subsystem 3
  app.use('/api/analytics', analyticsRoutes);  // Subsystem 3
  ```

### 3. `src/backend/src/models/types.ts` & `src/frontend/src/types/index.ts` (Data Schema)
* Data contracts are **frozen** upfront as per Waterfall methodology.
* Do not rename or delete existing fields (`id`, `claimNumber`, `status`, `assessedLoss`, etc.).

---

## 💾 4. Database Standard: SQLite

* **Database Engine:** **SQLite** (`insurance.db`).
* **Why SQLite?**
  * **Zero setup:** Teammates and course evaluators do not need to install or run MySQL/PostgreSQL. Running `npm install && npm run dev` works immediately on any machine.
  * **Persistent:** Data survives server restarts (unlike pure in-memory variables).
* **Access Layer:** All database operations are called through `src/backend/src/repository/store.ts`. Controllers only call methods like `store.getClaims()`, `store.updateClaim()`, or `store.addClaim()`.

---

## 🔄 5. Daily Git Workflow for Each Member

### Starting Your Work:
```bash
# 1. Ensure you have the latest main
git checkout main
git pull origin main

# 2. Work on your assigned feature branch
git checkout feature/<your-assigned-subsystem>
```

### Before Submitting a Pull Request (Sync Main First):
```bash
# Fetch and merge latest main into your branch locally
git fetch origin main
git merge origin/main

# Verify both backend and frontend compile with zero errors
npm run --prefix src/backend build
npm run --prefix src/frontend build

# Push your branch
git push origin feature/<your-assigned-subsystem>
```

### Conventional Commit Messages:
* `feat(<subsystem>): <what was added>` (e.g., `feat(intake): add multi-step claim filing wizard`)
* `fix(<subsystem>): <what was fixed>` (e.g., `fix(adjudication): prevent negative payout calculation`)
* `docs: <documentation updates>`

---

## ✅ 6. Pre-Merge Checklist for Peer Reviews

Before approving a teammate's PR into `main`:
- [ ] Code changes stay strictly inside the member's assigned subsystem directory.
- [ ] No hardcoded personal machine paths.
- [ ] Backend compiles without TypeScript errors (`npm run build`).
- [ ] Frontend builds without errors (`npm run build`).
- [ ] Follows the dark theme tokens defined in `ui-designs/design-system/DESIGN_SYSTEM.md`.
