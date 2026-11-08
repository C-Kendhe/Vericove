/**
 * Fictional Demo Doctor Discovery Data for Vericove
 * 
 * DISCLAIMER:
 * Demo directory — these profiles do not represent verified or available healthcare professionals.
 * Discovery suggestions are based on explored biomedical terms and are not medical recommendations or referrals.
 */

export const DOCTOR_DISCLAIMER = 'Demo directory — these profiles do not represent verified or available healthcare professionals.';

export const DOCTOR_SPECIALTIES = [
  'All specialties',
  'Gynecologist',
  'Obstetrician',
  'Endocrinologist',
  'Reproductive health specialist',
  'Dermatologist',
  'Mental health professional',
  'General physician'
];

export const DEMO_DOCTOR_PROFILES = [
  {
    id: 'doc-1',
    name: 'Dr. Ananya Deshmukh',
    initials: 'AD',
    tone: 'tone-plum',
    gender: 'female',
    specialty: 'Gynecologist',
    qualifications: 'MBBS, MS - Obstetrics & Gynaecology, DNB',
    experienceYrs: 14,
    consultationType: 'Online & In-person',
    location: 'Shivajinagar, Pune',
    city: 'Pune',
    languages: ['English', 'Hindi', 'Marathi'],
    fee: '₹1,000',
    bio: 'Dedicated to minimally invasive gynecological care, adolescent health, and collaborative management of chronic pelvic discomfort and endometriosis.',
    focusAreas: ['Endometriosis evaluation', 'Chronic pelvic pain', 'Minimally invasive hysteroscopy', 'Adolescent gynecology'],
    availability: 'Mon – Fri, 10:00 AM – 4:30 PM',
    relevantKeywords: ['pelvic', 'cramping', 'endometriosis', 'menstrual', 'period', 'pain', 'dysmenorrhea', 'bleeding']
  },
  {
    id: 'doc-2',
    name: 'Dr. Rajesh Kulkarni',
    initials: 'RK',
    tone: 'tone-sage',
    gender: 'male',
    specialty: 'Endocrinologist',
    qualifications: 'MBBS, MD - Medicine, DM - Endocrinology',
    experienceYrs: 16,
    consultationType: 'Online & In-person',
    location: 'Kothrud, Pune',
    city: 'Pune',
    languages: ['English', 'Hindi', 'Marathi'],
    fee: '₹1,200',
    bio: 'Specialist in metabolic endocrinology, polycystic ovary syndrome (PCOS), insulin resistance patterns, and thyroid hormone dynamics in women.',
    focusAreas: ['PCOS metabolic phenotypes', 'Thyroid dysfunction & Hashimoto’s', 'Insulin resistance & HOMA-IR', 'Adrenal & cortisol rhythms'],
    availability: 'Tue – Sat, 11:00 AM – 5:00 PM',
    relevantKeywords: ['pcos', 'hormonal', 'thyroid', 'insulin', 'fatigue', 'energy', 'metabolic', 'irregular periods', 'weight']
  },
  {
    id: 'doc-3',
    name: 'Dr. Meenakshi Sundaram',
    initials: 'MS',
    tone: 'tone-rose',
    gender: 'female',
    specialty: 'Reproductive health specialist',
    qualifications: 'MBBS, DGO, Fellowship in Reproductive Medicine',
    experienceYrs: 12,
    consultationType: 'Online & In-person',
    location: 'Indiranagar, Bengaluru',
    city: 'Bengaluru',
    languages: ['English', 'Kannada', 'Tamil', 'Hindi'],
    fee: '₹1,400',
    bio: 'Focused on evidence-based ovulatory assessments, luteal phase support, preconception counseling, and fertility-sparing endometriosis treatment.',
    focusAreas: ['Ovulatory monitoring', 'Luteal phase defect', 'Recurrent pregnancy loss review', 'Ovarian reserve counseling'],
    availability: 'Mon – Thu, 9:30 AM – 3:30 PM',
    relevantKeywords: ['menstrual', 'period', 'irregular', 'fertility', 'ovulation', 'pelvic', 'luteal', 'progesterone', 'pcos']
  },
  {
    id: 'doc-4',
    name: 'Dr. Shalini Rao',
    initials: 'SR',
    tone: 'tone-lav',
    gender: 'female',
    specialty: 'Gynecologist',
    qualifications: 'MBBS, MD - Obstetrics & Gynaecology, FICOG',
    experienceYrs: 18,
    consultationType: 'Online & In-person',
    location: 'Bandra West, Mumbai',
    city: 'Mumbai',
    languages: ['English', 'Hindi', 'Gujarati', 'Marathi'],
    fee: '₹1,500',
    bio: 'Senior consultant specializing in complex abnormal uterine bleeding, uterine fibroids, and menopause transitional care.',
    focusAreas: ['Abnormal uterine bleeding', 'Perimenopause and HRT', 'Uterine fibroids & adenomyosis', 'Cervical cancer screening'],
    availability: 'Mon, Wed, Fri, 10:00 AM – 2:00 PM',
    relevantKeywords: ['menstrual', 'bleeding', 'heavy periods', 'menorrhagia', 'fibroids', 'perimenopause', 'hormonal', 'hot flashes']
  },
  {
    id: 'doc-5',
    name: 'Dr. Rohan Joshi',
    initials: 'RJ',
    tone: 'tone-blue',
    gender: 'male',
    specialty: 'General physician',
    qualifications: 'MBBS, MD - Internal Medicine',
    experienceYrs: 11,
    consultationType: 'Online only',
    location: 'Aundh, Pune',
    city: 'Pune',
    languages: ['English', 'Hindi', 'Marathi'],
    fee: '₹800',
    bio: 'Internal medicine clinician passionate about holistic fatigue workups, nutrient deficiency screening, and chronic lifestyle disease prevention.',
    focusAreas: ['Unexplained fatigue & weakness', 'Ferritin & iron deficiency anemia', 'Vitamin D3 & B12 deficiencies', 'Preventive adult health audits'],
    availability: 'Mon – Sat, 4:00 PM – 8:00 PM',
    relevantKeywords: ['fatigue', 'low energy', 'exhaustion', 'tired', 'dizziness', 'lightheadedness', 'weakness', 'headache', 'iron']
  },
  {
    id: 'doc-6',
    name: 'Dr. Kavita Nair',
    initials: 'KN',
    tone: 'tone-sage',
    gender: 'female',
    specialty: 'Mental health professional',
    qualifications: 'MD - Psychiatry, DPM',
    experienceYrs: 15,
    consultationType: 'Online & In-person',
    location: 'Jubilee Hills, Hyderabad',
    city: 'Hyderabad',
    languages: ['English', 'Hindi', 'Telugu', 'Malayalam'],
    fee: '₹1,600',
    bio: 'Perinatal and reproductive psychiatrist focusing on Premenstrual Dysphoric Disorder (PMDD), postpartum mood disorders, and health-related anxiety.',
    focusAreas: ['PMDD and cyclical mood changes', 'Perinatal mental health', 'Chronic illness fatigue & anxiety', 'Sleep-wake rhythm disturbance'],
    availability: 'Tue – Fri, 1:00 PM – 7:00 PM',
    relevantKeywords: ['sleep', 'insomnia', 'stress', 'anxiety', 'pmdd', 'mood', 'depression', 'headache', 'fatigue']
  },
  {
    id: 'doc-7',
    name: 'Dr. Arvind Iyer',
    initials: 'AI',
    tone: 'tone-plum',
    gender: 'male',
    specialty: 'Obstetrician',
    qualifications: 'MBBS, MS - Obstetrics & Gynaecology',
    experienceYrs: 13,
    consultationType: 'Online & In-person',
    location: 'Viman Nagar, Pune',
    city: 'Pune',
    languages: ['English', 'Hindi', 'Marathi', 'Tamil'],
    fee: '₹1,000',
    bio: 'Obstetrician dedicated to empathetic antenatal care, high-risk pregnancy monitoring, and patient-centered birthing experiences.',
    focusAreas: ['Antenatal & postnatal care', 'High-risk pregnancy surveillance', 'Gestational diabetes monitoring', 'Preconception health planning'],
    availability: 'Mon – Sat, 10:00 AM – 3:00 PM',
    relevantKeywords: ['pregnancy', 'obstetric', 'maternal', 'antenatal', 'pelvic', 'nausea']
  },
  {
    id: 'doc-8',
    name: 'Dr. Preeti Sen',
    initials: 'PS',
    tone: 'tone-rose',
    gender: 'female',
    specialty: 'Dermatologist',
    qualifications: 'MBBS, MD - Dermatology, Venereology & Leprosy',
    experienceYrs: 9,
    consultationType: 'Online & In-person',
    location: 'Vasant Vihar, New Delhi',
    city: 'Delhi NCR',
    languages: ['English', 'Hindi', 'Bengali'],
    fee: '₹1,100',
    bio: 'Specialist in hormonal dermatoses, female pattern hair shedding (telogen effluvium), and adult cystic acne associated with PCOS.',
    focusAreas: ['Hormonal jawline acne', 'Female androgenetic alopecia', 'Hirsutism management', 'Post-inflammatory pigmentation'],
    availability: 'Mon – Fri, 11:00 AM – 6:00 PM',
    relevantKeywords: ['pcos', 'acne', 'skin', 'hair loss', 'hirsutism', 'hormonal', 'dermatology']
  },
  {
    id: 'doc-9',
    name: 'Dr. Vikram Sethi',
    initials: 'VS',
    tone: 'tone-blue',
    gender: 'male',
    specialty: 'Endocrinologist',
    qualifications: 'MBBS, MD - Medicine, DM - Endocrinology (AIIMS)',
    experienceYrs: 20,
    consultationType: 'Online & In-person',
    location: 'Connaught Place, New Delhi',
    city: 'Delhi NCR',
    languages: ['English', 'Hindi', 'Punjabi'],
    fee: '₹1,500',
    bio: 'Senior endocrinologist with special interest in autoimmune thyroiditis, hypothalamic amenorrhea, and bone density health in women.',
    focusAreas: ['Hypothalamic amenorrhea', 'Autoimmune thyroid diseases', 'Osteopenia & osteoporosis', 'Prolactin disorders'],
    availability: 'Mon, Wed, Sat, 10:00 AM – 4:00 PM',
    relevantKeywords: ['hormonal', 'thyroid', 'amenorrhea', 'irregular periods', 'fatigue', 'bone', 'energy', 'pcos']
  },
  {
    id: 'doc-10',
    name: 'Dr. Tanvi Patel',
    initials: 'TP',
    tone: 'tone-lav',
    gender: 'female',
    specialty: 'Gynecologist',
    qualifications: 'MBBS, DNB - Obstetrics & Gynaecology, FMAS',
    experienceYrs: 10,
    consultationType: 'Online & In-person',
    location: 'Koramangala, Bengaluru',
    city: 'Bengaluru',
    languages: ['English', 'Hindi', 'Gujarati', 'Kannada'],
    fee: '₹1,000',
    bio: 'Minimally invasive surgeon specializing in laparoscopic cystectomy, uterine conservation therapies, and recurrent pelvic infection care.',
    focusAreas: ['Ovarian cysts & teratomas', 'Pelvic inflammatory conditions', 'Laparoscopic gynecologic surgery', 'Contraceptive counseling'],
    availability: 'Tue – Sat, 10:30 AM – 4:30 PM',
    relevantKeywords: ['pelvic', 'cramping', 'pain', 'cysts', 'infection', 'menstrual', 'period']
  },
  {
    id: 'doc-11',
    name: 'Dr. Sunita Ghosh',
    initials: 'SG',
    tone: 'tone-sage',
    gender: 'female',
    specialty: 'General physician',
    qualifications: 'MBBS, DNB - Family Medicine, MRCGP (Int)',
    experienceYrs: 13,
    consultationType: 'Online only',
    location: 'Salt Lake, Kolkata',
    city: 'Kolkata',
    languages: ['English', 'Hindi', 'Bengali'],
    fee: '₹750',
    bio: 'Family physician with deep expertise in functional gastrointestinal symptoms, migraine headaches, and chronic lifestyle guidance.',
    focusAreas: ['Functional gut symptoms & bloating', 'Tension and migraine headaches', 'Circadian hygiene and sleep', 'Comprehensive wellness assessments'],
    availability: 'Mon – Fri, 5:00 PM – 9:00 PM',
    relevantKeywords: ['bloating', 'abdominal', 'nausea', 'headache', 'migraine', 'dizziness', 'lightheadedness', 'digestive', 'fatigue', 'sleep']
  },
  {
    id: 'doc-12',
    name: 'Dr. Farhan Merchant',
    initials: 'FM',
    tone: 'tone-rose',
    gender: 'male',
    specialty: 'Reproductive health specialist',
    qualifications: 'MBBS, MS - Obstetrics & Gynaecology, MCh (Reprod Med)',
    experienceYrs: 17,
    consultationType: 'Online & In-person',
    location: 'Hiranandani, Powai, Mumbai',
    city: 'Mumbai',
    languages: ['English', 'Hindi', 'Urdu', 'Gujarati'],
    fee: '₹1,500',
    bio: 'Specializing in reproductive endocrinology, advanced cycle assessment, and holistic fertility preservation strategies.',
    focusAreas: ['Reproductive endocrinology', 'Diminished ovarian reserve', 'Uterine septum & anatomical factors', 'Ovulation induction protocol design'],
    availability: 'Mon – Thu, 11:00 AM – 5:00 PM',
    relevantKeywords: ['fertility', 'menstrual', 'irregular', 'pcos', 'hormonal', 'ovulation', 'progesterone', 'pelvic']
  }
];

