import i18n from "i18next";

export default function LanguageSwitcher() {
  const changeToArabic = () => {
    i18n.changeLanguage("ar");
    document.documentElement.setAttribute("dir", "rtl"); // ✅ RTL
  };

  const changeToEnglish = () => {
    i18n.changeLanguage("en");
    document.documentElement.setAttribute("dir", "ltr"); // ✅ LTR
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={changeToArabic}
        className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition"
      >
        🇸🇦 عربي
      </button>
      <button
        onClick={changeToEnglish}
        className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition"
      >
        🇬🇧 English
      </button>
    </div>
  );
}
