"use client";

import { ArrowLeft, ShoppingBag, Pill, Wrench, Footprints, Smile, Meh, Frown, User } from "lucide-react";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { speak } from "@/lib/speech";
import ScreenShell from "@/components/ui/ScreenShell";

const typeIcons = {
  groceries: { Icon: ShoppingBag, tint: "bg-amber-tint", deep: "text-amber-deep" },
  pharmacy: { Icon: Pill, tint: "bg-mint-tint", deep: "text-mint-deep" },
  home_help: { Icon: Wrench, tint: "bg-sky-tint", deep: "text-sky-deep" },
  accompany: { Icon: Footprints, tint: "bg-rose-tint", deep: "text-rose-deep" },
};

const ratingIcons = [
  null,
  { Icon: Frown, color: "text-rose-deep" },
  { Icon: Meh, color: "text-amber-deep" },
  { Icon: Smile, color: "text-green-fill" },
];

export default function HistoryScreen() {
  const { t, locale } = useI18n();
  const { history, setScreen } = useApp();

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

  return (
    <ScreenShell>
      <button
        onClick={() => { speak(t("back"), locale); setScreen("settings"); }}
        className="btn-press mb-4 pl-3 pr-5 py-2.5 rounded-full bg-white border border-card-border shadow-card text-warm-gray text-[20px] font-bold flex items-center gap-1.5 min-h-[52px]"
      >
        <ArrowLeft size={24} strokeWidth={2.2} />
        {t("back")}
      </button>

      <h2 className="text-[28px] font-extrabold text-purple-dark mb-5">
        {t("history")}
      </h2>

      {history.length === 0 ? (
        <p className="text-[22px] text-warm-gray font-medium">{t("no_history")}</p>
      ) : (
        <div className="flex flex-col gap-3">
          {history.map((entry) => {
            const { Icon, tint, deep } = typeIcons[entry.type];
            const rating = entry.rating !== null ? ratingIcons[entry.rating] : null;
            return (
              <div
                key={entry.id}
                className="bg-white rounded-2xl border border-card-border shadow-card p-4 flex items-center gap-3"
              >
                <span className={`w-14 h-14 rounded-xl ${tint} flex items-center justify-center shrink-0`}>
                  <Icon size={28} className={deep} strokeWidth={2} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[22px] font-bold text-warm-black leading-tight">
                    {t(entry.type)}
                  </p>
                  <p className="text-[17px] text-warm-gray font-medium truncate">
                    {entry.items.map((i) => t(i as TranslationKey)).join(", ")}
                  </p>
                  <p className="text-[16px] text-warm-mid font-medium flex items-center gap-1.5 capitalize">
                    <User size={15} strokeWidth={2.2} />
                    {entry.helper} · {formatDate(entry.date)}
                  </p>
                </div>
                {rating && (
                  <rating.Icon size={32} className={`${rating.color} shrink-0`} strokeWidth={2} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </ScreenShell>
  );
}
