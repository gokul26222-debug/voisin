"use client";

import {
  ShoppingBag,
  Pill,
  Wrench,
  Footprints,
  Phone,
  Mic,
  ChevronRight,
  BadgeCheck,
  User,
  AlertTriangle,
  PhoneCall,
  X,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useApp, type RequestType } from "@/lib/store";
import { speak } from "@/lib/speech";
import BrandHeader from "@/components/ui/BrandHeader";
import ScreenShell from "@/components/ui/ScreenShell";
import SafetyCheckCard from "@/components/SafetyCheckCard";
import { useState } from "react";

const actions = [
  { type: "groceries" as RequestType, labelKey: "groceries" as const, hintKey: "groceries_hint" as const, Icon: ShoppingBag, tint: "bg-amber-tint", deep: "text-amber-deep" },
  { type: "pharmacy" as RequestType, labelKey: "pharmacy" as const, hintKey: "pharmacy_hint" as const, Icon: Pill, tint: "bg-mint-tint", deep: "text-mint-deep" },
  { type: "home_help" as RequestType, labelKey: "home_help" as const, hintKey: "home_help_hint" as const, Icon: Wrench, tint: "bg-sky-tint", deep: "text-sky-deep" },
  { type: "accompany" as RequestType, labelKey: "accompany" as const, hintKey: "accompany_hint" as const, Icon: Footprints, tint: "bg-rose-tint", deep: "text-rose-deep" },
];

