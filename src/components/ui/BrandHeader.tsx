"use client";

import { HeartHandshake, Settings } from "lucide-react";
import { useApp } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { speak } from "@/lib/speech";

export default function BrandHeader() {
  const { setScreen } = useApp();
  const { t, locale } = useI18n();

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-xl bg-coral flex items-center justify-center shadow-card">
          <HeartHandshake size={24} color="white" strokeWidth={2.2} />
        </div>
        <span className="text-[22px] font-extrabold text-warm-black tracking-tight lowercase">
          voisin
        </span>
      </div>
      <button
        onClick={() => { speak(t("settings"), locale); setScreen("settings"); }}
        aria-label={t("settings")}
        className="btn-press min-h-12 rounded-xl bg-purple-tint border-2 border-purple-light px-3 flex items-center justify-center gap-2 text-[17px] font-extrabold text-purple"
      >
        <Settings size={22} strokeWidth={2.5} aria-hidden="true" />
        <span>{t("settings")}</span>
      </button>
    </div>
  );
}
