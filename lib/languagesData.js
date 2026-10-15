// High-demand languages for Pennsylvania / Bucks County / Philadelphia homecare & all major world languages
export const POPULAR_LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸", bcp47: "en-US" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", bcp47: "es-ES" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺", bcp47: "ru-RU" },
  { code: "zh-CN", name: "Chinese (Simplified)", nativeName: "简体中文", flag: "🇨🇳", bcp47: "zh-CN" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", bcp47: "hi-IN" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська", flag: "🇺🇦", bcp47: "uk-UA" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳", bcp47: "vi-VN" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", bcp47: "ar-SA", dir: "rtl" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳", bcp47: "gu-IN" },
  { code: "ht", name: "Haitian Creole", nativeName: "Kreyòl Ayisyen", flag: "🇭🇹", bcp47: "ht" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷", bcp47: "ko-KR" },
  { code: "pl", name: "Polish", nativeName: "Polski", flag: "🇵🇱", bcp47: "pl-PL" },
  { code: "tl", name: "Tagalog (Filipino)", nativeName: "Tagalog", flag: "🇵🇭", bcp47: "tl-PH" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇧🇷", bcp47: "pt-BR" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", bcp47: "de-DE" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", bcp47: "fr-FR" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹", bcp47: "it-IT" },
];

export const ALL_LANGUAGES = [
  ...POPULAR_LANGUAGES,
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇧🇩", bcp47: "bn-BD" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳", bcp47: "pa-IN" },
  { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇵🇰", bcp47: "ur-PK", dir: "rtl" },
  { code: "el", name: "Greek", nativeName: "Ελληνικά", flag: "🇬🇷", bcp47: "el-GR" },
  { code: "he", name: "Hebrew", nativeName: "עברית", flag: "🇮🇱", bcp47: "he-IL", dir: "rtl" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", bcp47: "ja-JP" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "🇳🇱", bcp47: "nl-NL" },
  { code: "ro", name: "Romanian", nativeName: "Română", flag: "🇷🇴", bcp47: "ro-RO" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷", bcp47: "tr-TR" },
  { code: "cs", name: "Czech", nativeName: "Čeština", flag: "🇨🇿", bcp47: "cs-CZ" },
  { code: "hu", name: "Hungarian", nativeName: "Magyar", flag: "🇭🇺", bcp47: "hu-HU" },
  { code: "sv", name: "Swedish", nativeName: "Svenska", flag: "🇸🇪", bcp47: "sv-SE" },
  { code: "th", name: "Thai", nativeName: "ไทย", flag: "🇹🇭", bcp47: "th-TH" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩", bcp47: "id-ID" },
  { code: "fa", name: "Persian (Farsi)", nativeName: "فارسی", flag: "🇮🇷", bcp47: "fa-IR", dir: "rtl" },
  { code: "hr", name: "Croatian", nativeName: "Hrvatski", flag: "🇭🇷", bcp47: "hr-HR" },
  { code: "sk", name: "Slovak", nativeName: "Slovenčina", flag: "🇸🇰", bcp47: "sk-SK" },
  { code: "bg", name: "Bulgarian", nativeName: "Български", flag: "🇧🇬", bcp47: "bg-BG" },
  { code: "lt", name: "Lithuanian", nativeName: "Lietuvių", flag: "🇱🇹", bcp47: "lt-LT" },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili", flag: "🇰🇪", bcp47: "sw-KE" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳", bcp47: "ta-IN" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳", bcp47: "te-IN" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳", bcp47: "mr-IN" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳", bcp47: "ml-IN" },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", flag: "🇲🇾", bcp47: "ms-MY" },
];

export function getLanguageByCode(code) {
  if (!code) return POPULAR_LANGUAGES[0];
  const normalized = code.toLowerCase().split("-")[0];
  return (
    ALL_LANGUAGES.find((l) => l.code.toLowerCase() === code.toLowerCase()) ||
    ALL_LANGUAGES.find((l) => l.code.toLowerCase().split("-")[0] === normalized) ||
    POPULAR_LANGUAGES[0]
  );
}
