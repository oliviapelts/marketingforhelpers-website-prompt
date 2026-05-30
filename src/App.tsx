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
  ChevronDown,
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

export function getHelperPresets(helperType: string, location: string, workType: string, customHelperTitle?: string, vibeId?: string) {
  const resolvedRole = helperType === "Custom" ? customHelperTitle || "Wellness Practitioner" : helperType;
  const roleLower = resolvedRole.toLowerCase();

  let category = "therapist";
  if (roleLower.includes("coach") && !roleLower.includes("health coach") && !roleLower.includes("wellness coach")) {
    category = "coach";
  } else if (roleLower.includes("nutrition") || roleLower.includes("dietitian") || roleLower.includes("dietary")) {
    category = "nutritionist";
  } else if (roleLower.includes("doula")) {
    category = "doula";
  } else if (roleLower.includes("midwife") || roleLower.includes("midwifery")) {
    category = "midwife";
  } else if (roleLower.includes("acupunctur") || roleLower.includes("lac ") || roleLower.endsWith("lac") || roleLower.includes("tcm")) {
    category = "acupuncturist";
  } else if (roleLower.includes("massage") || roleLower.includes("lmt") || roleLower.includes("bodywork")) {
    category = "massage";
  } else if (roleLower.includes("speech") || roleLower.includes("pathologist") || roleLower.includes("language") || roleLower.includes("slp")) {
    category = "speech";
  } else if (roleLower.includes("occupational") || roleLower.includes("otr") || roleLower === "ot" || roleLower.includes(" ot ") || roleLower.startsWith("ot ") || roleLower.endsWith(" ot")) {
    category = "ot";
  } else if (roleLower.includes("physical") || roleLower.includes("physiother") || roleLower.includes("dpt") || roleLower === "pt" || roleLower.includes(" pt ") || roleLower.startsWith("pt ") || roleLower.endsWith(" pt")) {
    category = "pt";
  } else if (
    roleLower.includes("wellness") ||
    roleLower.includes("reiki") ||
    roleLower.includes("breathwork") ||
    roleLower.includes("herbal") ||
    roleLower.includes("energy") ||
    roleLower.includes("holistic") ||
    roleLower.includes("sound") ||
    roleLower.includes("yoga") ||
    roleLower.includes("health coach") ||
    roleLower.includes("wellness coach") ||
    roleLower.includes("practitioner")
  ) {
    category = "wellness";
  } else if (roleLower.includes("doctor") || roleLower.includes("physician") || roleLower.includes("md") || roleLower.includes("do")) {
    category = "medical";
  }

  switch (category) {
    case "coach":
      if (vibeId === "modern-clean") {
        return {
          tagline: "Structured, evidence-based strategy designed to build operational excellence and objective-driven milestones.",
          heroHeadline: `Performance-Oriented & Metric-Driven ${resolvedRole} Services`,
          heroSubheadline: `Providing structured, high-accountability coaching in ${location || "Local area"} (${workType || "Virtual & In-person"}) for high-achieving leaders, executives, and founders.`,
          philosophyHeading: "A Structured, Objective-Driven Performance Methodology",
          philosophyBody: `We do not rely on vague self-help platitudes or emotional cheerleading. Our framework focuses on objective diagnostic tracking, actionable behavioral design, and measurable momentum timelines.\n\nAs your coaching partner, I supply direct, structural accountability and evidence-based planning tools designed to optimize your daily cognitive load and clarify complex timelines.`,
          services: [
            {
              name: "1:1 Executive Strategy Consultation",
              desc: "High-level performance analysis targeting bottleneck constraints, operational workflows, and rigorous milestone tracking.",
              format: "50 min • Zoom or Phone Tracker",
              rate: "$150 / session"
            },
            {
              name: "Operational Flow Assessment",
              desc: "A diagnostic deep-dive mapping primary professional objectives, behavioral blockers, and quarterly execution timelines.",
              format: "80 min • Custom Deep-Dive Plan",
              rate: "$220 / session"
            },
            {
              name: "Initial Performance Discovery Call",
              desc: "A focused 15-minute diagnostic call to review goals, clarify program parameters, and determine operational fit.",
              format: "15 min • Video Call",
              rate: "Complimentary"
            }
          ],
          testimonialText: "An exceptional performance partner. Her diagnostic structure and focus maps helped me clear our scaling bottlenecks within three sessions.",
          testimonialAuthor: "— Executive Client Feedback",
          faq: [
            { q: "What should I expect in our initial strategy consultation?", a: "We analyze workflow bottlenecks, define measurable key results (KRs), and establish rigorous tracking metrics." },
            { q: "How is performance accountability maintained?", a: "We utilize structured digital logs with bi-weekly diagnostic milestone check-ins to track momentum." }
          ],
          modalities: ["Data-Backed Milestone Tracking", "Cognitive Load Optimization", "Behavioral Workflow Design", "Structural Accountability Systems"],
          blogTitle: "Operational flow for executors: Minimizing friction and scaling decision latency",
          blogDesc: "Analyze the cognitive science behind streamlined workflow designs, objective tracking, and structural time blocks...",
          newsletterDesc: "Get objective-focused strategy models, performance checklists, and diagnostic trackers.",
          insuranceText: "Executive and business strategy operations are private-pay. We provide itemized receipts for direct corporate professional development reimbursement."
        };
      }
      return {
        tagline: "Unlock your momentum, clear blockages, and design a life that honors your core values.",
        heroHeadline: `Empowering, Goal-Focused & Visionary ${resolvedRole} Services`,
        heroSubheadline: `A high-trust, action-oriented space in ${location || "Local area"} (${workType || "Virtual & In-person"}) to design your future, clarify values, and build strategic focus.`,
        philosophyHeading: "Our Strengths-Based & Collaborative Approach",
        philosophyBody: `We believe real, sustainable growth doesn't happen through rigid checking of boxes, but through customized momentum, self-awareness, and clarity.\n\nAs your coaching partner, I provide structural accountability, clear behavior designs, and life navigation tools to move you from dread to confident forward action.`,
        services: [
          {
            name: "1:1 Strategic Coaching Session",
            desc: "High-alignment coaching focusing on immediate goals, removing motivational friction, and mapping active daily habit loops.",
            format: "50 min • Zoom or Phone Tracker",
            rate: "$150 / session"
          },
          {
            name: "Intensive Clarity Blueprint",
            desc: "An in-depth coaching breakthrough session identifying primary life values, character strengths, and quarterly objective timelines.",
            format: "80 min • Custom Deep-Dive Plan",
            rate: "$220 / session"
          },
          {
            name: "Coaching Alignment Connection",
            desc: "A brief conversation to review your personal or career goals, discuss package options, and see if our energy matches.",
            format: "15 min • Video Call",
            rate: "Complimentary"
          }
        ],
        testimonialText: "An incredible coach. Her guidance helped me restructure my professional goals, clear my mental roadblocks, and finally take action.",
        testimonialAuthor: "— Client Feedback",
        faq: [
          { q: "What should I expect in our coaching introduction?", a: "We review your primary life/career headers, map objective timelines, and coordinate custom self-accountability plans." },
          { q: "Are there long-term packages?", a: "Yes, we structure quarterly packages with weekly check-ins to foster deep action habits." }
        ],
        modalities: ["Action-Oriented Goal Design", "Strengths-Based Inquiry", "Value Alignment", "Behavioral Accountability"],
        blogTitle: "Habit design for modern high-achievers: From dread to forward action",
        blogDesc: "Explore the tactical psychology of building robust daily trackers that honor your core values and eliminate procrastination without shame...",
        newsletterDesc: "Get monthly goal calculators, focus tricks, and professional action logs.",
        insuranceText: "Our holistic coaching services are private-pay. We accept all major credit cards, HSA/FSA cards, and offer flexible payment schedules to make sustainable support accessible."
      };

    case "nutritionist":
      if (vibeId === "modern-clean") {
        return {
          tagline: "Evidence-based metabolic optimization, clinical dietetic analysis, and precise nutritional protocols.",
          heroHeadline: `Scientific, Metric-Driven ${resolvedRole} Consultation`,
          heroSubheadline: `Providing clinical dietary diagnostics and biochemical nutrition planning in ${location || "Local area"} (${workType || "Virtual & In-person"}) for high-performance health.`,
          philosophyHeading: "A Data-Driven, Clinical Nutrition Paradigm",
          philosophyBody: `We skip the trend-based dietary fads and subjective restrictions. Our approach utilizes rigorous biochemical analysis, metabolic rate assessments, and clinical nutrient protocols to maximize systemic vitality.\n\nBy treating food as biological input, we design personalized, high-precision plans to stabilize blood glucose, improve gut microbiome efficiency, and support cognitive performance.`,
          services: [
            {
              name: "Clinical Metabolic Intake",
              desc: "Comprehensive diagnostic review mapping biomarker data, physical symptoms, and custom micronutrient targets.",
              format: "50 min • Clinic Suite or Remote",
              rate: "$165 / session"
            },
            {
              name: "Biochemical Meal Optimization",
              desc: "Bespoke, nutrient-dense nutrition frameworks designed for peak functional performance and cognitive clarity.",
              format: "80 min • Integrated Meal Planning",
              rate: "$195 / session"
            },
            {
              name: "Clinical Diagnostics Strategy Sync",
              desc: "A 15-minute diagnostic touchpoint to assess lab testing options, review protocols, and determine alignment.",
              format: "15 min • Phone or Virtual",
              rate: "Complimentary"
            }
          ],
          testimonialText: "Her analytical approach totally resolved my blood sugar stability. No lifestyle fluff; just clean biomarker evidence and structural dietetic plans that perform.",
          testimonialAuthor: "— Client Feedback",
          faq: [
            { q: "What happens in our initial metabolic intake?", a: "We audit your complete metabolic history, analyze diagnostics reports, and design targeted behavioral nutritional adjustments." },
            { q: "How are meal frameworks structured?", a: "We map out precision macronutrient and micronutrient timelines designed to match your baseline biology without subjective guidelines." }
          ],
          modalities: ["Biochemical Lab Analysis", "Macronutrient Flow Optimization", "Gut-Microbiome Efficiency", "Metabolic Biomarker Tracking"],
          blogTitle: "Biochemical blood sugar management: Optimizing cognitive endurance with nutrition",
          blogDesc: "Analyze key clinical trial data on blood glucose tracking, systemic anti-inflammatory food protocols, and cellular metabolic output...",
          newsletterDesc: "Get quarterly data sheets, scientific nutritional dossiers, and biomarker updates.",
          insuranceText: "Nutritional clinical diagnostics operate out-of-network. We issue comprehensive clinical superbills for standard health insurance claim processing."
        };
      }
      return {
        tagline: "Heal your relationship with food, nourish your biology, and feel at home in your body.",
        heroHeadline: `Nourishing & Evidence-Based ${resolvedRole} Support`,
        heroSubheadline: `Providing personalized clinical dietary guidance in ${location || "Local area"} (${workType || "Virtual & In-person"}) designed to build whole-body wellness and digestive peace.`,
        philosophyHeading: "Our Compassionate, Whole-Body Nutrition Philosophy",
        philosophyBody: `We believe nutrition is profoundly personal—and should never feel restrictive or mechanical. By linking digestive biology with mindful nourishment, we work with you to stabilize energy, ease inflammatory stress, and restore your authentic eating patterns.`,
        services: [
          {
            name: "Clinical Nutritional Intake",
            desc: "An in-depth metabolic overview, customized biological support, and food-relationship analysis.",
            format: "50 min • Clinic Suite or Remote",
            rate: "$165 / session"
          },
          {
            name: "Functional Lifestyle Co-Design",
            desc: "A collaborative planning session structuring easy-to-follow, gut-friendly recipes adapted to your busy daily routine.",
            format: "80 min • Integrative Meal Planning",
            rate: "$195 / session"
          },
          {
            name: "Nutrition Connection Call",
            desc: "A gentle check-in to discuss nutritional clinical goals, review lab-marker options, and ensure a trusting fit.",
            format: "15 min • Phone or Virtual",
            rate: "Complimentary"
          }
        ],
        testimonialText: "Her compassionate, non-diet approach completely reformed how I think of fueling my body. No food rules or guilt, just authentic wellness.",
        testimonialAuthor: "— Client Feedback",
        faq: [
          { q: "What happens in our clinical intake?", a: "We check in on medical history, current digestion trends, and explore body-respecting nutrition strategies without restrictions." },
          { q: "Are you hands-on with food logging?", a: "We avoid obsessive food logging. Instead, we co-create fluid, nourishing meal designs and patterns." }
        ],
        modalities: ["Intuitive Eating Principles", "Biochemical Lab Reviews", "Gut-Brain Connection", "Hormonal & Nutrient Support"],
        blogTitle: "Disrupting the diet loop: Stabilizing blood sugar and nourishing your gut",
        blogDesc: "Read about simple, body-respecting biological swaps to boost sustainable daily focus and overcome emotional food guilt...",
        newsletterDesc: "Get evidence-based nourishment protocols, seasonal ingredient lists, and gut-body insights.",
        insuranceText: "Most clinical nutritionist services operate out-of-network to support maximum autonomy. We provide superbills for insurance reimbursement check-ins."
      };

    case "doula":
      if (vibeId === "modern-clean") {
        return {
          tagline: "Evidence-based birth preparation, structured postpartum planning, and clinical advocacy.",
          heroHeadline: `Analytical, Dedicated & Resource-Rich ${resolvedRole} Services`,
          heroSubheadline: `Providing clinical birth advocacy and structured postpartum transition checklists in ${location || "Local area"} (${workType || "Virtual & In-person"}).`,
          philosophyHeading: "Our Non-Nonsense, Evidence-Based Birth Support Model",
          philosophyBody: `We believe childbirth is a highly complex physiological process that benefits from structured, evidence-based preparation. We bypass the romanticized fluff to deliver high-trust resource guides, scientific literature reviews, and clear hospital advocacy plans.\n\nOur focus is to ensure you possess clear, non-biased clinical data to execute informed anatomical decisions with absolute confidence and safety.`,
          services: [
            {
              name: "Structural Birth Integration Intake",
              desc: "Comprehensive birth planning, scientific comfort protocols, and evidence-based resource matching.",
              format: "Prenatal + Full Labor Call",
              rate: "$1,800 total"
            },
            {
              name: "Postpartum Operational Assistance",
              desc: "Strategic postpartum transition planning, infant physiological patterns, and structured home workflow management.",
              format: "4 Hours Postpartum Home Session",
              rate: "$250 / session"
            },
            {
              name: "Doula Resource Discovery Call",
              desc: "A 15-minute objective briefing to outline clinical birth preferences, safety protocols, and contract options.",
              format: "15 min • Phone or Virtual",
              rate: "Complimentary"
            }
          ],
          testimonialText: "An extremely capable, clinical, and data-backed doula. She provided objective evidence for all our decisions and kept our clinical delivery plan secure.",
          testimonialAuthor: "— Client Feedback",
          faq: [
            { q: "How do you coordinate with medical staff?", a: "We operate with full clinical professionalism, interfacing seamlessly with obstetric and pediatric providers on evidence-based care protocols." },
            { q: "What does postpartum planning involve?", a: "We design structured mechanical checklists around sleep shifts, feeding patterns, and evidence-based healing tracking." }
          ],
          modalities: ["Scientific Labor Physiology", "Clinical Hospital Advocacy", "Resource & Literature Compilations", "Structural Transition Checklists"],
          blogTitle: "Evidence-based obstetrics: A literature meta-analysis for healthy deliveries",
          blogDesc: "Analyze clinical database statistics on continuous non-medical support, pain management efficacy, and systematic labor outcomes...",
          newsletterDesc: "Get quarterly birth research updates, anatomical infographics, and operational checklists.",
          insuranceText: "Postpartum and labor support packages are client direct-pay. We provide structured itemized invoices designed to check in on corporate wellness or out-of-network doula benefits."
        };
      }
      return {
        tagline: "Continuous physical comfort, nesting advocacy, and loving postpartum holding for your birth.",
        heroHeadline: `Warm, Continuous & Dedicated ${resolvedRole} Services`,
        heroSubheadline: `Nurturing families across ${location || "Local area"} (${workType || "Virtual & In-person"}) with profound physical, emotional, and postpartum holding.`,
        philosophyHeading: "Our Holistic & Trusting Birth Care Philosophy",
        philosophyBody: `We believe birth is a sacred threshold that deserves absolute respect, quiet safety, and continuous relational holding.\n\nOur role is to witness, guide, and protect your physical and psychic space—helping you navigate pregnancy and postpartum with confidence, peace, and absolute bodily autonomy.`,
        services: [
          {
            name: "Comprehensive Birth Support Package",
            desc: "Continuous labor advocacy, physical comfort techniques, prenatal movement plans, and postpartum follow-ups.",
            format: "Prenatal + Full Labor Call",
            rate: "$1,800 total"
          },
          {
            name: "Postpartum Home Recovery Care",
            desc: "Nurturing postpartum care, infant soothing, light nutritional cooking, and restorative household organization support.",
            format: "4 Hours Postpartum Home Session",
            rate: "$250 / session"
          },
          {
            name: "Doula Chemistry Consultation",
            desc: "An initial comforting conversation to hear your birth visions, unpack doula roles, and see if our hearts align.",
            format: "15 min • Phone or Virtual",
            rate: "Complimentary"
          }
        ],
        testimonialText: "A blessing. Her constant presence, calm reassurance, and gentle breathing cues made all the difference in my labor journey.",
        testimonialAuthor: "— Postpartum Parent",
        faq: [
          { q: "When do we begin working together?", a: "We typically align during your second trimester, holding regular prenatal syncs and offering on-call service from week 37 onwards." },
          { q: "How are postpartum hours arranged?", a: "Postpartum support blocks are highly flexible, helping you with newborn pacing, recovery rituals, and household support." }
        ],
        modalities: ["Continuous Labor Advocacy", "Physiological Coping Techniques", "Postpartum Emotional Pacing", "Lactation & Newborn Guidance"],
        blogTitle: "Navigating the golden hour: What to expect in early postpartum healing",
        blogDesc: "How to build a quiet sanctuary, organize baby boundaries, and secure emotional and physical support during those first tender weeks...",
        newsletterDesc: "Get birth preparation insights, postpartum comfort lists, and parent circle updates.",
        insuranceText: "Our doula services are private-pay. We accept all major cards, HSA/FSA cards, and can assist in preparing custom payment structures as needed."
      };

    case "midwife":
      if (vibeId === "modern-clean") {
        return {
          tagline: "Comprehensive clinical obstetrics, evidence-based home birth safety, and informed consent.",
          heroHeadline: `Licensed, Evidence-Based & Autonomous ${resolvedRole} Services`,
          heroSubheadline: `Providing primary maternal healthcare, metabolic screenings, and birth safety planning across ${location || "Local area"} (${workType || "Virtual & In-person"}).`,
          philosophyHeading: "Our Medical Midwifery & Clinical Birth Philosophy",
          philosophyBody: `We approach maternal care through the lens of rigorous, evidence-based obstetrics and patient autonomy. By combining clinical tracking protocols with home birth safety parameters, we offer an objective and structured alternative to standard institutional models.\n\nWe provide extensive, safety-first monitoring, data-driven diagnostic labs, and complete anatomical informed consent at every milestone.`,
          services: [
            {
              name: "Clinical Prenatal & Diagnostic Intake",
              desc: "Meticulous clinical check of fetal development, maternal biomarkers, and lab trends with abundant Q&A.",
              format: "60 min • Clinical Space or Home",
              rate: "$175 / visit"
            },
            {
              name: "Physiological Delivery Management",
              desc: "Primary clinical attendance for labor, neonatal examinations, oxygen/emergency kits, and postpartum checks.",
              format: "Continuous Active Delivery Care",
              rate: "Custom Rate"
            },
            {
              name: "Midwifery System Consultation",
              desc: "A brief 15-minute clinical presentation on obstetric safety protocols, home setups, and custom packages.",
              format: "15 min • Practice Tour",
              rate: "Complimentary"
            }
          ],
          testimonialText: "A licensed practice of absolute clinical integrity. Their safety-first tracking protocols, extensive lab reviews, and meticulous birth systems are thoroughly reassuring.",
          testimonialAuthor: "— Client Clinical Review",
          faq: [
            { q: "How is delivery room safety managed outside of standard hospitals?", a: "We maintain standard clinical safety gear, transport agreements, anti-hemorrhage medications, and neonatal oxygen on-site." },
            { q: "Do you order conventional diagnostic labs?", a: "Yes, we order complete obstetric ultrasound arrays, metabolic profiles, and prenatal blood screenings." }
          ],
          modalities: ["Clinical Obstetric Tracking", "Evidence-Based Informed Consent", "Metabolic and Lipid Screenings", "Obstetric Safety & Neonatal Stabilization"],
          blogTitle: "Clinical birth telemetry: Minimizing neonatal and maternal labor risks",
          blogDesc: "Analyze clinical trial data, delivery position aerodynamics, and home-to-hospital transport coordination protocols...",
          newsletterDesc: "Get midwife research digests, clinical reference graphs, and prenatal checklist guides.",
          insuranceText: "We accept selective direct clinical payments and supply structured midwife superbills suited for out-of-network insurance reimbursement checks."
        };
      }
      return {
        tagline: "Autonomous care, physiological birth wisdom, and empowering healthcare for your family.",
        heroHeadline: `Physiological, Safe & Autonomy-Centered ${resolvedRole} Services`,
        heroSubheadline: `Providing comprehensive clinical care and prenatal support in ${location || "Local area"} (${workType || "Virtual & In-person"}) centered around your choice and rhythm.`,
        philosophyHeading: "Our Midwifery Model & Physiological Birth Philosophy",
        philosophyBody: `We believe pregnancy and childbirth are normal, powerful lifecycle events that unfold beautifully under trusting clinical guidance.\n\nBy prioritizing physiological safety, evidence-based practices, and informed consent, we partner with you to ensure your voice remains central to your care.`,
        services: [
          {
            name: "Comprehensive Prenatal & Clinical Care",
            desc: "A slow, deep clinical check of fetal growth, blood diagnostics, and physical/emotional wellness with ample time for your questions.",
            format: "60 min • Clinical Space or Home",
            rate: "$175 / visit"
          },
          {
            name: "Physiological Home Birth Attendance",
            desc: "Dedicated clinical attendance for home labor, physiological birth delivery, water birth setups, and newborn examinations.",
            format: "Continuous Active Delivery Care",
            rate: "Custom Rate"
          },
          {
            name: "Midwifery Practice Consultation",
            desc: "A warm meeting to discuss home birth options, clinical protocols, safety measures, and practice compatibility.",
            format: "15 min • Practice Tour",
            rate: "Complimentary"
          }
        ],
        testimonialText: "The most safe, loving, and evidence-based clinical prenatal care we could have imagined. Truly honors the physiological process.",
        testimonialAuthor: "— Postpartum Parent",
        faq: [
          { q: "Do you attend hospital or home births?", a: "We specialize in licensed, safe physiological home birth environments, carrying emergency medical and clinical gear." },
          { q: "What is the frequency of prenatal checkups?", a: "We follow standard clinical timelines (monthly, bi-weekly, then weekly) but offer extra time for slow, thorough counsel." }
        ],
        modalities: ["Physiological Birth Support", "Informed Consent Care", "Postpartum Clinical Monitoring", "Water Birth Safety"],
        blogTitle: "Informed clinical choice: Decoupling birth fears from physiological reality",
        blogDesc: "Read our comprehensive breakdown of anatomical safety protocols, home environment setups, and evidence-based birth freedom...",
        newsletterDesc: "Get midwife insights, pregnancy guidelines, and postpartum checklists.",
        insuranceText: "We accept selective private-pay models and can provide home-birth billing superbills for out-of-network clinical midwife insurance coverage."
      };

    case "acupuncturist":
      if (vibeId === "modern-clean") {
        return {
          tagline: "Neurological pathway stimulation, myofascial reset, and scientific anatomical acupuncture.",
          heroHeadline: `Clinical, Anatomically-Guided ${resolvedRole} Therapy`,
          heroSubheadline: `Providing precision clinical acupuncture, nerve pathway stimulation, and physiological recovery in ${location || "Local area"} (${workType || "Virtual & In-person"}).`,
          philosophyHeading: "Our Scientific, Neuro-Anatomical Acupuncture Paradigm",
          philosophyBody: `We translate traditional meridian pathways into modern neuro-anatomy. By targeting specific neuromuscular junction clusters, our precision filament protocols stimulate deep blood flow, downregulate sympathetic nervous system arousal, and initiate endogenous endorphin release.\n\nWe focus on measurable range-of-motion improvements, systematic stress reductions, and data-backed physiological recovery.`,
          services: [
            {
              name: "Clinical Pathway Intake",
              desc: "Detailed orthopedic range-of-motion analysis, musculoskeletal diagnostics, and initial filament insertion.",
              format: "60 min • Healing Suite",
              rate: "$140 / session"
            },
            {
              name: "Myofascial Tissue Recovery",
              desc: "Combined therapeutic manual suction and trigger point stimulation targeting athletic regeneration and muscle fatigue.",
              format: "75 min • Muscle Release Option",
              rate: "$180 / session"
            },
            {
              name: "Acupuncture Program Assessment",
              desc: "An objective 15-minute call to evaluate clinical pathways, check medical history, and plan treatment cycles.",
              format: "15 min • Video Sync",
              rate: "Complimentary"
            }
          ],
          testimonialText: "An extremely meticulous physical recovery resource. They approach acupuncture entirely from skeletal anatomy and neuro-pathway science. Instantly relieved my persistent lumbar restrictions.",
          testimonialAuthor: "— Client Feedback",
          faq: [
            { q: "What is the neurological mechanism of action?", a: "Filament insertion stimulates localized micro-circulation and signals the brain to trigger endorphins and downregulate sympathetic fight-or-flight loops." },
            { q: "Are the needle filaments safe?", a: "Yes, we utilize single-use, surgical-grade sterile steel filaments of microscopic diameters with complete compliance." }
          ],
          modalities: ["Neuro-Anatomical Targeting", "Musculoskeletal Range Analysis", "Myofascial Trigger Release", "Vascular Lymphatic Mobilization"],
          blogTitle: "Neurological micro-stimulation: The physiology of therapeutic metal filaments",
          blogDesc: "Understand the vascular and metabolic responses during manual tissue manipulation and targeted muscle stimulation...",
          newsletterDesc: "Get kinetic reference guides, clinical orthopedics reviews, and recovery schedules.",
          insuranceText: "Clinical neuro-acupuncture operates on a direct-pay structure. We supply medical bill coding superbills for direct out-of-network health reimbursement."
        };
      }
      return {
        tagline: "Clear stress meridians, soothe physical blockages, and synchronize your body's energy.",
        heroHeadline: `Gentle Traditional Acupuncture & ${resolvedRole} Alignment`,
        heroSubheadline: `Nourishing clinical acupuncture patterns and therapeutic herbal work in ${location || "Local area"} (${workType || "Virtual & In-person"}) for lasting ease.`,
        philosophyHeading: "Our Meridian-Based Traditional Healing Philosophy",
        philosophyBody: `We treat the root constitutional pattern of stress, not just surface pain. By using thin filaments to balance the flow of energy, we activate your body’s deep, latent self-healing mechanisms and bring you back to an original state of peace.`,
        services: [
          {
            name: "Traditional Acupuncture Session",
            desc: "Tailored diagnostic pulse reading, tongue examination, and custom meridian needle application to calm the nervous system.",
            format: "60 min • Healing Suite",
            rate: "$140 / session"
          },
          {
            name: "Myofascial Cupping & Herb Sync",
            desc: "A combined deep somatic suction and heat therapy designed to target muscle knots, move stagnant lymph, and clarify stress.",
            format: "75 min • Muscle Release Option",
            rate: "$180 / session"
          },
          {
            name: "Acupuncture Diagnostic Chat",
            desc: "A reassuring chat to explain needle safety, explore pain points, and outline a tailored healing timeline.",
            format: "15 min • Video Sync",
            rate: "Complimentary"
          }
        ],
        testimonialText: "My tension and digestion have never felt better. The acupuncture sessions are incredibly peaceful and restorative.",
        testimonialAuthor: "— Client Feedback",
        faq: [
          { q: "What should I expect in our first meridian call?", a: "A detailed outline of active blockages, gentle non-painful needle placement to open pathways, and soothing resting minutes." },
          { q: "Does acupuncture hurt?", a: "No, acupuncture needles are incredibly hair-thin, causing a quiet dull warmth or gentle release sensation rather than sharp pain." }
        ],
        modalities: ["Meridian Pathway Clearance", "Traditional Pulse Diagnostic", "Myofascial Cupping Release", "Holistic Herbal Counseling"],
        blogTitle: "Easing the modern grind: How acupuncture calms the sympathetic nervous system",
        blogDesc: "Learn the biology of how targeted meridian inputs signal the brain to downregulate cortisol and support digestion...",
        newsletterDesc: "Get acupuncture guidance, herbal formulas, and stress relief tips.",
        insuranceText: "We provide out-of-network acupuncture superbills or HSA/FSA payment documentation to support simple reimbursement check-ins."
      };

    case "massage":
      if (vibeId === "modern-clean") {
        return {
          tagline: "Postural recovery, kinetic line alignment, and precision clinical myofascial bodywork.",
          heroHeadline: `Orthopedic, Posture-Focused & Deep ${resolvedRole} Bodywork`,
          heroSubheadline: `Providing advanced postural rehabilitation, tissue diagnostics, and athletic recovery in ${location || "Local area"} (${workType || "Virtual & In-person"}).`,
          philosophyHeading: "Our Systematic, Musculoskeletal Posture Paradigm",
          philosophyBody: `We do not offer generic, pampering spa sessions. We view physical tension as a structural posture constraint. By analyzing daily kinetic habits and physical strain blocks, we utilize deliberate, localized tissue manipulation to release myofascial restrictions and improve orthopedic mechanics.\n\nOur protocols restore functional movement, increase cellular blood supply, and optimize long-term athletic mobility.`,
          services: [
            {
              name: "Postural Reset & Myofascial Release",
              desc: "Targeted deep-tissue manipulation designed to restore kinetic posture, open joint lines, and increase mobility.",
              format: "60 min • Massage Suite",
              rate: "$150 / session"
            },
            {
              name: "Neuromuscular Restoration Session",
              desc: "High-precision physical bodywork addressing chronic stress hotspots, tension loops, and metabolic waste buildup.",
              format: "60 min • Restorative Calm",
              rate: "$130 / session"
            },
            {
              name: "Bodywork Assessment Sync",
              desc: "A 15-minute range-of-motion diagnostic check to identify structural imbalances and outline treatment sessions.",
              format: "15 min • Consultation",
              rate: "Complimentary"
            }
          ],
          testimonialText: "An incredible musculoskeletal deep-tissue practitioner. They work directly on active restrictions and kinetic vectors, moving away from simple relaxation toward systematic orthopedic improvement.",
          testimonialAuthor: "— Client Feedback",
          faq: [
            { q: "What should I expect in our posture evaluation?", a: "We conduct a complete vertical skeletal alignment audit, testing mechanical rotations and designing precise localized tissue manipulation." },
            { q: "How are treatment pressures determined?", a: "Pressures are adjusted biochemically based on active muscle compliance, ensuring muscular release without guard lock." }
          ],
          modalities: ["Skeletal Myofascial Mobilization", "Orthopedic Posture Mapping", "Localized Trigger Manipulation", "Intra-Articular Range Recovery"],
          blogTitle: "Biomechanical postural collapse: Remedying modern occupational shoulder fatigue",
          blogDesc: "Analyze clinical trial profiles regarding kinetic spine fatigue, occupational postural collapse, and physical stress points...",
          newsletterDesc: "Get bodywork diagrams, manual therapeutic tips, and muscle-stretching guides.",
          insuranceText: "Myofascial and postural therapy services are direct client pay. Structured treatment billing details are provided for HSA/FSA card approvals."
        };
      }
      return {
        tagline: "Unwind physical holding patterns, release muscular stress, and feel deeply at ease.",
        heroHeadline: `Somatic, Slow-Paced & Deep Myofascial ${resolvedRole} Bodywork`,
        heroSubheadline: `Cultivating deep body release and athletic recovery in ${location || "Local area"} (${workType || "Virtual & In-person"}) through bespoke manual integration.`,
        philosophyHeading: "Our Slow-Listening Muscle Release Philosophy",
        philosophyBody: `We view chronic physical tension as a somatic storage of stress. By moving slowly and listening to muscle resistance without force, we help the body unwind safely, clearing accumulated neural tightness and promoting sleep.`,
        services: [
          {
            name: "Bespoke Myofascial & Deep Tissue",
            desc: "Active trigger-point work and deep structural releases designed to unwind tight joints and restore kinetic posture.",
            format: "60 min • Massage Suite",
            rate: "$150 / session"
          },
          {
            name: "Nervous System Calming Flow",
            desc: "An exceptionally slow, continuous light-touch oil session targeted at resetting stress hormones and boosting recovery sleep.",
            format: "60 min • Restorative Calm",
            rate: "$130 / session"
          },
          {
            name: "Bodywork Consultation Sync",
            desc: "A quick check of your range of motion, old injury spots, and posture patterns to plan your body session.",
            format: "15 min • Consultation",
            rate: "Complimentary"
          }
        ],
        testimonialText: "Truly restorative tissue work. She works slowly with muscle resistance, calming my entire system and physical pain.",
        testimonialAuthor: "— Client Feedback",
        faq: [
          { q: "How deep do you work on muscle knots?", a: "We align with your nervous system. Deep pressure is applied with slow breathing, never forcing muscles to guard or lock up." },
          { q: "What should I wear for custom myofascial therapy?", a: "Therapy occurs under professional linen draping. Choose whatever level of clothing makes you feel absolutely comfortable." }
        ],
        modalities: ["Deep Tissue Myofascial Release", "Trigger Point Therapy", "Nervous System Calming Flow", "Slow Postural Reset"],
        blogTitle: "The anatomy of tight shoulders: How stress mimics physical muscle injuries",
        blogDesc: "Discover the connection between sympathetic stress state, posture collapse, and chronic scapular tightness...",
        newsletterDesc: "Get posture guidelines, kinetic stretching advice, and muscle release tips.",
        insuranceText: "Bespoke bodywork is private-pay. We support HSA/FSA debit card transactions and can issue physical invoices for wellness programs."
      };

    case "medical":
      if (vibeId === "modern-clean") {
        return {
          tagline: "Comprehensive primary medicine, preventive diagnostic screening, and scientific health partnership.",
          heroHeadline: `Evidence-Based, Clinical Primary Care by ${resolvedRole}`,
          heroSubheadline: `Providing structured diagnostic screenings, longevity biomarkers, and clinical health strategies in ${location || "Local area"} (${workType || "Virtual & In-person"}).`,
          philosophyHeading: "Our Analytical, Data-Driven Primary Care Paradigm",
          philosophyBody: `Our practice operates at the intersection of clinical excellence, preventative longevity, and patient partnership. We replace institutional rush with detailed metabolic analysis, deep cardiovascular biomarker evaluations, and structured genetic data reviews.\n\nOur goal is to establish an objective, highly organized roadmap to optimize long-term health, boost cellular vitality, and preemptively manage health risks.`,
          services: [
            {
              name: "Clinical Diagnostic Intake",
              desc: "Meticulous internal health analysis, biomarker logging, and custom longevity consultation.",
              format: "50 min • Clinical Office or Telehealth",
              rate: "$195 / visit"
            },
            {
              name: "Preventive Longevity Evaluation",
              desc: "Comprehensive diagnostic screen checking lipid panels, metabolic responses, and cardiovascular wellness profile.",
              format: "80 min • Integrated Wellness Assessment",
              rate: "$250 / visit"
            },
            {
              name: "Healthcare Onboarding Call",
              desc: "A brief 15-minute administrative intake review to check patient portal setups, old files, and schedule treatment.",
              format: "15 min • Video Call",
              rate: "Complimentary"
            }
          ],
          testimonialText: "An extremely analytical and evidence-guided physician. Their proactive metabolic screening solved chronic regulatory issues that conventional groups completely ignored.",
          testimonialAuthor: "— Patient Practice Review",
          faq: [
            { q: "How is insurance billing managed?", a: "We operate on a private direct-primary model to allow for slow, extensive appointments, and provide comprehensive clinical superbills for standard reimbursement claims." },
            { q: "Can we integrate remote wearable biomarker monitoring?", a: "Yes, we integrate CGM metrics and digital cardiovascular trackers to keep clinical metrics up to date in real time." }
          ],
          modalities: ["Clinical Cardiology Screening", "Metabolic Biomarker Optimization", "Direct Primary Collaboration", "Longevity Risk Mitigation Strategy"],
          blogTitle: "Preventative lipidology: Scientific indicators for long-term arterial safety",
          blogDesc: "Analyze clinical trial profiles regarding metabolic efficiency, clean cholesterol ratios, and long-term cellular wellness indicators...",
          newsletterDesc: "Get quarterly medical newsletters, lab reference graphs, and patient portal guides.",
          insuranceText: "We utilize direct clinical payment models to guarantee exceptional time and patient care. Comprehensive superbills are prepared for easy out-of-network processing."
        };
      }
      return {
        tagline: "Evidence-based, patient-centered medical partnership for your long-term health and vitality.",
        heroHeadline: `Expert, Patient-Centered Clinical Medical Care by ${resolvedRole}`,
        heroSubheadline: `Providing evidence-based wellness, comprehensive clinical diagnostics, and preventative care in ${location || "Local area"} (${workType || "Virtual & In-person"}) with a focus on your partnership.`,
        philosophyHeading: "Our Patient-Centered Medical Philosophy",
        philosophyBody: `We believe true therapeutic success lies in direct patient partnership, clinical excellence, and proactive preventative care.\n\nOur objective is to deliver evidence-based clinical diagnostics with maximum compassion, listening carefully to your health narrative to build a personalized metabolic and longevity plan.`,
        services: [
          {
            name: "Comprehensive Medical Consultation",
            desc: "In-depth clinical health diagnostic review, metabolic biomarker guidance, and personalized preventative care strategy.",
            format: "50 min • Clinical Office or Telehealth",
            rate: "$195 / visit"
          },
          {
            name: "Preventive Care Assessment",
            desc: "Extended preventative screening evaluation reviewing cardiovascular wellness, metabolic biomarkers, and long-term vitality indicators.",
            format: "80 min • Integrated Wellness Assessment",
            rate: "$250 / visit"
          },
          {
            name: "Initial Clinical Meet & Greet",
            desc: "A brief, patient-centered conversation to discuss your healthcare preferences, coordinate portal setup, and discuss treatment plans.",
            format: "15 min • Video Call",
            rate: "Complimentary"
          }
        ],
        testimonialText: "A dedicated physician of rare clinical excellence. Her patient-centered partnership and rigorous, evidence-based oversight is extremely reassuring.",
        testimonialAuthor: "— Patient Practice Review",
        faq: [
          { q: "Do you accept primary care health insurance?", a: "We work on a direct private model to maximize care quality, and can provide comprehensive superbills for your clinical insurance reimbursement." },
          { q: "How do you coordinate with medical specialists?", a: "We directly coordinate diagnostics, blood markers, and hospital letters to ensure absolute continuity of care." }
        ],
        modalities: ["Evidence-Based Diagnostics", "Patient-Centered Consultation", "Preventive Care Strategy", "Clinical Excellence & Partnership"],
        blogTitle: "Preventative longevity: Simple, evidence-based metrics for everyday health",
        blogDesc: "Understand key metabolic biomarkers, blood pressure trends, and lifestyle factors that support long-term whole-body cellular health...",
        newsletterDesc: "Get quarterly medical newsletters, preventative health guides, and patient portal updates.",
        insuranceText: "We utilize direct-pay clinical models to guarantee extensive time and patient outcomes. We provide clinical superbill helper sheets for out-of-network reimbursement."
      };

    case "speech":
      if (vibeId === "modern-clean") {
        return {
          tagline: "Evidence-based pediatric and adult communication, speech, and swallow intervention.",
          heroHeadline: `Scientific & Clinical ${resolvedRole} Services`,
          heroSubheadline: `Providing neurodivergent-affirming speech therapy, AAC integration, and cognitive-linguistic support in ${location || "Local area"} (${workType || "Virtual & In-person"}).`,
          philosophyHeading: "A Scientific, Neurodivergent-Affirming SLP Practice",
          philosophyBody: `We approach speech-language support through a clinical, family-centered lens. We specialize in evidence-based articulation, cognitive-linguistic structures, and augmentative communication (AAC) mapping.\n\nOur objective is to collaborate with clients and families to develop custom communication habits, promote authentic self-expression, and build executive functioning tools.`,
          services: [
            {
              name: "Clinical Speech & Language Intake",
              desc: "In-depth clinical diagnostic review evaluating articulation, voice patterns, speech fluency, or swallow efficacy.",
              format: "60 min • Practice Suite or Virtual",
              rate: "$150 / session"
            },
            {
              name: "Comprehensive AAC & Articulation Session",
              desc: "Targeted, evidence-based speech-language support implementing augmentative and alternative communication tools.",
              format: "50 min • Custom Lesson Plan",
              rate: "$180 / session"
            },
            {
              name: "SLP Program Onboarding Sync",
              desc: "A brief 15-minute administrative call to review speech-language billing and align on client/family communication targets.",
              format: "15 min • Phone or Virtual",
              rate: "Complimentary"
            }
          ],
          testimonialText: "An extremely structured, analytical, and neurodivergent-affirming speech pathologist. Their child-led, play-informed communication plans helped our family build genuine expression without any behavior forcing.",
          testimonialAuthor: "— Client Family Feedback",
          faq: [
            { q: "How is neurodivergent-affirming speech therapy structured?", a: "We celebrate individual communication profiles rather than forcing masking or rigid compliance, building confidence in self-expression." },
            { q: "Do you supply superbills for insurance?", a: "Yes, we prepare specialized SLP superbills with standard clinical diagnostic and treatment codes for insurance processing." }
          ],
          modalities: ["Neurodivergent-Affirming Care", "Augmentative Communication (AAC)", "Cognitive-Linguistic Support", "Social Communication Pragmatics"],
          blogTitle: "Preserving communication authenticity: A guide to neurodivergent-affirming SLP care",
          blogDesc: "Analyze child-led pediatric frameworks, speech motor planning, and why authentic language builds long-term confidence...",
          newsletterDesc: "Get communicative activity checklists, developmental resource tips, and therapy updates.",
          insuranceText: "We utilize direct clinical payment structures to protect diagnostic care boundaries. High-accuracy SLP superbills are issued for out-of-network reimbursement claims."
        };
      }
      return {
        tagline: "Strengthen your voice, improve speech fluency, and discover trusting pathways of connection.",
        heroHeadline: `Warm, Client-Centered ${resolvedRole} Support`,
        heroSubheadline: `Providing personalized speech-language therapy, communication support, and swallow care in ${location || "Local area"} (${workType || "Virtual & In-person"}).`,
        philosophyHeading: "Our Personalized, Family-Centered Philosophy",
        philosophyBody: `We believe communication is a fundamental human right. Our speech-language therapy supports pediatric and adult clients to speak with ease, find confidence in their social communication, and enjoy nourishing relationships.\n\nWe provide a welcoming, neurodivergent-affirming space where every voice is celebrated.`,
        services: [
          {
            name: `Individual Speech-Language Therapy`,
            desc: "Customized speech support targeting articulation, voice, swallow safety, or speech fluency goals.",
            format: "50 min • Clinic Space or Telehealth",
            rate: "$150 / session"
          },
          {
            name: "Pediatric Play & AAC Consultation",
            desc: "Child-led communication support involving augmentative systems, sensory-supportive play, and parent coaching.",
            format: "60 min • Family Sync",
            rate: "$180 / session"
          },
          {
            name: "Communication Connection Call",
            desc: "A gentle video chat to explore your communication desires, answer speech-language billing options, and see if our hearts align.",
            format: "15 min • Video Call",
            rate: "Complimentary"
          }
        ],
        testimonialText: "The most welcoming, neurodivergent-affirming speech-language therapy practice. Our child looks forward to play sessions and is expressing themselves so beautifully now.",
        testimonialAuthor: "— Grateful Family Feedback",
        faq: [
          { q: "Do you support adult speech therapy?", a: "Yes, we work with adults on vocal mechanics, executive functioning, cognitive-communication, and swallow restoration." },
          { q: "How long does a child speech program typically last?", a: "Every communication profile is unique. We partner in short-term or continuous cycles depending on familial comfort and natural pacing." }
        ],
        modalities: ["Speech & Articulation Therapy", "Voice and Fluency Integration", "Neurodivergent-Affirming Support", "Family-Centered Coaching"],
        blogTitle: "Building authentic communication at home: Interactive play-based SLP tips",
        blogDesc: "Explore slow pacing tools to release communicative tension and support organic language expansion...",
        newsletterDesc: "Get monthly play ideas, communication charts, and speech-language guides.",
        insuranceText: "We provide dedicated out-of-network speech therapy superbill templates suited for direct clinical billing reimbursement."
      };

    case "ot":
      if (vibeId === "modern-clean") {
        return {
          tagline: "Evidence-based pediatric and adult sensory integration, fine motor adaptation, and functional daily living skills.",
          heroHeadline: `Empowering, Skill-Based ${resolvedRole} Services`,
          heroSubheadline: `Providing clinical occupational therapy, hand therapy, and environmental modifications in ${location || "Local area"} (${workType || "Virtual & In-person"}).`,
          philosophyHeading: "An Evidence-Based, Practice-Focused OT Philosophy",
          philosophyBody: `Our practice combines clinical sensory integration, fine and gross motor adaptations, and functional self-regulation schemas. We skip talk therapy in favor of action-oriented coordination plans that target daily living skills.\n\nWe collaborate closely with clients and families to modify active workspaces, restructure motor execution pipelines, and promote long-term environmental accessibility.`,
          services: [
            {
              name: "Clinical Occupational Therapy Assessment",
              desc: "Comprehensive diagnostic review mapping sensory profiling, fine motor dexterity, or physical workspace ergonomics.",
              format: "70 min • Office Intake",
              rate: "$160 / session"
            },
            {
              name: "Fine Motor & Sensory Integration Session",
              desc: "Targeted skill development sessions utilizing diagnostic equipment, environmental modifications, and daily life training.",
              format: "50 min • Therapeutic Session",
              rate: "$190 / session"
            },
            {
              name: "OT Strategy Check-in",
              desc: "A brief fifteen-minute administrative call to align on active daily living goals and review billing superbills.",
              format: "15 min • Video Sync",
              rate: "Complimentary"
            }
          ],
          testimonialText: "Their analytical sensory and motor adaptations altered how I handle physical work fatigue. An objective, practice-focused clinical therapist who gets directly to the core of daily function.",
          testimonialAuthor: "— Executive Postural Client",
          faq: [
            { q: "What is sensory integration therapy?", a: "It is a structured framework that helps the brain organize environmental sensory inputs, improving regulation during daily activities." },
            { q: "How are environmental modifications planned?", a: "We analyze ergonomics, layout patterns, and sensory factors to optimize homes or offices for functional safety and ease." }
          ],
          modalities: ["Sensory Integration", "Fine & Gross Motor Adaptation", "Executive Function Coaching", "Environmental Modifications"],
          blogTitle: "Engineering focus: Designing sensory-friendly and ergonomic active workspaces",
          blogDesc: "Analyze mechanical joint strain, cognitive self-regulation, and environmental modifications that boost daily performance...",
          newsletterDesc: "Get occupational reference sheets, adaptive equipment guides, and practice checklists.",
          insuranceText: "Occupational therapy operates on a direct-pay clinical structure. Coded superbills are prepared for easy out-of-network insurance claims."
        };
      }
      return {
        tagline: "Build the skills you need to live your daily life with ease, comfort, and independence.",
        heroHeadline: `Warm, Strengths-Based ${resolvedRole} Support`,
        heroSubheadline: `Providing family-centered occupational therapy, neurodivergent-affirming coordination, and play-based skill building in ${location || "Local area"} (${workType || "Virtual & In-person"}).`,
        philosophyHeading: "Our Collaborative, Daily Living Philosophy",
        philosophyBody: `We believe everyone deserves to participate fully in the daily activities ("occupations") that bring meaning and life. Whether supporting children with fine motor play and self-regulation, or helping adults adapt after injury, we focus on practical, strengths-based steps.\n\nTogether, we design custom tools and sensory supports so you can thrive inside your home, school, and work landscapes.`,
        services: [
          {
            name: `Individual Occupational Therapy session`,
            desc: "Warm sensory-supportive and motor coordination exercises tailored to your developmental or physical goals.",
            format: "50 min • Clinic Space or Virtual",
            rate: "$160 / session"
          },
          {
            name: "Pediatric Play & Sensory Integration",
            desc: "Child-led functional motor development involving adaptive games, sensory diets, and neurodivergent-affirming coaching.",
            format: "60 min • Family Check-in",
            rate: "$190 / session"
          },
          {
            name: "Daily Occupational Potential Call",
            desc: "A supportive consultation to discuss daily living struggles, answer billing and superbill questions, and explore treatment options.",
            format: "15 min • Phone Check-in",
            rate: "Complimentary"
          }
        ],
        testimonialText: "Under her gentle play guidance, our son's fine motor focus blossomed. She created sensory diets that changed how he functions at school, bringing peace to our entire family.",
        testimonialAuthor: "— Grateful Parent",
        faq: [
          { q: "Can we incorporate virtual occupational therapy?", a: "Yes, we provide virtual daily living assessments, organizing parent coaching and environmental checks online." },
          { q: "Do you coordinate with pediatricians or school systems?", a: "We regularly coordinate care plans with schools, supporting advocacy and environment adaptations." }
        ],
        modalities: ["Neurodivergent-Affirming Play", "Sensory Integration Support", "Daily Life Co-Design", "Adaptive Tooling & Hand Therapy"],
        blogTitle: "Daily life co-design: Nurturing fine motor milestones through routine habits",
        blogDesc: "Explore natural, play-informed adaptive tactics that simplify dressing, writing, and focus at home...",
        newsletterDesc: "Get monthly sensory-diet ideas, ergonomic guides, and family skill sheets.",
        insuranceText: "We provide monthly occupational superbill invoices suited for out-of-network insurance reimbursement checks."
      };

    case "pt":
      if (vibeId === "modern-clean") {
        return {
          tagline: "Evidence-based orthopedic biomechanics, manual rehabilitation, and athletic return-to-sport performance.",
          heroHeadline: `Clinical, Neuromuscular ${resolvedRole} Services`,
          heroSubheadline: `Providing expert physical therapy, strength rehabilitation, and balance restoration in ${location || "Local area"} (${workType || "Virtual & In-person"}).`,
          philosophyHeading: "A Rigorous, Movement-Based Physical Therapy Model",
          philosophyBody: `We view physical recovery through the lens of orthopedic biomechanics and systematic neuromuscular control. By avoiding generic gym sheets, we perform detailed gait reviews, active tissue testing, and targeted joint mobilization to isolate strength limitations.\n\nOur science-grounded therapeutic exercises increase physical vital capacity, stabilize posture restrictions, and support peak physical performance.`,
          services: [
            {
              name: "Comprehensive Orthopedic Intake",
              desc: "Biomechanical musculoskeletal check checking gait metrics, angular rotation, and tissue restriction trends.",
              format: "60 min • Clinical Office",
              rate: "$155 / session"
            },
            {
              name: "Clinical Manual Therapy & Mobilization",
              desc: "High-precision physical bodywork, manual joint adjustments, and guided therapeutic exercises to restore physical grace.",
              format: "50 min • Therapeutic Session",
              rate: "$185 / session"
            },
            {
              name: "Physical Recovery Initial Call",
              desc: "A brief fifteen-minute clinical sync to review surgical history, check orthopedic files, and plan active therapy cycles.",
              format: "15 min • Phone or Virtual",
              rate: "Complimentary"
            }
          ],
          testimonialText: "A licensed physical clinician of exceptional rigor. Their dynamic biomechanical testing and neuromuscular exercises resolved a decade of hip restriction in months.",
          testimonialAuthor: "— Athletic Client Review",
          faq: [
            { q: "What should I expect in our physical evaluation?", a: "We conduct detailed skeletal joint testing, muscle resistance checks, and dynamic functional movement screenings." },
            { q: "Do we focus on dry-needling or passive agents?", a: "We prioritize evidence-grounded manual manipulation and active neuromuscular exercise patterns for durable physical integrity." }
          ],
          modalities: ["Orthopedic Biomechanics", "Gait & Balance Restoration", "Neuromuscular Control", "Therapeutic Exercise Planning"],
          blogTitle: "Deep clinical kinematics: Restoring functional rotary stability in lumbar segments",
          blogDesc: "Analyze clinical trial profiles regarding active joint loading, muscular re-education, and long-term athletic durability...",
          newsletterDesc: "Get quarterly orthopedic references, structural fitness digests, and kinetic movement files.",
          insuranceText: "Orthopedic physical therapy operates on selective direct clinical payment structures. Detailed physical coding bills are supplied for out-of-network insurance."
        };
      }
      return {
        tagline: "Restore your movement, increase your strength, and live free from physical boundaries.",
        heroHeadline: `Active, Results-Oriented ${resolvedRole} Rehabilitation`,
        heroSubheadline: `Empathetic physical rehabilitation, strength restoration, and movement coaching in ${location || "Local area"} (${workType || "Virtual & In-person"}) for all ages.`,
        philosophyHeading: "Our Calming, Movement-Based Recovery Philosophy",
        philosophyBody: `We believe your body is built for movement. Whether recovering from sports injuries, balancing orthopedic strains, or managing chronic physical pain, we provide hands-on manual therapy and targeted exercises tailored to your speed.\n\nThroughout your recovery, we stand by you as a clinical partner, helping you reclaim daily vital energy, confidence, and natural range of motion.`,
        services: [
          {
            name: `Musculoskeletal Evaluation & Gait Check`,
            desc: "In-depth testing of joint comfort, muscle balance, and walking posture, creating a tailored physical roadmap.",
            format: "60 min • Clinical space",
            rate: "$155 / session"
          },
          {
            name: "Hands-on Joint & Tissue Restoration Session",
            desc: "Combined gentle orthopedic adjustments and localized mobilizations integrated with targeted movement drills.",
            format: "50 min • Recovery Gym",
            rate: "$185 / session"
          },
          {
            name: "Kinetic Alignment Quick Call",
            desc: "An initial call to share your injury narrative, answer physical billing options, and see how we can restore your play.",
            format: "15 min • Video Call",
            rate: "Complimentary"
          }
        ],
        testimonialText: "The most caring physical recovery environment. I went from limping after my marathon to running pain-free under their guided, gentle exercise maps.",
        testimonialAuthor: "— Active Resident Client",
        faq: [
          { q: "How long are individual recovery cycles?", a: "We promote client self-mastery. Many clients see significant strength or mobility gains in 4 to 8 focused sessions." },
          { q: "What should I wear for our joint evaluation?", a: "Choose loose, athletic clothing that allows complete freedom of movement and easy joint inspections." }
        ],
        modalities: ["Manual Joint Mobilization", "Therapeutic Strength Exercises", "Neuromuscular Re-education", "Sports Rehabilitation"],
        blogTitle: "Unlocking physical recovery: The biology of progressive muscle loading",
        blogDesc: "Discover the connection between localized blood flow, joint mobilization, and slow active movement in soothing stiffness...",
        newsletterDesc: "Get active biomechanical guidelines, stretching diagrams, and clinic updates.",
        insuranceText: "We accept selective private-pay models and supply superbills suited for direct out-of-network physical therapy insurance reimbursements."
      };

    case "wellness":
      if (vibeId === "modern-clean") {
        return {
          tagline: "Integrative, evidence-aware holistic wellness counsel, root-cause alignment, and ancestral lineages.",
          heroHeadline: `Structured, Whole-Person ${resolvedRole} Guidance`,
          heroSubheadline: `Providing individualized restorative support, breathing practices, and herbalism in ${location || "Local area"} (${workType || "Virtual & In-person"}).`,
          philosophyHeading: "An Analytical Approach to Root-Cause Wellness",
          philosophyBody: `We bridge traditional ancestral wisdom with modern scientific stress biology. By bypassing institutional formulas, we design structured, individualized wellness offerings prioritizing deep presence, metabolic ease, and whole-person restore systems.\n\nOur focus is to evaluate active stressors, formulate botanical or breathing protocols, and establish a centered environment for lasting alignment.`,
          services: [
            {
              name: "Holistic Integration Assessment",
              desc: "Analytical root-cause check evaluating metabolic stressors, daily rest architecture, and botanical patterns.",
              format: "60 min • Practice Suite or Virtual",
              rate: "$145 / session"
            },
            {
              name: "Ancestral Lineage & Herb Protocol Session",
              desc: "Targeted formulation reviews mapping classic botanicals, energetic blocks, and therapeutic grounding practices.",
              format: "50 min • Guidance Session",
              rate: "$175 / session"
            },
            {
              name: "Wellness Onboarding Alignment Call",
              desc: "A brief fifteen-minute call to check wellness intakes, review session schedules, and align on restoration tracks.",
              format: "15 min • Phone Sync",
              rate: "Complimentary"
            }
          ],
          testimonialText: "An extremely analytical, highly structured holistic practitioner. They bridge ancestral lineages and modern wellness science beautifully, creating structured rituals that restored my metabolic energy.",
          testimonialAuthor: "— Client Wellness Review",
          faq: [
            { q: "What does holistic wellness counseling involve?", a: "We investigate root-cause environmental stressors, creating bio-individual botanical, sleep, and breathing protocols to support whole-person alignment." },
            { q: "Is this a clinical mental health therapy?", a: "No, our offerings are educational and advisory, focusing on preventative vitality, active stress downregulation, and ancestral wellness practices." }
          ],
          modalities: ["Root-Cause Assessments", "Botanical & Herbal Support", "Restorative Breathwork Protocols", "Whole-Person Energy Mapping"],
          blogTitle: "The science of slow rest: Soothing systemic cortisol through traditional breathwork",
          blogDesc: "Analyze botanical metabolic safety, nervous system downregulation trails, and why traditional healing rituals optimize long-term health...",
          newsletterDesc: "Get ancestral recipes, herbal reference charts, and restorative wellness guides.",
          insuranceText: "Holistic integration operates on a direct private structure. Standard invoicing is provided for individual wellness accounts or HSA/FSA records."
        };
      }
      return {
        tagline: "Align your energy, honor your lineage, and find deep ancestral ground.",
        heroHeadline: `Grounded, Whole-Person ${resolvedRole} Offerings`,
        heroSubheadline: `Providing holistic healing sessions, restorative breathwork, and sacred wellness circles in ${location || "Local area"} (${workType || "Virtual & In-person"}).`,
        philosophyHeading: "Our Sacred, Lineage-Centered Philosophy",
        philosophyBody: `We believe deep, sustainable wellness is an act of reclaiming your authentic presence. Our holistic sessions create a gentle, slow-paced sanctuary where you can clear daily clutter, connect with lineage wisdom, and experience resting harmony.\n\nWe focus on the root-cause patterns of stress, introducing quiet ceremonies and gentle botanical practices to sustain your everyday balance.`,
        services: [
          {
            name: `Intuitive Wellness Offering`,
            desc: "Bespoke blend of restorative touch, Reiki energy alignment, breathwork, or sound healing designed to renew your spirit.",
            format: "50 min • Sanctuary Room or Virtual",
            rate: "$145 / session"
          },
          {
            name: "Deep Holistic Restoration Session",
            desc: "An extended, slow-paced session integrating herbal formulations, ancestral holding, and customized breathing cycles.",
            format: "75 min • Caring Sacred Ritual",
            rate: "$175 / session"
          },
          {
            name: "Caring Connection Chat",
            desc: "A gentle meeting to discuss your wellness goals, explore ancestral offerings, and feel if our energies harmonize.",
            format: "15 min • Phone or Virtual",
            rate: "Complimentary"
          }
        ],
        testimonialText: "The most peaceful, grounding experience of my life. Her holistic circles and individual Reiki energy alignment helped me find center during my grief.",
        testimonialAuthor: "— Holistic Client Feedback",
        faq: [
          { q: "What is an intuitive energy alignment?", a: "It is a gentle, supportive rest practice using reiki, sound vibration, and focused presence to clear stress patterns from the body." },
          { q: "How should I prepare for a holistic session?", a: "Arrive in comfortable attire, bringing a quiet heart, open mind, and any intentions you wish to nurture." }
        ],
        modalities: ["Lineage & Ancestral Ceremony", "Restorative Sound Healing", "Intuitive Energy Alignment", "Gentle Breathwork Ceremonies"],
        blogTitle: "Ancestral roots of wellness: Returning to simple rhythms of earth and sky",
        blogDesc: "Discover botanical safety, simple breathing cycles, and holistic restoration tips that clear modern busyness...",
        newsletterDesc: "Get ancestral herbal guides, monthly meditations, and sacred circle invitations.",
        insuranceText: "Our wellness offerings are private, direct-pay sessions. We can supply standard payment receipts suited for wellness allowances or direct records."
      };

    default:
      if (vibeId === "modern-clean") {
        return {
          tagline: "Evidence-based clinical psychotherapy, cognitive restructuring, and systematic nervous system regulation.",
          heroHeadline: `Clinical, Expert & Evidence-Based Psychotherapy by ${resolvedRole}`,
          heroSubheadline: `Providing structured cognitive therapies and systematic nervous system diagnostic regulation in ${location || "Local area"} (${workType || "Virtual & In-person"}).`,
          philosophyHeading: "Our Clinical, Evidence-Based Therapeutic Paradigm",
          philosophyBody: `We reject vague therapeutic hand-waving and infinite open-ended venting. Our clinical practice combines Cognitive Behavioral Therapy (CBT), Acceptance and Commitment Therapy (ACT), and structured neuro-regulatory somatic protocols.\n\nBy helping you track daily behavioral patterns, explore core cognitive schemas, and systematically regulate autonomic states, we provide a structured, adult, and highly objective lane toward lasting mental wellness.`,
          services: [
            {
              name: "Clinical Neuro-Cognitive Psychotherapy",
              desc: "Evidence-based individual psychotherapy targeting cognitive restructuring, somatic schema changes, and high-agency recovery.",
              format: "50 min • Clinic Suite or Telehealth",
              rate: "$160 / session"
            },
            {
              name: "Autonomic Nervous System Evaluation",
              desc: "A systematic diagnostic intake mapping somatic trigger pathways, stress spikes, and custom neuro-regulatory schedules.",
              format: "80 min • Comprehensive Care",
              rate: "$210 / session"
            },
            {
              name: "Clinical Onboarding Consultation",
              desc: "A brief 15-minute clinical intake to review therapist licensure, billing superbly, and establish diagnostic alignment.",
              format: "15 min • Phone or Virtual",
              rate: "Complimentary"
            }
          ],
          testimonialText: "An clinical psychologist of absolute clarity. Their clear boundaries, structured pacing, and scientific somatic expertise are immensely refreshing compared to standard open therapy.",
          testimonialAuthor: "— Certified Licensure Colleague Peer Review",
          faq: [
            { q: "What should I expect in our initial clinical intake?", a: "We map out active environmental triggers, identify limiting cognitive schemas, and coordinate a systematic regulatory treatment roadmap." },
            { q: "How is session focus determined?", a: "Sessions are structured with objective therapeutic goals, utilizing evidence-backed cognitive and physiological homework programs." }
          ],
          modalities: ["Cognitive Behavioral Restructuring (CBT)", "CNS Autonomic Regulation", "Acceptance and Commitment Therapy (ACT)", "EMDR Bilateral Stimulation"],
          blogTitle: "Autonomic nervous system metrics: Tracking stress responses scientifically",
          blogDesc: "Analyze clinical trial profiles regarding vagal tone, high-stress schema triggers, and systematic somatic exercises...",
          newsletterDesc: "Get objective clinical research sheets, cognitive tracing sheets, and wellness schedules.",
          insuranceText: "We prioritize patient diagnostic privacy by operating out-of-network. Meticulous coded superbills are provided for direct out-of-network clinical reimbursement."
        };
      }
      return {
        tagline: "A safe space to soft-land, process life's pivots, and gentle your nervous system.",
        heroHeadline: `Warm, Somatic & Trauma-Informed ${resolvedRole} Services`,
        heroSubheadline: `Providing an empathetic clinical sanctuary in ${location || "Local area"} (${workType || "Virtual & In-person"}) for individuals seeking gentle, somatic alignment.`,
        philosophyHeading: "Our Somatic & Integrative Practice Approach",
        philosophyBody: `We believe healing is never a linear checklist to be rushed, but an organic unfolding back to your natural state.\n\nOur objective is to accompany you as an ethical, HIPAA-aware partner in somatic restoration, processing grief, and building a resilient center.`,
        services: [
          {
            name: `Individual Somatic ${resolvedRole} Session`,
            desc: "Tailored somatic dialogue and regulation focused on soothing trauma responses, calming anxiety, and restoring natural equilibrium.",
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
        ],
        testimonialText: "An ethical practitioner of absolute clarity. Her clinical boundaries, patient pacing, and somatic expertise are highly refreshing.",
        testimonialAuthor: "— Certified Licensure Colleague Peer Review",
        faq: [
          { q: "What should I expect in our somatic call?", a: "We check-in slowly, pacing biological response and looking at full physical alignment with your personal story." },
          { q: "Do you accept insurance?", a: "We provide out-of-network superbill help sheets directly so you can obtain custom insurance reimbursement." }
        ],
        modalities: ["Somatic Experiencing", "Internal Family Systems parts work", "ACT Therapy", "EMDR Eye Pacing"],
        blogTitle: "Understanding somatic boundaries: The nervous system checklist",
        blogDesc: "Explore slow pacing tools to release visceral physical shock and chronic daily exhaustion...",
        newsletterDesc: "Get updates, billing guidance, and somatic practice checklists every month.",
        insuranceText: "Most therapists operate out-of-network to protect data boundaries. We provide monthly superbill helper invoices so you can seek direct out-of-network insurance reimbursement securely."
      };
  }
}

export const PRESETS = [
  {
    id: "warm-grounded",
    name: "Warm & Grounded",
    tagline: "Soft, sage, and slow. The website version of a long exhale.",
    bestFor: "Trauma therapists, somatic practitioners, holistic helpers, anyone whose work is about coming home to the body.",
    colors: ["#F5F0E6", "#9CAF88", "#7A8F6A", "#3A3530"],
    typography: { headlines: "Playfair Display or Lora (Serif)", body: "Inter" },
    layoutName: "Editorial Journal",
    layoutDescription: "Left-aligned serif hero with portrait photo on right; Stacked content rows alternating image/text; Italic pull-quotes between sections; Single-column testimonial carousel; Generous whitespace, slow pacing; Single-column footer.",
    mood: "A curated wellness journal. Slow, intentional.",
    references: ["aesop.com", "brenebrown.com", "open.co"]
  },
  {
    id: "bold-editorial",
    name: "Bold & Editorial",
    tagline: "Big serif energy. Looks expensive without trying too hard.",
    bestFor: "Established therapists with a personal brand, group practice owners, helpers who want to feel like the magazine cover, not the ad in the back.",
    colors: ["#F5F1ED", "#1A2147", "#E54E3C", "#D4CFC4"],
    typography: { headlines: "Fraunces or Tiempos Headline (Bold Serif)", body: "Inter" },
    layoutName: "Magazine Centered",
    layoutDescription: "Centered massive serif headline hero; Small uppercase pill labels above each section (\"OUR APPROACH\", \"WHAT TO EXPECT\"); One coral CTA per section maximum; Simple black trust-logo strip on cream; Long breathing pauses between sections; Minimal top nav.",
    mood: "A smart magazine. Confident, warm, premium.",
    references: ["jasper.ai", "typeform.com", "everlane.com"]
  },
  {
    id: "modern-clean",
    name: "Modern & Clean",
    tagline: "Crisp navy, sharp lines, no nonsense. The website your MD friends will trust on sight.",
    bestFor: "MDs, PhDs, psychiatrists, group practices, anyone in the clinical-or-research lane who wants 'grown-up' over 'cozy.'",
    colors: ["#FFFFFF", "#1A2B3D", "#6B7280", "#E5E7EB"],
    typography: { headlines: "Inter or Geist (Sans-Serif)", body: "Inter or Geist (Sans-Serif)" },
    layoutName: "Geometric Bento",
    layoutDescription: "Centered hero with abstract geometric graphic; Top nav bar with right-aligned CTA button; 3-column bento grid for services (cards with icon, title, 2-line description, arrow); 3-up testimonial grid with avatar circles; Inline calendar embed; Structured 4-column footer.",
    mood: "Premium SaaS. App-like, professional, research-leaning.",
    references: ["linear.app", "stripe.com", "helloalma.com"]
  },
  {
    id: "helpers-electric",
    name: "Helpers Electric",
    tagline: "Loud in the best way. For the helper who's tired of beige websites.",
    bestFor: "Coaches, younger therapists, community-builders, group programs, anyone whose brand has a strong point of view and isn't afraid to show it.",
    colors: ["#0A0A0A", "#2563EB", "#84CC16", "#1F2937"],
    typography: { headlines: "Geist or Space Grotesk (Modern Sans)", body: "Inter" },
    layoutName: "Bold Asymmetric",
    layoutDescription: "Diagonal or asymmetric hero; Pill-shaped floating CTA buttons; Color-blocked service cards (each card in a different accent color); Full-bleed testimonial sections; Big bold section dividers with dramatic visual breaks.",
    mood: "Mental fitness club. High energy, contemporary.",
    references: ["joincoa.com", "brightside.com", "vercel.com"]
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
      const saved = localStorage.getItem("vibeId") || "warm-grounded";
      if (saved === "bold-sunshine") return "helpers-electric";
      return saved;
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

  // --- Step 5 Active Tabs States ---
  const [activeTab, setActiveTab] = useState<"strategy" | "squarespace" | "aiBuilders">("strategy");
  const [activeSquarespaceBlock, setActiveSquarespaceBlock] = useState<string>("hero");
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [showHostingGuide, setShowHostingGuide] = useState(false);

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
    const presets = getHelperPresets(helperType, location, workType, customHelperTitle, vibeId);
    setWebsiteCopy(prev => ({
      ...prev,
      tagline: presets.tagline,
      heroHeadline: presets.heroHeadline,
      heroSubheadline: presets.heroSubheadline,
      philosophyHeading: presets.philosophyHeading,
      philosophyBody: presets.philosophyBody,
      services: presets.services
    }));
  }, [helperType, customHelperTitle, location, workType, vibeId]);

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

  // --- Step 5 Live Strategy, CSS, and AI Prompt Compiler ---
  const compiledTabOutputs = useMemo(() => {
    const resolvedRole = helperType === "Custom" ? customHelperTitle || "Helper" : helperType;
    const roleLower = resolvedRole.toLowerCase();

    // 1. Determine vocabulary & guidelines based on active role
    let category = "therapist";
    if (roleLower.includes("coach") && !roleLower.includes("health coach") && !roleLower.includes("wellness coach")) {
      category = "coach";
    } else if (roleLower.includes("nutrition") || roleLower.includes("dietitian") || roleLower.includes("dietary")) {
      category = "nutritionist";
    } else if (roleLower.includes("doula")) {
      category = "doula";
    } else if (roleLower.includes("midwife") || roleLower.includes("midwifery")) {
      category = "midwife";
    } else if (roleLower.includes("acupunctur") || roleLower.includes("lac ") || roleLower.endsWith("lac") || roleLower.includes("tcm")) {
      category = "acupuncturist";
    } else if (roleLower.includes("massage") || roleLower.includes("lmt") || roleLower.includes("bodywork")) {
      category = "massage";
    } else if (roleLower.includes("speech") || roleLower.includes("pathologist") || roleLower.includes("language") || roleLower.includes("slp")) {
      category = "speech";
    } else if (roleLower.includes("occupational") || roleLower.includes("otr") || roleLower === "ot" || roleLower.includes(" ot ") || roleLower.startsWith("ot ") || roleLower.endsWith(" ot")) {
      category = "ot";
    } else if (roleLower.includes("physical") || roleLower.includes("physiother") || roleLower.includes("dpt") || roleLower === "pt" || roleLower.includes(" pt ") || roleLower.startsWith("pt ") || roleLower.endsWith(" pt")) {
      category = "pt";
    } else if (
      roleLower.includes("wellness") ||
      roleLower.includes("reiki") ||
      roleLower.includes("breathwork") ||
      roleLower.includes("herbal") ||
      roleLower.includes("energy") ||
      roleLower.includes("holistic") ||
      roleLower.includes("sound") ||
      roleLower.includes("yoga") ||
      roleLower.includes("health coach") ||
      roleLower.includes("wellness coach") ||
      roleLower.includes("practitioner")
    ) {
      category = "wellness";
    } else if (roleLower.includes("doctor") || roleLower.includes("physician") || roleLower.includes("md") || roleLower.includes("do")) {
      category = "medical";
    }

    // Role specific variables
    let vocab: string[] = [];
    let tone = "";
    let sampleCallout = "";
    let focusSections: string[] = [];
    let omitSections: string[] = [];
    let photographicDirections = "";

    if (category === "therapist") {
      vocab = ["trauma-informed", "somatic", "nervous system", "attachment", "processing", "regulation", "integration", "parts work", "embodiment", "healing"];
      tone = "Warm, clinical, gentle authority, safe and contained.";
      sampleCallout = "Support for people working through tough nervous system blocks, trauma reprocessing, and relational attachment loops.";
      focusSections = ["Modalities / My Approach", "Investment & Access (Insurance)", "HIPAA Compliance Notice", "Good Faith Estimate"];
      omitSections = ["somatic language when not therapist-coded", "polyvagal", "trauma processing", "attachment"];
      photographicDirections = "Warm, low-contrast natural lighting inside a cozy healing office. Gentle textures, potted green plants, soft textiles, and a welcoming, authentic smile. Avoid bright clinical laboratory white lamps or sterile corporate office tables.";
    } else if (category === "coach") {
      vocab = ["goals", "transformation", "accountability", "mindset", "breakthroughs", "vision", "alignment", "possibility", "momentum", "clarity", "container", "practice", "embodiment"];
      tone = "Warm, forward-momentum, motivating, peer-to-peer.";
      sampleCallout = "Helping ambitious people who want mindset breakthroughs, personal alignment, and structural habit transformations.";
      focusSections = ["Methodology & Practice", "Programs & Structures", "Testimonials", "Booking Schedule"];
      omitSections = ["HIPAA Notice", "Good Faith Estimate", "Clinical/diagnostic labels", "somatic", "polyvagal", "trauma processing", "attachment work", "clinical", "diagnosis", "treatment", "modality (in clinical sense)", "patient"];
      photographicDirections = "Bright, high-contrast crisp daylight portraits. Dynamic workspace actions, walking outdoors, organized creative journals, coffee mugs, and active postures reflecting motion, confidence, and focus.";
    } else if (category === "nutritionist") {
      vocab = ["nourishment", "body literacy", "intuitive eating", "food relationship", "gentle nutrition", "weight-neutral", "HAES (Health At Every Size)", "anti-diet", "sustainable", "whole-person", "embodied", "root cause"];
      tone = "Warm, body-positive, evidence-grounded, weight-neutral.";
      sampleCallout = "Support for people who want a different relationship with food and their body, sustainable body literacy, and whole-person wellness.";
      focusSections = ["Nourishing Approach", "咨询 Programs & Consultation Packages", "Insurance Support (if RD)", "Conditions Supported"];
      omitSections = ["weight-focused language", "lose weight", "diet", "meal plan as the headline", "somatic", "polyvagal", "trauma processing", "therapy framing"];
      photographicDirections = "Bright, colorful, organic lighting in a natural kitchen or sun-drenched consult room. Vibrant organic food bowls, warm ceramic mugs, open recipe notebooks, and gentle, welcoming postures.";
    } else if (category === "doula") {
      vocab = ["support", "advocacy", "birthing journey", "postpartum", "partnership", "presence", "continuity of care", "family-centered"];
      tone = "Warm, grounded, fiercely supportive, protective.";
      sampleCallout = "Walking alongside Families through the full birthing journey, holding sacred protective presence, and providing continuous postpartum care.";
      focusSections = ["Nesting Services", "Anonymized Birth Stories", "Postpartum Planning", "FAQ"];
      omitSections = ["HIPAA Notice", "Good Faith Estimate", "Clinical medical procedures", "Diagnostic terms", "somatic", "polyvagal", "trauma processing", "attachment"];
      photographicDirections = "Extremely warm, ambient, golden-hour domestic environments. Gentle close-up details of hands holding, cozy neutral nurseries, wooden swaddles, postpartum herbal teas, and compassionate, protective facial expressions.";
    } else if (category === "midwife") {
      vocab = ["continuity of care", "birth preferences", "prenatal", "postpartum", "family-centered", "evidence-based", "partnership"];
      tone = "Warm, professional, calming, evidence-grounded, safety-focused.";
      sampleCallout = "Personalized clinical maternal healthcare for the full birth journey, balancing physiological wisdom with rigorous home safety planning.";
      focusSections = ["Maternal Services", "Safety & Transport Planning", "Care FAQ", "Insurance Superbills"];
      omitSections = ["Clinical medical procedures", "Diagnostic terms", "somatic", "polyvagal", "trauma processing", "attachment"];
      photographicDirections = "Clean, calming, daylight-filled clinical space or home birth settings. Sleek diagnostic equipment, wooden stethoscopes, comfortable testing chairs, natural elements, and deep serene smiles of clinical competence.";
    } else if (category === "acupuncturist") {
      vocab = ["meridians", "qi", "points", "treatment", "balance", "restoration", "traditional Chinese medicine (TCM)", "holistic", "integrative", "energetic flow", "channels", "harmony", "lineage"];
      tone = "Warm, grounded, gently authoritative, ancient-meets-modern.";
      sampleCallout = "Restoring balance for people working through posture restrictions, stress holding points, pain, or digestive imbalances.";
      focusSections = ["Conditions Treated", "My Approach", "Insurance", "FAQ"];
      omitSections = ["somatic (as therapist-coded)", "polyvagal", "trauma processing", "attachment", "talk therapy framing"];
      photographicDirections = "Clean, calming, daylight-filled clinical space or acupuncture settings. Sleek diagnostic equipment, wooden stethoscopes, comfortable testing chairs, natural elements, and deep serene smiles of clinical competence.";
    } else if (category === "massage") {
      vocab = ["bodywork", "fascia", "release", "tension", "restoration", "integration", "hands-on", "intuitive touch", "deep tissue", "myofascial", "Swedish", "prenatal", "lymphatic", "integrative", "embodied presence"];
      tone = "Warm, grounded, present, sensory.";
      sampleCallout = "Skilled bodywork for people carrying physical tension, posture restrictions, or muscular fatigue loops.";
      focusSections = ["Modalities Offered", "Booking", "Pricing", "FAQ"];
      omitSections = ["polyvagal", "trauma processing (as therapist-coded)", "attachment", "treatment plan (clinical framing)", "psychotherapy language"];
      photographicDirections = "Calm, clean, focused wellness studio lighting. Neat massage tables covered in linen, anatomical models, trigger maps, vascular oils, and practitioners in dedicated athletic/clinical attire focusing on orthopedic restoration.";
    } else if (category === "speech") {
      vocab = ["communication", "voice", "speech", "language", "swallow", "articulation", "fluency", "cognitive-linguistic", "augmentative communication (AAC)", "neurodivergent-affirming", "family-centered", "pragmatics", "social communication", "executive function"];
      tone = "Warm, professional, family-centered, neurodivergent-affirming.";
      sampleCallout = "Personalized speech, language, and communication support for children and adults.";
      focusSections = ["Specialties", "Conditions Supported", "Ages Served", "Insurance", "New Patient Info", "FAQ"];
      omitSections = ["somatic", "polyvagal", "trauma processing", "attachment work", "therapy alone (always pair with speech therapy or speech-language therapy)", "psychotherapy framing"];
      photographicDirections = "Bright, family-friendly, well-lit spaces. Interactive communication boards, games, playful textures, neurodiversity-supportive tools, and a highly approachable, warm smiling posture.";
    } else if (category === "ot") {
      vocab = ["occupation (daily activities)", "function", "adaptation", "sensory integration", "fine motor", "gross motor", "self-regulation", "executive function", "neurodivergent-affirming", "family-centered", "environmental modification", "daily living skills", "hand therapy"];
      tone = "Warm, professional, empowering, family-centered.";
      sampleCallout = "Helping people build the skills they need to live their daily life with more ease.";
      focusSections = ["Specialties", "Conditions Supported", "Ages Served", "Insurance", "New Patient Info"];
      omitSections = ["somatic (as therapist-coded)", "polyvagal", "psychotherapy framing", "talk therapy"];
      photographicDirections = "Spacious, well-lit therapy rooms with adaptive sensory structures. Fine motor exercises, occupational tools, therapeutic games, and empowering hands-on interactions.";
    } else if (category === "pt") {
      vocab = ["movement", "mobility", "function", "biomechanics", "strength", "balance", "rehabilitation", "recovery", "performance", "manual therapy", "therapeutic exercise", "restoration", "neuromuscular control", "return-to-sport", "evidence-based"];
      tone = "Warm, professional, results-oriented, evidence-based.";
      sampleCallout = "Movement-based care for people working through mobility limits, injury recovery, or biomechanical constraints.";
      focusSections = ["Conditions Treated", "Specialties", "Insurance", "New Patient Info", "FAQ"];
      omitSections = ["somatic (as therapist-coded)", "polyvagal", "psychotherapy framing", "trauma processing"];
      photographicDirections = "Clean, active, daylight-filled physical therapy studio. Yoga mats, resistance bands, anatomical maps, skeletal models, and movement-focused postures reflecting professional precision.";
    } else if (category === "wellness") {
      vocab = ["whole-person", "holistic", "integrative", "alignment", "embodied", "sustainable practice", "root cause", "individualized", "intentional", "restorative", "lineage", "ancestral", "ceremony", "presence"];
      tone = "Warm, grounded, integrative, reverent.";
      sampleCallout = "Whole-person care for people seeking root-cause realignment, energy balance, and ancestral practice.";
      focusSections = ["My Approach / Philosophy", "Services / Offerings", "FAQ"];
      omitSections = ["clinical diagnosis language", "treatment (use offering or session)", "psychotherapy framing", "somatic (unless specifically somatic practitioner)"];
      photographicDirections = "Serene, soft, low-contrast natural lighting inside a sensory room. Warm rugs, singing bowls, essential oils, soft cushions, and meditative, present postures.";
    } else if (category === "medical") {
      vocab = ["evidence-based", "patient-centered", "clinical excellence", "preventive care", "partnership", "integrated", "whole-person"];
      tone = "Professional, warm, authoritative, analytical, preventative.";
      sampleCallout = "Clinical, data-driven primary care designed to treat you like a whole person, prioritizing metabolic longevity and preventive screening.";
      focusSections = ["Preventative Wellness Services", "Conditions Supported", "Insurance Superbill Policies", "New Patient Process"];
      omitSections = ["somatic", "polyvagal", "trauma processing", "attachment"];
      photographicDirections = "Sleek, bright, contemporary clinical consulting space. High-end diagnostic screens, cardiovascular reference charts, modern health wearables, professional but accessible medical attire, reflecting scholarly excellence and human warmth.";
    }

    // 2. Select presets & styles
    const selectedPreset = PRESETS.find(p => p.id === vibeId) || PRESETS[0];
    const designStyleName = selectedPreset.name;
    const colors = selectedPreset.colors;
    const fonts = selectedPreset.typography;
    const references = selectedPreset.references;

    let presetCSS = "";
    let baseStylesInline = "";
    if (vibeId === "warm-grounded") {
      presetCSS = `/* 🌟 Squarespace Custom CSS for Preset ${designStyleName} */
body {
  background-color: #F5F0E6 !important;
  color: #3A3530 !important;
  font-family: 'Inter', sans-serif !important;
}

h1, h2, h3, h4, .sqs-heading {
  font-family: 'Playfair Display', serif !important;
  font-style: italic !important;
  color: #3A3530 !important;
  font-weight: 600 !important;
}

.sqs-block-button-element, .primary-cta {
  background-color: #9CAF88 !important;
  color: #F5F0E6 !important;
  font-family: 'Inter', sans-serif !important;
  font-weight: 700 !important;
  border-radius: 8px !important;
  transition: all 0.2s ease !important;
}

.sqs-block-button-element:hover, .primary-cta:hover {
  background-color: #7A8F6A !important;
}
`;
      baseStylesInline = `background-color: #F5F0E6; color: #3A3530; font-family: 'Inter', sans-serif;`;
    } else if (vibeId === "bold-editorial") {
      presetCSS = `/* 🌟 Squarespace Custom CSS for Preset ${designStyleName} */
body {
  background-color: #F5F1ED !important;
  color: #1A2147 !important;
  font-family: 'Inter', sans-serif !important;
}

h1, h2, h3, h4, .sqs-heading {
  font-family: 'Fraunces', serif !important;
  font-weight: 900 !important;
  color: #1A2147 !important;
}

.sqs-block-button-element, .primary-cta {
  background-color: #E54E3C !important;
  color: #F5F1ED !important;
  font-family: 'Inter', sans-serif !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  border-radius: 4px !important;
  transition: all 0.2s ease !important;
}

.sqs-block-button-element:hover, .primary-cta:hover {
  background-color: #C0392B !important;
}
`;
      baseStylesInline = `background-color: #F5F1ED; color: #1A2147; font-family: 'Inter', sans-serif;`;
    } else if (vibeId === "modern-clean") {
      presetCSS = `/* 🌟 Squarespace Custom CSS for Preset ${designStyleName} */
body {
  background-color: #FFFFFF !important;
  color: #1A2B3D !important;
  font-family: 'Inter', sans-serif !important;
}

h1, h2, h3, h4, .sqs-heading {
  font-family: 'Inter', sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: -0.02em !important;
  color: #1A2B3D !important;
}

.sqs-block-button-element, .primary-cta {
  background-color: #1A2B3D !important;
  color: #FFFFFF !important;
  font-family: 'Inter', sans-serif !important;
  font-weight: 500 !important;
  border-radius: 8px !important;
  transition: all 0.2s ease !important;
}

.sqs-block-button-element:hover, .primary-cta:hover {
  background-color: #253D56 !important;
}
`;
      baseStylesInline = `background-color: #FFFFFF; color: #1A2B3D; font-family: 'Inter', sans-serif;`;
    } else { // helpers-electric
      presetCSS = `/* 🌟 Squarespace Custom CSS for Preset ${designStyleName} */
body {
  background-color: #0A0A0A !important;
  color: #FFFFFF !important;
  font-family: 'Inter', sans-serif !important;
}

h1, h2, h3, h4, .sqs-heading {
  font-family: 'Space Grotesk', sans-serif !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  color: #FFFFFF !important;
}

.sqs-block-button-element, .primary-cta {
  background-color: #2563EB !important;
  color: #84CC16 !important;
  font-family: 'Space Grotesk', sans-serif !important;
  font-weight: 800 !important;
  border-radius: 9999px !important;
  border: 1px solid rgba(132, 204, 22, 0.2) !important;
  transition: all 0.2s ease !important;
}

.sqs-block-button-element:hover, .primary-cta:hover {
  background-color: #1D4ED8 !important;
}
`;
      baseStylesInline = `background-color: #0A0A0A; color: #FFFFFF; font-family: 'Inter', sans-serif;`;
    }

    const headingFontFamily = fonts.headlines;
    const bodyFontFamily = fonts.body;

    const bgHex = colors[0];
    const textHex = colors[1];
    const buttonHex = colors[2];
    const accentHex = colors[3] || colors[2];

    // TAB 1: THE STRATEGY
    let strategyDoc = `===================================================================
BLUEPRINT MARKETING STRATEGY FOR: ${businessName || "My Helper Practice"}
===================================================================

ROLE CATEGORY: ${resolvedRole} (${tone})
LOCATION FOCUS: ${location || "Local area"} (${workType || "Virtual & In-person"})
CHOSEN SYSTEM: Preset ${designStyleName} (${vibeId})

-------------------------------------------------------------------
1. BRAND VOICE GUIDELINE (NEVER MIX LIBRARIES)
-------------------------------------------------------------------
- Tone & Delivery: ${tone}
- Mandated Vocabulary (Use these keywords site-wide):
  ${vocab.map(v => `• ${v}`).join("\n  ")}
- Standard Intro Copy Hook:
  "${sampleCallout}"

DO NOT USE:
  - Vague clinical jargon if you are a Coach.
  - Vague somatic or non-medical diagnostic talk if you are a Physician/Midwife/Doula.
  - Any outcome promises (such as "cure", "guaranteed healing", "fixed inside 3 sessions"). Always frame as "explore", "work through", "find support".

-------------------------------------------------------------------
2. DESIGN SYSTEM & ACCENTS
-------------------------------------------------------------------
- Background Color: ${bgHex}
- Core Body Text Color: ${textHex}
- Buttons & Primary CTAs: ${buttonHex}
- Visual Accent Points: ${accentHex}
- Headings Font: ${headingFontFamily}
- Body Copy Font: ${bodyFontFamily}

Reference Sites for Pacing & Colorrestraint:
  ${references.map(r => `- ${r}`).join("\n  ")}
Visual Mood Target: A cohesive, distraction-free landscape. Keep outer page margins clean, never clutter padding.

-------------------------------------------------------------------
3. SUGGESTED PAGE STRUCTURE & SEQUENCE
-------------------------------------------------------------------
Here is your layout sequence based on your personalized Lego priorities from Step 4:\n`;

    sections.filter((s: any) => s.enabled).forEach((sec: any, idx: number) => {
      strategyDoc += `Step ${idx + 1}: [BLOCK - ${sec.name.toUpperCase()}]\n`;
    });

    strategyDoc += `\n-------------------------------------------------------------------\n4. PLAIN-LANGUAGE SECTION COPY & alternative HEADLINES\n-------------------------------------------------------------------`;

    sections.filter((s: any) => s.enabled).forEach((sec: any) => {
      strategyDoc += `\n\n=== BLOCK: ${sec.name.toUpperCase()} ===\n`;

      if (sec.id === "hero") {
        strategyDoc += `Alternative Headlines (3 options):
  Option A: "Personalized ${resolvedRole} Services in ${location || "your area"}"
  Option B: "A quiet space to rest, recover, and process your goals"
  Option C: "${sampleCallout.slice(0, 50)}..."
Suggested Tagline Copy:
  "${websiteCopy.tagline}"
Suggested Body/Subhead:
  "${websiteCopy.heroSubheadline}"`;
      } else if (sec.id === "about") {
        strategyDoc += `Alternative Headlines (3 options):
  Option A: "Behind the Practice: Meet [Your Name]"
  Option B: "My Journey as a Dedicated ${resolvedRole}"
  Option C: "A clinical partner walking alongside you"
Suggested Plain-Language Copy:
  "Hello. As a certified ${resolvedRole} practicing in ${location || "your community"}, I approach recovery as a collaborative partnership. I specialize in evidence-grounded steps, ensuring clinical boundaries, patient safety, and genuine emotional warmth are maintained. Together, we evaluate copy, build pathways, and design solutions tailored to your unique context."`;
      } else if (sec.id === "services-specialties") {
        strategyDoc += `Alternative Headlines (3 options):
  Option A: "Structured Support Formats & Fees"
  Option B: "How We Work Together: Formats for Growth"
  Option C: "Bespoke Services tailored to your rhythm"
Suggested Copy of Services:
${websiteCopy.services.map(s => `  • ${s.name} (${s.format}) - ${s.rate}\n    Description: ${s.desc}`).join("\n\n")}`;
      } else if (sec.id === "testimonials") {
        strategyDoc += `Alternative Headlines (3 options):
  Option A: "Reflections from past client circles"
  Option B: "Anonymized peer and client reviews"
  Option C: "Experiences of care & containment"
Suggested Composite Review:
  "They provided deep, unwavering presence during my healing pathways. A truly clinical yet tenderly supportive practitioner."
  (Note: names and specifics are strictly anonymized in compliance with local boards. Labels like 'Client Feedback' or 'Healthcare Peer' used.)`;
      } else if (sec.id === "insurance") {
        const isClin = category === "therapist" || category === "medical" || category === "nutritionist" || category === "midwife";
        strategyDoc += `Alternative Headlines (3 options):
  Option A: "Rates, Fees, and Out-of-Network Superbills"
  Option B: "Investment Details & Financial Accessibility"
  Option C: "Transparent fees with private-pay safeguards"
Suggested Investment Statement:
  ${isClin ? "Our clinical packages are primary client direct-pay to protect diagnostic privacy parameters. We furnish fully-coded medical superbill summaries for out-of-network insurance reimbursement checks." : "All programs and consulting structures are direct client-pay. We support FSA/HSA wellness cards and supply transaction detail slips."}`;
      } else if (sec.id === "gfe") {
        strategyDoc += `Alternative Headlines (3 options):
  Option A: "Federal Protection: Your Right to a Good Faith Estimate"
  Option B: "The No Surprises Medical Pricing Protection Act"
  Option C: "Good Faith Estimates (GFE) Explained"
Suggested Compulsory Statement:
  "Under United States regulatory rule (No Surprises Act), any cash-pay or out-of-network health seeker has a clear federal right to a Good Faith Estimate mapping expected clinical costs. You can request this in writing before booking."`;
      } else if (sec.id === "crisis") {
        strategyDoc += `Alternative Headlines (3 options):
  Option A: "Sticky Header: Safety & Acute Crisis Support"
  Option B: "Please Note: Out-of-Hours Emergency Numbers"
  Option C: "Immediate Mental Well-being Safeguards"
Suggested Warning Statement:
  "IF YOU ARE IN CLINICAL EMERGENCY OR CRISIS, please immediately dial 988 or text HOME to 741741. This helper portal does NOT monitor acute psychiatric emergencies. Your immediate safety is our primary focus."`;
      } else if (sec.id === "hipaa") {
        strategyDoc += `Alternative Headlines (3 options):
  Option A: "HIPAA Protected Privacy Policies"
  Option B: "Protected Healthcare Management Standards"
  Option C: "Privacy and Personal File Security"
Suggested Copy Statement:
  "We maintain rigorous HIPAA compliant protocols to protect your health summary sheets, intake notes, and scheduling details. Data is encrypted and stored on security-certified private servers."`;
      } else if (sec.id === "faq") {
        strategyDoc += `Alternative Headlines (3 options):
  Option A: "Curiosities & Practical Realities (FAQ)"
  Option B: "Things worth knowing before our first meet"
  Option C: "Frequently Asked Questions"
Suggested Accordion Q&As:
  Q: "What is your typical session duration?"
  A: "Intake checkups last 80 minutes, while standard operational sessions span 50-60 minutes."
  Q: "How are scheduling cancellations handled?"
  A: "We request a professional 24-hour notification window to handle bookings fairly for all seekers."`;
      } else if (sec.id === "modalities") {
        strategyDoc += `Alternative Headlines (3 options):
  Option A: "Clinical Methodologies & Tools We Use"
  Option B: "A Look Into My Therapeutic / Coaching Modalities"
  Option C: "The Core Frameworks Supporting Your Journey"
Suggested Modalities Tags:
  EMDR Somatic Integration, Internal Family Systems (IFS), and CNS Autonomic Regulation.`;
      } else {
        strategyDoc += `Suggested Headline Options: "Learn More", "Additional Practice details"\nSuggested Placeholder content: [Insert your custom role-appropriate details here]`;
      }
    });

    strategyDoc += `\n\n-------------------------------------------------------------------
5. LOCAL SEARCH ENGINE OPTIMIZATION (SEO) KEYWORDS
-------------------------------------------------------------------
Target Local Search Terms (Best for St. Petersburg, FL etc.):
  • "${resolvedRole} in ${location || "Local State"}"
  • "${location || "Local State"} ${resolvedRole} for adults"
  • "Best certified ${resolvedRole} near ${location || "me"}"
  • "Private-pay ${resolvedRole} ${location || "area"}"
  • "In-person and virtual ${resolvedRole} ${location || "State"}"

-------------------------------------------------------------------
6. PHOTOGRAPHY ART DIRECTION
-------------------------------------------------------------------
Mood & Atmosphere: 
  ${photographicDirections}
Key Photography Checklist to shoot:
  1. Primary headshot with warm, eye-contact smiles.
  2. Action shot reviewing notes, journals, or typing at a sunny workspace.
  3. Detail shot of ceramic mugs, leafy green plants, or soft office linens.
  4. Wide atmospheric angle of the empty healing consultation nook.

-------------------------------------------------------------------
7. EXECUTION CHECKLIST (RECOMMENDED NEXT STEPS)
-------------------------------------------------------------------
[ ] Step 1: Secure a local website domain mapping to your GMB registry name.
[ ] Step 2: Open Tab 2 to copy the customized site-wide brand CSS into Squarespace.
[ ] Step 3: Copy the HTML containers in Tab 2 into individual Squarespace Code blocks.
[ ] Step 4: Swap out the custom text bracket placeholders with your finalized bios.
[ ] Step 5: Upload your custom organic warm photography matching the Art Direction.
[ ] Step 6: Test mobile screen scrolling and check button click triggers!`;

    // TAB 2: FOR SQUARESPACE HTML-code compilation
    const squarespaceHTMLs: { [key: string]: string } = {};

    sections.filter((s: any) => s.enabled).forEach((sec: any) => {
      let code = "";

      if (sec.id === "hero") {
        code = `<div style="${baseStylesInline} padding: 80px 24px; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1); max-width: 800px; margin: 0 auto; box-sizing: border-box;">
  <span style="font-family: ${bodyFontFamily}; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: ${accentHex}; font-weight: 700; display: inline-block; margin-bottom: 16px;">
    ${resolvedRole} • ${location || "Virtual & In-Person"}
  </span>
  <h1 style="font-family: ${headingFontFamily}; font-size: 38px; line-height: 1.2; margin: 0 0 20px 0; font-weight: 800;">
    [Your Headline: e.g. Support for processing deep life changes]
  </h1>
  <p style="font-family: ${bodyFontFamily}; font-size: 16px; line-height: 1.6; max-width: 600px; margin: 0 auto 32px auto; opacity: 0.8;">
    ${websiteCopy.tagline}
  </p>
  <div>
    <a href="#contact" style="display: inline-block; background-color: ${buttonHex}; color: #ffffff; text-decoration: none; padding: 14px 28px; font-family: ${bodyFontFamily}; font-size: 14px; font-weight: 700; border-radius: 8px; transition: all 0.2s ease;">
      Book Free Consultation
    </a>
  </div>
</div>`;
      } else if (sec.id === "about") {
        code = `<div style="${baseStylesInline} padding: 60px 24px; max-width: 800px; margin: 0 auto; box-sizing: border-box; border-bottom: 1px solid rgba(0,0,0,0.1);">
  <div style="display: flex; flex-direction: column; gap: 32px; align-items: start;">
    <div style="width: 100%; max-width: 300px; aspect-ratio: 1; background-color: #f0f0f0; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-family: ${bodyFontFamily}; font-size: 12px; color: #666;">
      [Upload Practitioner Photo Here]
    </div>
    <div style="flex: 1;">
      <h2 style="font-family: ${headingFontFamily}; font-size: 28px; margin: 0 0 16px 0; line-height: 1.3;">
        About ${businessName || "the practice"}
      </h2>
      <p style="font-family: ${bodyFontFamily}; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
        As a dedicated ${resolvedRole} based in ${location || "Local Community"}, I approach development and recovery as a collaborative partnership. I specialize in evidence-grounded steps, ensuring clinical boundaries, patient safety, and genuine emotional warmth are maintained.
      </p>
      <p style="font-family: ${bodyFontFamily}; font-size: 14px; line-height: 1.6;">
        Together, we will evaluate your active somatic holding points or goal structures, designing a customized pacing strategy that enables you to feel completely securely contained. Let's start the conversation.
      </p>
    </div>
  </div>
</div>`;
      } else if (sec.id === "services-specialties") {
        code = `<div style="${baseStylesInline} padding: 60px 24px; max-width: 800px; margin: 0 auto; box-sizing: border-box; border-bottom: 1px solid rgba(0,0,0,0.1);">
  <h2 style="font-family: ${headingFontFamily}; font-size: 28px; text-align: center; margin-bottom: 32px;">
    Our Clinical Offerings & Rates
  </h2>
  <div style="display: grid; grid-template-columns: 1fr; gap: 20px;">
    ${websiteCopy.services.map(s => `
    <div style="background-color: rgba(255,255,255,0.8); border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 24px; box-sizing: border-box;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span style="font-family: ${headingFontFamily}; font-size: 18px; font-weight: 700; font-style: italic;">${s.name}</span>
        <span style="font-family: ${bodyFontFamily}; font-size: 14px; font-weight: 700; color: ${accentHex};">${s.rate}</span>
      </div>
      <p style="font-family: ${bodyFontFamily}; font-size: 13px; line-height: 1.5; margin: 0 0 12px 0; opacity: 0.85;">
        ${s.desc}
      </p>
      <span style="font-family: ${bodyFontFamily}; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; opacity: 0.5;">
        Format: ${s.format}
      </span>
    </div>`).join("")}
  </div>
</div>`;
      } else if (sec.id === "contact") {
        code = `<div id="contact" style="${baseStylesInline} padding: 60px 24px; max-width: 600px; margin: 0 auto; box-sizing: border-box; border-bottom: 1px solid rgba(0,0,0,0.1);">
  <h2 style="font-family: ${headingFontFamily}; font-size: 28px; text-align: center; margin-bottom: 16px;">
    Begin the Conversation
  </h2>
  <p style="font-family: ${bodyFontFamily}; font-size: 14px; text-align: center; margin-bottom: 32px; opacity: 0.8;">
    Reach out to schedule your complimentary discovery call or discuss package options.
  </p>
  <form style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <label style="font-family: ${bodyFontFamily}; font-size: 12px; font-weight: 700; display: block; margin-bottom: 6px;">Your Name</label>
      <input type="text" placeholder="First and last name" style="width: 100%; padding: 12px; border: 1px solid rgba(0,0,0,0.15); border-radius: 6px; box-sizing: border-box;" />
    </div>
    <div>
      <label style="font-family: ${bodyFontFamily}; font-size: 12px; font-weight: 700; display: block; margin-bottom: 6px;">Your Email</label>
      <input type="email" placeholder="confidential-email@site.com" style="width: 100%; padding: 12px; border: 1px solid rgba(0,0,0,0.15); border-radius: 6px; box-sizing: border-box;" />
    </div>
    <div>
      <label style="font-family: ${bodyFontFamily}; font-size: 12px; font-weight: 700; display: block; margin-bottom: 6px;">What brings you here today?</label>
      <textarea rows="4" placeholder="Briefly share what type of support you're exploring..." style="width: 100%; padding: 12px; border: 1px solid rgba(0,0,0,0.15); border-radius: 6px; box-sizing: border-box; resize: vertical;"></textarea>
    </div>
    <button type="button" style="background-color: ${buttonHex}; color: #ffffff; border: none; padding: 14px 24px; font-family: ${bodyFontFamily}; font-weight: 700; border-radius: 6px; cursor: pointer; transition: all 0.2s;">
      Send Secure Message
    </button>
  </form>
</div>`;
      } else if (sec.id === "testimonials") {
        code = `<div style="${baseStylesInline} padding: 60px 24px; max-width: 800px; margin: 0 auto; box-sizing: border-box; text-align: center; border-bottom: 1px solid rgba(0,0,0,0.1);">
  <h2 style="font-family: ${headingFontFamily}; font-size: 28px; margin-bottom: 32px;">
    Client & Peer Experiences
  </h2>
  <div style="background-color: rgba(255,255,255,0.7); padding: 32px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.06); margin-bottom: 16px;">
    <p style="font-family: ${headingFontFamily}; font-style: italic; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
      "An incredible practitioner of absolute integrity. Provided immense care, physical safety, and evidence-guided support that immediately set my system at peace."
    </p>
    <span style="font-family: ${bodyFontFamily}; font-size: 12px; font-weight: 700; text-transform: uppercase;">— Past Client (Anonymized composite)</span>
  </div>
  <p style="font-family: ${bodyFontFamily}; font-size: 11px; opacity: 0.5;">
    Names and identifying descriptors modified to fulfill state and national board privacy constraints.
  </p>
</div>`;
      } else if (sec.id === "insurance") {
        const isClin = category === "therapist" || category === "medical" || category === "nutritionist" || category === "midwife";
        code = `<div style="${baseStylesInline} padding: 40px 24px; max-width: 800px; margin: 0 auto; box-sizing: border-box; border-bottom: 1px solid rgba(0,0,0,0.1);">
  <h3 style="font-family: ${headingFontFamily}; font-size: 22px; margin-bottom: 12px;">Financial Policies & Access</h3>
  <p style="font-family: ${bodyFontFamily}; font-size: 14px; line-height: 1.6; opacity: 0.85;">
    ${isClin ? "Our practice operates as a private, direct-pay clinic to guarantee complete diagnostic freedom and patient records safety. We stand out-of-network for insurance networks, but provide structured medical superbills coded under ICD-10 codes for easy reimbursement requests." : "All programs and packages operate on a clients-direct pay structure. We support direct HSA/FSA debit card transactions and supply itemized receipts."}
  </p>
</div>`;
      } else if (sec.id === "gfe") {
        code = `<div style="${baseStylesInline} padding: 40px 24px; max-width: 800px; margin: 0 auto; box-sizing: border-box; border-bottom: 1px solid rgba(0,0,0,0.1);">
  <div style="background-color: rgba(255,255,255,0.9); border: 1px dashed rgba(0,0,0,0.25); border-radius: 8px; padding: 20px; text-align: left;">
    <h4 style="font-family: ${headingFontFamily}; font-weight: 700; font-style: italic; font-size: 16px; margin: 0 0 8px 0; color: ${accentHex};">
      No Surprises Act - Good Faith Estimate (GFE) Notice
    </h4>
    <p style="font-family: ${bodyFontFamily}; font-size: 12.5px; line-height: 1.5; margin: 0;">
      You possess the right to request a written Good Faith Estimate of expected clinical healthcare fees at least one business day prior to scheduled appointments. Please ask your provider for a written GFE document during onboarding.
    </p>
  </div>
</div>`;
      } else if (sec.id === "crisis") {
        code = `<div style="background-color: #FFF3F3; border-top: 3px solid #E54E3C; padding: 16px 24px; text-align: center; box-sizing: border-box;">
  <p style="font-family: 'Inter', sans-serif; font-size: 12px; color: #7F1D1D; font-weight: 700; margin: 0; line-height: 1.4;">
    ⚠️ SAFETY NOTICE: If you are experiencing acute emergencies or an active clinical crisis, please dial 988 or text HOME to 741741. This portal is not monitored continuously and is not for emergency assistance.
  </p>
</div>`;
      } else if (sec.id === "hipaa") {
        code = `<div style="${baseStylesInline} padding: 30px 24px; text-align: center; opacity: 0.7; max-width: 800px; margin: 0 auto; box-sizing: border-box;">
  <p style="font-family: ${bodyFontFamily}; font-size: 11px; margin: 0; line-height: 1.5;">
    🔐 HIPAA Privacy Information: All electronic communications are processed on secure, encrypted messaging platforms. We protect your clinical profiles according to state rules and professional confidentiality boundaries.
  </p>
</div>`;
      } else if (sec.id === "faq") {
        code = `<div style="${baseStylesInline} padding: 60px 24px; max-width: 800px; margin: 0 auto; box-sizing: border-box; border-bottom: 1px solid rgba(0,0,0,0.1);">
  <h2 style="font-family: ${headingFontFamily}; font-size: 28px; text-align: center; margin-bottom: 32px;">Frequently Asked Questions</h2>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="border: 1px solid rgba(0,0,0,0.08); padding: 16px; border-radius: 8px; background: rgba(255,255,255,0.5);">
      <h4 style="font-family: ${bodyFontFamily}; font-size: 14px; font-weight: 700; margin: 0 0 8px 0;">Do you work virtually or in-person?</h4>
      <p style="font-family: ${bodyFontFamily}; font-size: 13px; line-height: 1.5; margin: 0; opacity: 0.85;">We offer ${workType} consultations. In-person setups occur at our primary location in ${location || "our clinic lounge"}.</p>
    </div>
    <div style="border: 1px solid rgba(0,0,0,0.08); padding: 16px; border-radius: 8px; background: rgba(255,255,255,0.5);">
      <h4 style="font-family: ${bodyFontFamily}; font-size: 14px; font-weight: 700; margin: 0 0 8px 0;">What actually happens in our first session?</h4>
      <p style="font-family: ${bodyFontFamily}; font-size: 13px; line-height: 1.5; margin: 0; opacity: 0.85;">Our first session serves as a welcoming checkpoint where we map out your overarching goals, review current habits, and draft custom safety and treatment roadmaps.</p>
    </div>
  </div>
</div>`;
      } else if (sec.id === "embed") {
        code = `<div style="${baseStylesInline} padding: 40px 24px; max-width: 800px; margin: 0 auto; box-sizing: border-box; text-align: center;">
  <p style="font-family: ${bodyFontFamily}; font-size: 13px; margin-bottom: 16px;">[SimplePractice scheduling widget placeholder. Paste booking script iframe below]</p>
  <div style="border: 1px dashed rgba(0,0,0,0.15); height: 200px; display: flex; items-center: center; justify-content: center; background-color: rgba(255,255,255,0.4); border-radius: 8px;">
    <span style="font-family: ${bodyFontFamily}; font-size: 12px; color: #888; align-self: center;">SimplePractice / IntakeQ Calendars load here</span>
  </div>
</div>`;
      } else if (sec.id === "modalities") {
        code = `<div style="${baseStylesInline} padding: 50px 24px; max-width: 800px; margin: 0 auto; text-align: center; box-sizing: border-box; border-bottom: 1px solid rgba(0,0,0,0.1);">
  <h3 style="font-family: ${headingFontFamily}; font-size: 24px; margin-bottom: 24px;">Practice Frameworks & Modalities</h3>
  <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px;">
    <span style="background-color: ${buttonHex}20; color: ${accentHex}; border: 1px solid ${buttonHex}40; padding: 10px 20px; font-size: 12px; font-weight: 700; border-radius: 30px; font-family: ${bodyFontFamily};">EMDR Processing</span>
    <span style="background-color: ${buttonHex}20; color: ${accentHex}; border: 1px solid ${buttonHex}40; padding: 10px 20px; font-size: 12px; font-weight: 700; border-radius: 30px; font-family: ${bodyFontFamily};">Somatic Resiliency</span>
    <span style="background-color: ${buttonHex}20; color: ${accentHex}; border: 1px solid ${buttonHex}40; padding: 10px 20px; font-size: 12px; font-weight: 700; border-radius: 30px; font-family: ${bodyFontFamily};">Relational Mindfulness</span>
  </div>
</div>`;
      } else if (sec.id === "blog-link") {
        code = `<div style="${baseStylesInline} padding: 50px 24px; max-width: 800px; margin: 0 auto; box-sizing: border-box; border-bottom: 1px solid rgba(0,0,0,0.1);">
  <h3 style="font-family: ${headingFontFamily}; font-size: 24px; text-align: center; margin-bottom: 24px;">Insights & Supportive Readings</h3>
  <div style="background-color: rgba(255,255,255,0.7); padding: 20px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.06);">
    <span style="font-family: ${bodyFontFamily}; font-size: 10px; color: ${accentHex}; font-weight: 700; letter-spacing: 1px;">PRACTICE ESSAY</span>
    <h4 style="font-family: ${headingFontFamily}; margin: 6px 0; font-size: 16px;">Understanding somatic safety guidelines: calming daily fatigue</h4>
    <p style="font-family: ${bodyFontFamily}; font-size: 12.5px; opacity: 0.8; margin: 0 0 12px 0;">Reviewing recent trial protocols on continuous vagal integration and nervous system regulation schemas on work commutes...</p>
    <a href="#" style="font-family: ${bodyFontFamily}; font-size: 11px; font-weight: 700; color: ${buttonHex}; text-decoration: none;">Read essay →</a>
  </div>
</div>`;
      } else if (sec.id === "newsletter") {
        code = `<div style="${baseStylesInline} padding: 50px 24px; max-width: 500px; margin: 0 auto; text-align: center; box-sizing: border-box;">
  <h3 style="font-family: ${headingFontFamily}; font-size: 22px; margin-bottom: 8px;">Subscribe to Slow Notes</h3>
  <p style="font-family: ${bodyFontFamily}; font-size: 13.5px; opacity: 0.8; margin-bottom: 24px;">Receive gentle reminders, clinical updates, and seasonal wellness reflections. No marketing spam.</p>
  <div style="display: flex; gap: 8px;">
    <input type="email" placeholder="confidential-email@site.com" style="flex: 1; padding: 12px; border: 1px solid rgba(0,0,0,0.15); border-radius: 6px; box-sizing: border-box;" />
    <button type="button" style="background-color: ${buttonHex}; color: #ffffff; border: none; padding: 12px 20px; font-family: ${bodyFontFamily}; font-weight: 700; border-radius: 6px; cursor: pointer;">Join</button>
  </div>
</div>`;
      }

      squarespaceHTMLs[sec.id] = code;
    });

    // TAB 3: THE FULL PROMPT FOR AI BUILDERS
    let aiPrompt = `You are an expert website designer and developer building a single-page website for a ${category === "therapist" ? "clinical mental health therapist" : category === "coach" ? "professional coach" : category === "nutritionist" ? "nutritionist and body literacy guide" : category === "doula" ? "doula birth companion" : category === "midwife" ? "midwife birth companion" : category === "medical" ? "clinical physician/doctor" : "wellness practitioner"}. Build something warm, trustworthy, and conversion-focused — not clinical or cold.

PRACTITIONER DETAILS
- Practice name: ${businessName || "My Helper Practice"}
- Role/credential: ${resolvedRole}
- Location: ${location || "Local community"}
- Service format: ${workType}

DESIGN DIRECTION
Build this site using the ${designStyleName} design system:
- Color palette: ${colors.join(", ")}
- Typography: Headlines: ${fonts.headlines}; Body: ${fonts.body}
- Layout: ${selectedPreset.layoutDescription}
- Design inspiration: Build in the visual style of these three reference sites: ${references.join(", ")}. Borrow their color application, typography hierarchy, section pacing, and layout rhythm. Do not copy their content, branding, or specific imagery.

CORE CARE NARRATIVE & TONE (Dynamically tuned to the role)
- Tone: ${tone}
- Role-specific vocabulary to use: ${vocab.join(", ")}
- RESTRICTION / WHAT TO AVOID: ${omitSections.length > 0 ? `NEVER use ${omitSections.join(", ")}.` : "Avoid outcome promises or aggressive sales pitches."}

HARD CONSTRAINTS (do not break these)
1. HIPAA-aware: never include real patient or client names, photos, or quotes that look like real medical testimonials. Use generic composite reviews labeled as anonymized initials.
2. No diagnostic claims. Don't say "we treat depression." Say "support for people experiencing depression."
3. No outcome promises. Don't say "guaranteed healing" or "cure any condition." Use language like "explore," "work through," "find support."
4. Accessibility: WCAG AA contrast minimums, semantic HTML, alt text on all images, focus states on all interactive elements.
5. Mobile-first responsive design.
6. Reading level: 5th to 8th grade. Warm, plain language. No professional jargon unless explained.
7. Use semantic HTML5 (header, main, section, footer, nav) and Tailwind CSS classes for styling.
8. Single-page application. All sections on one page with smooth scroll anchor navigation.

REQUIRED SECTIONS (build these in this exact order)
`;

    sections.filter((s: any) => s.enabled).forEach((sec: any) => {
      aiPrompt += `\n▸ ${sec.name.toUpperCase()}\n- ${sec.description}\n`;
      if (sec.id === "hero") {
        aiPrompt += `- Set dynamic tagline: "${websiteCopy.tagline}"\n- Set responsive subtitle: "${websiteCopy.heroSubheadline}"\n`;
      } else if (sec.id === "services-specialties") {
        aiPrompt += `- Explicit services rate structure:\n  ${websiteCopy.services.map(s => `• ${s.name} (${s.format}) at ${s.rate}`).join("\n  ")}\n`;
      }
    });

    aiPrompt += `\nFOOTER (always)
- Practice name + credential
- Address (or "Serving ${location || "Local State"} virtually")
- Phone, email
- Privacy Policy link
${category === "therapist" || category === "medical" || category === "nutritionist" || category === "midwife" ? "- HIPAA Notice link\n" : ""}- Copyright

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
  2. My practice mission, core values, or clinical/care philosophy
  3. My professional background and personal bio for the About You section
  4. The modern clinical modalities or specializations I utilize
  5. My active packages and rates`;

    return {
      strategy: strategyDoc,
      squarespaceCSS: presetCSS,
      squarespaceHTMLs: squarespaceHTMLs,
      aiBuilderPrompt: aiPrompt
    };
  }, [businessName, helperType, customHelperTitle, location, workType, vibeId, sections, websiteCopy]);

  const generatedPrompt = compiledTabOutputs.aiBuilderPrompt;

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
      case "bold-editorial":
        return {
          bg: "bg-[#F5F1ED] text-[#1A2147]",
          fontFamily: "font-serif",
          headingFont: "font-serif font-black text-[#1A2147] text-[15px] md:text-[17px] tracking-tight leading-snug",
          primaryButton: "bg-[#E54E3C] text-[#F5F1ED] hover:bg-[#C0392B] font-sans uppercase tracking-wider text-[8.5px] font-bold rounded px-3 py-1.5 transition-all",
          cardBg: "bg-white border border-[#D4CFC4] rounded-lg shadow-sm",
          accentBadge: "bg-[#1A2147]/10 text-[#1A2147] border border-[#D4CFC4] rounded-full text-[7.5px] font-serif italic uppercase tracking-wider",
          accentText: "text-[#E54E3C] font-serif italic tracking-wider text-[10px] font-bold",
          badgeTheme: "bg-[#1A2147]/5 text-[#1A2147] border border-[#D4CFC4]/65 rounded-full text-[8.5px] font-serif italic",
          bodyText: "text-[#2E355E] font-sans text-[10.5px] leading-relaxed",
          subtleText: "text-[#1A2147]/70 font-serif italic text-[8.5px] uppercase",
          itemBorder: "border-[#D4CFC4]",
          cardStyle: "bg-white border border-[#D4CFC4] rounded-lg shadow-sm p-3.5 flex flex-col gap-1.5",
          heroLayout: "text-center py-6 space-y-4 border-b border-[#D4CFC4]",
          itemTitle: "text-[#1A2147] font-bold"
        };
      case "modern-clean":
        return {
          bg: "bg-white text-[#1A2B3D]",
          fontFamily: "font-sans",
          headingFont: "font-sans font-bold tracking-tight text-[#1A2B3D] text-[15px] md:text-[17px] leading-snug",
          primaryButton: "bg-[#1A2B3D] text-white hover:bg-[#253D56] font-sans text-[9px] font-medium rounded-lg px-3.5 py-1.5 transition-all",
          cardBg: "bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl shadow-none",
          accentBadge: "bg-[#1A2B3D]/10 text-[#1A2B3D] border border-[#E5E7EB] rounded-md font-mono text-[7px] tracking-widest",
          accentText: "text-[#1A2B3D] font-mono uppercase tracking-widest text-[9px] font-semibold",
          badgeTheme: "bg-[#1A2B3D]/5 text-[#1A2B3D] border border-[#E5E7EB] rounded-md text-[8px] font-medium",
          bodyText: "text-[#6B7280] font-sans leading-relaxed tracking-tight text-[10.5px]",
          subtleText: "text-stone-400 font-mono tracking-widest text-[8px]",
          itemBorder: "border-[#E5E7EB]",
          cardStyle: "bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl shadow-none p-3.5 flex flex-col gap-1.5",
          heroLayout: "text-center py-6 space-y-4 border-b border-[#E5E7EB]",
          itemTitle: "text-[#1A2B3D] font-bold"
        };
      case "helpers-electric":
        return {
          bg: "bg-[#0A0A0A] text-white",
          fontFamily: "font-sans",
          headingFont: "font-sans font-black tracking-wide text-white uppercase text-[15px] md:text-[17px] leading-none",
          primaryButton: "bg-[#2563EB] text-[#84CC16] hover:bg-[#1D4ED8] font-sans font-extrabold rounded-full px-4 py-1.5 tracking-wide text-[9px] border border-[#84CC16]/20 transition-all",
          cardBg: "bg-[#1F2937] border border-[#84CC16]/25 rounded-2xl",
          accentBadge: "bg-[#2563EB] text-[#84CC16] border border-[#84CC16]/40 rounded-full font-bold px-3 py-1 text-[7.5px] tracking-wide",
          accentText: "text-[#84CC16] font-extrabold tracking-wide text-[9.5px]",
          badgeTheme: "bg-[#84CC16]/20 text-[#84CC16] border border-[#84CC16]/40 rounded-full font-bold text-[8.5px]",
          bodyText: "text-[#9CA3AF] font-sans font-medium text-[10.5px] leading-relaxed",
          subtleText: "text-[#2563EB] font-mono text-[9px] font-bold",
          itemBorder: "border-[#1F2937]",
          cardStyle: "bg-[#1F2937] border border-[#84CC16]/15 rounded-2xl p-3.5 flex flex-col gap-1.5",
          heroLayout: "text-left py-6 space-y-4 border-b border-[#1F2937]",
          itemTitle: "text-white font-bold"
        };
      default: // warm-grounded
        return {
          bg: "bg-[#F5F0E6] text-[#3A3530]",
          fontFamily: "font-serif",
          headingFont: "font-serif italic text-[#3A3530] text-[16px] md:text-[18px] tracking-tight font-semibold leading-relaxed",
          primaryButton: "bg-[#9CAF88] text-[#F5F0E6] hover:bg-[#7A8F6A] font-sans text-[10px] font-bold rounded-lg px-4 py-1.5 transition-all",
          cardBg: "bg-white border border-[#9CAF88]/20 rounded-xl shadow-sm",
          accentBadge: "bg-[#9CAF88]/15 text-[#7A8F6A] border border-[#9CAF88]/30 rounded-full text-[8.5px] font-medium tracking-normal",
          accentText: "text-[#7A8F6A] font-serif italic tracking-wide text-[10px] font-semibold",
          badgeTheme: "bg-[#9CAF88]/10 text-[#7A8F6A] border border-[#9CAF88]/20 rounded-xl text-[8.5px]",
          bodyText: "text-[#4A4540] font-sans text-[11px] leading-relaxed",
          subtleText: "text-[#7A8F6A]/65 font-mono text-[8px] tracking-wider",
          itemBorder: "border-[#9CAF88]/10",
          cardStyle: "bg-white border border-[#9CAF88]/20 rounded-xl shadow-sm p-3 flex flex-col gap-1.5",
          heroLayout: "text-left py-5 space-y-3.5 border-b border-[#9CAF88]/10",
          itemTitle: "text-[#3A3530] font-bold"
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
              <h2 className="text-xl font-bold tracking-tight text-white font-serif">Pick your vibe.</h2>
              <p className="text-xs text-[#C4D1EC]/70">Each one is a complete look — colors, fonts, and layout already paired. Just pick the one that feels like you.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRESETS.map((p, pIdx) => {
              const isSelected = vibeId === p.id;
              
              // Custom typography style matching the preset's actual display headlines
              let nameFontClass = "text-white text-base font-bold";
              if (p.id === "warm-grounded") {
                nameFontClass = "font-serif italic font-medium text-[17px] text-white tracking-normal";
              } else if (p.id === "bold-editorial") {
                nameFontClass = "font-serif font-black italic text-xl text-white tracking-tight";
              } else if (p.id === "modern-clean") {
                nameFontClass = "font-sans font-semibold text-base text-white tracking-normal";
              } else if (p.id === "helpers-electric") {
                nameFontClass = "font-sans font-black uppercase text-base text-white tracking-wide";
              }

              return (
                <button
                  id={`vibe-${p.id}`}
                  key={p.id}
                  type="button"
                  onClick={() => setVibeId(p.id)}
                  className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between min-h-[440px] relative ${
                    isSelected
                      ? "bg-[#131E35] border-[#2563EB] ring-2 ring-[#2563EB]/40 shadow-xl"
                      : "bg-[#070A12]/90 border-[#1E293B] hover:border-[#2563EB]/30"
                  }`}
                >
                  <div className="w-full space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-mono text-[#C4D1EC]/50 uppercase tracking-widest block mb-0.5">
                          PRESET 0{pIdx + 1}
                        </span>
                        <h3 className={nameFontClass}>
                          {p.name}
                        </h3>
                      </div>
                      {isSelected && (
                        <div className="bg-[#2563EB] text-white p-1.5 rounded-full flex items-center justify-center shadow-md animate-fade shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <p className="text-[11.5px] text-[#C4D1EC]/90 leading-relaxed italic border-l-2 border-[#2563EB]/40 pl-2">
                      "{p.tagline}"
                    </p>

                    <p className="text-[10px] text-[#C4D1EC]/70 leading-normal min-h-[38px]">
                      <span className="font-semibold text-white/95">Best for:</span> {p.bestFor}
                    </p>

                    {/* Color swatch row */}
                    <div className="flex gap-1.5 pt-0.5">
                      {p.colors.map((color, cIdx) => (
                        <div
                          key={cIdx}
                          className="w-4 h-4 rounded-full border border-white/20 shadow-inner"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Wireframe Mockup Preview Box */}
                  <div 
                    className="w-full mt-3 flex-1 flex flex-col justify-between rounded-xl p-2 px-3 border select-none overflow-hidden h-[120px]"
                    style={{ 
                      backgroundColor: p.colors[0], 
                      borderColor: p.id === 'warm-grounded' ? '#9CAF88' : p.colors[2] 
                    }}
                  >
                    {p.id === "warm-grounded" && (
                      <div className="w-full h-full flex flex-col justify-between gap-1 text-[#3A3530]">
                        <div className="flex justify-between items-center border-b border-[#3A3530]/10 pb-1">
                          <span className="text-[7.5px] font-bold uppercase tracking-wider text-[#7A8F6A]">Olivia Prac.</span>
                          <span className="text-[6.5px] font-bold bg-[#9CAF88]/20 px-1.5 py-0.5 rounded text-[#7A8F6A]">Book</span>
                        </div>
                        <div className="flex gap-2 items-start py-0.5">
                          <div className="flex-1 space-y-1">
                            <div className="h-2 w-11/12 rounded bg-[#3A3530]" />
                            <div className="h-1.5 w-8/12 rounded bg-[#3A3530]/60" />
                            <div className="h-1.5 w-9/12 rounded bg-[#3A3530]/40" />
                          </div>
                          <div className="w-8 h-10 rounded bg-[#9CAF88]/30 flex items-center justify-center text-[5.5px] text-[#304030] font-sans">
                            [photo]
                          </div>
                        </div>
                        <p className="text-[6.5px] italic text-[#7A8F6A] text-center border-t border-[#3A3530]/5 pt-1">
                          "A warm journaled testimonial reflection quote..."
                        </p>
                      </div>
                    )}

                    {p.id === "bold-editorial" && (
                      <div className="w-full h-full flex flex-col justify-between gap-1 text-[#1A2147]">
                        <div className="flex justify-between items-center border-b border-[#D4CFC4] pb-1">
                          <span className="text-[6.5px] uppercase font-bold tracking-widest text-[#1A2147]">OLIVIA ED.</span>
                          <span className="text-[6.5px] px-1 bg-[#1A2147] text-white rounded-xs">Book</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 py-1">
                          <span className="text-[5.5px] font-serif uppercase tracking-widest bg-[#1A2147]/5 px-1 py-0.2 rounded-full border border-[#D4CFC4]">OUR APPROACH</span>
                          <h4 className="text-[9px] font-serif font-black tracking-tight text-center">Centered News-Style Headline</h4>
                          <div className="h-2 w-[70px] bg-[#E54E3C] rounded-sm flex items-center justify-center text-[5px] text-white">CORAL CTA</div>
                        </div>
                        <div className="w-full bg-[#1A2147] text-[#FAF7F2] text-[5px] uppercase tracking-widest text-center py-0.5 select-none rounded-xs">
                          TRUST LOGOS
                        </div>
                      </div>
                    )}

                    {p.id === "modern-clean" && (
                      <div className="w-full h-full flex flex-col justify-between gap-1 text-[#1A2B3D]">
                        <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-0.5">
                          <span className="text-[7.5px] font-mono tracking-tight font-black text-[#1A2B3D]">OLIVIA.SYS</span>
                          <div className="w-8 h-2 bg-[#1A2B3D] rounded-sm" />
                        </div>
                        <div className="text-center py-0.5">
                          <div className="h-2.5 w-1/2 bg-[#1A2B3D] rounded mx-auto mb-1" />
                        </div>
                        <div className="grid grid-cols-3 gap-1 pt-0.5">
                          {[1, 2, 3].map((item) => (
                            <div key={item} className="p-1 border border-[#E5E7EB] bg-[#FAFAFA] rounded-sm flex flex-col gap-0.5 shadow-none">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#1A2B3D]" />
                              <div className="h-1 w-full bg-[#1A2B3D]/70 rounded-xs" />
                              <div className="h-1 w-3/4 bg-[#6B7280]/40 rounded-xs" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {p.id === "helpers-electric" && (
                      <div className="w-full h-full flex flex-col justify-between gap-1 text-white">
                        <div className="flex justify-between items-center border-b border-[#1F2937] pb-1">
                          <span className="text-[8px] font-black uppercase text-[#2563EB] tracking-wider">OLIVIA X</span>
                          <span className="w-2.5 h-2.5 rounded-full bg-[#84CC16]" />
                        </div>
                        <div className="flex gap-2 items-center">
                          <div className="flex-1 space-y-1">
                            <div className="h-2.5 w-full bg-white rounded" />
                            <div className="h-1.5 w-5/6 bg-[#9CA3AF]/60 rounded" />
                            <div className="h-3 w-12 bg-[#2563EB] rounded-full border border-[#84CC16]/20" />
                          </div>
                          <div className="w-10 h-10 bg-[#2563EB]/40 border border-[#84CC16]/20 rounded-md rotate-3 flex items-center justify-center text-[5.5px] text-[#84CC16]">
                            SHAPE
                          </div>
                        </div>
                        <div className="h-1.5 w-full bg-[#84CC16]/10 rounded" />
                      </div>
                    )}
                  </div>

                  {/* Reference brand chips */}
                  <div className="w-full pt-3 border-t border-white/5 flex flex-wrap gap-1">
                    {p.references.map((site) => (
                      <span
                        key={site}
                        className="text-[8.5px] font-mono tracking-wide px-1.5 py-0.5 rounded bg-white/5 text-[#C4D1EC]/80 border border-white/10"
                      >
                        • {site}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
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
            <div className="w-10 h-10 rounded-full bg-[#FF5A1F] text-[#FAF3E8] flex items-center justify-center font-black text-lg shadow-md shrink-0 select-none">
              5
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white font-serif">Your prompt is ready</h2>
              <p className="text-xs text-[#C4D1EC]/70 mt-0.5">Copy this and paste it into Claude, Lovable, v0, or Bolt to build your site.</p>
            </div>
          </div>

          <div className="space-y-5">
            {copyFeedback && (
              <div id="copy-feedback-banner" className="bg-emerald-950/85 text-emerald-400 p-3.5 rounded-xl text-xs flex items-center gap-2 border border-emerald-500/30 animate-fade">
                <Check className="w-4 h-4 text-[#C9EF5E]" />
                <span>{copyFeedback}</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Optional Let AI Refine Copy preset callout */}
              <div className="flex flex-wrap justify-between items-center bg-[#131E35]/60 border border-[#3545E5]/20 p-3 rounded-2xl gap-2">
                <span className="text-[10px] font-mono text-[#C4D1EC]/50 uppercase">Tuned for AI code generators</span>
                <button
                  id="btn-gemini-optimise"
                  type="button"
                  className="px-3 py-1 bg-[#1E293B] hover:bg-[#3545E5] text-[11px] font-bold text-[#C9EF5E] flex items-center gap-1.5 border border-[#3545E5]/30 cursor-pointer transition shrink-0 rounded-lg"
                  onClick={handleOptimiseWithGemini}
                  disabled={aiOptimizing}
                >
                  <Sparkle className="w-3 h-3 text-[#C9EF5E]" />
                  {aiOptimizing ? "Tuning copy..." : "✨ Let AI Refine Copy"}
                </button>
              </div>

              {aiMessage && (
                <div id="ai-feedback-banner" className="bg-[#131E35] text-[#FAF3E8] p-3 rounded-xl text-xs flex items-center gap-2 border border-[#3545E5]/30 animate-fade">
                  <Check className="w-4 h-4 text-[#C9EF5E]" />
                  <span>{aiMessage}</span>
                </div>
              )}

              {/* The monolithic Prompt pre Block */}
              <div className="relative">
                <pre className="w-full bg-[#070A0D] text-[#ECEFF1] border border-[#1E293B] rounded-2xl p-4 overflow-x-auto text-[11px] leading-relaxed font-mono whitespace-pre-wrap max-h-80 select-text">
                  {generatedPrompt}
                </pre>
                <div className="absolute right-3 bottom-3">
                  <span className="text-[9px] bg-black/60 px-2 py-1 rounded text-[#FAF3E8]/40 uppercase tracking-widest font-mono">
                    {generatedPrompt.length} chars
                  </span>
                </div>
              </div>

              {/* Orange copy prompt button with check animation */}
              <button
                id="copy-prompt-btn"
                type="button"
                onClick={handleCopyPrompt}
                className={`w-full py-4 px-6 rounded-2xl font-bold transition-all text-sm flex items-center justify-center gap-2 cursor-pointer ${
                  copiedPrompt
                    ? "bg-emerald-600 text-white shadow-lg"
                    : "bg-[#FF5A1F] hover:bg-[#E04810] text-white shadow-lg shadow-orange-500/15 active:scale-99"
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
                    <span>Copy Full AI Prompt</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-[#C4D1EC]/60 text-center leading-normal">
              Paste findings into <strong className="text-[#FAF3E8] underline decoration-[#FF5A1F]">Lovable</strong>, <strong className="text-[#FAF3E8]">v0</strong>, <strong className="text-[#FAF3E8]">Claude</strong>, or <strong className="text-[#FAF3E8]">Bolt</strong> to build your site instantly.
            </p>

            {/* Loom video placeholder */}
            <div className="mt-6 pt-6 border-t border-[#1E293B]/50 text-left">
              <p className="text-xs uppercase font-mono tracking-wider text-[#C4D1EC] mb-3 font-semibold flex items-center gap-1.5">
                <Play className="w-4 h-4 text-[#C9EF5E]" /> Walkthrough Video
              </p>
              <div className="bg-[#070A12] border border-[#1E293B] rounded-2xl p-5 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#070A12] to-[#FF5A1F]/5 opacity-40"></div>
                
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
                  {/* Mock Play frame container representing Placeholder thumbnail */}
                  <div className="w-full sm:w-44 aspect-video rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-center relative shrink-0 overflow-hidden select-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-indigo-950 opacity-80"></div>
                    <div className="absolute inset-0 flex items-center justify-center font-bagel text-[#FF5A1F]/30 text-8xl -rotate-12 select-none pointer-events-none">goss</div>
                    <div className="w-11 h-11 bg-[#FF5A1F] rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:scale-110 transition duration-300 relative z-10">
                      <Play className="w-4.5 h-4.5 fill-white ml-0.5" />
                    </div>
                    <span className="absolute bottom-1.5 right-1.5 text-[8px] font-mono bg-black/85 px-1.5 py-0.5 rounded text-[#C4D1EC] z-10">
                      1:48 MIN
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-sm text-white">Watch Olivia build a website with this prompt (under 2 minutes)</h4>
                    <p className="text-xs text-[#C4D1EC]/70 mt-1 leading-normal">
                      See step-by-step how pasting this customized role-specific blueprint into AI builders configures an entire high-trust website landscape instantly.
                    </p>
                    <span className="inline-block mt-2.5 text-[10px] text-[#C9EF5E] font-semibold underline decoration-[#C9EF5E]/30 select-none group-hover:text-white transition cursor-pointer">
                      Launch video player (Recorded placeholder)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Small Text Links Below Loom */}
            <div className="flex flex-col gap-2.5 mt-4 pt-5 border-t border-[#1E293B]/40 text-xs text-[#C4D1EC]/85 font-sans text-left">
              <div>
                <button
                  type="button"
                  onClick={() => setShowHostingGuide(!showHostingGuide)}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1 underline decoration-[#C4D1EC]/30 hover:decoration-white font-medium"
                >
                  <span>I'm new to this. Show me how to host it free with GitHub + Netlify</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform shrink-0 ${showHostingGuide ? "rotate-180" : ""}`} />
                </button>
                {showHostingGuide && (
                  <div className="bg-[#070A12]/80 border border-[#1E293B]/60 rounded-xl p-4 text-[#C4D1EC]/90 text-[11px] leading-relaxed mt-2 animate-fade space-y-2 select-text font-sans">
                    <p className="font-semibold text-white">Easy Steps for Free Lifetime Hosting:</p>
                    <ol className="list-decimal pl-4 space-y-1.5 ml-1">
                      <li><strong>Save Your Code</strong>: Take your generated website code from Claude, Lovable, v0, or Bolt, create a new text file named <code className="bg-slate-950 px-1 py-0.5 rounded text-[#C9EF5E] font-mono">index.html</code>, and save it on your desktop.</li>
                      <li><strong>Upload to GitHub</strong>: Go to <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#C9EF5E] hover:underline font-bold">GitHub.com</a> (completely free), create a repository, and drop your <code className="text-[#C9EF5E]">index.html</code> code file inside.</li>
                      <li><strong>Connect with Netlify</strong>: Log into <a href="https://netlify.com" target="_blank" rel="noopener noreferrer" className="text-[#C9EF5E] hover:underline font-bold">Netlify.com</a>, choose "Add new site" &gt; "Import from GitHub", and click deploy.</li>
                      <li><strong>Done!</strong> Netlify deploys your site live on a high-speed global URL. You can even bind your own custom domain for free!</li>
                    </ol>
                  </div>
                )}
              </div>

              <div>
                <a
                  href="https://www.marketingforhelpers.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1 underline decoration-[#C4D1EC]/30 hover:decoration-white font-medium"
                >
                  Want me to build it for you? → Marketing for Helpers
                </a>
              </div>
            </div>

          </div>
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
                const presets = getHelperPresets(helperType, location, workType, customHelperTitle, vibeId);
                const resolvedRole = helperType === "Custom" ? customHelperTitle || "Wellness Practitioner" : helperType;
                const roleLower = resolvedRole.toLowerCase();
                const isClinicalStyle = roleLower.includes("therapist") || roleLower.includes("counsel") || roleLower.includes("lmhc") || roleLower.includes("lcsw") || roleLower.includes("psycholog") || roleLower.includes("doctor") || roleLower.includes("physician") || roleLower.includes("midwife") || roleLower.includes("acupunctur") || roleLower.includes("speech") || roleLower.includes("pathologist") || roleLower.includes("language") || roleLower.includes("ot") || roleLower.includes("pt") || roleLower.includes("occupational") || roleLower.includes("physical");

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
                                <span className={`font-semibold ${themeStyles.itemTitle}`}>{svc.name}</span>
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
                          "{presets.testimonialText}"
                        </div>
                        <span className={`text-[8px] font-bold block uppercase text-right ${themeStyles.subtleText}`}>
                          {presets.testimonialAuthor}
                        </span>
                      </div>
                    );

                  case "insurance":
                    return (
                      <div id={`preview-block-insurance`} key="insurance" className={`py-3 text-left border-b ${themeStyles.itemBorder} animate-fade`}>
                        <span className={`text-[8px] font-bold font-mono ${themeStyles.subtleText}`}>// FEES, RATES & TRANSPARENCY</span>
                        <p className={`text-[10.5px] leading-relaxed pt-1 ${themeStyles.bodyText}`}>
                          {presets.insuranceText}
                        </p>
                      </div>
                    );

                  case "gfe":
                    return (
                      <div id={`preview-block-gfe`} key="gfe" className={`py-3 text-left border-b ${themeStyles.itemBorder} animate-fade`}>
                        <div className={`p-3 space-y-1 ${themeStyles.cardBg} ${themeStyles.cardStyle}`}>
                          <span className={`text-[8.5px] font-bold uppercase flex items-center gap-1 ${themeStyles.itemTitle}`}>
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
                          {presets.faq.map((item, qIdx) => {
                            const isOpen = faqOpenIndex === qIdx;
                            return (
                              <div key={item.q} className={`overflow-hidden ${themeStyles.cardStyle} p-0 flex flex-col`}>
                                <button
                                  type="button"
                                  onClick={() => setFaqOpenIndex(isOpen ? null : qIdx)}
                                  className={`w-full p-2.5 text-left text-[10px] font-bold flex justify-between items-center transition ${themeStyles.itemTitle}`}
                                >
                                  <span>{item.q}</span>
                                  <ChevronRight className={`w-3.5 h-3.5 transform transition ${isOpen ? "rotate-90" : ""}`} />
                                </button>
                                {isOpen && (
                                  <div className={`p-2.5 pt-0 text-[9.5px] leading-normal border-t ${themeStyles.itemBorder} transition ${themeStyles.bodyText}`}>
                                    {item.a}
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
                            {isClinicalStyle ? "SimplePractice Portal Sync" : "Practice Portal Integration"}
                          </span>
                          <h5 className="font-bold text-[10px]">Confidential Self-Scheduling Suite</h5>
                          <button
                            type="button"
                            className={`${themeStyles.primaryButton} font-mono text-[8.5px]`}
                          >
                            Launch Practice Portal
                          </button>
                        </div>
                      </div>
                    );

                  case "modalities":
                    return (
                      <div id={`preview-block-modalities`} key="modalities" className={`py-4 space-y-2 text-left border-b ${themeStyles.itemBorder} animate-fade`}>
                        <h4 className={`text-[10px] font-mono tracking-widest uppercase ${themeStyles.accentText} font-bold`}>
                          {isClinicalStyle ? "Clinical Modalities Utilized" : "My Specialized Approach"}
                        </h4>
                        <div className="flex flex-wrap gap-1.5 pt-1 select-none">
                          {presets.modalities.map((tag) => (
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
                        <span className={`text-[7.5px] font-mono uppercase bg-[#3545E5]/10 p-1 text-[#3545E5] ${themeStyles.accentBadge}`}>LATEST ESSAYS</span>
                        <h5 className={`font-bold text-[10.5px] leading-tight ${themeStyles.itemTitle}`}>
                          {presets.blogTitle}
                        </h5>
                        <p className={`text-[9px] ${themeStyles.bodyText}`}>
                          {presets.blogDesc}
                        </p>
                      </div>
                    );

                  case "newsletter":
                    return (
                      <div id={`preview-block-newsletter`} key="newsletter" className={`py-4 text-center border-b ${themeStyles.itemBorder} animate-fade p-3.5 space-y-1.5 ${themeStyles.cardStyle}`}>
                        <h4 className="text-[10.5px] font-bold">Join our slow update newsletter</h4>
                        <p className={`text-[9px] leading-relaxed max-w-xs mx-auto ${themeStyles.bodyText}`}>
                          {presets.newsletterDesc}
                        </p>
                        <div className="flex gap-1.5 pt-1.5">
                          <input
                            type="text"
                            placeholder="your-email@confidential.com"
                            className={`bg-stone-50/20 border text-[9px] rounded px-2.5 py-1.5 flex-1 focus:outline-none ${themeStyles.itemBorder} text-inherit`}
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
