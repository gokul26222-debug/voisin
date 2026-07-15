"use client";

import {
  ArrowLeft,
  AlertTriangle,
  Info,
  AlertOctagon,
  X,
  Clock,
  RotateCcw,
} from "lucide-react";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { useFamily, type Alert } from "@/lib/family-store";

const levelConfig: Record<Alert["level"], { Icon: typeof Info; bg: string; border: string; text: string; dot: string }> = {
  info: { Icon: Info, bg: "bg-sky-tint", border: "border-sky-deep/20", text: "text-sky-deep", dot: "bg-sky-deep" },
  warning: { Icon: AlertTriangle, bg: "bg-amber-tint", border: "border-amber-deep/20", text: "text-amber-deep", dot: "bg-amber-deep" },
  critical: { Icon: AlertOctagon, bg: "bg-rose-tint", border: "border-rose-deep/20", text: "text-rose-deep", dot: "bg-rose-deep" },
};

export default function FamilyAlerts() {
  const { t, locale } = useI18n();
  const { alerts, setScreen, dismissAlert, simulateSilence, resetDemo } = useFamily();

  const visibleAlerts = alerts.filter((a) => !a.dismissed);

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
          {t("fam_alerts")}
        </h2>

        {visibleAlerts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-green-light flex items-center justify-center mx-auto mb-3">
              <Info size={28} className="text-green-fill" strokeWidth={2} />
            </div>
            <p className="text-[15px] text-warm-gray font-semibold">{t("fam_no_alerts")}</p>
            <p className="text-[13px] text-warm-mid font-medium mt-1">{t("fam_status_good")}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mb-6">
            {visibleAlerts.map((alert) => {
              const cfg = levelConfig[alert.level];
              return (
                <div
                  key={alert.id}
                  className={`${cfg.bg} border ${cfg.border} rounded-2xl p-4 shadow-card slide-up`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`w-9 h-9 rounded-lg ${cfg.bg} flex items-center justify-center shrink-0 border ${cfg.border}`}>
                      <cfg.Icon size={18} className={cfg.text} strokeWidth={2.2} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-bold text-warm-black leading-tight">
                        {alert.message}
                      </p>
                      <p className="text-[12px] text-warm-mid font-medium mt-1 flex items-center gap-1">
                        <Clock size={11} strokeWidth={2} />
                        {alert.time}
                      </p>
                    </div>
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className="btn-press w-8 h-8 rounded-full bg-white/60 flex items-center justify-center shrink-0"
                    >
                      <X size={16} className="text-warm-gray" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Demo panel */}
        <div className="mt-6 bg-purple-tint border border-purple-light rounded-2xl p-4">
          <h3 className="text-[14px] font-extrabold text-purple-dark mb-3 flex items-center gap-2">
            <AlertTriangle size={16} strokeWidth={2.2} />
            {t("fam_demo_panel")}
          </h3>
          <p className="text-[12px] text-warm-gray font-medium mb-3">
            {locale === "fr"
              ? "Testez les alertes de sécurité"
              : "Test safety alerts"}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => simulateSilence(14)}
              className="btn-press px-3 py-2 rounded-xl bg-amber-tint border border-amber-deep/30 text-amber-deep text-[13px] font-bold"
            >
              14h ⚠️
            </button>
            <button
              onClick={() => simulateSilence(24)}
              className="btn-press px-3 py-2 rounded-xl bg-amber-tint border border-amber-deep/30 text-amber-deep text-[13px] font-bold"
            >
              24h ⚠️
            </button>
            <button
              onClick={() => simulateSilence(48)}
              className="btn-press px-3 py-2 rounded-xl bg-rose-tint border border-rose-deep/30 text-rose-deep text-[13px] font-bold"
            >
              48h 🚨
            </button>
            <button
              onClick={resetDemo}
              className="btn-press px-3 py-2 rounded-xl bg-white border border-card-border text-warm-gray text-[13px] font-bold flex items-center gap-1"
            >
              <RotateCcw size={13} strokeWidth={2.2} />
              {t("fam_reset_demo")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
