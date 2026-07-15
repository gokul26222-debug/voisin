"use client";

import Image from "next/image";
import { useState } from "react";
import { I18nProvider } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n";
import { AppProvider, useApp } from "@/lib/store";
import HomeScreen from "@/components/HomeScreen";
import PickerScreen from "@/components/PickerScreen";
import ConfirmScreen from "@/components/ConfirmScreen";
import StatusScreen from "@/components/StatusScreen";
import DoneScreen from "@/components/DoneScreen";
import SettingsScreen from "@/components/SettingsScreen";
import HistoryScreen from "@/components/HistoryScreen";
import CommunityScreen from "@/components/CommunityScreen";
import ShareScreen from "@/components/ShareScreen";

function ScreenRouter() {
  const { screen } = useApp();
  switch (screen) {
    case "home": return <HomeScreen />;
    case "picker": return <PickerScreen />;
    case "confirm": return <ConfirmScreen />;
    case "status": return <StatusScreen />;
    case "done": return <DoneScreen />;
    case "settings": return <SettingsScreen />;
    case "history": return <HistoryScreen />;
    case "community": return <CommunityScreen />;
    case "share": return <ShareScreen />;
  }
}

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  const { t } = useI18n();

  return (
    <section className="relative min-h-dvh overflow-hidden bg-cream md:min-h-0 md:h-full" aria-label="voisin">
      <Image
        src="/images/voisin-welcome-illustration.png"
        alt={t("welcome_image_alt")}
        fill
        priority
        sizes="(min-width: 768px) 448px, 100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cream via-cream/95 to-transparent px-5 pb-8 pt-28">
        <p className="mx-auto mb-5 max-w-[300px] text-center text-[21px] font-bold leading-snug text-purple-dark">
          {t("welcome_message")}
        </p>
        <button
          onClick={onStart}
          className="btn-press mx-auto flex min-h-[68px] w-full max-w-sm items-center justify-center rounded-2xl bg-purple px-6 text-[23px] font-extrabold text-white shadow-card-lg"
        >
          {t("welcome_start")}
        </button>
      </div>
    </section>
  );
}

function SeniorExperience() {
  const [hasStarted, setHasStarted] = useState(false);

  return hasStarted ? <ScreenRouter /> : <WelcomeScreen onStart={() => setHasStarted(true)} />;
}

export default function SeniorPage() {
  return (
    <I18nProvider>
      <AppProvider>
        <main className="min-h-dvh bg-cream md:p-8 md:bg-cream-dark md:flex md:items-center md:justify-center">
          <div className="w-full max-w-md min-h-dvh bg-cream md:min-h-0 md:h-[min(860px,calc(100dvh-4rem))] md:rounded-[32px] md:border md:border-card-border md:shadow-card-lg md:overflow-hidden">
            <SeniorExperience />
          </div>
        </main>
      </AppProvider>
    </I18nProvider>
  );
}
