/**
 * DEMO APPOINTMENTS DATA
 * Consultation records adhering to proposed backend API schema.
 * Dynamically managed via GET/POST/DELETE /api/appointments
 */

export const DEMO_APPOINTMENTS = [
  {
    id: "apt_001",
    doctorId: "doc_001",
    doctorName: "Dr. Sarah Lin, MD, FACOG",
    speciality: "Obstetrics & Gynecology (Pelvic Pain Specialist)",
    avatarUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    date: "2026-11-09",
    time: "11:15 AM EST",
    dateTimeIso: "2026-11-09T16:15:00Z",
    type: "Video / Telehealth",
    location: "Vericove Encrypted Telehealth Room",
    meetingLink: "https://meet.vericove.health/room/lin-apt-001",
    status: "Confirmed",
    fee: "$180",
    reasonForVisit: "Initial consultation for cyclic pelvic pain and review of 3-month symptom tracking report.",
    attachedReportId: "rep_901",
    createdAt: "2026-11-01T10:00:00Z"
  },
  {
    id: "apt_002",
    doctorId: "doc_002",
    doctorName: "Dr. Amara Okonjo, MD, MPH",
    speciality: "Reproductive Endocrinology (PCOS & Metabolic)",
    avatarUrl: "https://images.unsplash.com/photo-1594824813512-32111516e897?auto=format&fit=crop&q=80&w=600",
    date: "2026-11-16",
    time: "02:00 PM EST",
    dateTimeIso: "2026-11-16T19:00:00Z",
    type: "Video / Telehealth",
    location: "Beacon Endocrinology Virtual Clinic",
    meetingLink: "https://meet.vericove.health/room/okonjo-apt-002",
    status: "Upcoming",
    fee: "$210",
    reasonForVisit: "Evaluate irregular cycle intervals and discuss updated 2023 international PCOS guideline options.",
    attachedReportId: null,
    createdAt: "2026-11-02T09:30:00Z"
  },
  {
    id: "apt_003",
    doctorId: "doc_004",
    doctorName: "Dr. Priya Nair, MD, DipABLM",
    speciality: "Integrative Women's Medicine",
    avatarUrl: "https://images.unsplash.com/photo-1594824813512-32111516e897?auto=format&fit=crop&q=80&w=600",
    date: "2026-10-15",
    time: "03:30 PM EST",
    dateTimeIso: "2026-10-15T19:30:00Z",
    type: "Video / Telehealth",
    location: "Virtual Consult",
    meetingLink: null,
    status: "Completed",
    fee: "$175",
    reasonForVisit: "Nutritional and gut microbiome review for chronic pelvic inflammation.",
    attachedReportId: null,
    createdAt: "2026-10-05T14:00:00Z"
  }
];
