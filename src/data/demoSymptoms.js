/**
 * DEMO SYMPTOMS DATA
 * Initial symptom tracking data adhering to proposed backend API schema.
 * Dynamically managed via GET/POST/PUT/DELETE /api/symptoms
 */

export const DEMO_BODY_AREAS = [
  "Pelvic",
  "Abdominal",
  "Head & Neurological",
  "Reproductive",
  "Joints & Muscles",
  "Whole Body / Energy",
  "Mood & Cognitive"
];

export const DEMO_SYMPTOMS = [
  {
    id: "sym_001",
    name: "Deep Pelvic Cramping",
    bodyArea: "Pelvic",
    severity: 8,
    date: "2026-11-01",
    duration: "6 hours",
    frequency: "Cyclic (Day 1 of menses)",
    triggers: ["Cycle onset", "Cold weather", "Standing prolonged"],
    notes: "Radiating down left inner thigh and sacrum. Resistant to standard NSAIDs. Required heating pad and horizontal rest.",
    createdAt: "2026-11-01T08:30:00Z"
  },
  {
    id: "sym_002",
    name: "Extreme Fatigue & Brain Fog",
    bodyArea: "Whole Body / Energy",
    severity: 7,
    date: "2026-10-31",
    duration: "All day",
    frequency: "Daily for 2 weeks",
    triggers: ["Poor sleep", "Luteal phase", "High workload"],
    notes: "Woke up feeling completely unrefreshed. Difficulty processing emails and concentrating after 2 PM.",
    createdAt: "2026-10-31T14:15:00Z"
  },
  {
    id: "sym_003",
    name: "Severe Abdominal Bloating ('Endo Belly')",
    bodyArea: "Abdominal",
    severity: 6,
    date: "2026-10-28",
    duration: "8 hours",
    frequency: "Post-ovulation",
    triggers: ["High fiber meals", "Dairy", "Stress"],
    notes: "Distension visible within 30 minutes of eating. Tight clothes unbearable. Accompanied by mild nausea.",
    createdAt: "2026-10-28T19:00:00Z"
  },
  {
    id: "sym_004",
    name: "Unilateral Throbbing Migraine",
    bodyArea: "Head & Neurological",
    severity: 8,
    date: "2026-10-24",
    duration: "18 hours",
    frequency: "Premenstrual drop (Day 26)",
    triggers: ["Estrogen drop", "Bright screen light", "Skipped lunch"],
    notes: "Left eye throbbing, photo- and phonophobia. Mild nausea. Slept in a dark room.",
    createdAt: "2026-10-24T11:20:00Z"
  },
  {
    id: "sym_005",
    name: "Lower Back Ache & Sacroiliac Stiffness",
    bodyArea: "Joints & Muscles",
    severity: 5,
    date: "2026-10-20",
    duration: "Continuous",
    frequency: "Mid-cycle (Ovulation)",
    triggers: ["Walking on hard floors", "Mid-cycle estrogen peak"],
    notes: "Deep dull ache across SI joints. Gentle walking helped temporarily.",
    createdAt: "2026-10-20T16:45:00Z"
  },
  {
    id: "sym_006",
    name: "Irritable Mood & Dysphoria",
    bodyArea: "Mood & Cognitive",
    severity: 7,
    date: "2026-10-16",
    duration: "3 days",
    frequency: "Luteal phase peak",
    triggers: ["Sensory overload", "Hormonal shift"],
    notes: "Felt heightened sensitivity to minor criticism, sudden tearfulness without external precipitant.",
    createdAt: "2026-10-16T20:10:00Z"
  },
  {
    id: "sym_007",
    name: "Pelvic Stabbing Sensation",
    bodyArea: "Pelvic",
    severity: 7,
    date: "2026-10-12",
    duration: "2 hours",
    frequency: "Intermittent",
    triggers: ["Bowel movement", "Bladder fullness"],
    notes: "Sudden sharp jolt in posterior cul-de-sac region.",
    createdAt: "2026-10-12T09:15:00Z"
  }
];
