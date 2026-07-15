"use client";

import {
  ArrowLeft,
  Smartphone,
  ShoppingBag,
  Pill,
  Wrench,
  Footprints,
  UserCheck,
  Smile,
  Meh,
  Frown,
} from "lucide-react";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { useFamily, type ActivityEvent } from "@/lib/family-store";

const eventConfig: Record<string, { Icon: typeof Smartphone; tint: string; deep: string }> = {
  app_open: { Icon: Smartphone, tint: "bg-purple-tint", deep: "text-purple" },
  request: { Icon: ShoppingBag, tint: "bg-amber-tint", deep: "text-amber-deep" },
  helper_arrived: { Icon: UserCheck, tint: "bg-green-light", deep: "text-green-fill" },
  feedback: { Icon: Smile, tint: "bg-mint-tint", deep: "text-mint-deep" },
};

const requestIcons: Record<string, typeof ShoppingBag> = {
  groceries: ShoppingBag,
  pharmacy: Pill,
  home_help: Wrench,
  accompany: Footprints,
};

const ratingIcons = [null, Frown, Meh, Smile];

function EventDetail({ event }: { event: ActivityEvent }) {
  const { t } = useI18n();

  if (event.type === "request" && event.detail) {
    const ReqIcon = requestIcons[event.detail] ?? ShoppingBag;
    return (
      <span className="flex items-center gap-1 text-[13px] text-warm-gray font-medium">
        <ReqIcon size={13} strokeWidth={2} />
        {t(event.detail as TranslationKey)}
      </span>
    );
  }
  if (event.type === "helper_arrived" && event.detail) {
    return <span className="text-[13px] text-warm-gray font-medium">{event.detail}</span>;
  }
  if (event.type === "feedback" && event.detail) {
    const rating = parseInt(event.detail);
    const RIcon = ratingIcons[rating];
    return RIcon ? <RIcon size={16} className="text-green-fill" strokeWidth={2} /> : null;
  }
  return null;
}

export default function FamilyActivity() {
  const { t } = useI18n();
  const { activityFeed, setScreen } = useFamily();

  return (
    <div className="fade-in flex flex-col min-h-dvh bg-cream">
      <div className="flex-1 px-4 pt-4 pb-6 overflow-y-auto">
        <button
          onClick={() => setScreen("home")}
          className="btn-press mb-4 pl-3 pr-4 py-2 rounded-full bg-white border border-card-border shadow-card text-warm-gray text-[14px] font-bold flex items-center gap-1.5"
        >
          <ArrowLeft size={18} strokeWidth={2.2} />
          {t("back")}
        </button>

        <h2 className="text-[22px] font-extrabold text-purple-dark mb-4">
          {t("fam_activity")}
        </h2>

        {activityFeed.length === 0 ? (
          <p className="text-[15px] text-warm-gray font-medium">{t("fam_no_activity")}</p>
        ) : (
          <div className="relative pl-6">
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-card-border" />
            {activityFeed.map((event) => {
              const cfg = eventConfig[event.type] ?? eventConfig.app_open;
              return (
                <div key={event.id} className="relative flex items-start gap-3 mb-4 last:mb-0">
                  <span className={`absolute left-[-13px] w-6 h-6 rounded-full ${cfg.tint} flex items-center justify-center border-2 border-cream z-10`}>
                    <cfg.Icon size={12} className={cfg.deep} strokeWidth={2.5} />
                  </span>
                  <div className="flex-1 bg-white rounded-xl border border-card-border shadow-card p-3 ml-2">
                    <div className="flex items-center justify-between">
                      <p className="text-[14px] font-bold text-warm-black">
                        {t(event.label as TranslationKey)}
                      </p>
                      <span className="text-[12px] text-warm-mid font-medium">{event.time}</span>
                    </div>
                    <EventDetail event={event} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
