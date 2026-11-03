# Vericove

Vericove is a responsive, browser-based prototype for the women's health, research and community ecosystem described in the project notes.

## Run locally

Requirements: Node.js 20.19+ or 22.12+ and npm.

```powershell
npm install
npm run dev
```

Open [http://localhost:4173](http://localhost:4173). Signed-out visitors see the public homepage first. Choose **Log in** or **Get started** to continue; the sign-in screen lets you preview the patient, doctor, researcher or public-explorer workspace. A successful demo sign-in is remembered in this browser, so the next visit opens that workspace. Sign out to return to the public homepage.

## Current product areas

- Public landing, sign-in and password-reset preview screens, plus a five-step account onboarding flow for individuals, doctors and researchers.
- Profile identity setup with the 19 bundled `assets/PFPs/` images, custom avatar and cover previews, editable bios and interests, and profile visibility controls.
- Social profile pages backed by the existing local community posts, with post editing, follow controls, follower counts, and a nonfunctional “Coming soon” messaging action.
- Patient dashboard, symptom journal, timeline, records, treatment notes and consultation-summary preview.
- Provider directory with structured patient-experience context and anonymous review flow.
- Research feed with publication status, source attribution and limitations; researcher matches and consent-aware enquiry drafts.
- Anonymous community feed with communities, posts, helpful reactions, comments, saves, reports and guidelines.
- Doctor/researcher profiles, credential verification draft and administration/moderation previews.
- Responsive floating desktop navigation and mobile bottom navigation.
- Role selection during sign-in and browser-local remembered demo sessions.

## Prototype boundary

This is a front-end prototype. Sign-in does not validate credentials with a server; session choice, profiles, follows, posts and image previews are stored in browser local storage and are not securely authenticated. There is no backend, encrypted health-record storage, email verification or password reset service, official registry integration, secure credential-document upload, external literature API, real AI inference, or server-side moderation yet. Verification controls are interface previews only; submitting a form does not verify a professional. Do not enter real credentials or health information. No posts, reviews, enquiries or files are sent to other people or services.

The project documents specify production requirements for separate identity and health data, explicit/revocable sharing, verified professional claims, audit logs, encrypted records and qualified human review. Those require a backend and operational controls before this prototype can handle real users or health data.

## Project structure

- index.html and styles.css provide the responsive app shell and design system.
- src/core.js holds local demo state and shared helpers.
- src/views.js renders public, patient, professional, research, community and admin views.
- src/interactions.js handles navigation, forms and local demo actions.
- server.mjs runs the Vite development server; `npm run build` creates the production bundle.

