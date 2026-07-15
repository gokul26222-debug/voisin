let voiceRate = 0.85;

export function setVoiceRate(rate: number) {
  voiceRate = rate;
}

export function getVoiceRate() {
  return voiceRate;
}

export function speak(text: string, lang: "fr" | "en" = "fr") {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === "fr" ? "fr-FR" : "en-US";
  utterance.rate = voiceRate;
  utterance.pitch = 1.0;
  window.speechSynthesis.speak(utterance);
}