/**
 * Map symptom keywords to suggested medical specialties.
 * Presented as exploratory directory suggestions, not medical recommendations or referrals.
 */
export function getSuggestedSpecialties(matchedTerms = []) {
  const terms = (matchedTerms || []).map(t => String(t).toLowerCase().trim());
  const suggested = new Set();

  for (const term of terms) {
    if (/menstrual|period|cramp|bleeding|cycle|dysmenorrhea|spotting|flow/.test(term)) {
      suggested.add('Gynecologist');
      suggested.add('Endocrinologist');
    }
    if (/pelvic|endo|endometriosis|adenomyosis/.test(term)) {
      suggested.add('Gynecologist');
      suggested.add('Reproductive health specialist');
    }
    if (/pcos|polycystic|hormon|insulin|androgen|ovary/.test(term)) {
      suggested.add('Endocrinologist');
      suggested.add('Gynecologist');
      suggested.add('Dermatologist');
    }
    if (/fatigue|energy|tired|exhaust|letharg|weakness|iron|ferritin|anemia/.test(term)) {
      suggested.add('General physician');
      suggested.add('Endocrinologist');
    }
    if (/bloat|abdomin|nausea|digest|gut|stomach/.test(term)) {
      suggested.add('General physician');
      suggested.add('Gynecologist');
    }
    if (/headache|migraine|dizz|lighthead/.test(term)) {
      suggested.add('General physician');
      suggested.add('Mental health professional');
    }
    if (/sleep|insomnia|stress|anxiety|mood|depress|cortisol|pmdd/.test(term)) {
      suggested.add('Mental health professional');
      suggested.add('General physician');
    }
    if (/skin|acne|hair|hirsutism/.test(term)) {
      suggested.add('Dermatologist');
      suggested.add('Endocrinologist');
    }
    if (/pregnan|maternal|obstetric|birth/.test(term)) {
      suggested.add('Obstetrician');
      suggested.add('Gynecologist');
    }
  }

  if (suggested.size === 0) {
    // Sensible defaults
    suggested.add('Gynecologist');
    suggested.add('General physician');
    suggested.add('Endocrinologist');
  }

  return Array.from(suggested);
}

