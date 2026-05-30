import React from "react";
import { HelperType } from "../types";
import { 
  Sparkle, 
  HelpCircle, 
  Lightbulb, 
  BookOpen, 
  ShieldCheck, 
  AlertCircle 
} from "lucide-react";

interface MarketingTipsProps {
  helperType: HelperType;
}

export default function MarketingTips({ helperType }: MarketingTipsProps) {
  // Dynamic marketing recommendation blocks depending on the helpers role setting
  const getTipsByRole = (role: HelperType) => {
    switch (role) {
      case "Therapist":
      case "LMHC":
      case "LCSW":
      case "Psychologist":
        return {
          title: "Therapeutic Copywriting Safeguards",
          badge: "ACA & APA TRUST-BUILDING",
          tips: [
            "Validate first: Use your hero message to prioritize immediate nervous system soft-landing and emotional validation over loud sales goals.",
            "Avoid fear-driven hooks: Instead of 'Are you feeling lost and broken?', use slow, comforting pacing: 'A patient space to unpack, restore safety, and heal in sequence.'",
            "Ethical guidance: Solicit direct peer and supervisor colleague references. Avoid soliciting reviews from active patients to bypass administrative ethical conflicts."
          ]
        };
      case "Doctor":
        return {
          title: "Medical Authority & Warm Trust",
          badge: "AMA ETHICAL PROTOCOLS",
          tips: [
            "Emphasize professional certifications transparently: List physical office suite safety, board licenses, and functional clinical philosophy side-by-side.",
            "Ensure safe boundaries: Clearly delineate virtual emergency limit guidance. Provide concrete alternative pathways for high-risk clinical symptoms.",
            "De-jargon: Ground medical jargon with patient-centric human descriptions (e.g. explain somatic blood integrations as simple metabolic pathway care)."
          ]
        };
      case "Doula":
      case "Midwife":
        return {
          title: "Maternal Advocacy Copy Tips",
          badge: "DONA & NARM ETHICAL GUIDE",
          tips: [
            "Lead with continuous support: Place focus on continuous, non-judgmental presence, safe labor plans protection, and warm postnatal nourishment.",
            "Family integration: Speak to protective partners, explaining doula and midwifery support as beautiful, supplementary familial buffers.",
            "Focus on birth agency: Choose empowering, somatic display typography referencing body rights, warm birthing rooms, and deep physiological resilience."
          ]
        };
      case "Nutritionist":
      case "Health Coach":
      case "Wellness Coach":
        return {
          title: "Wellness & Nutritional Copywriting",
          badge: "ETHICALLY GROUNDED COACHING",
          tips: [
            "Establish exact boundaries: Distinguish certified health/coaching guidance from licensed medical treatment so help-seekers feel safely directed.",
            "Empathetic metric tracking: Focus on steady somatic improvements and functional daily comfort milestones over exhausting scale metrics.",
            "Transparent pricing cards: Display explicit pricing packages up front to lower barriers for clinical alignment seekers."
          ]
        };
      case "Physiotherapist":
      case "OT/PT":
      case "Acupuncturist":
      case "Massage Therapist":
        return {
          title: "Somatic Bodywork & Physical Recovery",
          badge: "SOMATIC TRUST-BUILDING",
          tips: [
            "Highlight movement recovery transparently: Speak directly to musculoskeletal comfort and physical pacing.",
            "Explain physical evaluation safety: Describe intake steps gently, reassuring clients that bodily pacing is guided entirely by active feedback.",
            "Avoid diagnostic absolute claims: Reassure readers using terms like 'restoring kinetic ease' or 'structural tension release'."
          ]
        };
      case "Speech-Language Pathologist":
        return {
          title: "Developmental Communication Copywriting",
          badge: "ASHA ETHICAL GUIDELINES",
          tips: [
            "Lead with warm developmental milestones: Create headings centering clinical safety, communication confidence, and pediatric pacing helper loops.",
            "Focus on supportive, interactive exercises: Relieve the anxiety of diagnostic criteria by focusing on beautiful functional goals.",
            "Ensure privacy-focused stories: Honor success paths anonymously or with clean board-accredited peer referrals only."
          ]
        };
      default:
        return {
          title: "Integrated Helper Copywriting Guidance",
          badge: "TRUST-GROUNDED PRACTICE",
          tips: [
            "Keep client goals central: Emphasize safe, non-judgmental collaboration, step-by-step progress, and transparent fees.",
            "Build relational trust: Frame services as structured, empathetic check-ins where the client always maintains personal agency.",
            "Keep layouts clean: High visual breathing room reflects clean, professional integrity, encouraging calm decision making."
          ]
        };
    }
  };

  const currentRoleTips = getTipsByRole(helperType);

  return (
    <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-xs space-y-4 animate-fade">
      
      <div className="flex items-center justify-between pb-2 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-xs tracking-wider uppercase text-stone-900">
            {currentRoleTips.title}
          </h3>
        </div>
        <span className="text-[9px] bg-amber-50 text-amber-800 border border-amber-200 uppercase px-2 py-0.5 rounded font-bold tracking-widest font-mono">
          {currentRoleTips.badge}
        </span>
      </div>

      <div className="space-y-3">
        {currentRoleTips.tips.map((tip, index) => (
          <div key={index} className="flex gap-2.5 items-start">
            <div className="w-5 h-5 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[10px] font-bold text-stone-600">{index + 1}</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed font-sans">
              {tip}
            </p>
          </div>
        ))}
      </div>

      <div className="pt-2 bg-stone-50 rounded-lg p-3 text-[10.5px] text-stone-500 leading-normal flex items-start gap-2 border border-stone-200/60 font-sans">
        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <strong>Ethics & Trust-Building Guidance:</strong> Marketing for Helpers matches your layout draft structures live to Ethical & Trust-Building Best Practices.
        </div>
      </div>

    </div>
  );
}
