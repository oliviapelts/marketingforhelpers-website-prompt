export type HelperType =
  | "Therapist"
  | "LMHC"
  | "LCSW"
  | "Psychologist"
  | "Doctor"
  | "Nutritionist"
  | "Health Coach"
  | "Acupuncturist"
  | "Massage Therapist"
  | "Speech-Language Pathologist"
  | "OT/PT"
  | "Doula"
  | "Midwife"
  | "Wellness Coach"
  | "Physiotherapist"
  | "Custom";

export interface ThemePreset {
  id: string;
  name: string;
  desc: string;
  bgColor: string;
  cardColor: string;
  primaryColor: string; // e.g. "bg-emerald-600 hover:bg-emerald-700"
  textColor: string;    // e.g. "text-emerald-900"
  headingFont: string;  // Class representing font-serif or font-sans
  accentText: string;   // Accent color code like text-emerald-600
  accentBg: string;     // bg-emerald-50
  borderAccent: string; // border-emerald-100
  badgeStyle: string;   // bg-emerald-100 text-emerald-800
}

export interface ServiceItem {
  name: string;
  desc: string;
  format: string;
  rate: string;
}

export interface Testimonial {
  text: string;
  author: string;
}

export interface SpecialtyItem {
  title: string;
  desc: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export interface WebsiteCopy {
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  philosophyHeading: string;
  philosophyBody: string;
  services: ServiceItem[];
  testimonials: Testimonial[];
  bookingIntro: string;
  specialtiesHeading?: string;
  specialties?: SpecialtyItem[];
  teamHeading?: string;
  team?: TeamMember[];
  aboutHeading?: string;
  aboutBody?: string;
  aboutName?: string;
  aboutRole?: string;
  whoIWorkWithHeading?: string;
  whoIWorkWithBody?: string;
  whoIWorkWithList?: string[];
}

export interface BookingSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceName: string;
  date: string; // e.g. "2026-06-01"
  time: string;
  notes?: string;
  status: "Confirmed" | "Pending Consultation";
}

