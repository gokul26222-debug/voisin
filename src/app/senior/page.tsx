"use client";

import { I18nProvider } from "@/lib/i18n";
import { AppProvider, useApp } from "@/lib/store";
import HomeScreen from "@/components/HomeScreen";
import PickerScreen from "@/components/PickerScreen";
import ConfirmScreen from "@/components/ConfirmScreen";
import StatusScreen from "@/components/StatusScreen";
import DoneScreen from "@/components/DoneScreen";
import SettingsScreen from "@/components/SettingsScreen";
import HistoryScreen from "@/components/HistoryScreen";
import CommunityScreen from "@/components/CommunityScreen";

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
  }
}

export default function SeniorPage() {
  return (
    <I18nProvider>
      <AppProvider>
        <main className="min-h-dvh bg-cream md:p-8 md:bg-cream-dark md:flex md:items-center md:justify-center">
          <div className="w-full max-w-md min-h-dvh bg-cream md:min-h-0 md:h-[min(860px,calc(100dvh-4rem))] md:rounded-[32px] md:border md:border-card-border md:shadow-card-lg md:overflow-hidden">
            <ScreenRouter />
          </div>
        </main>
      </AppProvider>
    </I18nProvider>
  );
}
