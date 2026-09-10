# Insurance Claim System — UI Design & Prototype Suite

> **Source:** Google Stitch (`stitch.withgoogle.com`)  
> **Aesthetic Theme:** **"Luminous Obsidian & Emerald Treasury"**  
> **Course:** RUET CSE 3206 (Software Engineering Sessional) — Group 21  
> **Methodology:** Waterfall Model (Contract-First Design Verification)

---

## 🎨 Design System & Visual Tokens

The user interface follows an ultra-precise, high-integrity design system built for mission-critical insurance lifecycle management:
* **Substrate & Materials:** Frosted Obsidian (`#070A0F` to `#131B2A`), cold slate layered cards (`backdrop-blur-xl`), 1px micro-borders (`rgba(255, 255, 255, 0.08)`).
* **Color Hierarchy:**
  * **Radiant Emerald (`#10B981`):** Approvals, settled disbursements, high-confidence AI verification.
  * **Electric Cyan (`#38BDF8`):** Telemetry, CAN-bus / GPS tags, active filters, primary navigation.
  * **Amber Gold (`#F59E0B`):** Claims under review, pending queues, SLA countdowns.
  * **Crimson Rose (`#F43F5E`):** Statutory rejections, fraud suspicion flags, role boundary locks.
* **Typography:** `Plus Jakarta Sans` for executive headers, `Inter` for operational UI, and `JetBrains Mono` for claim IDs (`CLM-1001`), transaction codes (`TXN-2026-98124`), and currency amounts (`$2,500.00`).

👉 **Full Token Specifications:** [**`design-system/DESIGN_SYSTEM.md`**](./design-system/DESIGN_SYSTEM.md)

---

## 📂 Structured Screen Catalog & Subsystem Mapping

```text
ui-designs/
├── design-system/
│   └── DESIGN_SYSTEM.md                                 # Complete color tokens, typography & elevation rules
│
├── 00_global_auth/                                      # Shared & Authentication Gateway
│   ├── 01_enterprise_access_login_portal/               # Persona Fast-Track Switcher & Multi-Factor Auth
│   └── 02_viva_demo_seed_controller_dock/              # RUET CSE 3206 Floating Demo Controller & Seed Reset
│
├── 01_policyholder_intake/                              # Member 1 Subsystem: Policy & Intake
│   ├── 01_policy_coverage_protection_hub/               # Active policy portfolio & coverage limit gauges
│   ├── 02_claims_portfolio_management_table/            # All submitted claims list with status filters
│   ├── 03_fnol_claim_intake_wizard_modal/               # 4-step FNOL wizard with GPS geofencing & evidence drop
│   ├── 04_claim_amendment_withdrawal_modals/            # FR-09 claim edit & withdrawal confirmation dialog
│   └── 05_claim_lifecycle_tracker_pipeline/             # 4-node visual status pipeline for CLM-1001
│
├── 02_claims_adjudication/                              # Member 2 Subsystem: Adjudication & Loss Assessment
│   ├── 01_adjuster_triage_queue_matrix/                 # Triage table with AI fraud index & SLA countdowns
│   ├── 02_side_by_side_adjudication_studio/             # 50/50 evidence photo inspector vs. deductible loss engine
│   └── 03_statutory_claim_denial_modal/                 # FR-08 formal legal rejection modal with clause citations
│
└── 03_governance_settlement/                            # Member 3 Subsystem: Governance, Treasury & Audit
    ├── 01_executive_treasury_cryptographic_ledger/      # Operational KPIs, banking queue & Merkle audit ledger
    ├── 02_disbursement_modal_settlement_voucher/        # Payout authorization & official printable voucher
    └── 03_claim_chronological_audit_drawer/             # Dedicated chronological audit trail slide-out drawer
```

---

## 📋 Comprehensive Screen Index & Preview Links

### 00. Shared & Global Gateway
| Screen Name | Subsystem | Interactive Prototype | High-Res Preview | Key Features |
| :--- | :--- | :--- | :--- | :--- |
| **Enterprise Access & Login Portal** | Global / Auth | [HTML](./00_global_auth/01_enterprise_access_login_portal/login_portal.html) | [PNG](./00_global_auth/01_enterprise_access_login_portal/login_portal.png) | 1-click Fast-Track persona switching (Alice, Charlie, Dana), CAC/SSO, SHA-256 TOTP. |
| **Viva Demo & Seed Reset Control Dock** | Viva Sandbox | [HTML](./00_global_auth/02_viva_demo_seed_controller_dock/demo_seed_controller.html) | [PNG](./00_global_auth/02_viva_demo_seed_controller_dock/demo_seed_controller.png) | Floating dock for RUET viva demonstrations, persona jumps, and `POST /api/system/reset-seed`. |

