"use client";

import { I18nProvider } from "@/lib/i18n";
import { FamilyProvider, useFamily } from "@/lib/family-store";
import FamilyHome from "@/components/family/FamilyHome";
import FamilyActivity from "@/components/family/FamilyActivity";
import FamilyAlerts from "@/components/family/FamilyAlerts";
import FamilySettings from "@/components/family/FamilySettings";

function FamilyRouter() {
  const { screen } = useFamily();
  switch (screen) {
    case "home": return <FamilyHome />;
    case "activity": return <FamilyActivity />;
    case "alerts": return <FamilyAlerts />;
    case "settings": return <FamilySettings />;
  }
}

export default function FamilyPage() {
  return (
    <I18nProvider>
      <FamilyProvider>
        <main className="min-h-dvh bg-cream md:p-8 md:bg-cream-dark md:flex md:items-center md:justify-center">
          <div className="w-full max-w-md min-h-dvh bg-cream md:min-h-0 md:h-[min(860px,calc(100dvh-4rem))] md:rounded-[32px] md:border md:border-card-border md:shadow-card-lg md:overflow-hidden">
            <FamilyRouter />
          </div>
        </main>
      </FamilyProvider>
    </I18nProvider>
  );
}
