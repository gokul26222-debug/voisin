"use client";

import { Check, X, ShoppingBag, Pill, Wrench, Footprints } from "lucide-react";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { speak } from "@/lib/speech";
import { useEffect, useState } from "react";
import ScreenShell from "@/components/ui/ScreenShell";

const typeIcons = {
  groceries: ShoppingBag,
  pharmacy: Pill,
  home_help: Wrench,
  accompany: Footprints,
};

export default function ConfirmScreen() {
  const { t, locale } = useI18n();
  const { requestType, selectedItems, setScreen, startRequest } = useApp();
  const [countdown, setCountdown] = useState(60);

  const itemLabels = selectedItems.map((key) => t(key as TranslationKey)).join(", ");

  const confirmLabel =
    requestType === "home_help"
      ? t("confirm_help")
      : requestType === "accompany"
      ? t("confirm_accompany")
      : t("confirm_title");

  const TypeIcon = typeIcons[requestType ?? "groceries"];

  useEffect(() => {
    speak(`${confirmLabel} ${itemLabels}`, locale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleYes = () => {
    speak(t("request_sent"), locale);
    startRequest();
  };

  const handleNo = () => {
    speak(t("cancel"), locale);
    setScreen("picker");
  };

  return (
    <ScreenShell>
      <div className="flex-1 flex flex-col items-center justify-center min-h-[70dvh]">
        <div className="w-24 h-24 rounded-3xl bg-purple-tint flex items-center justify-center mb-6 shadow-card">
          <TypeIcon size={48} className="text-purple" strokeWidth={2} />
        </div>

        <h2 className="text-[26px] font-extrabold text-purple-dark text-center mb-3">
          {confirmLabel}
        </h2>
        <p className="text-[24px] text-warm-gray text-center mb-8 font-semibold">
          {itemLabels}
        </p>

        <div className="flex gap-4 w-full max-w-sm">
          <button
            onClick={handleYes}
            className="btn-press flex-1 bg-green-fill rounded-2xl py-6 text-white text-[26px] font-extrabold min-h-[76px] shadow-card-lg flex items-center justify-center gap-2"
          >
            {t("yes")} <Check size={28} strokeWidth={3} />
          </button>
          <button
            onClick={handleNo}
            className="btn-press flex-1 bg-white rounded-2xl py-6 text-warm-gray text-[26px] font-extrabold border border-card-border min-h-[76px] shadow-card flex items-center justify-center gap-2"
          >
            {t("no")} <X size={28} strokeWidth={3} />
          </button>
        </div>

        <p className="text-warm-light text-[18px] mt-6 font-medium">
          {t("cancellable")} ({countdown}s)
        </p>
      </div>
    </ScreenShell>
  );
}
