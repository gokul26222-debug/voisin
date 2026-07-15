"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Locale = "fr" | "en";

const translations = {
  fr: {
    greeting: "Bonjour",
    sunny: "Ensoleillé, 24°",
    groceries: "Courses",
    pharmacy: "Pharmacie",
    home_help: "Maison",
    accompany: "Sortir",
    groceries_hint: "Pain, lait, fruits...",
    pharmacy_hint: "Ordonnance, soins...",
    home_help_hint: "Ampoule, ménage...",
    accompany_hint: "Médecin, promenade...",
    call_family: "Ma famille",
    or_speak: "Dites-le moi !",
    what_do_you_need: "Que voulez-vous ?",
    // Grocery items
    bread: "Pain",
    milk: "Lait",
    fruits: "Fruits",
    eggs: "Oeufs",
    cheese: "Fromage",
    water: "Eau",
    // Pharmacy items
    medicine: "Médicaments",
    bandages: "Pansements",
    cream: "Crème",
    vitamins: "Vitamines",
    thermometer: "Thermomètre",
    soap: "Savon",
    // Home help items
    lightbulb: "Ampoule",
    plumbing: "Plomberie",
    cleaning: "Ménage",
    moving_box: "Déplacer",
    furniture: "Meuble",
    electrical: "Électricité",
    // Accompany items
    walk: "Promenade",
    doctor: "Médecin",
    shopping: "Courses",
    park: "Parc",
    hairdresser: "Coiffeur",
    post_office: "La Poste",
    // UI
    confirm_title: "Un voisin va vous chercher :",
    confirm_help: "Un voisin vient vous aider :",
    confirm_accompany: "Un voisin vous accompagne :",
    yes: "Oui",
    no: "Non",
    cancel: "Annuler",
    cancellable: "Annulable pendant 60 secondes",
    your_neighbour: "votre voisin",
    verified: "Vérifié",
    arrives_at: "arrive à",
    on_the_way: "En chemin",
    accepted: "Accepté",
    in_progress: "En cours",
    arrived: "Arrivé",
    call_helper: "Appeler Lucas",
    problem: "Un problème ?",
    done_title: "C'est fait !",
    how_was_it: "Comment ça s'est passé ?",
    thank_you: "Merci",
    home: "Accueil",
    back: "Retour",
    items_noted: "c'est noté !",
    confirm_next: "Confirmer",
    selected: "sélectionné",
    language: "Langue",
    request_sent: "Demande envoyée !",
    helper_assigned: "Un voisin arrive bientôt",
    call_us: "On vous appelle ?",
    calling_family: "Appel de votre famille en cours",
    // Settings
    settings: "Réglages",
    text_size: "Taille du texte",
    normal: "Normale",
    large: "Grande",
    voice_speed: "Vitesse de la voix",
    slow: "Lente",
    fast: "Rapide",
    my_helpers: "Mes voisins",
    // History
    history: "Mes demandes",
    no_history: "Aucune demande pour le moment",
    came_on: "est venu le",
    // Status card on home
    active_request: "en cours",
    see_details: "Voir",
    // Family dashboard
    fam_hello: "Bonjour",
    fam_senior_status: "Maman va bien",
    fam_last_active: "Active il y a",
    fam_minutes_ago: "min",
    fam_hours_ago: "h",
    fam_today: "Aujourd'hui",
    fam_status_good: "Tout va bien",
    fam_status_warning: "Pas de nouvelles",
    fam_status_critical: "Alerte !",
    fam_activity: "Activité",
    fam_alerts: "Alertes",
    fam_no_alerts: "Aucune alerte",
    fam_call_mom: "Appeler Maman",
    fam_send_heart: "Envoyer un cœur",
    fam_heart_sent: "Cœur envoyé à Maman !",
    fam_i_spoke_to_her: "Je lui ai parlé",
    fam_spoken_confirmed: "Contact confirmé",
    fam_active_request: "Demande en cours",
    fam_helper_coming: "arrive bientôt",
    fam_request_history: "Historique des demandes",
    fam_wellness: "Bien-être",
    fam_wellness_score: "Score bien-être",
    fam_app_opens: "Ouvertures app",
    fam_requests_week: "Demandes cette semaine",
    fam_mood_trend: "Tendance humeur",
    fam_stable: "Stable",
    fam_improving: "En hausse",
    fam_declining: "En baisse",
    fam_settings: "Réglages",
    fam_alert_settings: "Paramètres d'alerte",
    fam_silence_hours: "Alerte après silence (heures)",
    fam_emergency_contact: "Contact d'urgence",
    fam_payment: "Paiement",
    fam_subscription: "Abonnement",
    fam_manage_plan: "Gérer mon forfait",
    fam_demo_panel: "Panneau démo",
    fam_simulate_silence: "Simuler silence",
    fam_reset_demo: "Réinitialiser",
    fam_opened_app: "A ouvert l'application",
    fam_requested: "A demandé",
    fam_helper_arrived: "Voisin arrivé",
    fam_gave_feedback: "A donné son avis",
    fam_no_activity: "Pas d'activité récente",
  },
  en: {
    greeting: "Hello",
    sunny: "Sunny, 24°",
    groceries: "Groceries",
    pharmacy: "Pharmacy",
    home_help: "Home help",
    accompany: "Go out",
    groceries_hint: "Bread, milk, fruit...",
    pharmacy_hint: "Prescription, care...",
    home_help_hint: "Light bulb, cleaning...",
    accompany_hint: "Doctor, walk...",
    call_family: "My family",
    or_speak: "Just tell me!",
    what_do_you_need: "What do you need?",
    // Grocery items
    bread: "Bread",
    milk: "Milk",
    fruits: "Fruits",
    eggs: "Eggs",
    cheese: "Cheese",
    water: "Water",
    // Pharmacy items
    medicine: "Medicine",
    bandages: "Bandages",
    cream: "Cream",
    vitamins: "Vitamins",
    thermometer: "Thermometer",
    soap: "Soap",
    // Home help items
    lightbulb: "Light bulb",
    plumbing: "Plumbing",
    cleaning: "Cleaning",
    moving_box: "Move things",
    furniture: "Furniture",
    electrical: "Electrical",
    // Accompany items
    walk: "Walk",
    doctor: "Doctor",
    shopping: "Shopping",
    park: "Park",
    hairdresser: "Hairdresser",
    post_office: "Post office",
    // UI
    confirm_title: "A neighbour will get you:",
    confirm_help: "A neighbour is coming to help:",
    confirm_accompany: "A neighbour will go with you:",
    yes: "Yes",
    no: "No",
    cancel: "Cancel",
    cancellable: "Cancellable for 60 seconds",
    your_neighbour: "your neighbour",
    verified: "Verified",
    arrives_at: "arrives at",
    on_the_way: "On the way",
    accepted: "Accepted",
    in_progress: "In progress",
    arrived: "Arrived",
    call_helper: "Call Lucas",
    problem: "A problem?",
    done_title: "All done!",
    how_was_it: "How did it go?",
    thank_you: "Thank you",
    home: "Home",
    back: "Back",
    items_noted: "noted!",
    confirm_next: "Confirm",
    selected: "selected",
    language: "Language",
    request_sent: "Request sent!",
    helper_assigned: "A neighbour is coming soon",
    call_us: "Shall we call you?",
    calling_family: "Calling your family now",
    // Settings
    settings: "Settings",
    text_size: "Text size",
    normal: "Normal",
    large: "Large",
    voice_speed: "Voice speed",
    slow: "Slow",
    fast: "Fast",
    my_helpers: "My neighbours",
    // History
    history: "My requests",
    no_history: "No requests yet",
    came_on: "came on",
    // Status card on home
    active_request: "in progress",
    see_details: "View",
    // Family dashboard
    fam_hello: "Hello",
    fam_senior_status: "Mom is doing well",
    fam_last_active: "Active",
    fam_minutes_ago: "min ago",
    fam_hours_ago: "h ago",
    fam_today: "Today",
    fam_status_good: "All good",
    fam_status_warning: "No news",
    fam_status_critical: "Alert!",
    fam_activity: "Activity",
    fam_alerts: "Alerts",
    fam_no_alerts: "No alerts",
    fam_call_mom: "Call Mom",
    fam_send_heart: "Send a heart",
    fam_heart_sent: "Heart sent to Mom!",
    fam_i_spoke_to_her: "I spoke to her",
    fam_spoken_confirmed: "Contact confirmed",
    fam_active_request: "Active request",
    fam_helper_coming: "coming soon",
    fam_request_history: "Request history",
    fam_wellness: "Wellness",
    fam_wellness_score: "Wellness score",
    fam_app_opens: "App opens",
    fam_requests_week: "Requests this week",
    fam_mood_trend: "Mood trend",
    fam_stable: "Stable",
    fam_improving: "Improving",
    fam_declining: "Declining",
    fam_settings: "Settings",
    fam_alert_settings: "Alert settings",
    fam_silence_hours: "Alert after silence (hours)",
    fam_emergency_contact: "Emergency contact",
    fam_payment: "Payment",
    fam_subscription: "Subscription",
    fam_manage_plan: "Manage plan",
    fam_demo_panel: "Demo panel",
    fam_simulate_silence: "Simulate silence",
    fam_reset_demo: "Reset",
    fam_opened_app: "Opened the app",
    fam_requested: "Requested",
    fam_helper_arrived: "Helper arrived",
    fam_gave_feedback: "Gave feedback",
    fam_no_activity: "No recent activity",
  },
} as const;

export type TranslationKey = keyof typeof translations.fr;

interface I18nContextType {
  locale: Locale;
  t: (key: TranslationKey) => string;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  const t = useCallback(
    (key: TranslationKey) => translations[locale][key] ?? key,
    [locale]
  );

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => (prev === "fr" ? "en" : "fr"));
  }, []);

  return (
    <I18nContext.Provider value={{ locale, t, setLocale, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