### 01. Policy Management & Claimant Intake (Member 1)
| Screen Name | Subsystem | Interactive Prototype | High-Res Preview | Key Features |
| :--- | :--- | :--- | :--- | :--- |
| **Policy Coverage & Protection Hub** | Intake / Member 1 | [HTML](./01_policyholder_intake/01_policy_coverage_protection_hub/policy_coverage_hub.html) | [PNG](./01_policyholder_intake/01_policy_coverage_protection_hub/policy_coverage_hub.png) | Policy cards (`POL-AUTO-101`, Health, Home), coverage limits, deductible metrics, instant FNOL CTA. |
| **My Claims Portfolio & Management Table** | Intake / Member 1 | [HTML](./01_policyholder_intake/02_claims_portfolio_management_table/claims_portfolio_table.html) | [PNG](./01_policyholder_intake/02_claims_portfolio_management_table/claims_portfolio_table.png) | High-density portfolio table of all claims with status filters (Active, Settled, Withdrawn). |
| **Intelligent FNOL Claim Intake Wizard** | Intake / Member 1 | [HTML](./01_policyholder_intake/03_fnol_claim_intake_wizard_modal/claim_intake_wizard.html) | [PNG](./01_policyholder_intake/03_fnol_claim_intake_wizard_modal/claim_intake_wizard.png) | 4-step stepper, GPS geofencing (Station Road, Rajshahi), drag-and-drop evidence with CV validation. |
| **Claim Amendment & Withdrawal Modals** | Intake / Member 1 | [HTML](./01_policyholder_intake/04_claim_amendment_withdrawal_modals/claim_amendment_withdrawal.html) | [PNG](./01_policyholder_intake/04_claim_amendment_withdrawal_modals/claim_amendment_withdrawal.png) | FR-09 edit modal (for `SUBMITTED` claims) and withdrawal confirmation dialog. |
| **Live Claim Lifecycle Tracker & Pipeline** | Intake / Member 1 | [HTML](./01_policyholder_intake/05_claim_lifecycle_tracker_pipeline/claim_lifecycle_tracker.html) | [PNG](./01_policyholder_intake/05_claim_lifecycle_tracker_pipeline/claim_lifecycle_tracker.png) | 4-node illuminated lifecycle tracker for `CLM-1001`, CAN-bus speed telemetry, live audit feed. |

### 02. Claims Adjudication & Loss Assessment (Member 2)
| Screen Name | Subsystem | Interactive Prototype | High-Res Preview | Key Features |
| :--- | :--- | :--- | :--- | :--- |
| **Adjuster Priority Triage Queue & Matrix** | Adjudication / Member 2 | [HTML](./02_claims_adjudication/01_adjuster_triage_queue_matrix/adjuster_triage_queue.html) | [PNG](./02_claims_adjudication/01_adjuster_triage_queue_matrix/adjuster_triage_queue.png) | Operations queue with SLA timers, AI fraud risk scores (0.03 Index), and claim inspection drawer. |
| **Side-by-Side Adjudication & Loss Studio** | Adjudication / Member 2 | [HTML](./02_claims_adjudication/02_side_by_side_adjudication_studio/adjudication_loss_studio.html) | [PNG](./02_claims_adjudication/02_side_by_side_adjudication_studio/adjudication_loss_studio.png) | 50/50 workspace: photographic evidence inspector vs. interactive deductible deduction calculation. |
| **Formal Statutory Claim Denial Modal** | Adjudication / Member 2 | [HTML](./02_claims_adjudication/03_statutory_claim_denial_modal/claim_denial_modal.html) | [PNG](./02_claims_adjudication/03_statutory_claim_denial_modal/claim_denial_modal.png) | FR-08 legal rejection modal with category dropdown, contractual clause citation, and appeal rights. |

### 03. Governance, Treasury Settlement & Analytics (Member 3)
| Screen Name | Subsystem | Interactive Prototype | High-Res Preview | Key Features |
| :--- | :--- | :--- | :--- | :--- |
| **Executive Treasury & Cryptographic Ledger** | Governance / Member 3 | [HTML](./03_governance_settlement/01_executive_treasury_cryptographic_ledger/treasury_audit_ledger.html) | [PNG](./03_governance_settlement/01_executive_treasury_cryptographic_ledger/treasury_audit_ledger.png) | Executive KPI summary cards, banking disbursement queue, and terminal-style Merkle audit ledger. |
| **Treasury Disbursement & Settlement Voucher** | Governance / Member 3 | [HTML](./03_governance_settlement/02_disbursement_modal_settlement_voucher/disbursement_settlement_voucher.html) | [PNG](./03_governance_settlement/02_disbursement_modal_settlement_voucher/disbursement_settlement_voucher.png) | Multi-sig disbursement modal and official printable settlement receipt voucher (`TXN-2026-98124`). |
| **Dedicated Claim Chronological Audit Drawer** | Governance / Member 3 | [HTML](./03_governance_settlement/03_claim_chronological_audit_drawer/claim_audit_drawer.html) | [PNG](./03_governance_settlement/03_claim_chronological_audit_drawer/claim_audit_drawer.png) | Slide-out drawer showing chronological history of state transitions, actor IDs, and hash stamps. |

---

## 🖥️ How to Preview the HTML Templates in Browser

Each HTML prototype is fully self-contained with embedded Tailwind CSS, modern Google Fonts, and Google Material Symbols:

```bash
# Option A: Open directly in your preferred web browser
google-chrome ui-designs/00_global_auth/01_enterprise_access_login_portal/login_portal.html

# Option B: Use Python's built-in HTTP server to browse the entire gallery
python3 -m http.server 8080 --directory ui-designs
# Navigate to: http://localhost:8080 in your browser
```
