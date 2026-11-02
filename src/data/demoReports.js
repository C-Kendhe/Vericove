/**
 * DEMO CLINICAL HEALTH REPORTS
 * Structured consultation briefs generated from patient symptoms.
 * Managed dynamically via GET/POST /api/reports
 */

export const DEMO_REPORTS = [
  {
    id: "rep_901",
    title: "Clinical Consultation Summary: Pelvic & Hormonal Patterns",
    dateRange: "Aug 1, 2026 – Nov 2, 2026 (92 Days)",
    generatedAt: "2026-11-02T16:00:00Z",
    totalSymptomsLogged: 24,
    averageSeverity: 6.8,
    peakSeverity: 8.5,
    primaryBodyAreas: ["Pelvic", "Whole Body / Energy", "Head & Neurological"],
    symptomFrequencies: [
      { name: "Deep Pelvic Cramping", occurrences: 9, avgSeverity: 7.8, peakSeverity: 9 },
      { name: "Fatigue & Brain Fog", occurrences: 16, avgSeverity: 6.5, peakSeverity: 8 },
      { name: "Abdominal Bloating", occurrences: 8, avgSeverity: 6.0, peakSeverity: 7 },
      { name: "Menstrual Migraine", occurrences: 3, avgSeverity: 8.0, peakSeverity: 9 }
    ],
    primaryTriggers: [
      "Menstrual cycle onset (Days 1–3)",
      "Late luteal phase (Days 24–28)",
      "Prolonged physical exertion",
      "High workplace stress"
    ],
    structuredClinicalSummary: "Patient exhibits a documented 3-month recurring pattern of severe non-responsive lower quadrant pelvic cramping coinciding with cycle onset and mid-luteal fatigue. Symptoms significantly impair daily activities (work absenteeism reported during 2 cycles). Standard NSAIDs provided limited relief. Correlation noted between cyclic symptom flare-ups and abdominal distension.",
    suggestedDoctorQuestions: [
      "Given the 7.4-year average diagnostic delay documented in literature for endometriosis, what specialized imaging (e.g., protocol-specific MRI or expert deep-infiltrating ultrasound) is warranted?",
      "Would a comprehensive hormonal and metabolic panel (FSH, LH, estradiol, free testosterone, fasting insulin, serum ferritin) help differentiate potential co-occurring conditions?",
      "Could my recurring fatigue be secondary to non-anemic iron deficiency given my heavy menstrual flow, even if hemoglobin is within normal lab ranges?",
      "What multimodal pain management strategies (such as pelvic floor physical therapy or targeted anti-inflammatory approaches) are appropriate while diagnostic steps proceed?"
    ],
    disclaimer: "This report is generated strictly from patient-recorded observations to support clinical communication. It does not constitute a formal diagnosis, treatment recommendation, or medical evaluation."
  }
];
