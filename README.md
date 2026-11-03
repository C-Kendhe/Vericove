# Vericove

Vericove is a responsive, browser-based prototype for the women's health, research and community ecosystem described in the project notes.

## Run locally

Requirements: Node.js 18 or newer.

```powershell
npm run dev
```

Open [http://localhost:4173](http://localhost:4173). The first visit opens the sample patient workspace. Use the account menu to preview patient, doctor, researcher and public-explorer roles; sign out to see the public landing and authentication flow.

## Current product areas

- Public landing, sign-in, sign-up, password-reset and role-selection screens.
- Patient dashboard, symptom journal, timeline, records, treatment notes and consultation-summary preview.
- Provider directory with structured patient-experience context and anonymous review flow.
- Research feed with publication status, source attribution and limitations; researcher matches and consent-aware enquiry drafts.
- Anonymous community feed with communities, posts, helpful reactions, comments, saves, reports and guidelines.
- Doctor/researcher profiles, credential verification draft and administration/moderation previews.
- Responsive desktop sidebar and mobile bottom navigation.

## Prototype boundary

This is a front-end prototype. Accounts, role changes and sample records are browser-local and are not securely authenticated. There is no backend, encrypted health-record storage, email verification, official registry integration, external literature API, real AI inference, or server-side moderation yet. Do not enter real credentials or health information. No posts, reviews, enquiries or files are sent to other people or services.

The project documents specify production requirements for separate identity and health data, explicit/revocable sharing, verified professional claims, audit logs, encrypted records and qualified human review. Those require a backend and operational controls before this prototype can handle real users or health data.

## Project structure

- index.html and styles.css provide the responsive app shell and design system.
- src/core.js holds local demo state and shared helpers.
- src/views.js renders public, patient, professional, research, community and admin views.
- src/interactions.js handles navigation, forms and local demo actions.
- server.mjs serves the static app locally without a build step.

