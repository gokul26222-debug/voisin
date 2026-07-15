"use client";

import { ArrowLeft, Type, Volume2, Languages, ClipboardList, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { speak, setVoiceRate, getVoiceRate } from "@/lib/speech";
import { useState } from "react";
import ScreenShell from "@/components/ui/ScreenShell";

export default function SettingsScreen() {
  const { t, locale, setLocale } = useI18n();
  const { textSize, setTextSize, setScreen } = useApp();
  const [rate, setRate] = useState(getVoiceRate());

  const handleRate = (newRate: number, label: string) => {
    setRate(newRate);
    setVoiceRate(newRate);
    speak(label, locale);
  };

  const segBtn = (active: boolean) =>
    `btn-press flex-1 py-3.5 rounded-xl text-[20px] font-bold min-h-[56px] border-2 transition-colors ${
      active
        ? "bg-purple-tint border-purple text-purple-dark"
        : "bg-white border-card-border text-warm-gray"
    }`;

  return (
    <ScreenShell>
      <button
        onClick={() => { speak(t("back"), locale); setScreen("home"); }}
        className="btn-press mb-4 pl-3 pr-5 py-2.5 rounded-full bg-white border border-card-border shadow-card text-warm-gray text-[20px] font-bold flex items-center gap-1.5 min-h-[52px]"
      >
        <ArrowLeft size={24} strokeWidth={2.2} />
        {t("back")}
      </button>

      <h2 className="text-[28px] font-extrabold text-purple-dark mb-5">
        {t("settings")}
      </h2>

      {/* Text size */}
      <div className="bg-white rounded-2xl border border-card-border shadow-card p-5 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-11 h-11 rounded-xl bg-sky-tint flex items-center justify-center">
            <Type size={24} className="text-sky-deep" strokeWidth={2.2} />
          </span>
          <span className="text-[22px] font-bold text-warm-black">{t("text_size")}</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { setTextSize("normal"); speak(t("normal"), locale); }}
            className={segBtn(textSize === "normal")}
          >
            {t("normal")}
          </button>
          <button
            onClick={() => { setTextSize("large"); speak(t("large"), locale); }}
            className={segBtn(textSize === "large")}
          >
            {t("large")}
          </button>
        </div>
      </div>

      {/* Voice speed */}
      <div className="bg-white rounded-2xl border border-card-border shadow-card p-5 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-11 h-11 rounded-xl bg-mint-tint flex items-center justify-center">
            <Volume2 size={24} className="text-mint-deep" strokeWidth={2.2} />
          </span>
          <span className="text-[22px] font-bold text-warm-black">{t("voice_speed")}</span>
        </div>
        <div className="flex gap-3">
          <button onClick={() => handleRate(0.7, t("slow"))} className={segBtn(rate === 0.7)}>
            {t("slow")}
          </button>
          <button onClick={() => handleRate(0.85, t("normal"))} className={segBtn(rate === 0.85)}>
            {t("normal")}
          </button>
          <button onClick={() => handleRate(1.0, t("fast"))} className={segBtn(rate === 1.0)}>
            {t("fast")}
          </button>
        </div>
      </div>

      {/* Language */}
      <div className="bg-white rounded-2xl border border-card-border shadow-card p-5 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-11 h-11 rounded-xl bg-amber-tint flex items-center justify-center">
            <Languages size={24} className="text-amber-deep" strokeWidth={2.2} />
          </span>
          <span className="text-[22px] font-bold text-warm-black">{t("language")}</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { setLocale("fr"); speak("Français", "fr"); }}
            className={segBtn(locale === "fr")}
          >
            Français
          </button>
          <button
            onClick={() => { setLocale("en"); speak("English", "en"); }}
            className={segBtn(locale === "en")}
          >
            English
          </button>
        </div>
      </div>

      {/* History link */}
      <button
        onClick={() => { speak(t("history"), locale); setScreen("history"); }}
        className="btn-press w-full bg-white rounded-2xl border border-card-border shadow-card p-5 flex items-center gap-3"
      >
        <span className="w-11 h-11 rounded-xl bg-rose-tint flex items-center justify-center">
          <ClipboardList size={24} className="text-rose-deep" strokeWidth={2.2} />
        </span>
        <span className="text-[22px] font-bold text-warm-black flex-1 text-left">{t("history")}</span>
        <ChevronRight size={28} className="text-warm-light" />
      </button>
    </ScreenShell>
  );
}
