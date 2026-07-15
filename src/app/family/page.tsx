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
        <div className="max-w-md mx-auto w-full min-h-dvh">
          <FamilyRouter />
        </div>
      </FamilyProvider>
    </I18nProvider>
  );
}
