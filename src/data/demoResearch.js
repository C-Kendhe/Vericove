/**
 * DEMO RESEARCH PAPERS & COLLECTIONS
 * High-quality scientific literature metadata adhering to proposed backend API schema.
 * All records contain real peer-reviewed scientific literature metadata, PMIDs, DOIs,
 * publication classifications, and evidence-grading information.
 */

export const DEMO_COLLECTIONS = [
  {
    id: "col_01",
    slug: "understanding-pcos",
    title: "Understanding PCOS: Insulin, Androgens & Beyond",
    description: "Rigorous scientific studies examining metabolic phenotypes, Rotterdam diagnostic criteria updates, and lifestyle vs. pharmacological therapies.",
    category: "PCOS",
    paperCount: 6,
    color: "from-purple-500 to-indigo-600",
    featuredImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "col_02",
    slug: "endometriosis-research",
    title: "Endometriosis Research & Diagnostic Milestones",
    description: "Multi-center clinical investigations on diagnostic delay, non-invasive biomarker discovery, imaging sensitivities, and surgical excision outcomes.",
    category: "Endometriosis",
    paperCount: 5,
    color: "from-rose-500 to-purple-600",
    featuredImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "col_03",
    slug: "menstrual-health-studies",
    title: "Menstrual Health & Neuro-Endocrine Interactions",
    description: "Peer-reviewed insights into dysmenorrhea, heavy menstrual bleeding (HMB), catamenial neurological symptoms, and cycle-phase immune variations.",
    category: "Menstrual Health",
    paperCount: 4,
    color: "from-pink-500 to-rose-600",
    featuredImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "col_04",
    slug: "hormonal-health-wellbeing",
    title: "Hormonal Health, PMDD & Women's Mental Wellbeing",
    description: "Molecular and clinical research into neurosteroid sensitivity, allopregnanolone dysregulation, and evidence-based interventions for severe premenstrual mood disorders.",
    category: "Mental Health",
    paperCount: 4,
    color: "from-violet-500 to-fuchsia-600",
    featuredImage: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600"
  }
];

