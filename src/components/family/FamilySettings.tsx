"use client";

import {
  ArrowLeft,
  Bell,
  CreditCard,
  Languages,
  Clock,
  Phone,
  ChevronRight,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useFamily } from "@/lib/family-store";

export default function FamilySettings() {
  const { t, locale, setLocale } = useI18n();
  const { silenceThresholdHours, setSilenceThreshold, setScreen } = useFamily();

  const thresholdOptions = [24, 48];

  const segBtn = (active: boolean) =>
    `btn-press flex-1 py-2.5 rounded-xl text-[14px] font-bold border-2 transition-colors ${
      active
        ? "bg-purple-tint border-purple text-purple-dark"
        : "bg-white border-card-border text-warm-gray"
    }`;

  return (
    <div className="fade-in flex flex-col min-h-dvh bg-cream md:min-h-0 md:h-full">
      <div className="flex-1 px-4 pt-4 pb-6 overflow-y-auto">
        <button
          onClick={() => setScreen("home")}
          className="btn-press mb-4 pl-3 pr-4 py-2 rounded-full bg-white border border-card-border shadow-card text-warm-gray text-[14px] font-bold flex items-center gap-1.5"
        >
          <ArrowLeft size={18} strokeWidth={2.2} />
          {t("back")}
        </button>

        <h2 className="text-[22px] font-extrabold text-purple-dark mb-4">
          {t("fam_settings")}
        </h2>

        {/* Silence alert threshold */}
        <div className="bg-white rounded-2xl border border-card-border shadow-card p-4 mb-3">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-9 h-9 rounded-lg bg-amber-tint flex items-center justify-center">
              <Clock size={18} className="text-amber-deep" strokeWidth={2.2} />
            </span>
            <span className="text-[15px] font-bold text-warm-black">{t("fam_silence_hours")}</span>
          </div>
          <div className="flex gap-2">
            {thresholdOptions.map((h) => (
              <button
                key={h}
                onClick={() => setSilenceThreshold(h)}
                className={segBtn(silenceThresholdHours === h)}
              >
                {h}h
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="bg-white rounded-2xl border border-card-border shadow-card p-4 mb-3">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-9 h-9 rounded-lg bg-sky-tint flex items-center justify-center">
              <Languages size={18} className="text-sky-deep" strokeWidth={2.2} />
            </span>
            <span className="text-[15px] font-bold text-warm-black">{t("language")}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setLocale("fr")} className={segBtn(locale === "fr")}>
              Français
            </button>
            <button onClick={() => setLocale("en")} className={segBtn(locale === "en")}>
              English
            </button>
          </div>
        </div>

        {/* Emergency contact */}
        <div className="bg-white rounded-2xl border border-card-border shadow-card p-4 mb-3 flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-lg bg-rose-tint flex items-center justify-center">
            <Phone size={18} className="text-rose-deep" strokeWidth={2.2} />
          </span>
          <div className="flex-1">
            <p className="text-[15px] font-bold text-warm-black">{t("fam_emergency_contact")}</p>
            <p className="text-[13px] text-warm-gray font-medium">Dr. Martin · 01 42 68 XX XX</p>
          </div>
          <ChevronRight size={20} className="text-warm-light" />
        </div>

        {/* Subscription */}
        <div className="bg-white rounded-2xl border border-card-border shadow-card p-4 mb-3 flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-lg bg-mint-tint flex items-center justify-center">
            <CreditCard size={18} className="text-mint-deep" strokeWidth={2.2} />
          </span>
          <div className="flex-1">
            <p className="text-[15px] font-bold text-warm-black">{t("fam_subscription")}</p>
            <p className="text-[13px] text-warm-gray font-medium">{t("fam_manage_plan")}</p>
          </div>
          <ChevronRight size={20} className="text-warm-light" />
        </div>

        {/* Alerts link */}
        <button
          onClick={() => setScreen("alerts")}
          className="btn-press w-full bg-white rounded-2xl border border-card-border shadow-card p-4 flex items-center gap-2.5"
        >
          <span className="w-9 h-9 rounded-lg bg-coral-tint flex items-center justify-center">
            <Bell size={18} className="text-coral" strokeWidth={2.2} />
          </span>
          <span className="text-[15px] font-bold text-warm-black flex-1 text-left">{t("fam_alert_settings")}</span>
          <ChevronRight size={20} className="text-warm-light" />
        </button>
      </div>
    </div>
  );
}
