/**
 * Fictional Demo Community Voices Data for Vericove
 * 
 * DISCLAIMER:
 * Demo community — these conversations are illustrative examples,
 * not real patient experiences or clinical case reports.
 */

export const COMMUNITY_DISCLAIMER = 'Demo community — these conversations are illustrative examples, not real patient experiences.';

export const COMMUNITY_CATEGORIES = [
  'All',
  'Menstrual health',
  'PCOS',
  'Endometriosis',
  'Hormonal health',
  'Fatigue & low energy',
  'Pelvic discomfort',
  'Sleep & stress',
  'General wellness'
];

export const DEMO_COMMUNITY_VOICES = [
  {
    id: 'cv-1',
    author: 'Aarohi_D',
    handle: '@aarohi_d',
    initials: 'AD',
    tone: 'tone-lav',
    category: 'Fatigue & low energy',
    tags: ['Fatigue', 'Ferritin', 'Thyroid'],
    keywords: ['fatigue', 'low energy', 'exhaustion', 'tired', 'lethargy', 'iron', 'ferritin', 'thyroid'],
    timeAgo: '2d ago',
    title: 'Persistent 3 PM energy crash: what testing finally helped me unpack',
    snippet: 'For months I attributed my afternoon brain fog and heavy limbs to poor sleep. Keeping a 4-week journal showed the drop happened regardless of sleep duration. A full iron and ferritin panel revealed low storage iron despite normal hemoglobin.',
    fullText: 'For months I attributed my afternoon brain fog and heavy limbs to poor sleep. Keeping a 4-week journal showed the drop happened regardless of sleep duration. A full iron and ferritin panel revealed low storage iron despite normal hemoglobin.\n\nMy GP explained that low ferritin alone can cause significant fatigue in women before frank anemia appears. Sharing this log during my appointment made the discussion so much more objective than just saying "I feel tired all the time."',
    likes: 34,
    replyCount: 9,
    replies: [
      { author: 'Meera_K', handle: '@meera_k', timeAgo: '1d ago', text: 'Tracking the exact timing was key for me too. Once my doctor saw it was cyclic with my luteal phase, we checked both ferritin and progesterone.' },
      { author: 'Pooja_V', handle: '@pooja_v', timeAgo: '1d ago', text: 'Did you also check your vitamin D or B12 levels at the same time? Those two plus ferritin made a huge difference for my afternoon fatigue.' },
      { author: 'Dr_Ananya_Note', handle: '@demo_moderator', timeAgo: '18h ago', text: 'Important observation: Ferritin is frequently overlooked when standard CBC hemoglobin is in reference range. Bringing a structured timeline to care visits is a great approach.' }
    ]
  },
  {
    id: 'cv-2',
    author: 'Priya_M',
    handle: '@priya_m',
    initials: 'PM',
    tone: 'tone-rose',
    category: 'Pelvic discomfort',
    tags: ['Pelvic pain', 'Cycle tracking', 'Advocacy'],
    keywords: ['pelvic', 'cramping', 'discomfort', 'pain', 'deep pelvic pain', 'dysmenorrhea', 'endometriosis'],
    timeAgo: '4d ago',
    title: 'Navigating deep pelvic aching between cycles: questions I brought to my specialist',
    snippet: 'When discomfort started happening on day 14 instead of just during menses, I started charting whether it correlated with ovulation. Having written notes helped my gynecologist suggest a transvaginal ultrasound rather than assuming normal cramps.',
    fullText: 'When discomfort started happening on day 14 instead of just during menses, I started charting whether it correlated with ovulation. Having written notes helped my gynecologist suggest a transvaginal ultrasound rather than assuming normal cramps.\n\nKey lesson learned: describing the sensation specifically (dull throbbing vs sharp unilateral twinges) and noting functional impacts (e.g. unable to sit upright for long hours) helped my care team take it seriously.',
    likes: 47,
    replyCount: 14,
    replies: [
      { author: 'Tanvi_S', handle: '@tanvi_s', timeAgo: '3d ago', text: 'Unilateral mid-cycle pain (mittelschmerz) can be quite intense. Finding a clinician who listened without dismissing it as generic cramps took me two tries.' },
      { author: 'Kavita_M', handle: '@kavita_m', timeAgo: '2d ago', text: 'Ultrasound with a sonographer experienced in pelvic mapping made all the difference for identifying focal tenderness.' }
    ]
  },
  {
    id: 'cv-3',
    author: 'Neha_B',
    handle: '@neha_b',
    initials: 'NB',
    tone: 'tone-sage',
    category: 'PCOS',
    tags: ['PCOS', 'Insulin resistance', 'Cycle regularity'],
    keywords: ['pcos', 'polycystic', 'irregular periods', 'insulin', 'androgen', 'acne', 'weight'],
    timeAgo: '5d ago',
    title: 'Moving past "just lose weight": how looking at insulin sensitivity helped my PCOS dialogue',
    snippet: 'When I received a PCOS diagnosis at 24, the only advice given was restrictive dieting. Finding an endocrinologist who tested fasting insulin and HOMA-IR shifted the focus from guilt to metabolic physiology.',
    fullText: 'When I received a PCOS diagnosis at 24, the only advice given was restrictive dieting. Finding an endocrinologist who tested fasting insulin and HOMA-IR shifted the focus from guilt to metabolic physiology.\n\nLearning that high circulating insulin drives androgen production in ovarian theca cells gave me clarity on why my cycles were 45+ days long and why lifestyle changes needed to focus on protein balance and resistance training rather than crash calorie cuts.',
    likes: 62,
    replyCount: 18,
    replies: [
      { author: 'Sunita_J', handle: '@sunita_j', timeAgo: '4d ago', text: 'The metabolic connection is so under-explained. Inositol supplements with my doctor\'s guidance helped restore my cycle within 4 months.' },
      { author: 'Radhika_P', handle: '@radhika_p', timeAgo: '3d ago', text: 'Asking specifically for fasting insulin instead of just fasting glucose was the game-changer for me.' }
    ]
  },
  {
    id: 'cv-4',
    author: 'Divya_N',
    handle: '@divya_n',
    initials: 'DN',
    tone: 'tone-blue',
    category: 'Endometriosis',
    tags: ['Endometriosis', 'Laparoscopy', 'Validation'],
    keywords: ['endometriosis', 'endo', 'severe cramping', 'pelvic pain', 'laparoscopy', 'inflammatory'],
    timeAgo: '1w ago',
    title: '7 years to diagnosis: how keeping an objective symptom journal changed the outcome',
    snippet: 'For years I was told severe menstrual pain was just "part of womanhood". It was only when I documented absenteeism, pain scale numbers, and GI symptoms during menses that a specialist finally referred me for MRI and laparoscopic evaluation.',
    fullText: 'For years I was told severe menstrual pain was just "part of womanhood". It was only when I documented absenteeism, pain scale numbers, and GI symptoms during menses that a specialist finally referred me for MRI and laparoscopic evaluation.\n\nIf you are struggling with debilitating pain, know that missing work, fainting, or pain unresponsive to NSAIDs is not normal physiology. Don\'t hesitate to seek a second opinion from an endometriosis excision specialist.',
    likes: 89,
    replyCount: 22,
    replies: [
      { author: 'Aarohi_D', handle: '@aarohi_d', timeAgo: '6d ago', text: 'The validation alone after years of being dismissed is life-changing. Thank you for sharing this.' },
      { author: 'Shreya_G', handle: '@shreya_g', timeAgo: '5d ago', text: 'GI symptoms during the cycle (endobelly, pain with bowel movements) are classic clues that often get misdiagnosed as IBS.' }
    ]
  },
  {
    id: 'cv-5',
    author: 'Shreya_G',
    handle: '@shreya_g',
    initials: 'SG',
    tone: 'tone-lav',
    category: 'Menstrual health',
    tags: ['Cycle irregularity', 'Luteal phase', 'Progesterone'],
    keywords: ['menstrual', 'period', 'irregular periods', 'cycle', 'spotting', 'luteal', 'cramps'],
    timeAgo: '3d ago',
    title: 'Short luteal phase and premenstrual spotting: discussing ovulation confirmation',
    snippet: 'My cycles were 24 days with 4 days of brown spotting before actual flow. My doctor explained that tracking basal body temperature and testing mid-luteal progesterone could confirm whether ovulation was robust.',
    fullText: 'My cycles were 24 days with 4 days of brown spotting before actual flow. My doctor explained that tracking basal body temperature and testing mid-luteal progesterone could confirm whether ovulation was robust.\n\nInstead of just taking birth control to "regulate" the bleed, we investigated underlying thyroid and prolactin levels, which normalized the cycle length once addressed.',
    likes: 29,
    replyCount: 7,
    replies: [
      { author: 'Meera_K', handle: '@meera_k', timeAgo: '2d ago', text: 'So glad you looked into the root cause. Spotting prior to Day 1 is frequently a sign of early progesterone drop-off.' }
    ]
  },
  {
    id: 'cv-6',
    author: 'Radhika_P',
    handle: '@radhika_p',
    initials: 'RP',
    tone: 'tone-rose',
    category: 'Hormonal health',
    tags: ['Perimenopause', 'Night sweats', 'Hormone balance'],
    keywords: ['hormonal', 'perimenopause', 'hot flashes', 'estrogen', 'progesterone', 'mood', 'brain fog'],
    timeAgo: '4d ago',
    title: 'Perimenopause in your early 40s: recognizing the subtle hormonal shifts',
    snippet: 'It didn\'t start with missed periods. It started with waking at 3 AM with a racing pulse, inexplicable joint aches, and mood variability 10 days before my cycle. Blood hormone tests were fluctuating, but symptom patterns told the real story.',
    fullText: 'It didn\'t start with missed periods. It started with waking at 3 AM with a racing pulse, inexplicable joint aches, and mood variability 10 days before my cycle. Blood hormone tests were fluctuating, but symptom patterns told the real story.\n\nMy gynecologist reminded me that perimenopause is a clinical diagnosis based on symptoms and age, not a single blood draw snapshot. Tailored HRT evaluation gave me my sleep and cognitive clarity back.',
    likes: 53,
    replyCount: 15,
    replies: [
      { author: 'Kavita_M', handle: '@kavita_m', timeAgo: '3d ago', text: 'The 3 AM awakening is classic estrogen volatility. Thank you for highlighting that cycles can remain regular in early perimenopause!' }
    ]
  },
  {
    id: 'cv-7',
    author: 'Kavita_M',
    handle: '@kavita_m',
    initials: 'KM',
    tone: 'tone-sage',
    category: 'Sleep & stress',
    tags: ['Sleep', 'Cortisol', 'Anxiety', 'Insomnia'],
    keywords: ['sleep', 'insomnia', 'stress', 'anxiety', 'cortisol', 'waking up', 'exhaustion'],
    timeAgo: '1w ago',
    title: 'Breaking the cycle of high nighttime cortisol and fragmented sleep',
    snippet: 'Waking up feeling as if I had sprinted a marathon led me to track my evening screen habits, caffeine cutoff, and bedtime heart rate variability. Simple circadian alignment made a tangible difference.',
    fullText: 'Waking up feeling as if I had sprinted a marathon led me to track my evening screen habits, caffeine cutoff, and bedtime heart rate variability. Simple circadian alignment made a tangible difference.\n\nPairing magnesium glycinate with a strict 2 PM caffeine cutoff and 10 minutes of gentle morning sunlight shifted my sleep architecture within three weeks. Always discuss supplement choices with your physician first.',
    likes: 41,
    replyCount: 11,
    replies: [
      { author: 'Tanvi_S', handle: '@tanvi_s', timeAgo: '5d ago', text: 'Morning sunlight within 30 minutes of waking was surprisingly effective for resetting my internal clock.' },
      { author: 'Priya_M', handle: '@priya_m', timeAgo: '4d ago', text: 'Magnesium glycinate versus citrate makes such a big difference for nighttime relaxation without stomach upset.' }
    ]
  },
  {
    id: 'cv-8',
    author: 'Tanvi_S',
    handle: '@tanvi_s',
    initials: 'TS',
    tone: 'tone-blue',
    category: 'Fatigue & low energy',
    tags: ['Chronic fatigue', 'Post-viral', 'Pacing'],
    keywords: ['fatigue', 'low energy', 'exhaustion', 'tired', 'brain fog', 'post-viral', 'pacing'],
    timeAgo: '5d ago',
    title: 'Learning the discipline of energy pacing when dealing with persistent fatigue',
    snippet: 'The boom-and-bust cycle was draining me: on high-energy days I would clean the whole house and run all errands, only to be bedridden for the next three days. Learning cognitive and physical pacing changed everything.',
    fullText: 'The boom-and-bust cycle was draining me: on high-energy days I would clean the whole house and run all errands, only to be bedridden for the next three days. Learning cognitive and physical pacing changed everything.\n\nNow I set an energy budget: stopping an activity when I still have 20% left in the tank. It felt counterintuitive initially, but keeping that reserve prevented post-exertional crashes.',
    likes: 38,
    replyCount: 8,
    replies: [
      { author: 'Aarohi_D', handle: '@aarohi_d', timeAgo: '3d ago', text: 'The "energy envelope" concept saved my sanity. Acknowledging that rest is productive was my biggest mindset shift.' }
    ]
  },
  {
    id: 'cv-9',
    author: 'Sunita_J',
    handle: '@sunita_j',
    initials: 'SJ',
    tone: 'tone-lav',
    category: 'General wellness',
    tags: ['Gut health', 'Bloating', 'Microbiome'],
    keywords: ['bloating', 'abdominal', 'nausea', 'digestive', 'gut', 'microbiome', 'nutrition'],
    timeAgo: '6d ago',
    title: 'Recurrent abdominal bloating: how we differentiated hormonal bloating from SIBO/IBS',
    snippet: 'My stomach would swell noticeably by evening regardless of meal size. Charting symptoms alongside both food and cycle day revealed a combined pattern: progesterone slowed motility, but bacterial overgrowth exacerbated fermentation.',
    fullText: 'My stomach would swell noticeably by evening regardless of meal size. Charting symptoms alongside both food and cycle day revealed a combined pattern: progesterone slowed motility, but bacterial overgrowth exacerbated fermentation.\n\nA lactulose breath test ordered by my gastroenterologist confirmed mild SIBO. Treating the bacterial imbalance along with cycle-phase-specific dietary adjustments provided lasting relief.',
    likes: 45,
    replyCount: 12,
    replies: [
      { author: 'Neha_B', handle: '@neha_b', timeAgo: '4d ago', text: 'Progesterone\'s effect on smooth muscle relaxation extends to the intestines! So many women experience sluggish digestion in the luteal phase.' }
    ]
  },
  {
    id: 'cv-10',
    author: 'Roshni_K',
    handle: '@roshni_k',
    initials: 'RK',
    tone: 'tone-rose',
    category: 'Pelvic discomfort',
    tags: ['Pelvic floor', 'Physical therapy', 'Hypertonic'],
    keywords: ['pelvic', 'pelvic floor', 'hypertonic', 'cramping', 'discomfort', 'physical therapy', 'dyspareunia'],
    timeAgo: '2w ago',
    title: 'Discovering pelvic floor physical therapy for non-relaxing (hypertonic) pelvic floor',
    snippet: 'I assumed my pelvic tension required Kegels (strengthening). Seeing a specialized pelvic floor physical therapist revealed the opposite: my muscles were constantly contracted and unable to relax.',
    fullText: 'I assumed my pelvic tension required Kegels (strengthening). Seeing a specialized pelvic floor physical therapist revealed the opposite: my muscles were constantly contracted and unable to relax.\n\nDiaphragmatic breathing, internal trigger point release, and down-training exercises reduced my chronic pelvic aching by 70% in two months. Kegels would have made my condition worse.',
    likes: 76,
    replyCount: 19,
    replies: [
      { author: 'Priya_M', handle: '@priya_m', timeAgo: '1w ago', text: 'Pelvic PT should be prescribed routinely! Learning how to properly release pelvic tension was an absolute breakthrough.' },
      { author: 'Divya_N', handle: '@divya_n', timeAgo: '1w ago', text: 'Same experience here. Hypertonic pelvic floor mimics interstitial cystitis and endometriosis symptoms so closely.' }
    ]
  },
  {
    id: 'cv-11',
    author: 'Ishita_S',
    handle: '@ishita_s',
    initials: 'IS',
    tone: 'tone-sage',
    category: 'Hormonal health',
    tags: ['Headaches', 'Menstrual migraine', 'Estrogen drop'],
    keywords: ['headache', 'migraine', 'dizziness', 'lightheadedness', 'estrogen drop', 'hormonal'],
    timeAgo: '1w ago',
    title: 'Managing cyclical migraines tied to the premenstrual estrogen drop',
    snippet: 'Like clockwork, 48 hours before my period began, I would get a throbbing left-sided headache with nausea. My neurologist and gynecologist coordinated care to target the estrogen withdrawal trigger.',
    fullText: 'Like clockwork, 48 hours before my period began, I would get a throbbing left-sided headache with nausea. My neurologist and gynecologist coordinated care to target the estrogen withdrawal trigger.\n\nWe used low-dose transdermal estradiol patches during the late luteal window to buffer the sharp drop. Having clear dates from my cycle tracking made the timing precise enough to be effective.',
    likes: 39,
    replyCount: 10,
    replies: [
      { author: 'Shreya_G', handle: '@shreya_g', timeAgo: '5d ago', text: 'Menstrual migraines can be so debilitating because standard painkillers rarely touch hormonal headaches.' }
    ]
  },
  {
    id: 'cv-12',
    author: 'Pooja_V',
    handle: '@pooja_v',
    initials: 'PV',
    tone: 'tone-blue',
    category: 'Menstrual health',
    tags: ['Heavy bleeding', 'Fibroids', 'Menorrhagia'],
    keywords: ['menstrual', 'period', 'bleeding', 'heavy periods', 'menorrhagia', 'fibroids', 'iron'],
    timeAgo: '2w ago',
    title: 'Heavy menstrual bleeding: understanding when bleeding volume needs evaluation',
    snippet: 'Needing to change a super tampon every 90 minutes and passing clots larger than a coin was something I normalized for years. When I actually quantified my menstrual cup volume, the numbers were three times clinical menorrhagia limits.',
    fullText: 'Needing to change a super tampon every 90 minutes and passing clots larger than a coin was something I normalized for years. When I actually quantified my menstrual cup volume, the numbers were three times clinical menorrhagia limits.\n\nA pelvic ultrasound identified two submucosal fibroids. Minimally invasive hysteroscopic removal completely normalized my flow and corrected my chronic iron depletion.',
    likes: 58,
    replyCount: 16,
    replies: [
      { author: 'Meera_K', handle: '@meera_k', timeAgo: '1w ago', text: 'Quantifying volume was eye-opening for me too. We are taught to endure so much bleeding without realizing it is treatable.' }
    ]
  },
  {
    id: 'cv-13',
    author: 'Aditi_C',
    handle: '@aditi_c',
    initials: 'AC',
    tone: 'tone-lav',
    category: 'PCOS',
    tags: ['PCOS', 'Acne', 'Androgens', 'Skin'],
    keywords: ['pcos', 'acne', 'hormonal acne', 'androgens', 'skin', 'dermatology', 'spironolactone'],
    timeAgo: '3w ago',
    title: 'Hormonal cystic jawline acne: connecting dermatology and endocrinology',
    snippet: 'Topical retinoids and antibiotics cleared surface breakouts temporarily, but painful deep cysts along my jawline flared every single luteal phase. Teaming a dermatologist with my endocrinologist finally addressed the androgen signaling.',
    fullText: 'Topical retinoids and antibiotics cleared surface breakouts temporarily, but painful deep cysts along my jawline flared every single luteal phase. Teaming a dermatologist with my endocrinologist finally addressed the androgen signaling.\n\nEvaluating DHEA-S and free testosterone clarified that peripheral androgen receptor sensitivity was the driving factor. Targeted non-antibiotic anti-androgen therapy resolved the recurrence.',
    likes: 44,
    replyCount: 13,
    replies: [
      { author: 'Tanvi_S', handle: '@tanvi_s', timeAgo: '2w ago', text: 'Jawline and chin cysts are such reliable indicators of androgen fluctuations. Great to see collaborative care.' }
    ]
  },
  {
    id: 'cv-14',
    author: 'Meera_K',
    handle: '@meera_k',
    initials: 'MK',
    tone: 'tone-rose',
    category: 'Sleep & stress',
    tags: ['Sleep apnea', 'Fatigue', 'Sleep quality'],
    keywords: ['sleep', 'fatigue', 'tired', 'dizziness', 'waking up', 'snoring', 'unrefreshing sleep'],
    timeAgo: '3w ago',
    title: 'Unrefreshing sleep in women without obvious snoring: home sleep study findings',
    snippet: 'I didn\'t fit the stereotypical profile of sleep apnea, but waking up unrefreshed with mild morning lightheadedness prompted my doctor to order a home sleep apnea test. It uncovered Upper Airway Resistance Syndrome (UARS).',
    fullText: 'I didn\'t fit the stereotypical profile of sleep apnea, but waking up unrefreshed with mild morning lightheadedness prompted my doctor to order a home sleep apnea test. It uncovered Upper Airway Resistance Syndrome (UARS).\n\nWomen often present with subtle airway resistance that fragments REM sleep without the loud snoring seen in men. Treating it eliminated my chronic brain fog and morning dizziness.',
    likes: 51,
    replyCount: 14,
    replies: [
      { author: 'Aarohi_D', handle: '@aarohi_d', timeAgo: '2w ago', text: 'UARS is so underdiagnosed in young women. Thank you for raising awareness about atypical presentations.' }
    ]
  },
  {
    id: 'cv-15',
    author: 'Farida_Z',
    handle: '@farida_z',
    initials: 'FZ',
    tone: 'tone-sage',
    category: 'General wellness',
    tags: ['Cycle synching', 'Nutrition', 'Energy'],
    keywords: ['nutrition', 'cycle', 'energy', 'wellness', 'diet', 'luteal phase', 'lifestyle'],
    timeAgo: '1mo ago',
    title: 'Adapting exercise and carbohydrate intake across the follicular and luteal phases',
    snippet: 'Instead of forcing identical high-intensity workouts all month long, matching training load and complex carb intake to metabolic shifts in the luteal phase prevented burnout and reduced PMS symptoms.',
    fullText: 'Instead of forcing identical high-intensity workouts all month long, matching training load and complex carb intake to metabolic shifts in the luteal phase prevented burnout and reduced PMS symptoms.\n\nDuring the follicular phase, estrogen supports higher insulin sensitivity and muscle recovery. In the luteal phase, baseline metabolic rate rises slightly while core temperature and progesterone increase, making gentler strength and steady-state sessions feel much more restorative.',
    likes: 67,
    replyCount: 20,
    replies: [
      { author: 'Radhika_P', handle: '@radhika_p', timeAgo: '3w ago', text: 'Giving myself permission to do low-impact yoga during the 5 days before my period was the kindest thing I ever did for my cycle.' }
    ]
  }
];