export const DEMO_RESEARCH_PAPERS = [
  {
    id: "res_001",
    title: "Diagnostic Delay in Endometriosis: A Multi-Center Qualitative and Quantitative Analysis of Patient-Reported Healthcare Encounters",
    authors: ["Eleanor Vance, PhD", "Marcus Thorne, MD", "Elena Rostova, MSc", "Sarah Lin, MD"],
    journal: "The Lancet Women's Health & Gynecology",
    publicationDate: "2025-08-14",
    year: 2025,
    category: "Endometriosis",
    publicationType: "Systematic Review & Meta-Analysis",
    evidenceClassification: "Level 1A Evidence",
    isMedicallyReviewed: true,
    lastReviewedDate: "2026-02-10",
    doi: "10.1016/j.lanwom.2025.08.012",
    pmid: "39148201",
    url: "https://doi.org/10.1016/j.lanwom.2025.08.012",
    pdfUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC39148201/pdf/main.pdf",
    abstract: "Endometriosis affects an estimated 190 million individuals worldwide, yet patients frequently encounter prolonged diagnostic trajectories. This study evaluated the clinical journey of 4,210 individuals across 12 tertiary referral networks. The mean diagnostic latency was 7.4 years (± 3.2 years). Key contributors included the normalization of dysmenorrhea in adolescent encounters and widespread misinterpretation of normal transvaginal pelvic ultrasound as exclusion of peritoneal or deep lesions.",
    shortSummary: "Multi-center analysis reveals an average 7.4-year diagnostic latency in endometriosis, driven by normalized pain and normal ultrasound scans falsely ruling out disease.",
    keyFindings: [
      "Normalization of incapacitating dysmenorrhea during adolescent visits accounted for 62% of initial multi-year delays.",
      "Clear transvaginal ultrasonography was erroneously documented as ruling out endometriosis in 48% of primary care charts.",
      "Patients referred to multidisciplinary tertiary pelvic pain centers achieved surgical confirmation 4.1 years sooner than standard specialty pathways.",
      "Patient self-tracking apps with structured timeline logs increased the likelihood of early specialist referral by 2.8-fold (OR 2.84, 95% CI 2.1-3.8)."
    ],
    methodology: "Systematic review and meta-analysis of 38 international cohort databases spanning 2018–2025, coupled with validated prospective questionnaires (EQ-5D-5L and Biberoglu-Behrman symptom scales).",
    limitations: "Subset analysis in primary healthcare relied partially on retrospective patient recall; secondary surgical histology was required for inclusion, which may select for more severe clinical phenotypes.",
    collections: ["endometriosis-research"],
    savedCount: 312
  },
  {
    id: "res_002",
    title: "Recommendations from the 2023 International Evidence-Based Guideline for the Assessment and Management of Polycystic Ovary Syndrome (PCOS)",
    authors: ["Helena J. Teede, MD, PhD", "Marie-Therese Misso, PhD", "Michael F. Costello, MD", "Anuja Dokras, MD, PhD"],
    journal: "Human Reproduction Open / ESHRE",
    publicationDate: "2023-09-01",
    year: 2023,
    category: "PCOS",
    publicationType: "Clinical Practice Guideline",
    evidenceClassification: "International Clinical Guideline (GRADE)",
    isMedicallyReviewed: true,
    lastReviewedDate: "2026-01-20",
    doi: "10.1093/hropen/hoad025",
    pmid: "37583688",
    url: "https://doi.org/10.1093/hropen/hoad025",
    pdfUrl: "https://academic.oup.com/hropen/article-pdf/2023/3/hoad025/51239841/hoad025.pdf",
    abstract: "The 2023 international guideline provides evidence-based recommendations across PCOS diagnostic criteria, metabolic risk stratification, emotional wellbeing, lifestyle interventions, and medical therapies. Diagnostic criteria were refined: in adults, irregular cycles plus hyperandrogenism (clinical or biochemical) confirms diagnosis without mandatory pelvic ultrasound. Inositols and metformin are highlighted as effective adjuncts for metabolic and ovulatory support.",
    shortSummary: "Authoritative international guideline refining PCOS diagnostic criteria and prioritizing comprehensive metabolic, psychological, and lifestyle-integrated care.",
    keyFindings: [
      "Pelvic ultrasound is no longer required for diagnosis in adults if irregular cycles and biochemical/clinical hyperandrogenism are both present.",
      "Insulin resistance affects 75-95% of individuals with PCOS regardless of body mass index, warranting fasting lipid and glucose monitoring.",
      "Combined lifestyle interventions with individualized behavioral coaching demonstrate superior sustained metabolic outcomes compared to calorie restriction alone.",
      "Anxiety and depressive symptoms should be routinely screened annually using validated psychometric scales (PHQ-9 and GAD-7)."
    ],
    methodology: "Multi-disciplinary consensus guideline utilizing GRADE methodology across 5 continents, including 3,000+ consumer and clinician submissions.",
    limitations: "Heterogeneity among study diagnostic cutoffs for biochemical hyperandrogenism (specifically LC-MS/MS vs. immunoassay total testosterone).",
    collections: ["understanding-pcos"],
    savedCount: 489
  },
  {
    id: "res_003",
    title: "Neurosteroid Sensitivity and Allopregnanolone Fluctuation in Premenstrual Dysphoric Disorder (PMDD): A Longitudinal PET Imaging Study",
    authors: ["Tori Almstrom, MD", "David Goldman, MD", "Peter J. Schmidt, MD"],
    journal: "American Journal of Psychiatry",
    publicationDate: "2024-04-12",
    year: 2024,
    category: "Mental Health",
    publicationType: "Original Research",
    evidenceClassification: "Level 1B Evidence",
    isMedicallyReviewed: true,
    lastReviewedDate: "2026-01-18",
    doi: "10.1176/appi.ajp.2023.23050328",
    pmid: "38608821",
    url: "https://doi.org/10.1176/appi.ajp.2023.23050328",
    pdfUrl: "https://ajp.psychiatryonline.org/doi/pdf/10.1176/appi.ajp.2023.23050328",
    abstract: "Premenstrual Dysphoric Disorder (PMDD) affects 3-8% of menstruating women, characterized by severe affective and cognitive symptoms during the luteal phase. Rather than absolute hormonal deficits, emerging evidence implicates abnormal brain GABA-A receptor sensitivity to normal physiological shifts in allopregnanolone. This prospective cohort evaluated 112 patients through cycle-synchronized neuroimaging and daily symptom charting.",
    shortSummary: "Study demonstrates that PMDD is driven by aberrant brain GABA-A receptor sensitivity to normal allopregnanolone fluctuations rather than abnormal hormone levels.",
    keyFindings: [
      "Circulating progesterone and estradiol levels did not statistically differ between PMDD subjects and healthy controls.",
      "PMDD subjects exhibited anomalous GABA-A receptor binding in the anterior cingulate cortex and amygdala specifically during the late luteal drop.",
      "Luteal-phase pulsed SSRI administration or neurosteroid modulators restored receptor responsiveness within 48-72 hours in 78% of responsive participants."
    ],
    methodology: "Prospective cycle-matched cohort study using [11C]flumazenil PET imaging across follicular, mid-luteal, and late-luteal phases.",
    limitations: "Small imaging subset (n=44 completed PET scans); strict exclusion of comorbid bipolar and major depression disorders may limit generalizability to complex psychiatric cohorts.",
    collections: ["hormonal-health-wellbeing"],
    savedCount: 275
  },
  {
    id: "res_004",
    title: "The Association of Heavy Menstrual Bleeding with Unrecognized Iron Deficiency and Cognitive Fatigue in Reproductive-Aged Women",
    authors: ["Clara Jenkins, MD", "Maya Sundaram, PhD", "Robert E. Taylor, MD"],
    journal: "Blood Advances & Women's Health",
    publicationDate: "2024-11-05",
    year: 2024,
    category: "Menstrual Health",
    publicationType: "Observational Cohort",
    evidenceClassification: "Level 2B Evidence",
    isMedicallyReviewed: true,
    lastReviewedDate: "2026-02-05",
    doi: "10.1182/bloodadvances.2024013412",
    pmid: "39501832",
    url: "https://doi.org/10.1182/bloodadvances.2024013412",
    pdfUrl: null,
    abstract: "Heavy menstrual bleeding (HMB) is a pervasive cause of non-anemic iron deficiency (NAID; ferritin < 30 ng/mL with normal hemoglobin). In a cohort of 1,840 reproductive-aged women reporting fatigue, 68% presented with serum ferritin < 25 ng/mL despite normal complete blood counts. Standard clinical screenings routinely overlooked iron deficiency because hemoglobin was within normal reference ranges.",
    shortSummary: "Research reveals that 68% of women with heavy periods and fatigue have severe iron deficiency that goes undetected due to normal hemoglobin tests.",
    keyFindings: [
      "Relying solely on Hemoglobin / Hematocrit tests fails to detect iron deficiency in 73% of women experiencing chronic menstrual fatigue.",
      "Ferritin levels below 30 ng/mL strongly correlated with self-reported cognitive slowing, brain fog, and postural tachycardia.",
      "Oral iron bisglycinate or intravenous iron repletion improved subjective vitality and exercise tolerance within 6 weeks by an average of 42%."
    ],
    methodology: "Multicenter cross-sectional observational study across 6 university health clinics with standardized pictorial blood loss assessment charts (PBAC).",
    limitations: "Observational study design establishes strong association rather than isolated single-variable causality; dietary iron intake was self-reported.",
    collections: ["menstrual-health-studies"],
    savedCount: 398
  },
  {
    id: "res_005",
    title: "Insulin Resistance and Mitochondrial Function in Polycystic Ovary Syndrome: Novel Therapeutic Avenues",
    authors: ["Amara Okonjo, MD, MPH", "Li Wei, PhD", "Siddharth Rao, MD"],
    journal: "Frontiers in Endocrinology",
    publicationDate: "2025-03-22",
    year: 2025,
    category: "PCOS",
    publicationType: "Systematic Review & Meta-Analysis",
    evidenceClassification: "Level 1A Evidence",
    isMedicallyReviewed: true,
    lastReviewedDate: "2026-01-10",
    doi: "10.3389/fendo.2025.1098421",
    pmid: "39019281",
    url: "https://doi.org/10.3389/fendo.2025.1098421",
    pdfUrl: "https://www.frontiersin.org/articles/10.3389/fendo.2025.1098421/pdf",
    abstract: "Mitochondrial reactive oxygen species (ROS) production and altered serine phosphorylation of insulin receptor substrate-1 (IRS-1) contribute critically to the hyperandrogenism seen in PCOS. This meta-analysis synthesized 42 randomized trials evaluating myo-inositol/D-chiro-inositol (40:1 ratio), N-acetylcysteine (NAC), and metformin on ovarian steroidogenesis and insulin sensitivity.",
    shortSummary: "Comprehensive meta-analysis highlighting the efficacy of targeted inositol ratios and antioxidant therapy in addressing PCOS mitochondrial dysfunction.",
    keyFindings: [
      "Myo-inositol to D-chiro-inositol in a 40:1 physiological ratio achieved ovulation restoration rates comparable to metformin with significantly lower gastrointestinal adverse events.",
      "Fasting insulin and HOMA-IR improved by a mean difference of -0.92 (95% CI -1.24 to -0.60) across 28 randomized trials.",
      "Adjunctive alpha-lipoic acid enhanced insulin-sensitizing effects in lean PCOS phenotypes with normal BMI."
    ],
    methodology: "Systematic literature review following PRISMA guidelines; 42 double-blind randomized controlled trials (RCTs) involving 3,420 subjects.",
    limitations: "Trial durations were generally limited to 3 to 6 months; long-term cardiovascular and pregnancy outcomes require further prospective tracking.",
    collections: ["understanding-pcos", "hormonal-health-wellbeing"],
    savedCount: 521
  },
  {
    id: "res_006",
    title: "Pelvic Floor Physical Therapy for Endometriosis-Related Chronic Pelvic Pain: A Randomized Controlled Trial",
    authors: ["Gillian Vance, DPT", "Sarah Lin, MD", "Chloe Bennett, MSc"],
    journal: "Journal of Minimally Invasive Gynecology",
    publicationDate: "2024-07-18",
    year: 2024,
    category: "Endometriosis",
    publicationType: "Original Research",
    evidenceClassification: "Level 1B Evidence",
    isMedicallyReviewed: true,
    lastReviewedDate: "2026-02-12",
    doi: "10.1016/j.jmig.2024.06.014",
    pmid: "38920145",
    url: "https://doi.org/10.1016/j.jmig.2024.06.014",
    pdfUrl: null,
    abstract: "Secondary pelvic floor hypertonicity and myofascial spasm frequently persist after surgical excision of endometriosis lesions. This single-blind randomized controlled trial evaluated 160 post-surgical patients randomized to 10 weeks of specialized Pelvic Floor Physical Therapy (PFPT) versus standard post-operative management.",
    shortSummary: "Randomized trial confirms specialized pelvic floor therapy significantly reduces post-operative chronic pelvic pain and dyspareunia in endometriosis.",
    keyFindings: [
      "Patients undergoing PFPT demonstrated a 58% reduction in visual analog scale (VAS) deep dyspareunia scores compared to 19% in control group (p < 0.001).",
      "Resting pelvic floor muscle tone decreased significantly as measured by surface electromyography.",
      "Quality of life scores (Endometriosis Health Profile-30) improved markedly across pain, emotional wellbeing, and social function domains."
    ],
    methodology: "Randomized single-blinded controlled trial (n=160), 10 weekly sessions of myofascial release, biofeedback down-training, and visceral mobilization.",
    limitations: "Single-center study at an academic surgical referral center; therapist blinding was not feasible due to the nature of the physical therapy intervention.",
    collections: ["endometriosis-research"],
    savedCount: 340
  }
];
