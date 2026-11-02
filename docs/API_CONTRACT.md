# Vericove – Proposed Backend API Contract & Specification
**Status:** PROPOSED (Ready for Backend Developer Review)  
**Version:** 1.0.0-draft  
**Target Backend:** FastAPI / Python + PostgreSQL  
**Base URL:** `http://localhost:8000/api` (Configurable via `VITE_API_BASE_URL`)

---

## 1. Overview & Architectural Principles

This document specifies the REST API contract between the **Vericove Patient-Facing Frontend** and the central **Vericove Backend & Database**.

### Key Rules:
1. **Dynamic Backend-Driven Content:** Records such as Research Papers, Verified Doctors, Symptoms, Community Discussions, and Appointments are dynamically queried from the database. No static entities should be assumed or permanently hardcoded.
2. **Permission Boundary:** Patient users can query research articles, search doctors, manage their own symptoms, submit community posts, and book appointments. Patients *cannot* publish or modify verified doctor credentials or official scientific research papers.
3. **Evidence Transparency:** All research resources include fields for DOI, PMID, original URL, journal, review status, evidence tier, and optional PDF access.
4. **Medical Disclaimer:** AI endpoints (/api/ai/symptom-analysis, /api/ai/assistant) return non-diagnostic informational summaries and questions to discuss with healthcare professionals, not definitive diagnoses or prescriptions.

---

## 2. Standard Request & Response Structure

### Success Envelope
```json
{
  "success": true,
  "data": { ... } | [ ... ],
  "meta": {
    "page": 1,
    "pageSize": 10,
    "total": 42
  },
  "message": "Operation successful"
}
```

### Error Envelope
```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested item was not found.",
    "details": []
  }
}
```

---

## 3. Endpoints Specification

### 3.1 Authentication & User Profile (`/api/auth`, `/api/users`)

#### `POST /api/auth/register`
Creates a new patient account.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "StrongPassword123!",
    "displayName": "Maya K.",
    "communityPseudonym": "SunflowerGlow22",
    "dataSharingConsent": true,
    "termsAccepted": true
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "token": "jwt_access_token_here",
    "refreshToken": "jwt_refresh_token_here",
    "user": {
      "id": "usr_101",
      "email": "user@example.com",
      "displayName": "Maya K.",
      "communityPseudonym": "SunflowerGlow22",
      "dataSharingConsent": true,
      "preferredLanguage": "en",
      "createdAt": "2026-11-02T10:00:00Z"
    }
  }
  ```

#### `POST /api/auth/login`
- **Request Body:** `{ "email": "...", "password": "..." }`
- **Response (200 OK):** `{ "token": "...", "user": { ... } }`

#### `GET /api/users/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):** User profile object.