/**
 * Filter and prioritize doctor profiles by symptom terms, specialty filter, and search query
 */
export function getDoctors(matchedTerms = [], specialtyFilter = 'All specialties', searchQuery = '') {
  const normalizedTerms = (matchedTerms || []).map(t => String(t).toLowerCase().trim()).filter(Boolean);
  const query = String(searchQuery || '').trim().toLowerCase();

  let pool = [...DEMO_DOCTOR_PROFILES];

  // Specialty filter
  if (specialtyFilter && specialtyFilter !== 'All specialties' && specialtyFilter !== 'All') {
    pool = pool.filter(doc => doc.specialty.toLowerCase() === specialtyFilter.toLowerCase());
  }

  // Free text search query (name, specialty, location, city, languages, bio)
  if (query) {
    pool = pool.filter(doc => {
      const matchName = doc.name.toLowerCase().includes(query);
      const matchSpec = doc.specialty.toLowerCase().includes(query);
      const matchLoc = doc.location.toLowerCase().includes(query) || doc.city.toLowerCase().includes(query);
      const matchLang = doc.languages.some(lang => lang.toLowerCase().includes(query));
      const matchBio = doc.bio.toLowerCase().includes(query);
      return matchName || matchSpec || matchLoc || matchLang || matchBio;
    });
  }

  // Score relevance by matched symptom terms
  const scored = pool.map(doc => {
    let score = 0;
    if (normalizedTerms.length > 0) {
      const docKeywords = (doc.relevantKeywords || []).map(k => k.toLowerCase());
      const focusAreas = (doc.focusAreas || []).map(f => f.toLowerCase());
      const bioLower = doc.bio.toLowerCase();

      for (const term of normalizedTerms) {
        if (docKeywords.some(k => k.includes(term) || term.includes(k))) score += 5;
        if (focusAreas.some(f => f.includes(term) || term.includes(f))) score += 4;
        if (bioLower.includes(term)) score += 2;
      }
    }
    return { ...doc, relevanceScore: score };
  });

  // Sort by relevance score descending, then experience years descending
  scored.sort((a, b) => {
    if (b.relevanceScore !== a.relevanceScore) {
      return b.relevanceScore - a.relevanceScore;
    }
    return b.experienceYrs - a.experienceYrs;
  });

  return scored;
}

export function getDoctorById(id) {
  return DEMO_DOCTOR_PROFILES.find(d => d.id === id) || null;
}

