"use client";

import { User, BadgeCheck, Phone, PhoneCall } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { speak } from "@/lib/speech";
import { useEffect, useState } from "react";
import ScreenShell from "@/components/ui/ScreenShell";

const stages = ["accepted", "in_progress", "arrived"] as const;

export default function StatusScreen() {
  const { t, locale } = useI18n();
  const { setScreen, activeRequest, reset } = useApp();
  const [currentStage, setCurrentStage] = useState(0);

  const helper = activeRequest?.helper ?? "Lucas";
  const eta = activeRequest?.eta ?? "11h15";

  useEffect(() => {
    speak(t("helper_assigned"), locale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentStage >= 2) return;
    const timer = setTimeout(() => {
      const next = currentStage + 1;
      setCurrentStage(next);
      speak(t(stages[next]), locale);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentStage, locale, t]);

  useEffect(() => {
    if (currentStage === 2) {
      const timer = setTimeout(() => setScreen("done"), 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStage, setScreen]);

  return (
    <ScreenShell>
      {/* Helper trust card */}
      <div className="bg-white rounded-3xl p-6 shadow-card-lg border border-card-border mb-5 slide-up">
        <div className="flex items-center gap-4 mb-5">
          <div className="relative w-[76px] h-[76px] rounded-full bg-mint-tint flex items-center justify-center shrink-0">
            <User size={38} className="text-mint-deep" strokeWidth={2} />
            <span className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-green-fill border-2 border-white flex items-center justify-center">
              <BadgeCheck size={14} color="white" strokeWidth={3} />
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-[26px] font-extrabold text-warm-black leading-tight">{helper}</p>
            <p className="text-[20px] text-green-fill font-bold">
              {t("verified")} · {t("your_neighbour")}
            </p>
            <p className="text-[20px] text-warm-gray font-semibold">
              {t("arrives_at")} {eta}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-3">
          {stages.map((_, i) => (
            <div key={i} className="flex-1 h-3 rounded-full overflow-hidden bg-cream-dark">
              <div
                className={`h-full rounded-full progress-fill ${
                  i <= currentStage ? (i < currentStage ? "bg-green-fill" : "bg-purple") : ""
                }`}
                style={{ width: i <= currentStage ? "100%" : "0%" }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[17px]">
          {stages.map((stage, i) => (
            <span
              key={stage}
              className={`font-bold ${
                i === currentStage
                  ? "text-purple"
                  : i < currentStage
                  ? "text-green-fill"
                  : "text-warm-light"
              }`}
            >
              {t(stage)}
            </span>
          ))}
        </div>
      </div>

      {/* Call helper — direct trust line */}
      <button
        onClick={() => speak(t("call_helper"), locale)}
        className="btn-press w-full bg-green-fill rounded-2xl py-4 mb-3 flex items-center justify-center gap-2.5 min-h-[64px] shadow-card"
      >
        <PhoneCall size={24} color="white" strokeWidth={2.2} />
        <span className="text-white text-[22px] font-bold">{t("call_helper")}</span>
      </button>

      <div className="flex gap-3">
        <button
          onClick={() => { speak(t("cancel"), locale); reset(); setScreen("home"); }}
          className="btn-press flex-1 rounded-2xl py-4 bg-white border-2 border-coral text-coral text-[20px] font-bold min-h-[60px] shadow-card"
        >
          {t("cancel")}
        </button>
        <button
          onClick={() => speak(t("call_us"), locale)}
          className="btn-press flex-1 rounded-2xl py-4 bg-white border border-card-border text-warm-gray text-[20px] font-bold min-h-[60px] shadow-card flex items-center justify-center gap-2"
        >
          <Phone size={22} strokeWidth={2.2} />
          {t("problem")}
        </button>
      </div>
    </ScreenShell>
  );
}