function formatDate(locale: "fr" | "en") {
  return new Date().toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default function HomeScreen() {
  const { t, locale } = useI18n();
  const {
    seniorName,
    setScreen,
    setRequestType,
    activeRequest,
    safetyStatus,
    confirmSafetyCheck,
    emergencyContact,
  } = useApp();
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  const handleAction = (type: RequestType, label: string) => {
    setRequestType(type);
    speak(label, locale);
    setScreen("picker");
  };

  const handleCallFamily = () => {
    speak(t("calling_family"), locale);
  };

  const handleSafetyCheck = () => {
    confirmSafetyCheck();
    speak(`${t("safety_thanks")} ${seniorName}. ${t("safety_confirmed")}`, locale);
  };

  const contactPhone = emergencyContact.phone.replace(/[^+\d]/g, "");

  return (
    <ScreenShell showHomeButton={false}>
      <BrandHeader />

      {/* Greeting */}
      <h1 className="text-[32px] leading-tight font-extrabold text-purple-dark mb-0.5">
        {t("greeting")} {seniorName}
      </h1>
      <p className="text-warm-gray font-semibold text-[22px] mb-5 capitalize">
        {formatDate(locale)} · {t("sunny")}
      </p>

      <SafetyCheckCard
        seniorName={seniorName}
        checkedIn={safetyStatus === "checked_in"}
        onConfirm={handleSafetyCheck}
        onListen={() => speak(`${t("safety_title")}. ${t("safety_question")}`, locale)}
      />

      {/* Live status card — trust layer */}
      {activeRequest && (
        <button
          onClick={() => { speak(`${activeRequest.helper} ${t("arrives_at")} ${activeRequest.eta}`, locale); setScreen("status"); }}
          className="btn-press slide-up w-full bg-white border border-card-border rounded-2xl p-4 mb-5 shadow-card-lg flex items-center gap-3 text-left"
        >
          <div className="relative w-14 h-14 rounded-full bg-mint-tint flex items-center justify-center shrink-0">
            <User size={28} className="text-mint-deep" strokeWidth={2} />
            <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-green-fill border-2 border-white flex items-center justify-center">
              <BadgeCheck size={12} color="white" strokeWidth={3} />
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[22px] font-bold text-warm-black leading-tight">
              {activeRequest.helper} {t("arrives_at")} {activeRequest.eta}
            </p>
            <p className="text-[18px] text-green-fill font-semibold">
              {t("verified")} · {t(activeRequest.type)} {t("active_request")}
            </p>
          </div>
          <ChevronRight size={28} className="text-warm-light shrink-0" />
        </button>
      )}

      {/* Action cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {actions.map(({ type, labelKey, hintKey, Icon, tint, deep }) => (
          <button
            key={type}
            onClick={() => handleAction(type, t(labelKey))}
            className="btn-press bg-white border border-card-border rounded-2xl p-4 shadow-card flex flex-col items-start gap-2.5 min-h-[128px] text-left"
          >
            <span className={`w-14 h-14 rounded-xl ${tint} flex items-center justify-center`}>
              <Icon size={30} className={deep} strokeWidth={2} />
            </span>
            <span>
              <span className="block text-[22px] font-bold text-warm-black leading-tight">
                {t(labelKey)}
              </span>
              <span className="block text-[15px] text-warm-mid font-medium">
                {t(hintKey)}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Family + Mic row */}
      <div className="flex items-center gap-3 mt-1">
        <button
          onClick={handleCallFamily}
          className="btn-press flex-1 bg-coral rounded-2xl py-4 px-5 flex items-center justify-center gap-2.5 min-h-[68px] shadow-card"
        >
          <Phone size={26} color="white" strokeWidth={2.2} />
          <span className="text-white text-[22px] font-bold">{t("call_family")}</span>
        </button>
        <button
          aria-label={t("or_speak")}
          onClick={() => speak(t("or_speak"), locale)}
          className="btn-press mic-pulse w-[68px] h-[68px] rounded-full bg-purple flex items-center justify-center shrink-0 shadow-card"
        >
          <Mic size={30} color="white" strokeWidth={2.2} />
        </button>
      </div>
      <p className="text-purple font-bold text-[18px] text-center mt-2">{t("or_speak")}</p>

      <button
        onClick={() => setEmergencyOpen(true)}
        className="btn-press w-full mt-5 min-h-[62px] rounded-2xl border-2 border-coral bg-coral-tint text-coral-dark text-[21px] font-extrabold flex items-center justify-center gap-2.5"
      >
        <AlertTriangle size={25} strokeWidth={2.4} />
        {t("emergency")}
      </button>

      {emergencyOpen && (
        <div className="fixed inset-0 z-50 bg-warm-black/45 flex items-end sm:items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="emergency-title">
          <div className="w-full max-w-md bg-cream rounded-3xl p-5 shadow-card-lg slide-up">
            <div className="flex items-start gap-3 mb-4">
              <span className="w-12 h-12 rounded-full bg-rose-tint flex items-center justify-center shrink-0">
                <AlertTriangle size={27} className="text-rose-deep" strokeWidth={2.5} />
              </span>
              <div className="flex-1">
                <h2 id="emergency-title" className="text-[23px] leading-tight font-extrabold text-rose-text">{t("emergency_title")}</h2>
                <p className="text-[15px] text-warm-gray font-semibold mt-1">{t("emergency_contact")}</p>
              </div>
              <button onClick={() => setEmergencyOpen(false)} aria-label={t("cancel")} className="w-10 h-10 rounded-full bg-cream-dark flex items-center justify-center text-warm-gray">
                <X size={23} strokeWidth={2.5} />
              </button>
            </div>

            {contactPhone ? (
              <a
                href={`tel:${contactPhone}`}
                className="btn-press w-full min-h-[68px] rounded-2xl bg-purple text-white text-[20px] font-extrabold flex items-center justify-center gap-2.5 mb-3"
              >
                <PhoneCall size={25} strokeWidth={2.4} />
                {t("call_contact")} · {emergencyContact.name || t("emergency_contact")}
              </a>
            ) : (
              <p className="bg-amber-tint text-amber-text rounded-xl p-3 text-[15px] font-bold mb-3">{t("emergency_setup")}</p>
            )}

            <a
              href="tel:112"
              className="btn-press w-full min-h-[68px] rounded-2xl bg-coral text-white text-[20px] font-extrabold flex items-center justify-center gap-2.5"
            >
              <PhoneCall size={25} strokeWidth={2.4} />
              {t("call_112")}
            </a>
            <button onClick={() => setEmergencyOpen(false)} className="w-full py-4 text-[18px] font-bold text-warm-gray">{t("cancel")}</button>
          </div>
        </div>
      )}
    </ScreenShell>
  );
}
