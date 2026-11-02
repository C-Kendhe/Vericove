/**
 * DEMO COMMUNITY POSTS & DISCUSSIONS
 * Anonymous peer support threads with pseudonyms and categories.
 * Managed dynamically via GET/POST /api/community
 */

export const COMMUNITY_CATEGORIES = [
  "All",
  "Menstrual Health",
  "PCOS Experiences",
  "Endometriosis Experiences",
  "Hormonal Health",
  "Mental Wellbeing",
  "General Women's Health"
];

export const DEMO_COMMUNITY_POSTS = [
  {
    id: "post_101",
    authorPseudonym: "QuietIris94",
    avatarBg: "bg-purple-100 text-purple-700",
    category: "Endometriosis Experiences",
    title: "How did you advocate for an exploratory laparoscopy when your ultrasound was completely 'normal'?",
    content: "For three years, doctors kept telling me: 'Your ultrasound is completely pristine, so you can't have endometriosis.' But every single period, the pain is so incapacitating that my blood pressure drops and I throw up. Last month, I finally printed my 6-month symptom timeline from Vericove and brought it to a specialist. Has anyone else successfully transitioned from 'dismissed' to being heard by an excision surgeon?",
    tags: ["Laparoscopy", "Advocacy", "ClearUltrasound", "PelvicPain"],
    likesCount: 52,
    commentsCount: 16,
    userHasLiked: true,
    userHasSaved: true,
    createdAt: "2026-11-01T17:40:00Z",
    comments: [
      {
        id: "c_1",
        authorPseudonym: "LavenderBreeze",
        avatarBg: "bg-rose-100 text-rose-700",
        content: "Yes! A clear ultrasound only means they don't see large endometriomas on the ovaries. Superficial peritoneal lesions literally cannot be seen on standard ultrasound. Bringing a structured symptom log was the exact turning point for my surgeon.",
        createdAt: "2026-11-01T18:15:00Z",
        likesCount: 19
      },
      {
        id: "c_2",
        authorPseudonym: "LunaFern",
        avatarBg: "bg-indigo-100 text-indigo-700",
        content: "Ask for a specialized high-resolution transvaginal scan with bowel prep by a trained ultrasonographer, or an MRI with endometriosis protocol. Don't let anyone minimize your pain!",
        createdAt: "2026-11-01T19:02:00Z",
        likesCount: 14
      }
    ]
  },
  {
    id: "post_102",
    authorPseudonym: "SilverFern82",
    avatarBg: "bg-emerald-100 text-emerald-700",
    category: "PCOS Experiences",
    title: "The 40:1 Myo-Inositol to D-Chiro ratio: What I noticed after 90 days",
    content: "My endocrinologist recommended trying the 40:1 myo-inositol supplement alongside dietary changes instead of jumping straight to metformin due to my sensitive stomach. At first I was skeptical, but my fasting insulin dropped from 18 to 9.2 uIU/mL, and for the first time in 2 years, I had two consecutive 32-day natural cycles. Wanted to share because so many of us are told the pill is the only option.",
    tags: ["Inositol", "InsulinResistance", "PCOS", "NaturalCycle"],
    likesCount: 84,
    commentsCount: 23,
    userHasLiked: false,
    userHasSaved: true,
    createdAt: "2026-10-30T12:10:00Z",
    comments: [
      {
        id: "c_3",
        authorPseudonym: "SolarisDawn",
        avatarBg: "bg-amber-100 text-amber-700",
        content: "Check the research paper in the Vericove Research Hub by Dr. Teede! The international guidelines now explicitly recognize inositols for metabolic support.",
        createdAt: "2026-10-30T13:45:00Z",
        likesCount: 22
      }
    ]
  },
  {
    id: "post_103",
    authorPseudonym: "VelvetPetal",
    avatarBg: "bg-pink-100 text-pink-700",
    category: "Mental Wellbeing",
    title: "PMDD vs. Depression: Realizing my 'crisis days' followed a precise calendar clock",
    content: "Every month on Day 23 like clockwork, a black cloud of extreme hopelessness would settle over me. Then, within 2 hours of bleeding starting, the heavy fog would magically evaporate. It took me 7 years of feeling crazy until a reproductive psychologist diagnosed PMDD. If you feel fine for two weeks and desolate for two weeks, please track your cycle dates!",
    tags: ["PMDD", "LutealPhase", "MentalHealth", "Neurosteroids"],
    likesCount: 110,
    commentsCount: 31,
    userHasLiked: true,
    userHasSaved: false,
    createdAt: "2026-10-27T09:30:00Z",
    comments: [
      {
        id: "c_4",
        authorPseudonym: "AmberMist",
        avatarBg: "bg-violet-100 text-violet-700",
        content: "The calendar precision is what finally made my doctor listen. When you show them a chart where the exact onset is day -7 and the relief is day +1, it completely changes the diagnosis.",
        createdAt: "2026-10-27T10:20:00Z",
        likesCount: 28
      }
    ]
  },
  {
    id: "post_104",
    authorPseudonym: "OceanBreeze33",
    avatarBg: "bg-teal-100 text-teal-700",
    category: "Menstrual Health",
    title: "Check your Ferritin even if your Hemoglobin is 'Fine'",
    content: "PSA for anyone experiencing brain fog, extreme afternoon exhaustion, and heavy periods: ask for a full iron panel including Serum Ferritin! My hemoglobin was 13.2 (completely normal), but my ferritin was 8 ng/mL (depleted bone marrow stores). Doctors kept attributing my fatigue to stress or anxiety. Two months of iron infusions gave me my life back.",
    tags: ["Ferritin", "IronDeficiency", "Fatigue", "HeavyPeriods"],
    likesCount: 97,
    commentsCount: 18,
    userHasLiked: false,
    userHasSaved: false,
    createdAt: "2026-10-25T15:20:00Z",
    comments: []
  }
];
