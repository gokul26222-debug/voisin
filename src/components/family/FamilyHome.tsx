"use client";

import {
  Heart,
  Phone,
  MessageCircleHeart,
  Activity,
  Bell,
  Settings,
  ChevronRight,
  ShoppingBag,
  Pill,
  Wrench,
  Footprints,
  TrendingUp,
  TrendingDown,
  Minus,
  Smartphone,
  ClipboardList,
  HeartHandshake,
  User,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { useFamily, type SeniorStatus } from "@/lib/family-store";
import NotificationBanner from "./NotificationBanner";

const typeIcons: Record<string, { Icon: typeof ShoppingBag; tint: string; deep: string }> = {
  groceries: { Icon: ShoppingBag, tint: "bg-amber-tint", deep: "text-amber-deep" },
  pharmacy: { Icon: Pill, tint: "bg-mint-tint", deep: "text-mint-deep" },
  home_help: { Icon: Wrench, tint: "bg-sky-tint", deep: "text-sky-deep" },
  accompany: { Icon: Footprints, tint: "bg-rose-tint", deep: "text-rose-deep" },
};

const statusConfig: Record<SeniorStatus, { bg: string; border: string; text: string; dot: string; Icon: typeof ShieldCheck }> = {
  good: { bg: "bg-green-light", border: "border-green-fill", text: "text-green-fill", dot: "bg-green-fill", Icon: ShieldCheck },
  warning: { bg: "bg-amber-tint", border: "border-amber-deep", text: "text-amber-deep", dot: "bg-amber-deep", Icon: AlertTriangle },
  critical: { bg: "bg-rose-tint", border: "border-rose-deep", text: "text-rose-deep", dot: "bg-rose-deep", Icon: AlertTriangle },
};

function formatLastActive(minutes: number, t: (k: TranslationKey) => string): string {
  if (minutes < 1) return t("fam_today");
  if (minutes < 60) return `${minutes} ${t("fam_minutes_ago")}`;
  const hours = Math.round(minutes / 60);
  return `${hours} ${t("fam_hours_ago")}`;
}

export default function FamilyHome() {
  const { t, locale } = useI18n();
  const {
    familyName,
    seniorName,
    seniorStatus,
    lastActiveMinutes,
    wellnessScore,
    appOpensToday,
    requestsThisWeek,
    moodTrend,
    activeRequest,
    alerts,
    heartSent,
    spokenConfirmed,
    setScreen,
    sendHeart,
    confirmSpoken,
  } = useFamily();

  const status = statusConfig[seniorStatus];
  const unreadAlerts = alerts.filter((a) => !a.dismissed).length;
  const safetyMessage =
    lastActiveMinutes >= 48 * 60
      ? t("fam_checkin_urgent")
      : lastActiveMinutes >= 24 * 60
        ? t("fam_checkin_due")
        : t("fam_checkin_ok");

  const MoodIcon = moodTrend === "improving" ? TrendingUp : moodTrend === "declining" ? TrendingDown : Minus;
  const moodColor = moodTrend === "improving" ? "text-green-fill" : moodTrend === "declining" ? "text-rose-deep" : "text-warm-gray";
  const moodLabel = t(moodTrend === "improving" ? "fam_improving" : moodTrend === "declining" ? "fam_declining" : "fam_stable");

  return (
    <div className="fade-in flex flex-col min-h-dvh bg-cream md:min-h-0 md:h-full">
      <div className="flex-1 px-4 pt-4 pb-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-coral flex items-center justify-center shadow-card">
              <HeartHandshake size={20} color="white" strokeWidth={2.2} />
            </div>
            <span className="text-[18px] font-extrabold text-warm-black tracking-tight lowercase">
              voisin
            </span>
            <span className="text-[13px] font-bold text-purple bg-purple-tint px-2 py-0.5 rounded-full">
              famille
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScreen("alerts")}
              className="btn-press relative w-10 h-10 rounded-full bg-white border border-card-border flex items-center justify-center shadow-card"
            >
              <Bell size={20} className="text-warm-gray" strokeWidth={2} />
              {unreadAlerts > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-coral text-white text-[11px] font-bold flex items-center justify-center">
                  {unreadAlerts}
                </span>
              )}
            </button>
            <button
              onClick={() => setScreen("settings")}
              className="btn-press w-10 h-10 rounded-full bg-purple-tint border border-purple-light flex items-center justify-center"
            >
              <Settings size={18} className="text-purple" strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* Greeting */}
        <p className="text-[14px] text-warm-gray font-semibold mb-1 capitalize">
          {new Date().toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
        <h1 className="text-[24px] font-extrabold text-purple-dark mb-4">
          {t("fam_hello")} {familyName}
        </h1>

        {/* Notification opt-in */}
        <NotificationBanner />

        <button
          onClick={() => setScreen("alerts")}
          className={`btn-press w-full rounded-2xl border p-3.5 mb-4 text-left shadow-card flex items-center gap-3 ${
            lastActiveMinutes >= 48 * 60
              ? "bg-rose-tint border-rose-deep/30"
              : lastActiveMinutes >= 24 * 60
                ? "bg-amber-tint border-amber-deep/30"
                : "bg-mint-tint border-mint-deep/20"
          }`}
        >
          <span className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 ${lastActiveMinutes >= 24 * 60 ? "text-rose-deep" : "text-mint-deep"}`}>
            {lastActiveMinutes >= 24 * 60 ? <AlertTriangle size={21} strokeWidth={2.4} /> : <ShieldCheck size={21} strokeWidth={2.4} />}
          </span>
          <span className="flex-1">
            <span className="block text-[14px] font-extrabold text-warm-black">{t("fam_safety_check")}</span>
            <span className="block text-[13px] font-semibold text-warm-gray leading-tight mt-0.5">{safetyMessage}</span>
          </span>
          <ChevronRight size={20} className="text-warm-light" />
        </button>

        {/* Senior status card */}
        <div className={`rounded-2xl ${status.bg} border ${status.border} p-4 mb-4 shadow-card slide-up`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-14 h-14 rounded-full bg-white/60 flex items-center justify-center shrink-0">
              <User size={28} className={status.text} strokeWidth={2} />
              <span className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full ${status.dot} border-2 border-white`} />
            </div>
            <div className="flex-1">
              <p className="text-[18px] font-extrabold text-warm-black leading-tight">
                {seniorName}
              </p>
              <p className={`text-[14px] font-bold ${status.text} flex items-center gap-1`}>
                <status.Icon size={14} strokeWidth={2.5} />
                {t(seniorStatus === "good" ? "fam_status_good" : seniorStatus === "warning" ? "fam_status_warning" : "fam_status_critical")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[12px] text-warm-mid font-medium">{t("fam_last_active")}</p>
              <p className="text-[15px] font-bold text-warm-black">
                {formatLastActive(lastActiveMinutes, t)}
              </p>
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex gap-2">
            <button
              onClick={sendHeart}
              className={`btn-press flex-1 py-2.5 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                heartSent
                  ? "bg-rose-deep text-white"
                  : "bg-white/80 text-rose-deep border border-rose-deep/20"
              }`}
            >
              <Heart size={16} strokeWidth={2.2} fill={heartSent ? "white" : "none"} />
              {heartSent ? "!" : t("fam_send_heart")}
            </button>
            <button
              onClick={() => {}}
              className="btn-press flex-1 py-2.5 rounded-xl bg-white/80 border border-green-fill/20 text-green-fill text-[13px] font-bold flex items-center justify-center gap-1.5"
            >
              <Phone size={16} strokeWidth={2.2} />
              {t("fam_call_mom")}
            </button>
            <button
              onClick={confirmSpoken}
              className={`btn-press flex-1 py-2.5 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                spokenConfirmed
                  ? "bg-purple text-white"
                  : "bg-white/80 text-purple border border-purple/20"
              }`}
            >
              <MessageCircleHeart size={16} strokeWidth={2.2} />
              {spokenConfirmed ? "!" : t("fam_i_spoke_to_her")}
            </button>
          </div>
        </div>

        {/* Active request */}
        {activeRequest && (() => {
          const reqIcon = typeIcons[activeRequest.type] ?? typeIcons.groceries;
          return (
            <div className="bg-white rounded-2xl border border-card-border shadow-card p-4 mb-4 flex items-center gap-3">
              <span className={`w-11 h-11 rounded-xl ${reqIcon.tint} flex items-center justify-center shrink-0`}>
                <reqIcon.Icon size={22} className={reqIcon.deep} strokeWidth={2} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-bold text-warm-black">
                  {t("fam_active_request")}
                </p>
                <p className="text-[13px] text-warm-gray font-medium">
                  {activeRequest.helper} · {t(activeRequest.type as TranslationKey)} · {activeRequest.eta}
                </p>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-green-fill animate-pulse shrink-0" />
            </div>
          );
        })()}

        {/* Wellness grid */}
        <h3 className="text-[16px] font-extrabold text-warm-black mb-3 flex items-center gap-2">
          <Activity size={18} className="text-purple" strokeWidth={2.2} />
          {t("fam_wellness")}
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-xl border border-card-border shadow-card p-3.5">
            <p className="text-[12px] text-warm-gray font-semibold mb-1">{t("fam_wellness_score")}</p>
            <p className="text-[28px] font-extrabold text-green-fill leading-none">{wellnessScore}%</p>
          </div>
          <div className="bg-white rounded-xl border border-card-border shadow-card p-3.5">
            <p className="text-[12px] text-warm-gray font-semibold mb-1">{t("fam_mood_trend")}</p>
            <p className={`text-[18px] font-extrabold ${moodColor} flex items-center gap-1.5 leading-none mt-1`}>
              <MoodIcon size={20} strokeWidth={2.5} />
              {moodLabel}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-card-border shadow-card p-3.5">
            <p className="text-[12px] text-warm-gray font-semibold mb-1">{t("fam_app_opens")}</p>
            <div className="flex items-end gap-1">
              <p className="text-[28px] font-extrabold text-purple leading-none">{appOpensToday}</p>
              <Smartphone size={18} className="text-purple-light mb-1" strokeWidth={2} />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-card-border shadow-card p-3.5">
            <p className="text-[12px] text-warm-gray font-semibold mb-1">{t("fam_requests_week")}</p>
            <div className="flex items-end gap-1">
              <p className="text-[28px] font-extrabold text-coral leading-none">{requestsThisWeek}</p>
              <ClipboardList size={18} className="text-coral-light mb-1" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Activity feed preview */}
        <button
          onClick={() => setScreen("activity")}
          className="btn-press w-full bg-white rounded-2xl border border-card-border shadow-card p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-lg bg-sky-tint flex items-center justify-center">
              <ClipboardList size={18} className="text-sky-deep" strokeWidth={2.2} />
            </span>
            <span className="text-[15px] font-bold text-warm-black">{t("fam_activity")}</span>
          </div>
          <ChevronRight size={22} className="text-warm-light" />
        </button>
      </div>
    </div>
  );
}
