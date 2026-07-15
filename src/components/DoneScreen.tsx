"use client";

import { Check, Smile, Meh, Frown, Home } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { speak } from "@/lib/speech";
import { useEffect, useState } from "react";
import ScreenShell from "@/components/ui/ScreenShell";

const ratings = [
  { Icon: Smile, value: 3, tint: "bg-green-light", color: "text-green-fill" },
  { Icon: Meh, value: 2, tint: "bg-amber-tint", color: "text-amber-deep" },
  { Icon: Frown, value: 1, tint: "bg-rose-tint", color: "text-rose-deep" },
];

export default function DoneScreen() {
  const { t, locale } = useI18n();
  const { seniorName, completeRequest, setScreen } = useApp();
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    speak(t("done_title"), locale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFeedback = (value: number) => {
    setSelected(value);
    speak(`${t("thank_you")} ${seniorName} !`, locale);
  };

  const handleHome = () => {
    speak(t("home"), locale);
    completeRequest(selected);
    setScreen("home");
  };

  return (
    <ScreenShell showHomeButton={false}>
      <div className="flex-1 flex flex-col items-center justify-center min-h-[75dvh]">
        <div className="w-28 h-28 rounded-full bg-green-light flex items-center justify-center mb-6 slide-up">
          <Check size={56} className="text-green-fill" strokeWidth={3} />
        </div>

        <h2 className="text-[32px] font-extrabold text-green-text mb-3">
          {t("done_title")}
        </h2>
        <p className="text-[22px] text-warm-gray mb-8 font-semibold">
          {t("how_was_it")}
        </p>

        <div className="flex gap-5 mb-8">
          {ratings.map(({ Icon, value, tint, color }) => (
            <button
              key={value}
              onClick={() => handleFeedback(value)}
              aria-label={`rating-${value}`}
              className={`btn-press w-[84px] h-[84px] rounded-2xl flex items-center justify-center transition-all border-2 shadow-card ${
                selected === value
                  ? `${tint} border-purple scale-110`
                  : selected !== null
                  ? "opacity-30 bg-white border-card-border"
                  : `bg-white border-card-border`
              }`}
            >
              <Icon size={44} className={color} strokeWidth={2} />
            </button>
          ))}
        </div>

        {selected !== null && (
          <p className="text-[22px] text-purple font-bold fade-in mb-4">
            {t("thank_you")} {seniorName} !
          </p>
        )}
      </div>

      <div className="sticky bottom-0 py-3 bg-cream">
        <button
          onClick={handleHome}
          className="btn-press w-full py-5 rounded-2xl bg-purple text-white font-extrabold text-[24px] min-h-[70px] shadow-card-lg flex items-center justify-center gap-2.5"
        >
          <Home size={28} strokeWidth={2.2} />
          {t("home")}
        </button>
      </div>
    </ScreenShell>
  );
}
