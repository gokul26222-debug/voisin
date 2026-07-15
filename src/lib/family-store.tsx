"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { RequestType } from "./store";

export type FamilyScreen = "home" | "activity" | "alerts" | "settings";

export type SeniorStatus = "good" | "warning" | "critical";

export interface ActivityEvent {
  id: string;
  type: "app_open" | "request" | "helper_arrived" | "feedback";
  label: string;
  time: string;
  detail?: string;
}

export interface Alert {
  id: string;
  level: "info" | "warning" | "critical";
  message: string;
  time: string;
  dismissed: boolean;
}

interface FamilyState {
  screen: FamilyScreen;
  familyName: string;
  seniorName: string;
  seniorStatus: SeniorStatus;
  lastActiveMinutes: number;
  wellnessScore: number;
  appOpensToday: number;
  requestsThisWeek: number;
  moodTrend: "stable" | "improving" | "declining";
  activityFeed: ActivityEvent[];
  alerts: Alert[];
  activeRequest: { type: RequestType; helper: string; eta: string } | null;
  silenceThresholdHours: number;
  heartSent: boolean;
  spokenConfirmed: boolean;
}

interface FamilyContextType extends FamilyState {
  setScreen: (s: FamilyScreen) => void;
  sendHeart: () => void;
  confirmSpoken: () => void;
  dismissAlert: (id: string) => void;
  setSilenceThreshold: (h: number) => void;
  simulateSilence: (hours: number) => void;
  resetDemo: () => void;
}

const now = new Date();
const timeStr = (minutesAgo: number) => {
  const d = new Date(now.getTime() - minutesAgo * 60000);
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
};

const seedActivity: ActivityEvent[] = [
  { id: "a1", type: "app_open", label: "fam_opened_app", time: timeStr(12) },
  { id: "a2", type: "request", label: "fam_requested", time: timeStr(45), detail: "groceries" },
  { id: "a3", type: "helper_arrived", label: "fam_helper_arrived", time: timeStr(90), detail: "Lucas" },
  { id: "a4", type: "feedback", label: "fam_gave_feedback", time: timeStr(100), detail: "3" },
  { id: "a5", type: "app_open", label: "fam_opened_app", time: timeStr(180) },
  { id: "a6", type: "request", label: "fam_requested", time: timeStr(1440), detail: "pharmacy" },
  { id: "a7", type: "helper_arrived", label: "fam_helper_arrived", time: timeStr(1410), detail: "Emma" },
  { id: "a8", type: "feedback", label: "fam_gave_feedback", time: timeStr(1400), detail: "3" },
];

const seedAlerts: Alert[] = [
  {
    id: "al1",
    level: "info",
    message: "Marie a utilisé l'app 3 fois aujourd'hui",
    time: timeStr(30),
    dismissed: false,
  },
];

const initialState: FamilyState = {
  screen: "home",
  familyName: "Sophie",
  seniorName: "Marie",
  seniorStatus: "good",
  lastActiveMinutes: 12,
  wellnessScore: 87,
  appOpensToday: 3,
  requestsThisWeek: 4,
  moodTrend: "stable",
  activityFeed: seedActivity,
  alerts: seedAlerts,
  activeRequest: { type: "groceries", helper: "Lucas", eta: "11h15" },
  silenceThresholdHours: 14,
  heartSent: false,
  spokenConfirmed: false,
};

const FamilyContext = createContext<FamilyContextType | null>(null);

export function FamilyProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FamilyState>(initialState);

  const setScreen = useCallback((screen: FamilyScreen) => {
    setState((s) => ({ ...s, screen }));
  }, []);

  const sendHeart = useCallback(() => {
    setState((s) => ({ ...s, heartSent: true }));
    setTimeout(() => setState((s) => ({ ...s, heartSent: false })), 3000);
  }, []);

  const confirmSpoken = useCallback(() => {
    setState((s) => ({
      ...s,
      spokenConfirmed: true,
      seniorStatus: "good",
      lastActiveMinutes: 0,
      alerts: s.alerts.map((a) => ({ ...a, dismissed: true })),
    }));
    setTimeout(() => setState((s) => ({ ...s, spokenConfirmed: false })), 3000);
  }, []);

  const dismissAlert = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      alerts: s.alerts.map((a) => (a.id === id ? { ...a, dismissed: true } : a)),
    }));
  }, []);

  const setSilenceThreshold = useCallback((h: number) => {
    setState((s) => ({ ...s, silenceThresholdHours: h }));
  }, []);

  const simulateSilence = useCallback((hours: number) => {
    const level = hours >= 48 ? "critical" : hours >= 14 ? "warning" : "good";
    const newAlert: Alert | null =
      level !== "good"
        ? {
            id: `al-sim-${Date.now()}`,
            level,
            message:
              level === "critical"
                ? `Marie n'a pas ouvert l'app depuis ${hours}h !`
                : `Pas de nouvelles de Marie depuis ${hours}h`,
            time: timeStr(0),
            dismissed: false,
          }
        : null;

    setState((s) => ({
      ...s,
      seniorStatus: level as SeniorStatus,
      lastActiveMinutes: hours * 60,
      alerts: newAlert ? [newAlert, ...s.alerts] : s.alerts,
    }));
  }, []);

  const resetDemo = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <FamilyContext.Provider
      value={{
        ...state,
        setScreen,
        sendHeart,
        confirmSpoken,
        dismissAlert,
        setSilenceThreshold,
        simulateSilence,
        resetDemo,
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
}

export function useFamily() {
  const ctx = useContext(FamilyContext);
  if (!ctx) throw new Error("useFamily must be used within FamilyProvider");
  return ctx;
}
