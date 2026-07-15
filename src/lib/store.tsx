"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type RequestType = "groceries" | "pharmacy" | "home_help" | "accompany";
export type Screen = "home" | "picker" | "confirm" | "status" | "done" | "settings" | "history" | "community" | "share";
export type TextSize = "normal" | "large";
export type SafetyStatus = "pending" | "checked_in";
export type CommunityStatus = "not_joined" | "joined" | "checked_in";

export interface HistoryEntry {
  id: string;
  type: RequestType;
  items: string[];
  helper: string;
  date: string;
  rating: number | null;
}

interface AppState {
  screen: Screen;
  requestType: RequestType | null;
  selectedItems: string[];
  seniorName: string;
  textSize: TextSize;
  safetyStatus: SafetyStatus;
  emergencyContact: { name: string; phone: string };
  communityStatus: CommunityStatus;
  communityEventId: string | null;
  history: HistoryEntry[];
  activeRequest: { type: RequestType; items: string[]; helper: string; eta: string } | null;
}

interface AppContextType extends AppState {
  setScreen: (s: Screen) => void;
  setRequestType: (r: RequestType) => void;
  toggleItem: (item: string) => void;
  setTextSize: (s: TextSize) => void;
  confirmSafetyCheck: () => void;
  setEmergencyContact: (name: string, phone: string) => void;
  joinCommunityEvent: (eventId: string) => void;
  confirmCommunityAttendance: () => void;
  startRequest: () => void;
  completeRequest: (rating: number | null) => void;
  reset: () => void;
}

const seedHistory: HistoryEntry[] = [
  { id: "h1", type: "groceries", items: ["bread", "milk"], helper: "Emma", date: "2026-07-07", rating: 3 },
  { id: "h2", type: "pharmacy", items: ["medicine"], helper: "Lucas", date: "2026-07-04", rating: 3 },
  { id: "h3", type: "accompany", items: ["doctor"], helper: "Lucas", date: "2026-06-30", rating: 2 },
];

const initial: Omit<AppState, "history"> = {
  screen: "home",
  requestType: null,
  selectedItems: [],
  seniorName: "Marie",
  textSize: "normal",
  safetyStatus: "pending",
  emergencyContact: { name: "Sophie", phone: "" },
  communityStatus: "not_joined",
  communityEventId: null,
  activeRequest: null,
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({ ...initial, history: seedHistory });

  const setScreen = useCallback((screen: Screen) => {
    setState((s) => ({ ...s, screen }));
  }, []);

  const setRequestType = useCallback((requestType: RequestType) => {
    setState((s) => ({ ...s, requestType, selectedItems: [] }));
  }, []);

  const toggleItem = useCallback((item: string) => {
    setState((s) => ({
      ...s,
      selectedItems: s.selectedItems.includes(item)
        ? s.selectedItems.filter((i) => i !== item)
        : [...s.selectedItems, item],
    }));
  }, []);

  const setTextSize = useCallback((textSize: TextSize) => {
    setState((s) => ({ ...s, textSize }));
  }, []);

  const confirmSafetyCheck = useCallback(() => {
    setState((s) => ({ ...s, safetyStatus: "checked_in" }));
  }, []);

  const setEmergencyContact = useCallback((name: string, phone: string) => {
    setState((s) => ({ ...s, emergencyContact: { name: name.trim(), phone: phone.trim() } }));
  }, []);

  const joinCommunityEvent = useCallback((communityEventId: string) => {
    setState((s) => ({ ...s, communityStatus: "joined", communityEventId }));
  }, []);

  const confirmCommunityAttendance = useCallback(() => {
    setState((s) => ({ ...s, communityStatus: "checked_in" }));
  }, []);

  const startRequest = useCallback(() => {
    setState((s) => ({
      ...s,
      activeRequest: s.requestType
        ? { type: s.requestType, items: s.selectedItems, helper: "Lucas", eta: "11h15" }
        : null,
      screen: "status",
    }));
  }, []);

  const completeRequest = useCallback((rating: number | null) => {
    setState((s) => ({
      ...s,
      history: s.activeRequest
        ? [
            {
              id: `h${Date.now()}`,
              type: s.activeRequest.type,
              items: s.activeRequest.items,
              helper: s.activeRequest.helper,
              date: new Date().toISOString().slice(0, 10),
              rating,
            },
            ...s.history,
          ]
        : s.history,
      activeRequest: null,
    }));
  }, []);

  const reset = useCallback(() => {
    setState((s) => ({ ...initial, history: s.history, textSize: s.textSize }));
  }, []);

  return (
    <AppContext.Provider
      value={{ ...state, setScreen, setRequestType, toggleItem, setTextSize, confirmSafetyCheck, setEmergencyContact, joinCommunityEvent, confirmCommunityAttendance, startRequest, completeRequest, reset }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
