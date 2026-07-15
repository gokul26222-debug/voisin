"use client";

import { useState, useEffect } from "react";
import { Bell, BellRing } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { requestNotificationPermission, onForegroundMessage } from "@/lib/firebase";

type Status = "idle" | "granted" | "denied" | "unsupported";

function getInitialStatus(): Status {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "unsupported";
  }
  return Notification.permission === "granted"
    ? "granted"
    : Notification.permission === "denied"
      ? "denied"
      : "idle";
}

export default function NotificationBanner() {
  const { locale } = useI18n();
  const [status, setStatus] = useState<Status>(getInitialStatus);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "granted") return;
    const unsub = onForegroundMessage((payload: unknown) => {
      const p = payload as { notification?: { title?: string; body?: string } };
      const msg = p.notification?.body ?? p.notification?.title ?? "Notification";
      setToast(msg);
      setTimeout(() => setToast(null), 5000);
    });
    return () => { if (typeof unsub === "function") unsub(); };
  }, [status]);

  const handleEnable = async () => {
    const token = await requestNotificationPermission();
    if (token) {
      setStatus("granted");
    } else {
      setStatus("denied");
    }
  };

  if (status === "unsupported") return null;

  if (status === "granted") {
    return (
      <>
        {toast && (
          <div className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-md bg-coral text-white rounded-2xl p-4 shadow-card-lg slide-up flex items-center gap-3">
            <BellRing size={22} strokeWidth={2.2} />
            <p className="text-[14px] font-bold flex-1">{toast}</p>
          </div>
        )}
      </>
    );
  }

  return (
    <button
      onClick={handleEnable}
      className="btn-press w-full bg-purple-tint border border-purple-light rounded-2xl p-3.5 mb-4 flex items-center gap-3 shadow-card"
    >
      <span className="w-9 h-9 rounded-lg bg-purple flex items-center justify-center shrink-0">
        <Bell size={18} color="white" strokeWidth={2.2} />
      </span>
      <div className="flex-1 text-left">
        <p className="text-[14px] font-bold text-purple-dark">
          {locale === "fr" ? "Activer les notifications" : "Enable notifications"}
        </p>
        <p className="text-[12px] text-warm-gray font-medium">
          {locale === "fr"
            ? "Recevez les alertes de Maman en temps réel"
            : "Get real-time alerts about Mom"}
        </p>
      </div>
    </button>
  );
}
