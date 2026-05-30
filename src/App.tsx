import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Heart,
  Activity,
  Smile,
  Baby,
  Calendar,
  Clock,
  Shield,
  Check,
  Plus,
  Settings,
  Globe,
  AlertTriangle,
  HeartHandshake,
  Sparkles,
  Phone,
  Mail,
  Grid,
  Lock,
  UserCheck,
  Award,
  Compass,
  CheckCircle,
  Users,
  Sliders,
  Copy,
  Info,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  BookOpen,
  ArrowUp,
  ArrowDown,
  GripVertical,
  X,
  Play,
  MailCheck,
  Menu,
  FileText,
  Sparkle
} from "lucide-react";
import MarketingTips from "./components/MarketingTips";
import { HelperType } from "./types";

// Constant default list of 14 Lego Blocks representing Step 4 items
const DEFAULT_SECTIONS = [
  {
    id: "hero",
    name: "Hero Section",
    description: "Empathetic landing banner containing your main headline, a warm subhead, and your companion Call to Action button.",
    locked: true,
    enabled: true
  },
  {
    id: "about",
    name: "About You / Bio",
    description: "Detailed description of your credentials, core clinical approach, active licensures, and personal healing background.",
    locked: true,
    enabled: true
  },
  {
    id: "services-specialties",
    name: "Services / Specialties",
    description: "Elegant grid representing session rates, superbill options, and clinical/somatic specialties (e.g. trauma, nervous system).",
    locked: true,
    enabled: true
  },
  {
    id: "booking",
    name: "Contact / Booking Form",
    description: "HIPAA-aware client scheduling calendar and initial intake submission blocks with sensitive data masking protection.",
    locked: true,
    enabled: true
  },
  {
    id: "testimonials",
    name: "Testimonials (Ethical & Anonymous)",
    description: "High-trust recommendations utilizing certified professional peer references or clinical summaries in compliance with board rules.",
    locked: false,
    enabled: false
  },
  {
    id: "insurance",
    name: "Insurance & Sliding Scale details",
    description: "Clear explanation of session pricing transparency, out-of-network superbill helper instructions, and sliding scale offerings.",
    locked: false,
    enabled: false
  },
  {
    id: "gfe",
    name: "Good Faith Estimate Notice",
    description: "Ethical clinical cost predictability notice outlining patient protections under the No Surprises Act.",
    locked: false,
    enabled: false
  },
  {
    id: "crisis",
    name: "Crisis Resources Footer Band",
    description: "A secure, comforting alert panel routing acute safety needs directly to 988 crisis networks instead of your scheduling system.",
    locked: false,
    enabled: false
  },
  {
    id: "hipaa",
    name: "HIPAA Privacy Notice Disclosure",
    description: "A compact statement confirming secure data routing, message encryption, state-board boundaries, and safe clinical operations.",
    locked: false,
    enabled: false
  },
  {
    id: "faq",
    name: "FAQ Section",
    description: "Interactive accordions answering common onboarding questions: 'What happens in a somatic session?', 'How does billing work?'.",
    locked: false,
    enabled: false
  },
  {
    id: "embed",
    name: "EHR Booking Embed Integration",
    description: "A button or modal launcher directing prospective clients directly to your SimplePractice, IntakeQ, or TherapyNotes portal.",
    locked: false,
    enabled: false
  },
  {
    id: "modalities",
    name: "Clinical Therapy Modalities",
    description: "A clear grid highlighting specific methodologies/protocols in use (Somatic Experiencing, IFS parts work, EMDR, DBT).",
    locked: false,
    enabled: false
  },
  {
    id: "blog-link",
    name: "Featured SEO Articles",
    description: "A supportive reading section linking to your educational blog posts or nervous system regulation essays.",
    locked: false,
    enabled: false
  },
  {
    id: "newsletter",
    name: "Newsletter Soft CTA",
    description: "A non-gated email signup block to register for slow updates, monthly mental wellness ideas, or helpful readings.",
    locked: false,
    enabled: false
  }
];