#### `PUT /api/users/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "displayName": "Maya Sharma",
    "communityPseudonym": "AuroraSky88",
    "notificationPreferences": { "email": true, "push": false, "communityAlerts": true },
    "privacySettings": { "shareSymptomsWithDoctor": true, "showInCommunity": true }
  }
  ```

---

### 3.2 Symptom Records (`/api/symptoms`)

#### `GET /api/symptoms`
Retrieves patient's logged symptoms.
- **Query Parameters:**
  - `startDate` (ISO 8601, optional)
  - `endDate` (ISO 8601, optional)
  - `bodyArea` (optional filter: "Pelvic", "Head", "Abdomen", "Joints", "Whole Body", etc.)
  - `sortBy` ("date", "severity")
- **Response (200 OK):**
  ```json
  [
    {
      "id": "sym_001",
      "userId": "usr_101",
      "name": "Pelvic Pain",
      "bodyArea": "Pelvic",
      "severity": 7,
      "date": "2026-11-01",
      "duration": "4 hours",
      "frequency": "Intermittent (Cycle Day 14)",
      "triggers": ["Physical exertion", "Ovulation window"],
      "notes": "Sharp aching pain on right lower quadrant radiating to back.",
      "createdAt": "2026-11-01T14:30:00Z"
    }
  ]
  ```

#### `POST /api/symptoms`
- **Request Body:**
  ```json
  {
    "name": "Fatigue & Brain Fog",
    "bodyArea": "Whole Body",
    "severity": 6,
    "date": "2026-11-02",
    "duration": "All day",
    "frequency": "Daily for 3 weeks",
    "triggers": ["Poor sleep", "Luteal phase"],
    "notes": "Difficulty concentrating during afternoon."
  }
  ```
- **Response (201 Created):** Symptom record object.

#### `PUT /api/symptoms/{id}`
Updates an existing symptom log.

#### `DELETE /api/symptoms/{id}`
Deletes an existing symptom log.

---

### 3.3 AI Symptom Intelligence & Assistant (`/api/ai`)

#### `POST /api/ai/extract-symptoms`
Analyzes free-form natural language text to parse discrete symptom parameters without diagnostic labels.
- **Request Body:**
  ```json
  {
    "text": "I have been experiencing terrible fatigue, irregular periods and pelvic pain for the last three months, worse around my period."
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "extractedSymptoms": [
      { "name": "Pelvic Pain", "bodyArea": "Pelvic", "frequency": "Cyclic", "suspectedDuration": "3 months" },
      { "name": "Fatigue", "bodyArea": "Whole Body", "frequency": "Persistent", "suspectedDuration": "3 months" },
      { "name": "Irregular Menstrual Cycles", "bodyArea": "Reproductive", "frequency": "Chronic" }
    ],
    "timelineMonths": 3,
    "structuredSummary": "Patient reports a 3-month triad of persistent fatigue, irregular cycles, and perimenstrual pelvic discomfort.",
    "suggestedQuestionsForDoctor": [
      "Could my pelvic pain be related to endometriosis or adenomyosis?",
      "Would a transvaginal ultrasound or hormone panel (FSH/LH, estradiol, progesterone) be informative?",
      "How can we track symptom variation relative to my menstrual calendar?"
    ],
    "disclaimer": "This analysis is for informational organization only and does not formulate a medical diagnosis."
  }
  ```

#### `POST /api/ai/research-chat`
Research-backed AI assistant grounded strictly in approved medical papers and clinical resources.
- **Request Body:**
  ```json
  {
    "query": "What are current non-hormonal management strategies for endometriosis-associated pain?",
    "includeCitations": true
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "answer": "Current clinical consensus indicates that multidisciplinary approaches including pelvic floor physical therapy, anti-inflammatory dietary interventions, and neuropathic neuromodulation have demonstrated clinical benefit alongside medical therapy...",
    "sources": [
      {
        "id": "res_002",
        "title": "Multidisciplinary Care in Endometriosis: ESHRE Guideline Review",
        "authors": "Becker CM, Bokor A, Heikinheimo O, et al.",
        "journal": "Human Reproduction Open",
        "year": 2022,
        "doi": "10.1093/hropen/hoac009",
        "url": "https://doi.org/10.1093/hropen/hoac009",
        "evidenceClassification": "Clinical Guideline",
        "relevantPassage": "Non-pharmacological and allied healthcare therapies show favorable safety and efficacy in multimodal pain management."
      }
    ],
    "confidenceScore": 0.94,
    "hasDirectSources": true
  }
  ```

---

### 3.4 Anonymous Community Support (`/api/community`)

#### `GET /api/community/posts`
- **Query Parameters:**
  - `category` ("All", "Menstrual Health", "PCOS Experiences", "Endometriosis Experiences", "Hormonal Health", "Mental Wellbeing", "General Women's Health")
  - `search` (string)
  - `sort` ("recent", "top", "unanswered")
  - `page` (int), `limit` (int)
- **Response (200 OK):**
  ```json
  [
    {
      "id": "post_101",
      "authorPseudonym": "QuietIris94",
      "category": "Endometriosis Experiences",
      "title": "How did you advocate for an exploratory laparoscopy when ultrasound was clear?",
      "content": "My scans consistently come back 'unremarkable', but my day 1-3 cramps cause me to miss work...",
      "tags": ["Laparoscopy", "ClearUltrasound", "Advocacy"],
      "likesCount": 38,
      "commentsCount": 14,
      "userHasLiked": false,
      "userHasSaved": true,
      "createdAt": "2026-11-01T18:22:00Z"
    }
  ]
  ```

#### `POST /api/community/posts`
Creates a new post using the user's community pseudonym.

#### `POST /api/community/posts/{id}/like`
Toggles like status.

#### `GET /api/community/posts/{id}/comments`
Retrieves comments for a post.

#### `POST /api/community/posts/{id}/comments`
Adds a comment using the author's pseudonym.

#### `POST /api/community/posts/{id}/report`
Reports a post for moderation.

---

### 3.5 Verified Doctor Directory (`/api/doctors`)

#### `GET /api/doctors`
- **Query Parameters:**
  - `speciality` ("Gynecology", "Endocrinology", "Reproductive Medicine", "Pelvic Pain Specialist", "Women's Mental Health", etc.)
  - `location` (string or city)
  - `language` ("English", "Spanish", "Hindi", "French", etc.)
  - `consultationType` ("In-Person", "Video / Telehealth", "Both")
  - `verifiedOnly` (boolean, default true)
- **Response (200 OK):**
  ```json
  [
    {
      "id": "doc_001",
      "name": "Dr. Sarah Lin, MD, FACOG",
      "avatarUrl": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
      "speciality": "Obstetrics & Gynecology",
      "subspeciality": "Endometriosis & Minimally Invasive Surgery",
      "qualifications": ["MD - Johns Hopkins", "Fellowship in Advanced Gynecologic Surgery"],
      "registrationNumber": "MED-NY-849204",
      "isVerified": true,
      "verificationDate": "2026-01-15",
      "yearsExperience": 14,
      "languages": ["English", "Mandarin"],
      "location": "New York, NY (Midtown Women's Health)",
      "consultationFee": "$180",
      "acceptsInsurance": true,
      "consultationTypes": ["In-Person", "Video / Telehealth"],
      "bio": "Dr. Lin specializes in chronic pelvic pain, deep infiltrating endometriosis, and patient-centered diagnostic collaboration.",
      "availableDays": ["Monday", "Wednesday", "Friday"],
      "nextAvailableSlot": "2026-11-06T10:00:00Z",
      "rating": 4.9,
      "reviewsCount": 86,
      "isDemo": true
    }
  ]
  ```

#### `GET /api/doctors/{id}`
Retrieves full profile, qualifications, clinic address, and available slots.

---

### 3.6 Research & Knowledge Hub (`/api/research`, `/api/research/collections`)

#### `GET /api/research`
- **Query Parameters:**
  - `q` (keyword in title, abstract, or author)
  - `category` ("PCOS", "Endometriosis", "Menstrual Health", "Fertility", "Hormonal Health", "Menopause", "Mental Health", "Women's General Health")
  - `publicationType` ("Original Research", "Systematic Review & Meta-Analysis", "Clinical Practice Guideline", "Observational Cohort", "Literature Review")
  - `year` (int)
  - `sortBy` ("newest", "oldest", "citations")
- **Response (200 OK):**
  ```json
  [
    {
      "id": "res_001",
      "title": "Diagnostic Delay in Endometriosis: A Multi-Center Qualitative and Quantitative Analysis of Patient-Reported Healthcare Encounters",
      "authors": ["Dr. Eleanor Vance, PhD", "Dr. Marcus Thorne, MD", "Elena Rostova, MSc"],
      "journal": "The Lancet Women's Health & Gynecology",
      "publicationDate": "2025-08-14",
      "year": 2025,
      "category": "Endometriosis",
      "publicationType": "Systematic Review & Meta-Analysis",
      "evidenceClassification": "Level 1A Evidence",
      "isMedicallyReviewed": true,
      "lastReviewedDate": "2026-02-10",
      "doi": "10.1016/j.lanwom.2025.08.012",
      "pmid": "39148201",
      "url": "https://doi.org/10.1016/j.lanwom.2025.08.012",
      "pdfUrl": "https://example.org/papers/endometriosis-delay-2025.pdf",
      "shortSummary": "Analyzed over 4,200 women across 12 countries, highlighting an average diagnostic delay of 7.4 years from symptom onset.",
      "keyFindings": [
        "Normalizing severe pelvic pain during adolescence accounts for 62% of early diagnostic delays.",
        "Clear transvaginal ultrasounds were falsely cited as ruling out endometriosis in 48% of clinical visits.",
        "Early referral to specialized multi-disciplinary clinics reduced time to diagnosis by 4.1 years."
      ],
      "methodology": "Systematic review of 38 peer-reviewed cohort studies between 2018 and 2025, with meta-regression on referral milestones.",
      "limitations": "Self-reported survey data in subset cohorts may carry recall variance.",
      "savedCount": 241
    }
  ]
  ```

#### `GET /api/research/{id}`
Returns complete paper details, methodology, limitations, citations, and full text link.

#### `GET /api/research/collections`
Returns curated editorial collections:
```json
[
  {
    "id": "col_01",
    "slug": "understanding-pcos",
    "title": "Understanding PCOS: Insulin, Androgens & Beyond",
    "description": "Comprehensive peer-reviewed papers exploring metabolic subtypes, diagnostic criteria (Rotterdam update), and evidence-based interventions.",
    "category": "PCOS",
    "paperCount": 12,
    "featuredImage": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600"
  }
]
```

#### `POST /api/research/saved/{id}`
Bookmarks a paper for the authenticated user.

---

### 3.7 Health Reports (`/api/reports`)

#### `GET /api/reports`
Retrieves past generated health summary reports.

#### `POST /api/reports/generate`
Generates a structured medical consultation packet from the user's recorded symptoms and timeline.
- **Request Body:**
  ```json
  {
    "title": "Consultation Brief: Pelvic & Hormonal Symptoms",
    "startDate": "2026-08-01",
    "endDate": "2026-11-02",
    "includedBodyAreas": ["Pelvic", "Whole Body"],
    "includeSeverityGraphs": true,
    "includeQuestionsForDoctor": true
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "id": "rep_901",
    "generatedAt": "2026-11-02T18:00:00Z",
    "dateRange": "Aug 1, 2026 – Nov 2, 2026",
    "title": "Consultation Brief: Pelvic & Hormonal Symptoms",
    "symptomsLoggedCount": 24,
    "averageSeverity": 6.8,
    "primarySymptoms": [
      { "name": "Pelvic Pain", "frequency": "14 episodes", "peakSeverity": 8 },
      { "name": "Fatigue", "frequency": "Daily", "peakSeverity": 7 }
    ],
    "triggersIdentified": ["Luteal phase", "High stress", "Physical exertion"],
    "doctorQuestions": [
      "Given the 3-month recurrence, what diagnostic imaging or hormonal panel is recommended?",
      "How do my symptom peaks correlate with hormonal cycle changes?"
    ],
    "disclaimer": "This document contains patient-recorded observations and is prepared solely to facilitate communication during a clinical consultation. It is not a medical diagnosis."
  }
  ```

---

### 3.8 Appointments (`/api/appointments`)

#### `GET /api/appointments`
Retrieves user's upcoming and past consultations.
- **Response (200 OK):**
  ```json
  [
    {
      "id": "apt_001",
      "doctorId": "doc_001",
      "doctorName": "Dr. Sarah Lin, MD, FACOG",
      "speciality": "Obstetrics & Gynecology",
      "avatarUrl": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
      "dateTime": "2026-11-09T14:30:00Z",
      "type": "Video / Telehealth",
      "status": "Confirmed",
      "meetingLink": "https://meet.vericove.health/session/apt-001",
      "notes": "Discuss pelvic pain history and review attached symptom summary report."
    }
  ]
  ```

#### `POST /api/appointments`
Books a new consultation slot.

#### `DELETE /api/appointments/{id}`
Cancels an appointment.

---

## 4. Environment Variables
- `VITE_API_BASE_URL`: Base URL for the REST API (default: `http://localhost:8000/api`).
- `VITE_USE_MOCK_FALLBACK`: When `true`, automatically falls back to modular mock services if the backend server is unreachable or offline, ensuring uninterrupted hackathon demo presentation.
