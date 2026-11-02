/**
 * DEMO DOCTOR DATA
 * Clearly labeled demo dataset matching the proposed API contract.
 * In production, all records are dynamically fetched from GET /api/doctors.
 */

export const DEMO_DOCTORS = [
  {
    id: "doc_001",
    name: "Dr. Sarah Lin, MD, FACOG",
    title: "Attending Gynecologist & Pelvic Surgeon",
    avatarUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    speciality: "Obstetrics & Gynecology",
    subspeciality: "Endometriosis & Minimally Invasive Gynecologic Surgery",
    qualifications: ["MD - Johns Hopkins University School of Medicine", "Fellowship in Minimally Invasive Surgery (MIGS)"],
    registrationNumber: "MED-NY-849204",
    isVerified: true,
    verificationDate: "2026-01-15",
    yearsExperience: 14,
    languages: ["English", "Mandarin"],
    location: "New York, NY",
    clinicAddress: "Midtown Women's Health & Surgical Center, 420 Lexington Ave, Suite 900",
    consultationFee: "$180",
    acceptsInsurance: true,
    acceptedInsurances: ["BlueCross BlueShield", "Aetna", "UnitedHealthcare", "Cigna"],
    consultationTypes: ["In-Person", "Video / Telehealth"],
    bio: "Dr. Lin specializes in diagnosing and treating complex chronic pelvic pain, deep infiltrating endometriosis (DIE), and adenomyosis. She practices trauma-informed care and partners closely with patients to validate symptoms often dismissed as 'normal cycle pain'.",
    areasOfExpertise: [
      "Deep Infiltrating Endometriosis",
      "Laparoscopic Excision Surgery",
      "Chronic Pelvic Neuropathic Pain",
      "Adenomyosis Management"
    ],
    availableDays: ["Monday", "Wednesday", "Friday"],
    nextAvailableSlot: "2026-11-06T10:00:00Z",
    availableSlots: [
      { date: "2026-11-06", time: "10:00 AM", type: "Video / Telehealth" },
      { date: "2026-11-06", time: "02:30 PM", type: "In-Person" },
      { date: "2026-11-09", time: "11:15 AM", type: "Video / Telehealth" },
      { date: "2026-11-11", time: "09:00 AM", type: "In-Person" }
    ],
    rating: 4.9,
    reviewsCount: 124,
    isDemo: true
  },
  {
    id: "doc_002",
    name: "Dr. Amara Okonjo, MD, MPH",
    title: "Reproductive Endocrinologist & Hormonal Health Specialist",
    avatarUrl: "https://images.unsplash.com/photo-1594824813512-32111516e897?auto=format&fit=crop&q=80&w=600",
    speciality: "Reproductive Endocrinology",
    subspeciality: "PCOS, Insulin Resistance & Fertility Preservation",
    qualifications: ["MD - Harvard Medical School", "MPH - Harvard T.H. Chan School of Public Health"],
    registrationNumber: "MED-MA-619042",
    isVerified: true,
    verificationDate: "2025-11-20",
    yearsExperience: 11,
    languages: ["English", "Yoruba", "French"],
    location: "Boston, MA",
    clinicAddress: "Beacon Endocrinology & Metabolic Care, 150 Longwood Ave",
    consultationFee: "$210",
    acceptsInsurance: true,
    acceptedInsurances: ["Harvard Pilgrim", "Tufts", "BlueCross", "MassHealth"],
    consultationTypes: ["In-Person", "Video / Telehealth"],
    bio: "Dr. Okonjo has dedicated her clinical practice to polycystic ovary syndrome (PCOS), hypothalamic amenorrhea, and metabolic health. She is known for taking an evidence-based, individualized approach that addresses root metabolic causes rather than only symptom suppression.",
    areasOfExpertise: [
      "Polycystic Ovary Syndrome (PCOS)",
      "Metabolic Syndrome & Insulin Sensitization",
      "Ovulation Induction & Fertility Planning",
      "Perimenopause Hormonal Transitions"
    ],
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    nextAvailableSlot: "2026-11-08T14:00:00Z",
    availableSlots: [
      { date: "2026-11-08", time: "02:00 PM", type: "Video / Telehealth" },
      { date: "2026-11-10", time: "10:30 AM", type: "Video / Telehealth" },
      { date: "2026-11-12", time: "03:15 PM", type: "In-Person" }
    ],
    rating: 4.95,
    reviewsCount: 98,
    isDemo: true
  },
  {
    id: "doc_003",
    name: "Dr. Elena Rostova, MD, PhD",
    title: "Neurologist & Headache Medicine Fellow",
    avatarUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    speciality: "Neurology",
    subspeciality: "Hormonal Migraine & Autonomic Dysregulation",
    qualifications: ["MD/PhD - Stanford University", "Board Certified in Neurology and Headache Medicine"],
    registrationNumber: "MED-CA-938172",
    isVerified: true,
    verificationDate: "2026-02-01",
    yearsExperience: 9,
    languages: ["English", "Russian", "Spanish"],
    location: "San Francisco, CA",
    clinicAddress: "Bay Neuro-Endocrine & Migraine Center, 300 Parnassus Ave",
    consultationFee: "$195",
    acceptsInsurance: true,
    acceptedInsurances: ["Kaiser", "Blue Shield of California", "Aetna"],
    consultationTypes: ["In-Person", "Video / Telehealth"],
    bio: "Dr. Rostova specializes in the complex interplay between estrogen fluctuations and neurological conditions, with a focus on catamenial migraines, vestibular migraine, and POTS symptoms worsened by cycle changes.",
    areasOfExpertise: [
      "Hormone-Associated Migraines",
      "CGRP Inhibitors & Preventive Protocols",
      "Autonomic Dysfunction in Women",
      "Vestibular & Sensory Hypersensitivity"
    ],
    availableDays: ["Monday", "Tuesday", "Thursday"],
    nextAvailableSlot: "2026-11-07T11:00:00Z",
    availableSlots: [
      { date: "2026-11-07", time: "11:00 AM", type: "Video / Telehealth" },
      { date: "2026-11-09", time: "01:30 PM", type: "In-Person" },
      { date: "2026-11-13", time: "10:00 AM", type: "Video / Telehealth" }
    ],
    rating: 4.88,
    reviewsCount: 76,
    isDemo: true
  },
  {
    id: "doc_004",
    name: "Dr. Priya Nair, MD, DipABLM",
    title: "Integrative Women's Health & Lifestyle Medicine Physician",
    avatarUrl: "https://images.unsplash.com/photo-1594824813512-32111516e897?auto=format&fit=crop&q=80&w=600",
    speciality: "Integrative Women's Medicine",
    subspeciality: "Endometriosis Care & Gut-Hormone Axis",
    qualifications: ["MD - University of Chicago Pritzker", "Fellowship in Integrative Medicine (Andrew Weil Center)"],
    registrationNumber: "MED-IL-472091",
    isVerified: true,
    verificationDate: "2025-10-12",
    yearsExperience: 12,
    languages: ["English", "Hindi", "Malayalam"],
    location: "Chicago, IL",
    clinicAddress: "Center for Restorative Women's Health, 676 N Michigan Ave",
    consultationFee: "$175",
    acceptsInsurance: false,
    acceptedInsurances: ["Superbill provided for Out-of-Network claims"],
    consultationTypes: ["Video / Telehealth"],
    bio: "Dr. Nair partners with women navigating multi-system inflammation, PMDD, and endometriosis through gut microbiome restoration, anti-inflammatory nutrition, and evidence-informed herbal and lifestyle protocols.",
    areasOfExpertise: [
      "Premenstrual Dysphoric Disorder (PMDD)",
      "Gut Microbiome & Estrogen Elimination",
      "Pelvic Floor Support Integration",
      "Chronic Fatigue & Adrenal Dysregulation"
    ],
    availableDays: ["Wednesday", "Thursday", "Friday"],
    nextAvailableSlot: "2026-11-10T15:00:00Z",
    availableSlots: [
      { date: "2026-11-10", time: "03:00 PM", type: "Video / Telehealth" },
      { date: "2026-11-11", time: "04:30 PM", type: "Video / Telehealth" }
    ],
    rating: 4.92,
    reviewsCount: 89,
    isDemo: true
  },
  {
    id: "doc_005",
    name: "Dr. Rachel Campbell, PsyD",
    title: "Clinical Health Psychologist & Reproductive Mental Health Specialist",
    avatarUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600",
    speciality: "Women's Mental Health",
    subspeciality: "Medical Trauma, PMDD & Chronic Illness Adaptation",
    qualifications: ["PsyD - Columbia University", "Postdoctoral Fellowship in Health Psychology"],
    registrationNumber: "PSY-NY-019348",
    isVerified: true,
    verificationDate: "2026-01-30",
    yearsExperience: 10,
    languages: ["English"],
    location: "New York, NY",
    clinicAddress: "Mind-Body Health Collaborative, 115 Central Park West",
    consultationFee: "$160",
    acceptsInsurance: true,
    acceptedInsurances: ["Aetna", "Oscar", "Oxford"],
    consultationTypes: ["Video / Telehealth", "In-Person"],
    bio: "Dr. Campbell works with individuals coping with the emotional toll of chronic pain, delayed medical diagnosis, and severe reproductive mood disorders like PMDD and postpartum depression.",
    areasOfExpertise: [
      "Coping with Diagnostic Delay & Medical Gaslighting",
      "Cognitive Behavioral Therapy for Chronic Pain (CBT-CP)",
      "Premenstrual Dysphoric Disorder (PMDD) Support",
      "Acceptance and Commitment Therapy (ACT)"
    ],
    availableDays: ["Monday", "Wednesday", "Thursday"],
    nextAvailableSlot: "2026-11-09T16:00:00Z",
    availableSlots: [
      { date: "2026-11-09", time: "04:00 PM", type: "Video / Telehealth" },
      { date: "2026-11-12", time: "01:00 PM", type: "Video / Telehealth" }
    ],
    rating: 4.97,
    reviewsCount: 112,
    isDemo: true
  }
];