export default function App() {
  // --- Persistent States from LocalStorage ---
  const [businessName, setBusinessName] = useState(() => {
    try {
      return localStorage.getItem("businessName") || "Olivia's Counseling Practice";
    } catch {
      return "Olivia's Counseling Practice";
    }
  });

  const [helperType, setHelperType] = useState<string>(() => {
    try {
      return localStorage.getItem("helperType") || "Therapist";
    } catch {
      return "Therapist";
    }
  });

  const [customHelperTitle, setCustomHelperTitle] = useState(() => {
    try {
      return localStorage.getItem("customHelperTitle") || "";
    } catch {
      return "";
    }
  });

  const [location, setLocation] = useState(() => {
    try {
      return localStorage.getItem("location") || "St. Petersburg, FL";
    } catch {
      return "St. Petersburg, FL";
    }
  });

  const [workType, setWorkType] = useState<"In-Person" | "Virtual" | "Both">(() => {
    try {
      return (localStorage.getItem("workType") as any) || "Both";
    } catch {
      return "Both";
    }
  });

  const [vibeId, setVibeId] = useState(() => {
    try {
      return localStorage.getItem("vibeId") || "warm-grounded";
    } catch {
      return "warm-grounded";
    }
  });

  const [sections, setSections] = useState(() => {
    try {
      const saved = localStorage.getItem("sectionsList");
      return saved ? JSON.parse(saved) : DEFAULT_SECTIONS;
    } catch {
      return DEFAULT_SECTIONS;
    }
  });

  // Hot Goss Newsletter signup states at bottom
  const [gossEmail, setGossEmail] = useState("");
  const [gossSuccess, setGossSuccess] = useState(false);

  // Wireframe UI interactions
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(true);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [aiOptimizing, setAiOptimizing] = useState(false);
  const [aiMessage, setAiMessage] = useState<string | null>(null);

  // Live preview simulated scheduler states
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState("Today");
  const [simulatedBookName, setSimulatedBookName] = useState("");
  const [simulatedBookEmail, setSimulatedBookEmail] = useState("");
  const [simulatedBookPhone, setSimulatedBookPhone] = useState("");
  const [simConsentChecked, setSimConsentChecked] = useState(false);
  const [showSimSuccess, setShowSimSuccess] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  // Sticky Ambient Badge state
  const [showStickyBadge, setShowStickyBadge] = useState(true);

  // --- Dynamic Live Copy Templates ---
  const [websiteCopy, setWebsiteCopy] = useState({
    tagline: "A safe space to soft-land, process life's pivots, and gentle your nervous system.",
    heroHeadline: "Warm, Somatic & Trauma-Informed Therapies For Gentle Healing",
    heroSubheadline: "Providing an empathetic clinical sanctuary in St. Petersburg and online for adults seeking authentic alignment.",
    philosophyHeading: "Our Somatic & Integrative Therapy Approach",
    philosophyBody: "We believe healing is never a linear checklist to be rushed, but an organic unfolding back to your natural state.\n\nOur objective is to accompany you as an ethical, HIPAA-aware partner in physical nervous system restoration, processing grief, and building a resilient center.",
    services: [
      {
        name: "Individual Somatic Therapy Session",
        desc: "Tailored somatic dialogue and cellular regulation focused on soothing trauma responses, calming anxiety, and restoring natural equilibrium.",
        format: "50 min • Clinic Suite or Telehealth",
        rate: "$160 / session"
      },
      {
        name: "Whole-Health Specialty Evaluation",
        desc: "An extended, deep intake session mapping nervous system habits, physical triggers, and custom developmental recovery plans.",
        format: "80 min • Comprehensive Care",
        rate: "$210 / session"
      },
      {
        name: "Discovery Consultation Check-in",
        desc: "A patient fifteen-minute video chat to share your goals, answer billing questions, and establish relational alignment.",
        format: "15 min • Phone or Virtual",
        rate: "Complimentary"
      }
    ]
  });

  // --- Sync States with LocalStorage on Change ---
  useEffect(() => {
    try {
      localStorage.setItem("businessName", businessName);
      localStorage.setItem("helperType", helperType);
      localStorage.setItem("customHelperTitle", customHelperTitle);
      localStorage.setItem("location", location);
      localStorage.setItem("workType", workType);
      localStorage.setItem("vibeId", vibeId);
      localStorage.setItem("sectionsList", JSON.stringify(sections));
    } catch (err) {
      console.warn("Could not save to localStorage: ", err);
    }
  }, [businessName, helperType, customHelperTitle, location, workType, vibeId, sections]);

  // --- Trigger LLM / Fallback copywriting based on helper setting ---
  useEffect(() => {
    const resolvedRole = helperType === "Custom" ? customHelperTitle || "Wellness Practitioner" : helperType;
    setWebsiteCopy(prev => ({
      ...prev,
      heroHeadline: `Warm, Somatic & Ethically Grounded ${resolvedRole} Services`,
      heroSubheadline: `Providing an empathetic clinical sanctuary in ${location} (${workType}) for individuals seeking gentle, somatic alignment.`,
      philosophyBody: `We believe deep, sustainable restoration starts only when you are truly heard, validated, and paced correctly.\n\nAs a dedicated ${resolvedRole.toLowerCase()} partner, we protect your story with high ethical standards, private logs, and custom-mapped nervous system containment.`
    }));
  }, [helperType, customHelperTitle, location, workType]);

  // AI copywriting optimization handler linked to full-stack Express route
  const handleOptimiseWithGemini = async () => {
    setAiOptimizing(true);
    setAiMessage(null);
    const resolvedRole = helperType === "Custom" ? customHelperTitle || "Helper" : helperType;
    try {
      const response = await fetch("/api/generate-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          helperType: resolvedRole,
          theme: vibeId,
          philosophy: `Provide slow-paced therapeutic support located in ${location}.`,
          location: `${location} (${workType})`
        })
      });
      const data = await response.json();
      if (data.copy) {
        setWebsiteCopy(prev => ({
          ...prev,
          tagline: data.copy.tagline,
          heroHeadline: data.copy.heroHeadline,
          heroSubheadline: data.copy.heroSubheadline,
          philosophyHeading: data.copy.philosophyHeading,
          philosophyBody: data.copy.philosophyBody
        }));
        setAiMessage("Successfully refined copy using Helper AI Copywriter! ✨");
      }
    } catch {
      setAiMessage("Applied highly refined local therapeutic presets.");
    } finally {
      setAiOptimizing(false);
      setTimeout(() => setAiMessage(null), 4000);
    }
  };

  // --- Dynamic Live Prompt Compiler (Step 5) ---
  const generatedPrompt = useMemo(() => {
    const resolvedRole = helperType === "Custom" ? customHelperTitle || "Helper" : helperType;

    let styleName = "Warm & Grounded";
    let styleColors = "sage greens, warm cream, soft browns";
    let styleMood = "grounded, safe, organic";

    if (vibeId === "modern-clean") {
      styleName = "Modern & Clean";
      styleColors = "deep navy, crisp white, muted gold accents";
      styleMood = "professional, modern, calm";
    } else if (vibeId === "bold-sunshine") {
      styleName = "Helpers Electric (Royal Blue & Lime)";
      styleColors = "vibrant royal cobalt blue, electric lime green, soft clean canvas";
      styleMood = "vibrant, modern, bold, friendly, high-trust";
    }

    const isSectionEnabled = (id: string) => {
      const sec = sections.find((s: any) => s.id === id);
      return sec ? sec.enabled : false;
    };

    // Constructing conditionally inserted sections
    const conditionalSections: string[] = [];

    // ▸ HERO (always included)
    conditionalSections.push(`▸ HERO (always included)
- Compelling headline that names the audience and the outcome they're looking for (not the modality)
- Subhead that adds warmth and specificity
- Primary CTA button: "Book a free consultation" or "Schedule a session"
- Secondary CTA: scroll to About or Services
- Optional: practitioner photo or warm illustration placeholder`);

    // ▸ ABOUT YOU (always included)
    conditionalSections.push(`▸ ABOUT YOU (always included)
- Practitioner photo placeholder
- First-person warm intro paragraph
- Credentials and training (listed visually, not buried)
- A personal "why I do this work" paragraph
- License number placeholder`);

    // ▸ SERVICES / SPECIALTIES (always included)
    conditionalSections.push(`▸ SERVICES / SPECIALTIES (always included)
- 3-6 service cards
- Each card: icon or illustration, service name, 1-2 sentence plain-language description, who it's for
- Avoid clinical-only language`);

    // ▸ CONTACT / BOOKING (always included)
    conditionalSections.push(`▸ CONTACT / BOOKING (always included)
- Phone, email, address (or "Virtual sessions across [STATE]")
- Office hours
- Embed placeholder for booking system
- Simple contact form: name, email, phone, "what brings you here" (optional)`);

    // Optional sections based on selection status
    if (isSectionEnabled("testimonials")) {
      conditionalSections.push(`▸ TESTIMONIALS
- 3-4 anonymized composite quotes with initials only
- Include a small footer note: "Names and details changed to protect client privacy."
- No photos of clients.`);
    }

    if (isSectionEnabled("insurance")) {
      conditionalSections.push(`▸ INVESTMENT & ACCESS
- Session fees displayed clearly
- Insurance accepted (placeholder list)
- Sliding scale availability statement
- "Out-of-network superbill available" note if relevant
- Link to Good Faith Estimate`);
    }

    if (isSectionEnabled("gfe")) {
      conditionalSections.push(`▸ GOOD FAITH ESTIMATE NOTICE
- Federally required notice block
- Plain-language explanation: "Under the No Surprises Act, you have the right to receive a Good Faith Estimate of expected charges. Please ask if you'd like a written estimate before scheduling."`);
    }

    if (isSectionEnabled("crisis")) {
      conditionalSections.push(`▸ CRISIS RESOURCES (sticky footer or banner)
- "If you are in crisis, please call 988 (Suicide & Crisis Lifeline) or text HOME to 741741 (Crisis Text Line). This website is not for emergencies."
- Place above main footer, always visible.`);
    }

    if (isSectionEnabled("hipaa")) {
      conditionalSections.push(`▸ HIPAA PRIVACY NOTICE
- Link in footer to a full HIPAA Notice of Privacy Practices page (placeholder)
- Short paragraph: "Your privacy matters. We follow HIPAA guidelines to protect your health information."`);
    }

    if (isSectionEnabled("faq")) {
      conditionalSections.push(`▸ FAQ
- 5-8 questions in an accordion
- Suggested questions: How do I know if therapy is right for me? What happens in a first session? Do you take insurance? How long does therapy take? What's the difference between [modality] and [other modality]? Is what I share confidential?`);
    }

    if (isSectionEnabled("embed")) {
      conditionalSections.push(`▸ BOOKING EMBED
- Placeholder iframe area for SimplePractice or IntakeQ embed
- Above the embed: warm one-liner like "Pick a time that works for you."`);
    }

    if (isSectionEnabled("modalities")) {
      conditionalSections.push(`▸ MY APPROACH / MODALITIES
- 2-4 modalities with plain-language explanations
- Example: "EMDR — a research-backed approach that helps your brain process hard memories so they stop running the show."`);
    }

    if (isSectionEnabled("blog-link")) {
      conditionalSections.push(`▸ INSIGHTS / BLOG (preview block)
- 3 most recent post cards with thumbnail, title, date, excerpt
- "Read more" link to blog index`);
    }

    if (isSectionEnabled("newsletter")) {
      conditionalSections.push(`▸ NEWSLETTER SIGNUP
- Email field + button
- Warm one-liner: "Get gentle reminders, therapy reflections, and updates — no spam, ever."`);
    }

    const sectionsPromptText = conditionalSections.join("\n\n");

    return `You are an expert website designer and developer building a single-page website for a mental health practitioner. Build something warm, trustworthy, and conversion-focused — not clinical or cold.

PRACTITIONER DETAILS
- Practice name: ${businessName}
- Role/credential: ${resolvedRole}
- Location: ${location}
- Service format: ${workType}

VISUAL DIRECTION
Style: ${styleName}
Color palette: ${styleColors}
Typography: pair a friendly serif (Playfair Display, Fraunces, or Lora) for headlines with a clean sans-serif (Inter or DM Sans) for body
Mood: ${styleMood}

HARD CONSTRAINTS (do not break these)
1. HIPAA-aware: never include placeholder client names, photos, or quotes that look like real testimonials. Use generic composite language like "What clients are saying" with anonymized initials or fictional first names labeled as examples.
2. No diagnostic claims. Don't say "we treat depression." Say "support for people experiencing depression."
3. No outcome promises. Don't say "guaranteed healing" or "cure your anxiety." Use language like "explore," "work through," "find support."
4. Accessibility: WCAG AA contrast minimums, semantic HTML, alt text on all images, focus states on all interactive elements.
5. Mobile-first responsive design.
6. Reading level: 5th to 8th grade. Warm, plain language. No therapy jargon unless explained.
7. Use semantic HTML5 (header, main, section, footer, nav) and Tailwind CSS classes for styling.
8. Single-page application. All sections on one page with smooth scroll anchor navigation.

REQUIRED SECTIONS (build these in this exact order)

${sectionsPromptText}

FOOTER (always)
- Practice name + credential
- Address (or "Serving ${location} virtually")
- Phone, email
- Privacy Policy link
- HIPAA Notice link
- Copyright

TECHNICAL DELIVERABLES
- Single HTML file with embedded Tailwind classes (via CDN)
- All sections on one scrollable page with anchor navigation
- Smooth scroll behavior
- Mobile breakpoint at 768px
- Color variables defined at the top in a Tailwind config or CSS custom properties for easy edits

PLACEHOLDER & INTERACTIVE CUSTOMIZATION HANDLING
- Where I haven't given you specific copy, write warm, plain-language placeholder text in [brackets] so it's obvious what to replace. Never leave "Lorem ipsum."
- CRITICAL INTERACTIVE REQUIREMENT: When rendering or processing this prompt, please explicitly ask me (the user) to provide my own custom details in the chat for each key area. Ask me step-by-step or present a checklist prompting me to customize:
  1. My high-converting tagline for the Hero section
  2. My practice mission, core values, or clinical philosophy
  3. My professional background and personal bio for the About You section
  4. The modern clinical modalities (like EMDR, IFS, somatic work) I specialize in
  5. My core clinical offerings & services (e.g., individual session format, couples therapy, custom intensives, etc.) with rates
- Provide guided, conversational ideas to help me craft elegant helper-style copy for these specific areas.`;
  }, [businessName, helperType, customHelperTitle, location, workType, vibeId, sections]);

  // --- Copy trigger handler ---
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  // Drag and Drop Lego items rearrangement
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const moveSection = (index: number, direction: "up" | "down") => {
    const nextIdx = direction === "up" ? index - 1 : index + 1;
    if (nextIdx < 0 || nextIdx >= sections.length) return;
    const updated = [...sections];
    const target = updated[index];
    updated[index] = updated[nextIdx];
    updated[nextIdx] = target;
    setSections(updated);
  };

  const handleDragStart = (idx: number) => {
    setDraggedIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === idx) return;
    const updated = [...sections];
    const items = updated.splice(draggedIdx, 1);
    updated.splice(idx, 0, items[0]);
    setDraggedIdx(idx);
    setSections(updated);
  };

  // Vibe theme presets for the live mockup frames
  const themeStyles = useMemo(() => {
    switch (vibeId) {
      case "modern-clean":
        return {
          bg: "bg-[#FAFAFA] text-[#0F1419]",
          fontFamily: "font-sans",
          headingFont: "font-sans font-black tracking-wider uppercase text-[#0F1419] text-sm md:text-md",
          primaryButton: "bg-[#0F1419] text-[#FAF3E8] hover:bg-stone-800 font-sans tracking-wider uppercase text-[8.5px] font-bold rounded-none border border-[#0F1419] px-4 py-1.5 transition",
          cardBg: "bg-white border border-[#0F1419]/15 rounded-none",
          accentBadge: "bg-[#0F1419]/10 text-[#0F1419] border border-[#0F1419]/20 rounded-none font-mono text-[7px] tracking-widest",
          accentText: "text-[#0F1419] font-mono uppercase tracking-widest text-[9px]",
          badgeTheme: "bg-[#0F1419]/5 text-[#0F1419] border border-[#000000]/10 rounded-none text-[8px]",
          bodyText: "text-stone-605 font-sans leading-relaxed tracking-tight text-[10.5px]",
          subtleText: "text-stone-400 font-mono tracking-widest text-[8px]",
          itemBorder: "border-[#0F1419]/10",
          cardStyle: "rounded-none border border-[#0F1419]/15 bg-white shadow-none",
          heroLayout: "text-left py-4 space-y-3.5 border-b border-[#0F1419]/10"
        };
      case "bold-sunshine":
        return {
          bg: "bg-[#FFFCEF] text-[#1E293B]",
          fontFamily: "font-dmsans",
          headingFont: "font-bagel lowercase text-[#3545E5] text-xl md:text-2xl font-normal leading-tight tracking-tight",
          primaryButton: "bg-[#3545E5] text-[#C9EF5E] hover:bg-[#202FB8] font-dmsans font-extrabold rounded-full px-5 py-2 tracking-wide text-[9.5px] border-2 border-[#3545E5] shadow-[2px_2px_0px_0px_#C9EF5E] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all",
          cardBg: "bg-white border-2 border-[#3545E5] rounded-3xl shadow-[4px_4px_0px_0px_#C9EF5E]",
          accentBadge: "bg-[#C9EF5E] text-[#3545E5] border-2 border-[#3545E5] rounded-full font-bold px-3 py-1 text-[8.5px] tracking-wide shadow-[1.5px_1.5px_0px_0px_#3545E5]",
          accentText: "text-[#3545E5] font-extrabold tracking-wide text-[10px]",
          badgeTheme: "bg-[#C9EF5E]/20 text-[#3545E5] border-2 border-[#3545E5]/60 rounded-full font-bold text-[8.5px]",
          bodyText: "text-slate-800 font-dmsans font-medium text-[11px] leading-relaxed",
          subtleText: "text-[#3545E5]/70 font-mono text-[9px] font-bold",
          itemBorder: "border-[#3545E5]/20",
          cardStyle: "bg-white border-2 border-[#3545E5] rounded-3xl shadow-[4px_4px_0px_0px_#C9EF5E] p-3.5 flex flex-col gap-1.5",
          heroLayout: "text-left py-6 space-y-4 border-b-2 border-dashed border-[#3545E5]/20"
        };
      default: // warm-grounded
        return {
          bg: "bg-[#FAF7F2] text-[#2C3E30]",
          fontFamily: "font-serif",
          headingFont: "font-serif italic text-[#2C3E30] text-[18px] md:text-[20px] tracking-normal font-semibold leading-relaxed",
          primaryButton: "bg-[#4E6E58] text-[#FAF7F2] hover:bg-[#3D5645] font-serif italic text-[10px] font-medium rounded-xl px-4 py-1.5 transition",
          cardBg: "bg-[#FAF7F2] border border-[#E2ECE5] rounded-2xl shadow-sm",
          accentBadge: "bg-[#ECF2ED] text-[#34513C] border border-[#D6E3D8] rounded-full text-[8px] font-medium tracking-normal",
          accentText: "text-[#4E6E58] font-serif italic tracking-wide text-[10px] font-medium",
          badgeTheme: "bg-[#ECF2ED] text-[#34513C] border border-[#D6E3D8] rounded-xl text-[8.5px]",
          bodyText: "text-[#4A5D4E] font-serif text-[11.5px] leading-relaxed",
          subtleText: "text-[#34513C]/65 font-mono text-[8px] tracking-wider",
          itemBorder: "border-[#E2ECE5]",
          cardStyle: "bg-[#FAF7F2] border border-[#E2ECE5] rounded-2xl shadow-sm p-3 flex flex-col gap-1.5",
          heroLayout: "text-center py-5 space-y-3.5 border-b border-[#E2ECE5]"
        };
    }
  }, [vibeId]);

  // Helper chip selector setup
  const CLINIC_CHIPS = [
    "Therapist",
    "Coach",
    "Nutritionist",
    "Doula",
    "Midwife",
    "Acupuncturist",
    "Massage Therapist",
    "Speech-Language Pathologist",
    "OT",
    "PT",
    "Wellness Practitioner"
  ];

  // Simulated Booking actions
  const handleSimulatedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setShowSimSuccess(true);
  };

  const handleSimulatedReset = () => {
    setSimulatedBookName("");
    setSimulatedBookEmail("");
    setSimulatedBookPhone("");
    setSimConsentChecked(false);
    setSelectedSlot(null);
    setShowSimSuccess(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1D] text-[#FAF3E8] font-sans relative selection:bg-[#3545E5] selection:text-white overflow-x-hidden">
      
      {/* Top Brand Banner */}
      <header className="border-b border-[#1E293B] bg-[#070A12] py-4 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#C9EF5E] flex items-center justify-center font-black text-[#3545E5] shadow-sm select-none">
              H
            </div>
            <div>
              <span className="font-serif font-bold text-base tracking-wide text-[#FAF3E8]">Marketing for Helpers</span>
              <span className="text-[10px] md:text-xs text-[#C4D1EC]/95 block leading-relaxed max-w-sm sm:max-w-md mt-0.5 font-normal">
                teaching helpers how to actually market themselves using AI, SEO, and modern tools in a way that doesn't feel gross.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-[#3545E5]/20 text-[#C9EF5E] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-[#3545E5]/40 select-none">
              ⚡ HIPAA-Aware Prompting
            </span>
          </div>
        </div>
      </header>

      {/* Main Single-Column Scroll Journey Card */}
      <main className="max-w-3xl mx-auto px-4 md:px-6 pt-12 pb-32">
        
        {/* HERO AREA */}
        <section className="text-center space-y-4 mb-16 animate-fade" id="hero-heading">
          <span className="inline-flex items-center gap-1 bg-[#3545E5]/20 text-[#C9EF5E] text-xs font-semibold px-4 py-1.5 rounded-full border border-[#3545E5]/40">
            Built by Olivia + Kailyn at Marketing for Helpers 💋
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight text-white tracking-tight">
            Build your{" "}
            <span className="bg-gradient-to-r from-[#3545E5] to-[#C9EF5E] bg-clip-text text-transparent font-extrabold pr-1">
              therapy website.
            </span>
            <br />
            In minutes. Without code.
          </h1>
          <p className="text-lg text-[#C4D1EC]/85 max-w-xl mx-auto font-sans leading-relaxed">
            Pick your style. Pick your sections. Get a ready-to-paste AI prompt that actually understands helpers.
          </p>
        </section>

        {/* STEP 1 */}
        <div className="border border-[#1E293B] bg-[#0E1524]/90 backdrop-blur-md rounded-3xl p-6 md:p-8 mb-10 relative shadow-xl" id="step-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#3545E5] text-[#C9EF5E] flex items-center justify-center font-black text-lg shadow-md shrink-0 select-none">
              1
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white font-serif">Who's this for?</h2>
              <p className="text-xs text-[#C4D1EC]/70">Enter your practice name and select what best describes you and/or your practice.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase font-mono tracking-widest text-[#C4D1EC] mb-2 font-semibold">
                Practice Name
              </label>
              <input
                id="biz-name-input"
                type="text"
                className="w-full bg-[#070B14] text-[#FAF3E8] placeholder-[#7F8D98] border border-[#1E293B] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3545E5] transition"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Olivia's Somatic Practice"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-widest text-[#C4D1EC] mb-3 font-semibold">
                Clinical Profession / Helper Role
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CLINIC_CHIPS.map((chip) => {
                  const isActive = helperType === chip;
                  return (
                    <button
                      id={`chip-${chip}`}
                      key={chip}
                      type="button"
                      onClick={() => {
                        setHelperType(chip);
                        setCustomHelperTitle("");
                      }}
                      className={`px-3 py-2.5 rounded-xl border text-xs text-center transition font-semibold capitalize cursor-pointer ${
                        isActive
                          ? "bg-[#3545E5] border-[#3545E5] text-[#C9EF5E] shadow-lg shadow-[#3545E5]/10"
                          : "bg-[#1E293B]/40 border-[#1E293B] text-[#FAF3E8] hover:border-[#3545E5]/50"
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
                <button
                  id="chip-Custom"
                  type="button"
                  onClick={() => setHelperType("Custom")}
                  className={`px-3 py-2.5 rounded-xl border text-xs text-center transition font-semibold cursor-pointer ${
                    helperType === "Custom"
                      ? "bg-[#3545E5] border-[#3545E5] text-[#C9EF5E] shadow-lg shadow-[#3545E5]/10"
                      : "bg-[#1E293B]/40 border-[#1E293B] text-[#FAF3E8] hover:border-[#3545E5]/50"
                  }`}
                >
                  Custom Option...
                </button>
              </div>

              {helperType === "Custom" && (
                <div className="mt-4 animate-fade">
                  <label className="block text-[11px] text-[#C4D1EC]/90 mb-1.5 font-mono">
                    Type your personalized practice title below:
                  </label>
                  <input
                    id="custom-helper-input"
                    type="text"
                    className="w-full bg-[#070B14] text-[#FAF3E8] placeholder-stone-500 border border-[#1E293B] rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#3545E5]"
                    value={customHelperTitle}
                    onChange={(e) => setCustomHelperTitle(e.target.value)}
                    placeholder="e.g. Relational Somatic Director"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* STEP 2 */}
        <div className="border border-[#1E293B] bg-[#0E1524]/90 backdrop-blur-md rounded-3xl p-6 md:p-8 mb-10 relative shadow-xl" id="step-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#3545E5] text-[#C9EF5E] flex items-center justify-center font-black text-lg shadow-md shrink-0 select-none">
              2
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white font-serif">Where do you work?</h2>
              <p className="text-xs text-[#C4D1EC]/70">Identify where your brick and mortar location is or where you are listed according to your google my business profile.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase font-mono tracking-widest text-[#C4D1EC] mb-2 font-semibold">
                Standard Registry Location
              </label>
              <input
                id="location-input"
                type="text"
                className="w-full bg-[#070B14] text-[#FAF3E8] border border-[#1E293B] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3545E5]"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. St. Petersburg, FL"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-widest text-[#C4D1EC] mb-2 font-semibold">
                Practice Delivery Model
              </label>
              <div className="grid grid-cols-3 gap-2 p-1 bg-[#070A12] rounded-xl border border-[#1E293B]">
                {(["In-Person", "Virtual", "Both"] as const).map((mode) => {
                  const isActive = workType === mode;
                  return (
                    <button
                      id={`mode-${mode}`}
                      key={mode}
                      type="button"
                      onClick={() => setWorkType(mode)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold text-center transition cursor-pointer ${
                        isActive ? "bg-[#3545E5] text-[#C9EF5E]" : "text-[#C4D1EC]/60 hover:text-white"
                      }`}
                    >
                      {mode}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* STEP 3 */}
        <div className="border border-[#1E293B] bg-[#0E1524]/90 backdrop-blur-md rounded-3xl p-6 md:p-8 mb-10 relative shadow-xl" id="step-3">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#3545E5] text-[#C9EF5E] flex items-center justify-center font-black text-lg shadow-md shrink-0 select-none">
              3
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white font-serif">What's your vibe?</h2>
              <p className="text-xs text-[#C4D1EC]/70">Select the visual aesthetic, typography pairing, and warm theme for your wireframe draft.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Theme 1: Warm & Grounded */}
            <button
              id="vibe-warm-grounded"
              type="button"
              onClick={() => setVibeId("warm-grounded")}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all hover:scale-102 flex flex-col justify-between h-48 relative ${
                vibeId === "warm-grounded"
                  ? "bg-[#131E35] border-[#3545E5] ring-2 ring-[#3545E5]"
                  : "bg-[#070A12]/90 border-[#1E293B] hover:border-[#3545E5]/40"
              }`}
            >
              <div>
                <span className="text-[10px] font-mono text-[#C4D1EC]/60 uppercase tracking-widest block mb-1">
                  PRESET 01
                </span>
                <h3 className="font-serif font-bold text-white text-base leading-tight">Warm & Grounded</h3>
                <p className="text-[11px] text-[#C4D1EC]/70 leading-normal pt-1">
                  Sage greens + gentle linen cream color palette with classic serif fonts.
                </p>
              </div>
              {/* Miniature CSS Mockup Illustration */}
              <div className="w-full bg-[#FAF7F2] rounded-lg p-2 flex flex-col gap-1 mt-2 border border-stone-200 select-none">
                <div className="flex justify-between items-center">
                  <span className="text-[6px] font-bold text-[#2C3E30] font-serif uppercase">Olivia Practice</span>
                  <div className="w-6 h-2 bg-[#4E6E58] rounded-full"></div>
                </div>
                <div className="w-full h-1 bg-[#2C3E30]/10 rounded"></div>
                <div className="w-3/4 h-1 bg-[#2C3E30]/10 rounded"></div>
              </div>
            </button>

            {/* Theme 2: Modern & Clean */}
            <button
              id="vibe-modern-clean"
              type="button"
              onClick={() => setVibeId("modern-clean")}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all hover:scale-102 flex flex-col justify-between h-48 relative ${
                vibeId === "modern-clean"
                  ? "bg-[#131E35] border-[#3545E5] ring-2 ring-[#3545E5]"
                  : "bg-[#070A12]/90 border-[#1E293B] hover:border-[#3545E5]/40"
              }`}
            >
              <div>
                <span className="text-[10px] font-mono text-[#C4D1EC]/60 uppercase tracking-widest block mb-1">
                  PRESET 02
                </span>
                <h3 className="font-sans font-bold text-white text-base leading-tight">Modern & Clean</h3>
                <p className="text-[11px] text-[#C4D1EC]/70 leading-normal pt-1">
                  Slate navy accents, crisp white backdrop, and sharp minimalist sans-serif typography.
                </p>
              </div>
              {/* Miniature CSS Mockup Illustration */}
              <div className="w-full bg-white rounded-lg p-2 flex flex-col gap-1 mt-2 border border-slate-200 select-none">
                <div className="flex justify-between items-center">
                  <span className="text-[6px] font-extrabold text-[#0F1419] font-sans">OLIVIA CLINIC</span>
                  <div className="w-6 h-2 bg-[#0F1419] rounded"></div>
                </div>
                <div className="w-full h-1 bg-slate-100 rounded"></div>
                <div className="w-2/3 h-1 bg-slate-100 rounded"></div>
              </div>
            </button>

            {/* Theme 3: Helpers Electric */}
            <button
              id="vibe-bold-sunshine"
              type="button"
              onClick={() => setVibeId("bold-sunshine")}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all hover:scale-102 flex flex-col justify-between h-48 relative ${
                vibeId === "bold-sunshine"
                  ? "bg-[#131E35] border-[#3545E5] ring-2 ring-[#3545E5]"
                  : "bg-[#070A12]/90 border-[#1E293B] hover:border-[#3545E5]/40"
              }`}
            >
              <div>
                <span className="text-[10px] font-mono text-[#C4D1EC]/60 uppercase tracking-widest block mb-1">
                  PRESET 03
                </span>
                <h3 className="font-sans font-black text-white text-base leading-tight">Helpers Electric ⚡</h3>
                <p className="text-[11px] text-[#C4D1EC]/70 leading-normal pt-1">
                  Vibrant cobalt blue and electric lime green highlights for high-trust modern impact.
                </p>
              </div>
              {/* Miniature CSS Mockup Illustration */}
              <div className="w-full bg-white rounded-lg p-2 flex flex-col gap-1 mt-2 border border-[#3545E5]/20 select-none">
                <div className="flex justify-between items-center">
                  <span className="text-[6px] font-black text-[#3545E5]">OLIVIA WIDE</span>
                  <div className="w-5 h-2 bg-[#C9EF5E] rounded-sm border border-[#3545E5]/10"></div>
                </div>
                <div className="w-full h-1 bg-[#3545E5]/10 rounded"></div>
                <div className="w-1/2 h-1 bg-[#3545E5]/10 rounded"></div>
              </div>
            </button>
          </div>
        </div>

        {/* STEP 4 */}
        <div className="border border-[#1E293B] bg-[#0E1524]/90 backdrop-blur-md rounded-3xl p-6 md:p-8 mb-10 relative shadow-xl" id="step-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#3545E5] text-[#C9EF5E] flex items-center justify-center font-black text-lg shadow-md shrink-0 select-none">
              4
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white font-serif">Build your page (Lego Blocks)</h2>
              <p className="text-xs text-[#C4D1EC]/70">Select the components you'd like to include in your website. Drag and drop to create the sequence that best works for you.</p>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            {sections.map((section: any, idx: number) => {
              const isEssential = section.locked;
              return (
                <div
                  id={`lego-item-${section.id}`}
                  key={section.id}
                  draggable={!isEssential}
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDragEnd={() => setDraggedIdx(null)}
                  className={`flex items-start gap-4 p-4 rounded-2xl transition-all border ${
                    section.enabled
                      ? "bg-[#131E35]/90 border-[#3545E5]/40"
                      : "bg-[#070A12]/50 border-slate-900/40 opacity-70"
                  } ${draggedIdx === idx ? "scale-98 border-[#3545E5]" : ""}`}
                >
                  <div className="flex flex-col items-center gap-1.5 self-center">
                    {!isEssential ? (
                      <div className="cursor-grab text-[#FAF3E8]/30 hover:text-white px-1">
                        <GripVertical className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="text-stone-700 px-1">
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <input
                        id={`checkbox-lego-${section.id}`}
                        type="checkbox"
                        checked={section.enabled}
                        disabled={isEssential}
                        onChange={() => {
                          const updated = [...sections];
                          updated[idx].enabled = !updated[idx].enabled;
                          setSections(updated);
                        }}
                        className={`w-4.5 h-4.5 rounded border-[#1E293B] text-[#3545E5] focus:ring-[#3545E5] focus:ring-1 ${
                          isEssential ? "cursor-not-allowed text-stone-500 bg-stone-800" : "cursor-pointer"
                        }`}
                      />
                      <span className="font-serif font-bold text-sm text-white">
                        {section.name} {isEssential && <span className="text-[10px] text-[#C4D1EC]/40 font-mono">(Locked Essential)</span>}
                      </span>
                    </div>
                    <p className="text-xs text-[#C4D1EC]/75 mt-1 leading-relaxed">{section.description}</p>
                  </div>

                  {/* Manual move buttons so Mobile is 100% accessible */}
                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      id={`btn-move-up-${section.id}`}
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveSection(idx, "up")}
                      className="p-1 rounded bg-[#070A12]/50 hover:bg-[#3545E5]/25 text-[#C4D1EC]/60 disabled:opacity-20 disabled:pointer-events-none transition"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      id={`btn-move-down-${section.id}`}
                      type="button"
                      disabled={idx === sections.length - 1}
                      onClick={() => moveSection(idx, "down")}
                      className="p-1 rounded bg-[#070A12]/50 hover:bg-[#3545E5]/25 text-[#C4D1EC]/60 disabled:opacity-20 disabled:pointer-events-none transition"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 5 */}
        <div className="border border-[#1E293B] bg-[#0E1524]/90 backdrop-blur-md rounded-3xl p-6 md:p-8 mb-10 relative shadow-xl" id="step-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#3545E5] text-[#C9EF5E] flex items-center justify-center font-black text-lg shadow-md shrink-0 select-none">
              5
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white font-serif font-bold">Your prompt is ready!</h2>
              <p className="text-xs text-[#C4D1EC]/70">No email required. Copy your high-trust ethical blueprint to clipboard instantly.</p>
            </div>
          </div>

          <div className="space-y-4">
            
            {/* Call to action tools banner bar */}
            <div className="flex flex-wrap gap-2 justify-between items-center pb-1">
              <span className="text-[11px] font-mono text-[#C4D1EC]/50">// COPY & PASTE PROMPT</span>
              <button
                id="btn-gemini-optimise"
                type="button"
                className="px-3.5 py-1.5 rounded-full bg-[#1E293B] hover:bg-[#3545E5] text-xs font-bold text-[#C9EF5E] flex items-center gap-1.5 border border-[#3545E5]/30 cursor-pointer transition"
                onClick={handleOptimiseWithGemini}
                disabled={aiOptimizing}
              >
                <Sparkle className="w-3 h-3 text-[#C9EF5E]" />
                {aiOptimizing ? "Tuning copy presets..." : "✨ Let AI Refine Copy"}
              </button>
            </div>

            {aiMessage && (
              <div id="ai-feedback-banner" className="bg-[#131E35] text-[#FAF3E8] p-3 rounded-xl text-xs flex items-center gap-2 border border-[#3545E5]/30 animate-fade">
                <Check className="w-4 h-4 text-[#C9EF5E]" />
                <span>{aiMessage}</span>
              </div>
            )}

            {/* The Monospace Prompt Code block */}
            <div className="relative">
              <pre className="w-full bg-[#070A0D] text-[#ECEFF1] border border-[#1E293B] rounded-2xl p-4 overflow-x-auto text-[11px] leading-relaxed font-mono whitespace-pre-wrap max-h-72 select-text">
                {generatedPrompt}
              </pre>
              <div className="absolute right-3 bottom-3">
                <span className="text-[9px] bg-black/60 px-2 py-1 rounded text-[#FAF3E8]/40 uppercase tracking-widest font-mono">
                  {generatedPrompt.length} chars
                </span>
              </div>
            </div>

            {/* Main copy button containing checkmark transition */}
            <button
              id="copy-prompt-btn"
              type="button"
              onClick={handleCopyPrompt}
              className={`w-full py-4 px-6 rounded-2xl font-bold transition-all text-sm flex items-center justify-center gap-2 cursor-pointer ${
                copiedPrompt
                  ? "bg-emerald-600 text-white"
                  : "bg-[#3545E5] hover:bg-[#202FB8] text-white shadow-lg shadow-[#3545E5]/10 active:scale-99"
              }`}
            >
              {copiedPrompt ? (
                <>
                  <CheckCircle className="w-5 h-5 animate-bounce" />
                  <span>Prompt Copied Securely! ✓</span>
                </>
              ) : (
                <>
                  <ClipboardIcon className="w-5 h-5" />
                  <span>Copy Full Prompt</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-[#C4D1EC]/60 text-center leading-normal">
              Paste this into{" "}
              <strong className="text-[#FAF3E8] underline decoration-[#3545E5]">Lovable</strong>,{" "}
              <strong className="text-[#FAF3E8]">v0</strong>,{" "}
              <strong className="text-[#FAF3E8]">Claude</strong>,{" "}
              <strong className="text-[#FAF3E8]">Google Studio AI</strong>,{" "}
              <strong className="text-[#FAF3E8]">Framer AI</strong>, or{" "}
              <strong className="text-[#FAF3E8]">Bolt</strong> to build your site instantly.
            </p>

            {/* Loom video placeholder */}
            <div className="mt-8 pt-6 border-t border-[#1E293B]/50 text-left">
              <p className="text-xs uppercase font-mono tracking-wider text-[#C4D1EC] mb-3 font-semibold flex items-center gap-1.5">
                <Play className="w-4 h-4 text-[#C9EF5E]" /> Free Quickstart Video
              </p>
              <div className="bg-[#070A12] border border-[#1E293B] rounded-2xl p-5 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#070A12] to-[#3545E5]/10 opacity-60"></div>
                
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
                  {/* Mock Play frame container */}
                  <div className="w-full sm:w-44 aspect-video rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-center relative shrink-0">
                    <div className="w-12 h-12 bg-[#3545E5] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#3545E5]/20 group-hover:scale-110 transition duration-300">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                    <span className="absolute bottom-1.5 right-1.5 text-[8.5px] font-mono bg-black/80 px-1.5 py-0.5 rounded text-[#C4D1EC]">
                      1:02 MIN
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-sm text-white">Watch Olivia build this out in Claude Design into Claude Code and upload it to Squarespace.</h4>
                    <p className="text-xs text-[#C4D1EC]/70 mt-1 leading-normal">
                      See how Claude Design and Claude Code process this precise blueprint to create a custom high-trust layout and easily deploy it to your chosen platform.
                    </p>
                    <span className="inline-block mt-2.5 text-[10px] text-[#C9EF5E] font-semibold underline decoration-[#C9EF5E]/30 select-none group-hover:text-white transition">
                      Launch Loom Player Placeholder
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Tips Block related to Step 1 Helper Selection */}
        <div className="mb-16">
          <MarketingTips helperType={helperType as HelperType} />
        </div>

        {/* STEP 10: JOIN HOT GOSS (UNGATED COMPLIANCE SOFT CTA) */}
        <section
          id="hot-goss-section"
          className="border-2 border-[#FFE5E0] bg-[#FFF6EE] rounded-3xl p-8 md:p-10 my-12 relative overflow-hidden font-dmsans shadow-lg shadow-[#FF4D6D]/5"
        >
          {/* Subtle top brand guide decorative stars */}
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none select-none">
            <Sparkles className="w-24 h-24 text-[#FF4D6D]" />
          </div>

          <div className="max-w-xl mx-auto relative z-10 space-y-6 text-center">
            
            {/* Branded Masthead Header */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <span className="text-[#FF4D6D] text-[10px] uppercase font-bold tracking-[0.25em] font-dmsans select-none">
                ★ A marketing-for-helpers newsletter
              </span>
              
              {/* Branded Logo Lockup */}
              <div className="flex items-center gap-3 bg-white/60 px-5 py-2.5 rounded-2xl border border-[#FFE5E0] select-none">
                <svg viewBox="0 0 24 28" className="w-8 h-9 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer flame */}
                  <path d="M12 1.5C12 1.5 13.5 5.5 11 7.8C8.5 10.1 4.5 14.5 5.5 19.5C6.5 24.5 11 27 15.5 27C20 27 23.5 24 23.5 18.5C23.5 11.5 17 8.5 14.5 5.5C14.5 5.5 16 9.8 12.5 11C9 12.2 12 1.5 12 1.5Z" fill="#FF4D6D" />
                  {/* Inner flame */}
                  <path d="M13 10.5C13 10.5 13.8 13.8 11.5 15.3C9.2 16.8 7.2 19.8 7.9 23.3C8.6 26.8 12.2 28.5 14.9 28.5C17.6 28.5 20.4 26 20.4 22.3C20.4 17.3 16.2 15.5 14.6 13.5C14.6 13.5 15.5 16.6 13.4 17.5C11.3 18.4 13 10.5 13 10.5Z" fill="#FFB400" />
                </svg>
                <span className="font-bagel text-3xl text-[#FF4D6D] tracking-tight leading-none lowercase">
                  hot<span className="text-[#FFB400] mx-0.5">·</span>goss
                </span>
              </div>

              {/* Sub-masthead details */}
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] text-[#1A1410]/70 font-medium">
                <span>Written by Olivia Pelts</span>
                <span className="text-[#FFB400] font-black">•</span>
                <span>Sent every other Wednesday</span>
                <span className="text-[#FFB400] font-black">•</span>
                <span>6-minute read</span>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-bagel text-[#1A1410] leading-tight select-text">
                Want Free Monthly Marketing Tips?
              </h2>
              <p className="text-xs md:text-sm text-[#1A1410]/80 leading-relaxed max-w-lg mx-auto select-text">
                the hot goss drops every month - Search Engine Optimization (SEO), AI helper tools, and what's actually working right now. Free, fun, and made explicitly for helpers.
              </p>
            </div>

            {/* Email form field */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!gossEmail) return;
                setGossSuccess(true);
              }}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2"
            >
              <input
                id="goss-email-input"
                type="email"
                required
                className="flex-1 bg-white text-[#1A1410] placeholder-[#1A1410]/40 border-2 border-[#FFE5E0] rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-[#FF4D6D] focus:ring-1 focus:ring-[#FF4D6D] transition"
                placeholder="olivia@sunshinecitycounseling.com"
                value={gossEmail}
                onChange={(e) => setGossEmail(e.target.value)}
              />
              <button
                id="goss-submit-btn"
                type="submit"
                className="bg-[#FF4D6D] hover:bg-[#e03d5c] text-white px-5 py-3.5 rounded-xl text-xs font-bold shrink-0 shadow-md transition-all active:scale-98 cursor-pointer"
              >
                Spill the tea ☕
              </button>
            </form>

            {gossSuccess && (
              <div id="goss-success-msg" className="text-xs text-[#FF4D6D] font-bold pt-1 animate-fade">
                Welcome to the gossip! 💋 Your spot on the helper newsletter list has been locked.
              </div>
            )}

            {/* Brand Values Pills matching page 2 of Brand Guide */}
            <div className="grid grid-cols-2 gap-2 pt-6 text-left selection:bg-[#FF4D6D] selection:text-white">
              <div className="bg-[#FFE5E0]/30 border border-[#FFE5E0]/60 rounded-xl p-3">
                <span className="font-bagel text-sm text-[#FF4D6D] block">Warm.</span>
                <span className="text-[10px] text-[#1A1410]/85 block mt-0.5 leading-normal">First-name energy. We already know them.</span>
              </div>
              <div className="bg-[#FFE5E0]/30 border border-[#FFE5E0]/60 rounded-xl p-3">
                <span className="font-bagel text-sm text-[#FF4D6D] block">Cheeky.</span>
                <span className="text-[10px] text-[#1A1410]/85 block mt-0.5 leading-normal">Tabloid winks, real-talk, occasional emoji.</span>
              </div>
              <div className="bg-[#FFE5E0]/30 border border-[#FFE5E0]/60 rounded-xl p-3">
                <span className="font-bagel text-sm text-[#FF4D6D] block">Useful.</span>
                <span className="text-[10px] text-[#1A1410]/85 block mt-0.5 leading-normal">Every issue ends with actionable next steps.</span>
              </div>
              <div className="bg-[#FFE5E0]/30 border border-[#FFE5E0]/60 rounded-xl p-3">
                <span className="font-bagel text-sm text-[#FF4D6D] block">Honest.</span>
                <span className="text-[10px] text-[#1A1410]/85 block mt-0.5 leading-normal">When it's a fad, we say so. No fake fluff.</span>
              </div>
            </div>

            {/* Soft Links underneath */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs pt-6 border-t border-[#FFE5E0] select-none">
              <a
                href="#audit-seo"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Audit portal placeholder: Book 1:1 SEO Audit with Olivia + Kailyn.");
                }}
                className="text-[#1A1410] hover:text-[#FF4D6D] underline decoration-[#FF4D6D]/30 transition font-bold"
              >
                Book a 1:1 SEO audit
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* --- STEP 11: AMBIENT BADGE (Bottom-Left corner) --- */}
      {showStickyBadge && (
        <div
          id="ambient-sticky-badge"
          className="fixed bottom-4 left-4 z-50 bg-[#0E1524] text-white py-3 px-4 rounded-2xl border border-[#3545E5]/40 shadow-2xl flex items-center gap-3 max-w-sm animate-fade font-sans"
        >
          <span className="text-base select-none">🔥</span>
          <button
            type="button"
            onClick={() => {
              const gossSection = document.getElementById("hot-goss-section");
              gossSection?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-xs text-[#C4D1EC] hover:text-[#C9EF5E] font-semibold text-left select-none cursor-pointer transition"
          >
            Hot Goss drops monthly — <span className="underline decoration-[#3545E5]">join the list</span>
          </button>
          <button
            id="close-sticky-badge"
            type="button"
            onClick={() => setShowStickyBadge(false)}
            className="text-[#FAF3E8]/40 hover:text-white transition cursor-pointer pl-1 shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* --- DESKTOP STICKY PREVIEW PANEL (Bottom-Right) & MOBILE FLOATING PREVIEW TOGGLE --- */}
      
      {/* Mobile Sticky Button floating bottom right */}
      <div className="fixed bottom-4 right-4 z-40 block lg:hidden select-none">
        <button
          id="btn-mobile-preview-toggle"
          type="button"
          onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
          className="bg-[#3545E5] text-white flex items-center gap-2 px-5 py-3 rounded-full font-bold shadow-2xl tracking-tight transition active:scale-95 cursor-pointer text-xs hover:bg-[#202FB8]"
        >
          <span>{isPreviewExpanded ? "Close Preview" : "See preview"}</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </button>
      </div>

      {/* Preview Container Render */}
      {isPreviewExpanded && (
        <div
          id="preview-window-floating"
          className="fixed lg:bottom-4 lg:right-4 bottom-0 left-0 lg:left-auto z-40 w-full lg:w-[420px] max-h-[82vh] lg:max-h-[80vh] bg-[#0E1524]/95 border-t lg:border border-[#1E293B] rounded-t-3xl lg:rounded-3xl shadow-2xl overflow-hidden flex flex-col font-sans transition-all animate-fade"
        >
          {/* Header banner tab of simulation */}
          <div className="bg-[#070A12] border-b border-[#1E293B] px-4 py-3 flex items-center justify-between font-serif select-none">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-[#FCE4D2] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-0.5"></span>
                LIVE WIREFRAME PREVIEW
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {/* HIPAA label preserved */}
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[8.5px] font-sans font-bold px-2 py-0.5 rounded tracking-tight">
                HIPAA PROTECTED
              </span>
              <button
                id="btn-preview-collapse"
                type="button"
                onClick={() => setIsPreviewExpanded(false)}
                className="text-stone-400 hover:text-white p-1 rounded bg-[#1B232C]/55 cursor-pointer transition"
                title="Collapse Preview Window"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Safari browser URL simulator */}
          <div className="bg-[#1C2630] border-b border-[#2C4A52]/50 px-3 py-1.5 flex items-center gap-2 shrink-0 select-none">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </div>
            <div className="flex-1 bg-[#0A0D10]/95 border border-[#2C4A52]/40 rounded-md py-0.5 px-3 flex justify-between items-center text-[10px] text-[#FCE4D2]/70 font-mono">
              <span className="flex items-center gap-1.5 truncate max-w-[240px]">
                <Lock className="w-2.5 h-2.5 text-emerald-500" />
                <span>https://{businessName.toLowerCase().replace(/[^a-z0-9]/g, "-") || "helper"}.yourhelpersite.com</span>
              </span>
              <span className="text-[7.5px] text-stone-500 font-bold uppercase tracking-wider">
                Vibe: {vibeId}
              </span>
            </div>
          </div>

          {/* Render target mock canvas */}
          <div className={`p-4 flex-1 overflow-y-auto space-y-6 ${themeStyles.bg} ${themeStyles.fontFamily} relative select-none`}>
            
            {/* Nav block of simulation */}
            <nav className={`flex justify-between items-center py-2 border-b ${themeStyles.itemBorder} relative z-10 select-none`}>
              <span className={`text-[11px] font-bold uppercase tracking-wider ${themeStyles.headingFont}`}>
                {businessName || "My Helper Practice"}
              </span>
              <span className={`text-[9px] font-bold ${themeStyles.primaryButton} select-none pointer-events-none`}>
                Book Consultation
              </span>
            </nav>

            {/* Loop rendering of components mapped inside sections */}
            {sections
              .filter((sec: any) => sec.enabled)
              .map((sec: any) => {
                switch (sec.id) {
                  case "hero":
                    return (
                      <div id={`preview-block-hero`} key="hero" className={`${themeStyles.heroLayout} animate-fade`}>
                        <span className={`inline-block text-[8px] uppercase tracking-wide px-3 py-1.5 ${themeStyles.accentBadge}`}>
                          {helperType === "Custom" ? customHelperTitle || "Helper" : helperType} Work • {location}
                        </span>
                        <h2 className={`${themeStyles.headingFont}`}>
                          {websiteCopy.heroHeadline}
                        </h2>
                        <p className={`${themeStyles.bodyText}`}>
                          {websiteCopy.heroSubheadline}
                        </p>
                        <div className={`flex ${vibeId === "warm-grounded" ? "justify-center" : "justify-start"} gap-2`}>
                          <button
                            type="button"
                            className={`${themeStyles.primaryButton} pointer-events-none select-none`}
                          >
                            Book consultation
                          </button>
                        </div>
                      </div>
                    );

                  case "about":
                    return (
                      <div id={`preview-block-about`} key="about" className={`py-4 space-y-2 text-left border-b ${themeStyles.itemBorder} animate-fade`}>
                        <h3 className={`text-[10px] uppercase font-mono tracking-wider ${themeStyles.accentText} font-semibold`}>
                          Meet your clinical specialty helper
                        </h3>
                        <h4 className={`text-sm tracking-tight ${themeStyles.headingFont} font-bold`}>
                          About {businessName}
                        </h4>
                        <p className={`text-[11px] leading-relaxed font-normal ${themeStyles.bodyText}`}>
                          Hello there. As a registered helper, I believe deep restoration demands slow pacing, honest bounds, and patient validation first. Together we build care roadmaps explicitly aligned to your central health targets.
                        </p>
                      </div>
                    );

                  case "services-specialties":
                    return (
                      <div id={`preview-block-services`} key="services" className={`py-4 space-y-3 text-left border-b ${themeStyles.itemBorder} animate-fade`}>
                        <span className={`text-[9px] uppercase tracking-widest block font-mono ${themeStyles.accentText}`}>
                          // SERVICES & FEE PLAN
                        </span>

                        <div className="space-y-2">
                          {websiteCopy.services.map((svc, sIdx) => (
                            <div key={sIdx} className={`p-3 ${themeStyles.cardBg} flex flex-col gap-1.5`}>
                              <div className="flex justify-between items-center text-[10px] font-bold">
                                <span className={`font-semibold ${vibeId === "bold-sunshine" ? "text-[#3545E5]" : "text-stone-900"}`}>{svc.name}</span>
                                <span className={`font-mono text-[9px] ${themeStyles.accentText}`}>{svc.rate}</span>
                              </div>
                              <p className={`text-[9.5px] leading-normal font-sans font-light ${themeStyles.bodyText}`}>
                                {svc.desc}
                              </p>
                              <span className={`text-[8px] uppercase tracking-wider font-mono ${themeStyles.subtleText}`}>
                                Type: {svc.format}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );

                  case "booking":
                    return (
                      <div id={`preview-block-booking`} key="booking" className="py-4 space-y-3.5 text-left border-b border-stone-150 animate-fade">
                        <span className="text-[8.5px] font-mono tracking-widest text-stone-400 block uppercase">
                          // Synced calendar clinic slots
                        </span>

                        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                          {showSimSuccess ? (
                            <div className="p-4 text-center space-y-3 bg-emerald-50/50">
                              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-800">
                                <Check className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="font-bold text-xs text-stone-900">Simitized Booking Locked!</h4>
                                <p className="text-[10px] text-stone-500 leading-relaxed pt-0.5">
                                  Your simulated request is in secure logs. Client database phone details have been masked HIPAA-style with checkmarks.
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={handleSimulatedReset}
                                className="px-3 py-1 bg-white border border-stone-200 rounded text-[9.5px] text-stone-700 hover:bg-stone-50 transition"
                              >
                                Try Booking Another Slot
                              </button>
                            </div>
                          ) : (
                            <form onSubmit={handleSimulatedSubmit} className="p-3.5 space-y-3 font-sans">
                              {/* Date select wrapper */}
                              <div className="space-y-1">
                                <span className="text-[9px] font-bold text-stone-700">1. Select a Day</span>
                                <div className="grid grid-cols-2 gap-1 bg-stone-50 p-0.5 border rounded-lg">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedDay("Today")}
                                    className={`py-0.5 text-center text-[9px] font-bold rounded ${
                                      selectedDay === "Today" ? "bg-white text-stone-900 border" : "text-stone-400"
                                    }`}
                                  >
                                    Mon, Jun 1st
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setSelectedDay("Tomorrow")}
                                    className={`py-0.5 text-center text-[9px] font-bold rounded ${
                                      selectedDay === "Tomorrow" ? "bg-white text-stone-900 border" : "text-stone-400"
                                    }`}
                                  >
                                    Tue, Jun 2nd
                                  </button>
                                </div>
                              </div>

                              {/* Slots buttons row */}
                              <div className="space-y-1">
                                <span className="text-[9px] font-bold text-stone-700">2. Select an Open Block Time</span>
                                <div className="grid grid-cols-3 gap-1">
                                  {["09:00 AM", "11:15 AM", "01:00 PM"].map((timeVal) => {
                                    const isSel = selectedSlot === timeVal;
                                    return (
                                      <button
                                        type="button"
                                        key={timeVal}
                                        onClick={() => setSelectedSlot(timeVal)}
                                        className={`py-1 text-center text-[8.5px] rounded border transition ${
                                          isSel
                                            ? "bg-slate-900 border-slate-900 text-white font-bold"
                                            : "bg-white text-stone-700 border-stone-150 hover:border-stone-300"
                                        }`}
                                      >
                                        {timeVal}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              {selectedSlot && (
                                <div className="space-y-2 pt-2 border-t border-stone-100 animate-fade">
                                  <input
                                    type="text"
                                    required
                                    placeholder="Enter your name"
                                    className="w-full bg-stone-50 border border-stone-205 rounded px-2.5 py-1 text-[9px]"
                                    value={simulatedBookName}
                                    onChange={(e) => setSimulatedBookName(e.target.value)}
                                  />
                                  <input
                                    type="email"
                                    required
                                    placeholder="Secure intake email"
                                    className="w-full bg-stone-50 border border-stone-205 rounded px-2.5 py-1 text-[9px]"
                                    value={simulatedBookEmail}
                                    onChange={(e) => setSimulatedBookEmail(e.target.value)}
                                  />
                                  <div className="flex items-center gap-1">
                                    <input
                                      type="checkbox"
                                      required
                                      id="sim-consent"
                                      checked={simConsentChecked}
                                      onChange={(e) => setSimConsentChecked(e.target.checked)}
                                    />
                                    <label htmlFor="sim-consent" className="text-[7.5px] text-stone-500 leading-tight">
                                      I consent to having my therapeutic contact files saved securely in accordance with local state boards and HIPAA-aware requirements.
                                    </label>
                                  </div>
                                  <button
                                    type="submit"
                                    className={`w-full py-1 text-center text-[9px] font-bold uppercase ${themeStyles.primaryButton}`}
                                  >
                                    Initiate HIPAA-Aware Consultation Book
                                  </button>
                                </div>
                              )}
                            </form>
                          )}
                        </div>
                      </div>
                    );

                  case "testimonials":
                    return (
                      <div id={`preview-block-testimonials`} key="testimonials" className={`py-4 space-y-2 text-left border-b ${themeStyles.itemBorder} animate-fade`}>
                        <h4 className={`text-[10px] uppercase font-mono tracking-wider ${themeStyles.accentText} font-semibold`}>
                          Ethically Grounded Recommendations
                        </h4>
                        <div className={`p-3 italic text-[10px] leading-relaxed ${themeStyles.cardStyle} ${themeStyles.bodyText}`}>
                          "An ethical practitioner of absolute clarity. Her clinical boundaries, patient pacing, and somatic expertise are highly refreshing."
                        </div>
                        <span className={`text-[8px] font-bold block uppercase text-right ${themeStyles.subtleText}`}>
                          — Certified Licensure Colleague Peer Review
                        </span>
                      </div>
                    );

                  case "insurance":
                    return (
                      <div id={`preview-block-insurance`} key="insurance" className={`py-3 text-left border-b ${themeStyles.itemBorder} animate-fade`}>
                        <span className={`text-[8px] font-bold font-mono ${themeStyles.subtleText}`}>// FEES & INSURANCE TRANSPARENCY</span>
                        <p className={`text-[10.5px] leading-relaxed pt-1 ${themeStyles.bodyText}`}>
                          Most therapists operate out-of-network to protect data boundaries. We provide monthly superbill helper invoices so you can seek direct out-of-network insurance reimbursement securely.
                        </p>
                      </div>
                    );

                  case "gfe":
                    return (
                      <div id={`preview-block-gfe`} key="gfe" className={`py-3 text-left border-b ${themeStyles.itemBorder} animate-fade`}>
                        <div className={`p-3 space-y-1 ${themeStyles.cardBg} ${themeStyles.cardStyle}`}>
                          <span className={`text-[8.5px] font-bold uppercase flex items-center gap-1 ${vibeId === "bold-sunshine" ? "text-[#3545E5]" : "text-stone-800"}`}>
                            <Info className="w-3 h-3 shrink-0" /> No Surprises Act Protection GFE Notice
                          </span>
                          <p className={`text-[9.5px] leading-normal ${themeStyles.bodyText}`}>
                            You have the right to receive a Good Faith Estimate of expected clinical expenses in advance.
                          </p>
                        </div>
                      </div>
                    );

                  case "crisis":
                    return (
                      <div id={`preview-block-crisis`} key="crisis" className="py-2.5 px-3 bg-red-50 border border-red-100 rounded-lg text-[9px] text-red-800 text-center flex items-center justify-center gap-1.5 animate-fade">
                        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                        <span className="text-left leading-normal font-semibold">
                          <strong>Immediate Safety warning:</strong> This is not an emergency contact form. For acute psychological needs, go to an emergency room or call 988.
                        </span>
                      </div>
                    );

                  case "hipaa":
                    return (
                      <div id={`preview-block-hipaa`} key="hipaa" className={`py-2.5 text-left border-b ${themeStyles.itemBorder} animate-fade text-[9px] space-y-1 ${themeStyles.bodyText}`}>
                        <span className="font-bold flex items-center gap-1">
                          <Shield className="w-3 h-3 text-emerald-650 shrink-0" /> HIPAA-Aware Protected Systems statement
                        </span>
                        <p className="leading-normal">
                          All client details are encrypted, kept on private medical storage logs, and processed in accordance with privacy laws.
                        </p>
                      </div>
                    );

                  case "faq":
                    return (
                      <div id={`preview-block-faq`} key="faq" className={`py-4 space-y-2 text-left border-b ${themeStyles.itemBorder} animate-fade`}>
                        <h4 className={`text-[10px] font-mono uppercase tracking-widest ${themeStyles.accentText} font-bold`}>
                          Frequently Asked Questions
                        </h4>
                        
                        <div className="space-y-1.5">
                          {["What should I expect in our somatic call?", "Do you accept insurance?"].map((q, qIdx) => {
                            const isOpen = faqOpenIndex === qIdx;
                            return (
                              <div key={q} className={`overflow-hidden ${themeStyles.cardStyle} p-0 flex flex-col`}>
                                <button
                                  type="button"
                                  onClick={() => setFaqOpenIndex(isOpen ? null : qIdx)}
                                  className={`w-full p-2.5 text-left text-[10px] font-bold flex justify-between items-center transition ${vibeId === "bold-sunshine" ? "text-[#3545E5]" : "text-stone-850"}`}
                                >
                                  <span>{q}</span>
                                  <ChevronRight className={`w-3.5 h-3.5 transform transition ${isOpen ? "rotate-90" : ""}`} />
                                </button>
                                {isOpen && (
                                  <div className={`p-2.5 pt-0 text-[9.5px] leading-normal border-t ${themeStyles.itemBorder} transition ${themeStyles.bodyText}`}>
                                    {qIdx === 0
                                      ? "We check-in slowly, pacing biological response and looking at full physical alignment with your personal story."
                                      : "We provide out-of-network superbill help sheets directly so you can obtain custom insurance reimbursement."}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );

                  case "embed":
                    return (
                      <div id={`preview-block-embed`} key="embed" className={`py-3 text-left border-b ${themeStyles.itemBorder} animate-fade`}>
                        <div className={`p-4 text-center space-y-2 select-none ${themeStyles.cardStyle}`}>
                          <span className={`text-[7.5px] font-black uppercase tracking-wider ${themeStyles.accentText}`}>
                            SimplePractice Portal Sync
                          </span>
                          <h5 className="font-bold text-[10px]">Confidential Self-Scheduling Suite</h5>
                          <button
                            type="button"
                            className={`${themeStyles.primaryButton} font-mono text-[8.5px]`}
                          >
                            Launch SimplePractice Portal
                          </button>
                        </div>
                      </div>
                    );

                  case "modalities":
                    return (
                      <div id={`preview-block-modalities`} key="modalities" className={`py-4 space-y-2 text-left border-b ${themeStyles.itemBorder} animate-fade`}>
                        <h4 className={`text-[10px] font-mono tracking-widest uppercase ${themeStyles.accentText} font-bold`}>
                          Clinical Modalities Utilized
                        </h4>
                        <div className="flex flex-wrap gap-1.5 pt-1 select-none">
                          {["Somatic Experiencing", "Internal Family Systems parts work", "ACT Therapy", "EMDR Eye Pacing"].map((tag) => (
                            <span key={tag} className={`text-[8.5px] font-bold px-2.5 py-1 ${themeStyles.badgeTheme}`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    );

                  case "blog-link":
                    return (
                      <div id={`preview-block-blog-link`} key="blog-link" className={`py-3.5 text-left border-b ${themeStyles.itemBorder} animate-fade space-y-1 p-3 ${themeStyles.cardStyle}`}>
                        <span className={`text-[7.5px] font-mono uppercase bg-[#3545E5]/10 p-1 text-[#3545E5] ${themeStyles.accentBadge}`}>PEST READINGS</span>
                        <h5 className={`font-bold text-[10.5px] leading-tight ${vibeId === "bold-sunshine" ? "text-[#3545E5]" : ""}`}>
                          Understanding somatic boundaries: The nervous system checklist
                        </h5>
                        <p className={`text-[9px] ${themeStyles.bodyText}`}>
                          Explore slow pacing tools to release visceral physical shock and chronic daily exhaustion...
                        </p>
                      </div>
                    );

                  case "newsletter":
                    return (
                      <div id={`preview-block-newsletter`} key="newsletter" className={`py-4 text-center border-b ${themeStyles.itemBorder} animate-fade p-3.5 space-y-1.5 ${themeStyles.cardStyle}`}>
                        <h4 className="text-[10.5px] font-bold">Join our slow update newsletter</h4>
                        <p className={`text-[9px] leading-relaxed max-w-xs mx-auto ${themeStyles.bodyText}`}>
                          Get updates, billing guidance, and somatic practice checklists every month.
                        </p>
                        <div className="flex gap-1.5 pt-1.5">
                          <input
                            type="text"
                            placeholder="your-email@confidential.com"
                            className={`bg-stone-50/20 border text-[9px] rounded px-2.5 py-1.5 flex-1 focus:outline-none ${vibeId === "bold-sunshine" ? "border-[#3545E5] text-[#3545E5]" : "border-stone-300 text-inherit"}`}
                          />
                          <button
                            type="button"
                            className={`${themeStyles.primaryButton}`}
                          >
                            Join
                          </button>
                        </div>
                      </div>
                    );

                  default:
                    return null;
                }
              })}

            {/* Footer block of simulation */}
            <footer className="text-center py-6 text-stone-400 text-[8px] space-y-1 select-none border-t border-stone-150">
              <p>© {businessName}. All Rights Saved.</p>
              <p className="text-[#FAF3E8]/30 uppercase font-mono tracking-widest scale-90">
                Ethically Grounded & HIPAA-Aware Design
              </p>
            </footer>

          </div>
        </div>
      )}

    </div>
  );
}

// Clipboard component helper
function ClipboardIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className || "w-6 h-6"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}
