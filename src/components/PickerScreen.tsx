"use client";

import {
  ArrowLeft,
  Check,
  Croissant,
  Milk,
  Apple,
  Egg,
  CookingPot,
  Droplets,
  Pill,
  Bandage,
  SprayCan,
  Heart,
  Thermometer,
  Hand,
  Lightbulb,
  Wrench,
  Brush,
  Package,
  Armchair,
  Plug,
  Footprints,
  Stethoscope,
  ShoppingBag,
  Trees,
  Scissors,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { speak } from "@/lib/speech";
import ScreenShell from "@/components/ui/ScreenShell";

const itemsByType: Record<string, { key: TranslationKey; Icon: LucideIcon }[]> = {
  groceries: [
    { key: "bread", Icon: Croissant },
    { key: "milk", Icon: Milk },
    { key: "fruits", Icon: Apple },
    { key: "eggs", Icon: Egg },
    { key: "cheese", Icon: CookingPot },
    { key: "water", Icon: Droplets },
  ],
  pharmacy: [
    { key: "medicine", Icon: Pill },
    { key: "bandages", Icon: Bandage },
    { key: "cream", Icon: SprayCan },
    { key: "vitamins", Icon: Heart },
    { key: "thermometer", Icon: Thermometer },
    { key: "soap", Icon: Hand },
  ],
  home_help: [
    { key: "lightbulb", Icon: Lightbulb },
    { key: "plumbing", Icon: Wrench },
    { key: "cleaning", Icon: Brush },
    { key: "moving_box", Icon: Package },
    { key: "furniture", Icon: Armchair },
    { key: "electrical", Icon: Plug },
  ],
  accompany: [
    { key: "walk", Icon: Footprints },
    { key: "doctor", Icon: Stethoscope },
    { key: "shopping", Icon: ShoppingBag },
    { key: "park", Icon: Trees },
    { key: "hairdresser", Icon: Scissors },
    { key: "post_office", Icon: Mail },
  ],
};

export default function PickerScreen() {
  const { t, locale } = useI18n();
  const { requestType, selectedItems, toggleItem, setScreen } = useApp();

  const items = itemsByType[requestType ?? "groceries"] ?? itemsByType.groceries;

  const handleToggle = (key: string, label: string) => {
    toggleItem(key);
    const isSelected = !selectedItems.includes(key);
    speak(isSelected ? `${label}, ${t("items_noted")}` : label, locale);
  };

  return (
    <ScreenShell>
      <button
        onClick={() => { speak(t("back"), locale); setScreen("home"); }}
        className="btn-press mb-4 pl-3 pr-5 py-2.5 rounded-full bg-white border border-card-border shadow-card text-warm-gray text-[20px] font-bold flex items-center gap-1.5 min-h-[52px]"
      >
        <ArrowLeft size={24} strokeWidth={2.2} />
        {t("back")}
      </button>

      <h2 className="text-[28px] font-extrabold text-purple-dark mb-5">
        {t("what_do_you_need")}
      </h2>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {items.map(({ key, Icon }) => {
          const label = t(key);
          const selected = selectedItems.includes(key);
          return (
            <button
              key={key}
              onClick={() => handleToggle(key, label)}
              className={`btn-press relative rounded-2xl p-4 flex flex-col items-center gap-2.5 min-h-[118px] border-2 shadow-card transition-colors ${
                selected
                  ? "bg-purple-tint border-purple"
                  : "bg-white border-card-border"
              }`}
            >
              {selected && (
                <span className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-purple flex items-center justify-center">
                  <Check size={16} color="white" strokeWidth={3} />
                </span>
              )}
              <span className={`w-14 h-14 rounded-xl flex items-center justify-center ${selected ? "bg-purple-light" : "bg-cream-dark"}`}>
                <Icon size={30} className={selected ? "text-purple-dark" : "text-warm-gray"} strokeWidth={2} />
              </span>
              <span className={`text-[22px] font-bold leading-tight text-center ${selected ? "text-purple-dark" : "text-warm-black"}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {selectedItems.length > 0 && (
        <button
          onClick={() => { speak(t("confirm_next"), locale); setScreen("confirm"); }}
          className="btn-press slide-up w-full bg-purple rounded-2xl py-5 text-white text-[24px] font-extrabold min-h-[72px] shadow-card-lg"
        >
          {t("confirm_next")} ({selectedItems.length})
        </button>
      )}
    </ScreenShell>
  );
}
