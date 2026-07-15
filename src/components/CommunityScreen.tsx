"use client";

import { ArrowLeft, CheckCircle2, Coffee, Footprints, Gamepad2, MapPin, UsersRound } from "lucide-react";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { speak } from "@/lib/speech";
import ScreenShell from "@/components/ui/ScreenShell";

const events: {
  id: string;
  title: TranslationKey;
  time: TranslationKey;
  place: TranslationKey;
  participants: number;
  Icon: typeof Coffee;
  tint: string;
  deep: string;
}[] = [
  { id: "coffee", title: "community_event_cafe", time: "community_time_cafe", place: "community_place_cafe", participants: 4, Icon: Coffee, tint: "bg-amber-tint", deep: "text-amber-deep" },
  { id: "walk", title: "community_event_walk", time: "community_time_walk", place: "community_place_walk", participants: 5, Icon: Footprints, tint: "bg-mint-tint", deep: "text-mint-deep" },
  { id: "games", title: "community_event_games", time: "community_time_games", place: "community_place_games", participants: 6, Icon: Gamepad2, tint: "bg-purple-tint", deep: "text-purple" },
];

export default function CommunityScreen() {
  const { t, locale } = useI18n();
  const {
    communityStatus,
    communityEventId,
    joinCommunityEvent,
    confirmCommunityAttendance,
    setScreen,
  } = useApp();
  const selectedEvent = events.find((event) => event.id === communityEventId) ?? events[0];

  const handleJoin = (eventId: string, title: string) => {
    joinCommunityEvent(eventId);
    speak(`${title}. ${t("community_joined")}`, locale);
  };

  const handleArrival = () => {
    confirmCommunityAttendance();
    speak(t("community_checkin_done"), locale);
  };

  return (
    <ScreenShell>
      <button
        onClick={() => { speak(t("back"), locale); setScreen("home"); }}
        className="btn-press mb-4 pl-3 pr-5 py-2.5 rounded-full bg-white border border-card-border shadow-card text-warm-gray text-[20px] font-bold flex items-center gap-1.5 min-h-[52px]"
      >
        <ArrowLeft size={24} strokeWidth={2.2} />
        {t("back")}
      </button>

      <div className="bg-sky-tint border border-sky-deep/15 rounded-2xl p-4 mb-5 shadow-card">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
            <UsersRound size={27} className="text-sky-deep" strokeWidth={2.2} />
          </span>
          <h2 className="text-[26px] font-extrabold text-sky-text leading-tight">{t("community_title")}</h2>
        </div>
        <p className="text-[16px] text-warm-gray font-semibold leading-snug">{t("community_intro")}</p>
      </div>

      {communityStatus !== "not_joined" && (
        <section className={`rounded-2xl p-4 mb-5 shadow-card border ${communityStatus === "checked_in" ? "bg-green-light border-green-fill/25" : "bg-purple-tint border-purple-light"}`} aria-live="polite">
          <p className="text-[16px] font-extrabold text-warm-black">{t(selectedEvent.title)}</p>
          <p className="text-[15px] text-warm-gray font-semibold mt-1">{t(selectedEvent.time)} · {t(selectedEvent.place)}</p>
          {communityStatus === "joined" ? (
            <button
              onClick={handleArrival}
              className="btn-press w-full mt-4 min-h-[62px] rounded-xl bg-green-fill text-white text-[20px] font-extrabold"
            >
              {t("community_checkin")}
            </button>
          ) : (
            <p className="mt-3 text-[17px] font-extrabold text-green-text flex items-center gap-2">
              <CheckCircle2 size={22} className="text-green-fill" strokeWidth={2.5} />
              {t("community_checkin_done")}
            </p>
          )}
          <p className="mt-3 text-[13px] text-warm-gray font-semibold leading-snug">{t("community_safety")}</p>
        </section>
      )}

      <div className="flex flex-col gap-3">
        {events.map((event) => {
          const selected = communityEventId === event.id;
          const isUnavailable = communityStatus !== "not_joined" && !selected;
          return (
            <article key={event.id} className="bg-white rounded-2xl border border-card-border shadow-card p-4">
              <div className="flex items-start gap-3">
                <span className={`w-12 h-12 rounded-xl ${event.tint} flex items-center justify-center shrink-0`}>
                  <event.Icon size={25} className={event.deep} strokeWidth={2.2} />
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[21px] leading-tight font-extrabold text-warm-black">{t(event.title)}</h3>
                  <p className="text-[15px] text-warm-gray font-bold mt-1">{t(event.time)}</p>
                  <p className="text-[14px] text-warm-mid font-semibold mt-1 flex items-center gap-1.5">
                    <MapPin size={15} strokeWidth={2.2} />
                    {t(event.place)}
                  </p>
                  <p className="text-[14px] text-warm-mid font-semibold mt-1">{event.participants} {t("community_participants")}</p>
                </div>
              </div>
              <button
                onClick={() => handleJoin(event.id, t(event.title))}
                disabled={isUnavailable || selected}
                className={`btn-press w-full min-h-[56px] rounded-xl mt-4 text-[18px] font-extrabold ${
                  selected
                    ? "bg-green-light text-green-text border-2 border-green-fill/25"
                    : isUnavailable
                      ? "bg-cream-dark text-warm-light"
                      : "bg-sky-deep text-white"
                }`}
              >
                {selected ? t("community_joined") : t("community_join")}
              </button>
            </article>
          );
        })}
      </div>
    </ScreenShell>
  );
}