export const HELPER_TYPE_PRESETS: Record<HelperType, {
  defaultPhilosophy: string;
  defaultServices: string;
  defaultTitle: string;
  icons: string[];
  crisisNoteNeeded: boolean;
}> = {
  Therapist: {
    defaultTitle: "Compassionate Psychotherapy & Counseling",
    defaultPhilosophy: "A trauma-informed, client-centered space focused on somatic mindfulness, ACT, and depth therapy to nurture healing.",
    defaultServices: "Individual Psychotherapy, Consultation Support, Trauma Recovery Integration",
    icons: ["Heart", "UserCheck", "ShieldAlert"],
    crisisNoteNeeded: true
  },
  LMHC: {
    defaultTitle: "Licensed Clinical Mental Health Counseling",
    defaultPhilosophy: "Providing cognitive behavioral, somatic, and evidence-based psychotherapy to help you build coping mechanisms and emotional resilience.",
    defaultServices: "Mental Health Evaluation, Individual Counseling, Coping Skills Integration",
    icons: ["Heart", "UserCheck", "ShieldAlert"],
    crisisNoteNeeded: true
  },
  LCSW: {
    defaultTitle: "Clinical Social Work & Holistic Psychotherapy",
    defaultPhilosophy: "An empowering, neurodiversity-affirming, and systemic approach to counseling that honors your internal family systems and environment.",
    defaultServices: "Clinical Counseling, Somatic Healing Sessions, Resource Intake & Plan",
    icons: ["Heart", "UserCheck", "Shield"],
    crisisNoteNeeded: true
  },
  Psychologist: {
    defaultTitle: "Evidence-Based Psychological Care & Assessment",
    defaultPhilosophy: "Formulating scientifically validated clinical solutions, cognitive restructuring, psychotherapeutic interventions, and compassionate diagnostic depth.",
    defaultServices: "Diagnostic Psychological Intake, Cognitive Behavioral Therapy, Clinical Collaboration",
    icons: ["UserCheck", "BookOpen", "Activity"],
    crisisNoteNeeded: true
  },
  Doctor: {
    defaultTitle: "Integrative Medical Care & Clinical Support",
    defaultPhilosophy: "Evidence-based, comprehensive family medicine with a focus on active prevention, dietary health, and full-body wellness.",
    defaultServices: "Adult Wellness Intake, Comprehensive Blood Analysis, Preventative Health Coaching",
    icons: ["Activity", "Stethoscope", "Award"],
    crisisNoteNeeded: false
  },
  Nutritionist: {
    defaultTitle: "Bio-Individual Clinical Nutrition & Dietary Guidance",
    defaultPhilosophy: "Rebuilding your relationship with food through scientific metabolic coaching, intuitive eating principles, and personalized cellular nourishment.",
    defaultServices: "Comprehensive Nutritional Assessment, Metabolic Food Sourcing Plan, 1-on-1 Lifestyle Guidance",
    icons: ["Compass", "Heart", "Activity"],
    crisisNoteNeeded: false
  },
  "Health Coach": {
    defaultTitle: "Integrative Health, Vitality, & Wellness Coaching",
    defaultPhilosophy: "Partnering together to design sustainable daily habits, optimize circadian rhythm, build physical energy, and master habit loops.",
    defaultServices: "Wellness Vision Assessment, Habit Mapping Session, Monthly Energy Coaching Care",
    icons: ["Flame", "Goal", "Compass"],
    crisisNoteNeeded: false
  },
  Acupuncturist: {
    defaultTitle: "Classical Acupuncture, Meridian & Somatic Healing",
    defaultPhilosophy: "Restoring physiological balance, soothing chronic muscular distress, and regulating the autonomic nervous system via traditional Chinese medicine pathways.",
    defaultServices: "Comprehensive Meridian Assessment, Somatic Acupuncture Care, Cupping & Herbal Consultation",
    icons: ["Zap", "Sparkles", "Heart"],
    crisisNoteNeeded: false
  },
  "Massage Therapist": {
    defaultTitle: "Somatic Bodywork & Deep Tissue Rehabilitation",
    defaultPhilosophy: "Relieving physical tension, facilitating deep muscular recovery, and calming somatic nervous systems through targeted manual touch.",
    defaultServices: "Deep Tissue Muscle Therapy, Somatic Myofascia Flow, Integrative Stress Relief Bodywork",
    icons: ["HeartHandshake", "Smile", "Plus"],
    crisisNoteNeeded: false
  },
  "Speech-Language Pathologist": {
    defaultTitle: "Speech, Language, & Communication Therapy",
    defaultPhilosophy: "Empowering functional expression, pediatric language fluency, social-pragmatic confidence, and swallowing rehabilitation with patient-centered goals.",
    defaultServices: "Comprehensive Language Assessment, Speech Fluency Intervention Session, Cognitive-Communication Coaching",
    icons: ["Smile", "MessageSquare", "Users"],
    crisisNoteNeeded: false
  },
  "OT/PT": {
    defaultTitle: "Occupational, Physical & Somatic Therapy",
    defaultPhilosophy: "Empowering daily movement mastery, sensory regulation, physical rehabilitation, and skeletal alignment to restore your active independence.",
    defaultServices: "Somatic Functional Assessment, Muscle Rehabilitation Session, Custom Daily Exercise System",
    icons: ["Activity", "Layers", "Award"],
    crisisNoteNeeded: false
  },
  Doula: {
    defaultTitle: "Empathetic Birth & Postpartum Support",
    defaultPhilosophy: "Honoring the sacred portal of birth. Providing non-judgmental comfort, maternal advocacy, research support, and continuous postpartum nourishment.",
    defaultServices: "Complete Prenatal Visits, Birth Attendance & Delivery Support, 4th Trimester Postpartum Care",
    icons: ["Smile", "Layers", "Home"],
    crisisNoteNeeded: false
  },
  Midwife: {
    defaultTitle: "Holistic Midwifery Care & Family Births",
    defaultPhilosophy: "Nurturing physiological birthing models, clinical midwifery monitoring, water births, and holistic family planning in home and center environments.",
    defaultServices: "Comprehensive Midwifery Prenatal Intake, Home Birth Clinical Attendance, Newborn Screening & Pediatric Care",
    icons: ["Flower", "HeartHandshake", "Sparkles"],
    crisisNoteNeeded: false
  },
  "Wellness Coach": {
    defaultTitle: "Empathetic Life Alignment & Integrative Coaching",
    defaultPhilosophy: "Aligning your daily habits, self-talk, and bio-individual nutrition with your highest values to break free from stagnation.",
    defaultServices: "1-on-1 Lifestyle Vision Mapping, Habit Architecture Integration, Emotional Wellness Audits",
    icons: ["Flame", "Goal", "Compass"],
    crisisNoteNeeded: false
  },
  Physiotherapist: {
    defaultTitle: "Somatic Physical Rehabilitation & Healing",
    defaultPhilosophy: "Empowering hands-on healing, muscular re-education, mobility alignment, and custom kinetic training to restore confident movement.",
    defaultServices: "In-Depth Somatic Functional Mobility Assessment, Manual Soft Tissue Release, Customized Orthopedic Recovery Planning",
    icons: ["Zap", "Users", "Briefcase"],
    crisisNoteNeeded: false
  },
  Custom: {
    defaultTitle: "Holistic Integrated Helper & Care Practitioner",
    defaultPhilosophy: "A customizable care framework designed to honor your exact training, clinical standards, and custom practice vision.",
    defaultServices: "Core Consultation, Comprehensive Practice Intake, Regular Integrative Session",
    icons: ["HeartHandshake", "UserCheck", "Compass"],
    crisisNoteNeeded: false
  }
};

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "therapeutic-calm",
    name: "Therapeutic Calm",
    desc: "Warm earth tones, soothing sage greens, and serif typography. Ideal for counselors and therapists.",
    bgColor: "bg-[#F9F6F0]", // Warm linen soft off-white
    cardColor: "bg-white",
    primaryColor: "bg-[#4E6E58] hover:bg-[#3D5645] text-white", // Sage green
    textColor: "text-[#2C3E30]",
    headingFont: "font-serif",
    accentText: "text-[#4E6E58]",
    accentBg: "bg-[#ECF2ED]",
    borderAccent: "border-[#D6E3D8]",
    badgeStyle: "bg-[#E6ECE8] text-[#34513C]"
  },
  {
    id: "clinical-professional",
    name: "Clinical Professional",
    desc: "Clean slate-blue tones, high-contrast crisp text, and trust-focused layout. Ideal for medical professionals.",
    bgColor: "bg-[#F3F4F6]", // Clear cool grey
    cardColor: "bg-white",
    primaryColor: "bg-[#1E40AF] hover:bg-[#1E3A8A] text-white", // Trust Blue
    textColor: "text-[#1F2937]",
    headingFont: "font-sans font-semibold tracking-tight",
    accentText: "text-[#1E40AF]",
    accentBg: "bg-[#EFF6FF]",
    borderAccent: "border-[#DBEAFE]",
    badgeStyle: "bg-[#DBEAFE] text-[#1E40AF]"
  },
  {
    id: "warm-nurturing",
    name: "Warm Nurturing",
    desc: "Peachy-rose accents, warm earthy textures, and welcoming rounded shapes. Perfect for birth doulas and midwives.",
    bgColor: "bg-[#FAF3F0]", // Soft rosewater peach
    cardColor: "bg-white",
    primaryColor: "bg-[#C26D5C] hover:bg-[#AC5B4B] text-white", // Warm terracotta clay
    textColor: "text-[#441D17]",
    headingFont: "font-serif font-semibold italic",
    accentText: "text-[#C26D5C]",
    accentBg: "bg-[#FDEDE7]",
    borderAccent: "border-[#FAD9CE]",
    badgeStyle: "bg-[#FAD9CE] text-[#86372B]"
  },
  {
    id: "modern-organic",
    name: "Modern Organic",
    desc: "Rich forest, charcoal oat backdrop, minimalist look with monospaced details. Perfect for modern wellness practitioners.",
    bgColor: "bg-[#FAF7F2]", // Oatmeal cream
    cardColor: "bg-white",
    primaryColor: "bg-[#2D3A20] hover:bg-[#1E2715] text-white", // Pure moss forest green
    textColor: "text-[#252822]",
    headingFont: "font-sans font-light tracking-wide",
    accentText: "text-[#2D3A20]",
    accentBg: "bg-[#F1F4EE]",
    borderAccent: "border-[#DDE5D8]",
    badgeStyle: "bg-[#E2EADA] text-[#1D2B11]"
  },
  {
    id: "playful-curious",
    name: "Playful & Curious",
    desc: "Warm buttercup background, curious lavender accents, and friendly structures. Perfect for creative therapy, child-centered helpers, and expressive arts.",
    bgColor: "bg-[#FCFAF2]", // Warm butter cream (soft yellow tint)
    cardColor: "bg-white",
    primaryColor: "bg-[#6D5ACF] hover:bg-[#5846B2] text-white", // Curious lavender purple
    textColor: "text-[#3B2C5C]", // Deep purple-charcoal text
    headingFont: "font-sans font-extrabold tracking-tight",
    accentText: "text-[#6D5ACF]",
    accentBg: "bg-[#F3EFFC]",
    borderAccent: "border-[#E1D1FC]",
    badgeStyle: "bg-[#ECE6FC] text-[#4F3EAF]"
  }
];
