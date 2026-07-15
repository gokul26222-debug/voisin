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
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useApp, type RequestType } from "@/lib/store";
import { speak } from "@/lib/speech";
import BrandHeader from "@/components/ui/BrandHeader";
import ScreenShell from "@/components/ui/ScreenShell";

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
  const { seniorName, setScreen, setRequestType, activeRequest } = useApp();

  const handleAction = (type: RequestType, label: string) => {
    setRequestType(type);
    speak(label, locale);
    setScreen("picker");
  };

  const handleCallFamily = () => {
    speak(t("calling_family"), locale);
  };

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
    </ScreenShell>
  );
}
