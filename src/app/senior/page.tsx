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
  }
}

export default function SeniorPage() {
  return (
    <I18nProvider>
      <AppProvider>
        <div className="max-w-md mx-auto w-full min-h-dvh">
          <ScreenRouter />
        </div>
      </AppProvider>
    </I18nProvider>
  );
}
