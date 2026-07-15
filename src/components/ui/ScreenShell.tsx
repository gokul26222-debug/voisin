"use client";

import { Home } from "lucide-react";
import { useApp } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { speak } from "@/lib/speech";
import type { ReactNode } from "react";

export default function ScreenShell({
  children,
  showHomeButton = true,
}: {
  children: ReactNode;
  showHomeButton?: boolean;
}) {
  const { setScreen, textSize } = useApp();
  const { t, locale } = useI18n();

  return (
    <div
      className="fade-in flex flex-col min-h-dvh bg-cream md:min-h-0 md:h-full"
      style={textSize === "large" ? ({ zoom: 1.15 } as React.CSSProperties) : undefined}
    >
      <div className="flex-1 px-5 pt-5 pb-4 overflow-y-auto">{children}</div>

      {showHomeButton && (
        <div className="sticky bottom-0 px-5 py-3 bg-cream/95 backdrop-blur border-t border-card-border">
          <button
            onClick={() => { speak(t("home"), locale); setScreen("home"); }}
            className="btn-press w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-white border border-card-border shadow-card text-purple font-bold text-[22px] min-h-[60px]"
          >
            <Home size={26} strokeWidth={2.2} />
            {t("home")}
          </button>
        </div>
      )}
    </div>
  );
}