/**
 * Filter and prioritize community discussions by symptom terms and category
 */
export function getCommunityVoices(matchedTerms = [], activeCategory = 'All', limit = 6) {
  const normalizedTerms = (matchedTerms || []).map(t => String(t).toLowerCase().trim()).filter(Boolean);

  let pool = [...DEMO_COMMUNITY_VOICES];

  // Category filtering
  if (activeCategory && activeCategory !== 'All') {
    pool = pool.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());
  }

  // Relevance scoring based on matched terms
  const scored = pool.map(item => {
    let score = 0;
    if (normalizedTerms.length > 0) {
      const itemKeywords = (item.keywords || []).map(k => k.toLowerCase());
      const titleLower = item.title.toLowerCase();
      const snippetLower = item.snippet.toLowerCase();
      const categoryLower = item.category.toLowerCase();

      for (const term of normalizedTerms) {
        if (itemKeywords.some(k => k.includes(term) || term.includes(k))) score += 5;
        if (titleLower.includes(term)) score += 3;
        if (snippetLower.includes(term)) score += 2;
        if (categoryLower.includes(term)) score += 4;
      }
    }
    return { ...item, relevanceScore: score };
  });

  // Sort by relevance score descending, then by likes descending
  scored.sort((a, b) => {
    if (b.relevanceScore !== a.relevanceScore) {
      return b.relevanceScore - a.relevanceScore;
    }
    return b.likes - a.likes;
  });

  return {
    total: scored.length,
    voices: scored.slice(0, limit),
    hasMore: scored.length > limit
  };
}

export function getVoiceById(id) {
  return DEMO_COMMUNITY_VOICES.find(v => v.id === id) || null;
}

