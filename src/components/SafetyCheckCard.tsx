"use client";

import { CheckCircle2, Volume2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function SafetyCheckCard({
  seniorName,
  checkedIn,
  onConfirm,
  onListen,
}: {
  seniorName: string;
  checkedIn: boolean;
  onConfirm: () => void;
  onListen: () => void;
}) {
  const { t } = useI18n();

  if (checkedIn) {
    return (
      <section className="bg-green-light border-2 border-green-fill/30 rounded-2xl p-4 mb-5 shadow-card" aria-live="polite">
        <div className="flex items-center gap-3">
          <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
            <CheckCircle2 size={29} className="text-green-fill" strokeWidth={2.5} />
          </span>
          <div>
            <p className="text-[19px] font-extrabold text-green-text">{t("safety_thanks")} {seniorName}</p>
            <p className="text-[15px] text-green-text font-semibold">{t("safety_confirmed")}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-mint-tint border-2 border-mint-deep/25 rounded-3xl p-5 mb-5 shadow-card-lg" aria-labelledby="safety-check-title">
      <div className="flex items-start gap-3 mb-5">
        <span className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0">
          <CheckCircle2 size={32} className="text-mint-deep" strokeWidth={2.5} />
        </span>
        <div className="flex-1">
          <p id="safety-check-title" className="text-[27px] font-extrabold text-warm-black leading-tight">{t("safety_question")}</p>
          <p className="text-[16px] text-mint-text font-bold leading-snug mt-1">{t("safety_reassurance")}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onConfirm}
          className="btn-press flex-1 rounded-2xl bg-purple text-white min-h-[68px] px-3 text-[22px] font-extrabold"
        >
          {t("safety_confirm")}
        </button>
        <button
          onClick={onListen}
          aria-label={t("listen")}
          className="btn-press w-[68px] min-h-[68px] rounded-2xl bg-white border-2 border-mint-deep/25 flex items-center justify-center text-mint-deep"
        >
          <Volume2 size={27} strokeWidth={2.4} />
        </button>
      </div>
    </section>
  );
}
