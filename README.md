# Insurance Claim System — RUET CSE 3206 (Group 21)

> **Course:** CSE 3206 – Software Engineering Sessional  
> **Lab:** #Lab 2: Software Process Models, Requirement Analysis & MVP Development  
> **Team:** Group 21 (`Group#01 from Section B (1st 30)`)  
> **Process Model:** **Waterfall Model**  
> **Assigned Project:** **Insurance Claim System**  
> **Institution:** Rajshahi University of Engineering & Technology (RUET)

---

## 📌 Master Project Specification
For the exhaustive, complete breakdown of all lab requirements, 12 Functional Requirements, 10 Non-Functional Requirements, 5 User Stories, Waterfall justification, rubric, and expected deliverables, please consult:
👉 **[PROJECT_SPECIFICATION.md](./PROJECT_SPECIFICATION.md)**

---

## 📂 Repository Directory Structure

```text
insurance-claim-system/
├── README.md                  # This file (Project overview & quick start)
├── PROJECT_SPECIFICATION.md   # Master specification document (No need to check PDF again)
├── lab_2.pdf                  # Official assignment specification from RUET CSE
│
├── docs/                      # Official deliverables documentation
│   └── Requirement_Report.pdf # 16-Section formal Project Design Report (Lab deliverable)
│
├── src/                       # Application source code
│   ├── backend/               # Express + TypeScript REST API server
│   └── frontend/              # React 19 + TypeScript + Vite web client
│
├── assets/                    # Architecture diagrams, logos, and UI assets
│
└── screenshots/               # Working MVP prototype verification screenshots
```

---

## 👥 Team Members & Task Distribution

| Team Member | Roll / ID | Assigned Role | Feature Branch | Core Responsibilities |
| :--- | :--- | :--- | :--- | :--- |
| **Teammate 1** | *[Roll / ID]* | Backend & Architecture Lead | `member1-feature` | Express API, Data Models, CRUD endpoints, Report Sec 1–5, 10–12 |
| **Teammate 2** | *[Roll / ID]* | Frontend & Submission Lead | `member2-feature` | React UI, Policyholder Portal, Submission Form, Report Sec 6–9 |
| **Teammate 3** | *[Roll / ID]* | Adjudication & Audit Lead | `member3-feature` | Adjuster Queue, Approval/Rejection Modal, Audit Logs, Report Sec 13–16 |

---

## 🚀 Quick Start & Development

### Backend Setup
```bash
cd src/backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd src/frontend
npm install
npm run dev
```

---

## 📋 Evaluation Checklist & Deliverables
- [x] Master Requirements & Process Model Analysis documented in `PROJECT_SPECIFICATION.md`
- [ ] Minimum 3 Feature Branches created and pushed
- [ ] Minimum 3 Pull Requests reviewed and merged into `main`
- [ ] Functional MVP demonstrating Core Workflow (Submit $\rightarrow$ Review $\rightarrow$ Approve/Reject)
- [ ] 16-Section Project Design Report PDF placed in `docs/Requirement_Report.pdf`
- [ ] Screenshots added to `screenshots/`
