# Insurance Claim System — RUET CSE 3206 (Group 21)

> **Course:** CSE 3206 – Software Engineering Sessional  
> **Lab:** #Lab 2: Software Process Models, Requirement Analysis & MVP Development  
> **Team:** Group 21 (`Group#01 from Section B (1st 30)`)  
> **Process Model:** **Waterfall Model**  
> **Assigned Project:** **Insurance Claim System**  
> **Institution:** Rajshahi University of Engineering & Technology (RUET)

---

## 📚 Essential Project Documentation

To ensure complete clarity and eliminate any ambiguity during development and evaluation, three comprehensive guides are available:

1. 📋 **[PROJECT_SPECIFICATION.md](./PROJECT_SPECIFICATION.md)**  
   *The complete master lab specification: all 12 Functional Requirements, 10 Non-Functional Requirements, 5 User Stories, Waterfall Model justification, comparisons with alternative models, 10-mark evaluation rubric, and the 60-project reference sheet.*
2. 👥 **[TEAM_WORK_DISTRIBUTION.md](./TEAM_WORK_DISTRIBUTION.md)**  
   *Detailed task dossiers for all 3 members: equal fullstack subsystem ownership, Git branches, PR review matrix, commit conventions, owned report sections, and viva defense questions.*
3. 🏛️ **[PROJECT_ARCHITECTURE_AND_WORKFLOW.md](./PROJECT_ARCHITECTURE_AND_WORKFLOW.md)**  
   *Full system architecture, TypeScript data models, frozen REST API contracts, end-to-end claim lifecycle state machine, frontend/backend directory layout, and verification steps.*

---

## 📂 Repository Directory Structure

```text
insurance-claim-system/
├── README.md                            # Project overview & quick start
├── PROJECT_SPECIFICATION.md             # Master requirements & rubric specification
├── TEAM_WORK_DISTRIBUTION.md            # Detailed 3-member task & PR distribution
├── PROJECT_ARCHITECTURE_AND_WORKFLOW.md # System architecture, API contracts & workflow
├── lab_2.pdf                            # Official assignment specification from RUET CSE
│
├── docs/                                # Official deliverables documentation
│   └── Requirement_Report.pdf           # 16-Section formal Project Design Report (Lab deliverable)
│
├── src/                                 # Application source code
│   ├── backend/                         # Express + TypeScript REST API server
│   └── frontend/                        # React 19 + TypeScript + Vite web client
│
├── assets/                              # Architecture diagrams, logos, and UI assets
│
└── screenshots/                         # Working MVP prototype verification screenshots
```

---

## 👥 Equal Subsystem Domain Ownership

| Team Member | Assigned Subsystem Domain | Feature Branch | Core Responsibilities | Report Sections |
| :--- | :--- | :--- | :--- | :--- |
| **Member 1** | **Policy & Claimant Intake Subsystem** | `feature/policy-claimant-intake` | Policy catalog API, multi-step claim filing wizard, intake validation, file attachment simulation | Sections 1–5, 7 |
| **Member 2** | **Claims Adjudication & Loss Subsystem** | `feature/adjudication-loss-assessment` | Adjuster queue, inspection drawer, deductible calculation engine, approve/reject decision modals | Sections 6, 8–12 |
| **Member 3** | **Governance, Settlement & Analytics** | `feature/governance-settlement-analytics` | Immutable audit trail engine, treasury disbursement service, executive KPI metrics, audit timeline | Sections 13–16 |

---

## 🚀 Quick Start & Development

### Backend Setup
```bash
cd src/backend
npm install
npm run dev
# Running on http://localhost:5000
```

### Frontend Setup
```bash
cd src/frontend
npm install
npm run dev
# Running on http://localhost:5173
```

---

## 📋 Evaluation Checklist & Deliverables
- [x] Complete Requirements & Waterfall Specification in `PROJECT_SPECIFICATION.md`
- [x] 3-Member Equal Task Breakdown in `TEAM_WORK_DISTRIBUTION.md`
- [x] Frozen Data Schema & API Contract in `PROJECT_ARCHITECTURE_AND_WORKFLOW.md`
- [ ] 3 Feature Branches created and pushed
- [ ] 3 Pull Requests reviewed and merged into `main`
- [ ] Functional MVP demonstrating Core Workflow (Submit $\rightarrow$ Review $\rightarrow$ Approve/Reject $\rightarrow$ Settle)
- [ ] 16-Section Project Design Report PDF placed in `docs/Requirement_Report.pdf`
- [ ] Working prototype screenshots in `screenshots/`
