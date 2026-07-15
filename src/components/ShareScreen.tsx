"use client";

import { useState } from "react";
import { ArrowLeft, BookOpenText, CheckCircle2, CookingPot, Flower2, Gamepad2, HandHeart, Scissors } from "lucide-react";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { speak } from "@/lib/speech";
import ScreenShell from "@/components/ui/ScreenShell";

const topics: { key: TranslationKey; Icon: typeof BookOpenText; tint: string; text: string }[] = [
  { key: "share_french", Icon: BookOpenText, tint: "bg-sky-tint", text: "text-sky-deep" },
  { key: "share_cooking", Icon: CookingPot, tint: "bg-amber-tint", text: "text-amber-deep" },
  { key: "share_gardening", Icon: Flower2, tint: "bg-mint-tint", text: "text-mint-deep" },
  { key: "share_sewing", Icon: Scissors, tint: "bg-rose-tint", text: "text-rose-deep" },
  { key: "share_games", Icon: Gamepad2, tint: "bg-purple-tint", text: "text-purple" },
];

export default function ShareScreen() {
  const { t, locale } = useI18n();
  const { setScreen } = useApp();
  const [selectedTopic, setSelectedTopic] = useState<TranslationKey | null>(null);
  const [published, setPublished] = useState(false);

  const chooseTopic = (key: TranslationKey) => {
    setSelectedTopic(key);
    speak(t(key), locale);
  };

  if (published) {
    return (
      <ScreenShell>
        <section className="mt-10 bg-green-light border-2 border-green-fill/25 rounded-3xl p-6 text-center shadow-card-lg" aria-live="polite">
          <span className="mx-auto mb-4 w-16 h-16 rounded-full bg-white flex items-center justify-center">
            <CheckCircle2 size={39} className="text-green-fill" strokeWidth={2.5} />
          </span>
          <h2 className="text-[27px] leading-tight font-extrabold text-green-text">{t("share_published")}</h2>
          <p className="mt-3 text-[17px] leading-snug font-semibold text-green-text">{t("share_published_info")}</p>
          <button onClick={() => setScreen("home")} className="btn-press mt-6 w-full min-h-[64px] rounded-2xl bg-purple text-white text-[21px] font-extrabold">
            {t("home")}
          </button>
        </section>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell>
      <button
        onClick={() => { speak(t("back"), locale); setScreen("home"); }}
        className="btn-press mb-4 pl-3 pr-5 py-2.5 rounded-full bg-white border border-card-border shadow-card text-warm-gray text-[20px] font-bold flex items-center gap-1.5 min-h-[52px]"
      >
        <ArrowLeft size={24} strokeWidth={2.2} />
        {t("back")}
      </button>

      <section className="bg-purple-tint border border-purple-light rounded-3xl p-5 mb-5 shadow-card">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-14 h-14 rounded-2xl bg-purple flex items-center justify-center">
            <HandHeart size={31} className="text-white" strokeWidth={2.2} />
          </span>
          <h2 className="text-[27px] font-extrabold text-purple-dark leading-tight">{t("share")}</h2>
        </div>
        <p className="text-[16px] leading-snug font-semibold text-warm-gray">{t("share_intro")}</p>
      </section>

      <h3 className="text-[24px] leading-tight font-extrabold text-warm-black mb-4">{t("share_title")}</h3>
      <div className="flex flex-col gap-3">
        {topics.map(({ key, Icon, tint, text }) => {
          const isSelected = selectedTopic === key;
          return (
            <button
              key={key}
              onClick={() => chooseTopic(key)}
              className={`btn-press min-h-[72px] rounded-2xl p-3 flex items-center gap-3 text-left border-2 ${isSelected ? "bg-purple-tint border-purple" : "bg-white border-card-border shadow-card"}`}
            >
              <span className={`w-12 h-12 rounded-xl ${tint} flex items-center justify-center shrink-0`}>
                <Icon size={26} className={text} strokeWidth={2.2} />
              </span>
              <span className="flex-1 text-[20px] font-extrabold text-warm-black">{t(key)}</span>
              {isSelected && <CheckCircle2 size={25} className="text-purple" strokeWidth={2.5} />}
            </button>
          );
        })}
      </div>

      {selectedTopic && (
        <section className="mt-5 bg-cream-dark rounded-2xl border border-card-border p-4 shadow-card">
          <h3 className="text-[20px] font-extrabold text-warm-black">{t("share_review_title")}</h3>
          <p className="mt-2 text-[16px] font-bold text-purple">{t(selectedTopic)}</p>
          <p className="mt-1 text-[15px] font-semibold text-warm-gray">{t("share_review_info")}</p>
          <p className="mt-3 text-[14px] leading-snug font-semibold text-warm-mid">{t("share_safe_place")}</p>
          <button
            onClick={() => { setPublished(true); speak(t("share_published"), locale); }}
            className="btn-press mt-4 w-full min-h-[64px] rounded-2xl bg-purple text-white text-[20px] font-extrabold"
          >
            {t("share_publish")}
          </button>
        </section>
      )}
    </ScreenShell>
  );
}
