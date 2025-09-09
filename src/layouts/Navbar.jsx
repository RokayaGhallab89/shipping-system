import { useState, useEffect, useRef } from "react";
import { FiSearch, FiBell, FiChevronDown, FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";
import { MdLanguage } from "react-icons/md";
import { BarChart2 } from "lucide-react";

export default function Topbar({ locale, setLocale }) {
  const [open, setOpen] = useState(false);
  const [branchOpen, setBranchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const branchRef = useRef(null);
  const adminRef = useRef(null);
  const mobileMenuRef = useRef(null);


  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);


  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

 
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (branchRef.current && !branchRef.current.contains(e.target)) setBranchOpen(false);
      if (adminRef.current && !adminRef.current.contains(e.target)) setOpen(false);
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) setMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const toggleLang = () => {
    setLocale((prev) => {
      const newLocale = prev === "en" ? "ar" : "en";
      document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
      return newLocale;
    });
  };

  const t = (enText, arText) => (locale === "ar" ? arText : enText);

  return (
    <div className="w-full flex items-center justify-between bg-white dark:bg-gray-900 px-4 py-2 shadow-sm relative">

      <div className="flex items-center gap-4">
        <div className="bg-[#04526A] text-white p-2 rounded-lg">
          <BarChart2 size={22} />
        </div>
        <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200 hidden sm:block">
          {t("Shipping System", "نظام الشحن")}
        </h1>

        <div className="hidden md:flex items-center bg-blue-100 dark:bg-gray-700 rounded-lg px-3 py-2 w-72">
          <FiSearch className="text-blue-900 dark:text-gray-200 mr-2" />
          <input
            type="text"
            placeholder={t("Search...", "بحث...")}
            className="bg-transparent outline-none text-gray-700 dark:text-gray-200 w-full"
          />
        </div>
      </div>


      <button
        className="md:hidden bg-blue-100 dark:bg-gray-700 p-2 rounded-lg"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

 
      <div className="hidden md:flex items-center gap-4">
      
        <div className="relative bg-blue-100 dark:bg-gray-700 p-2 rounded-lg cursor-pointer">
          <FiBell className="text-blue-900 dark:text-gray-200 text-lg" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

      
        <div
          ref={branchRef}
          className="flex items-center bg-blue-100 dark:bg-gray-700 rounded-lg px-3 py-2 cursor-pointer relative"
          onClick={() => setBranchOpen(!branchOpen)}
        >
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{t("Branches", "الفروع")}</p>
          <FiChevronDown className="ml-2 text-gray-600 dark:text-gray-300" />

          {branchOpen && (
            <div className="absolute right-0 top-12 w-44 bg-white dark:bg-gray-800 shadow-md rounded-md py-2 z-50">
              {["Aswan", "Hurghada", "Beni Suef", "Qena"].map((branch, i) => (
                <p key={i} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  {branch}
                </p>
              ))}
            </div>
          )}
        </div>

      
        <button
          onClick={toggleLang}
          className="flex items-center bg-blue-100 dark:bg-gray-700 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200"
        >
          <MdLanguage className="mr-1" />
          <span>{t("EN", "AR")}</span>
        </button>

  
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center bg-blue-100 dark:bg-gray-700 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>

   
        <div
          ref={adminRef}
          className="flex items-center bg-blue-100 dark:bg-gray-700 rounded-lg px-3 py-1 cursor-pointer relative"
          onClick={() => setOpen(!open)}
        >
          <div className="ml-2 text-sm">
            <p className="font-medium text-gray-800 dark:text-gray-200">Rokaya</p>
            <p className="text-gray-500 dark:text-gray-400 text-xs">Admin</p>
          </div>
          <FiChevronDown className="ml-2 text-gray-600 dark:text-gray-300" />

          {open && (
            <div className="absolute right-0 top-12 w-40 bg-white dark:bg-gray-800 shadow-md rounded-md py-2 z-50">
              {["Profile", "Settings", "Logout"].map((item, i) => (
                <p key={i} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  {item}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>


      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg md:hidden z-50 p-4">
          <div className="flex items-center bg-blue-100 dark:bg-gray-700 rounded-lg px-3 py-2 w-full mb-4">
            <FiSearch className="text-blue-900 dark:text-gray-200 mr-2" />
            <input
              type="text"
              placeholder={t("Search...", "بحث...")}
              className="bg-transparent outline-none text-gray-700 dark:text-gray-200 w-full"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between bg-blue-100 dark:bg-gray-700 p-3 rounded-lg">
              <span>{t("Notifications", "الإشعارات")}</span>
              <div className="relative">
                <FiBell className="text-blue-900 dark:text-gray-200 text-lg" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-blue-100 dark:bg-gray-700 rounded-lg px-3 py-3 cursor-pointer" onClick={() => setBranchOpen(!branchOpen)}>
              <span>{t("Branches", "الفروع")}</span>
              <FiChevronDown className="text-gray-600 dark:text-gray-300" />
            </div>

            {branchOpen && (
              <div className="bg-blue-50 dark:bg-gray-800 rounded-md py-2 ml-4">
                {["Aswan", "Hurghada", "Beni Suef", "Qena"].map((branch, i) => (
                  <p key={i} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    {branch}
                  </p>
                ))}
              </div>
            )}

            <button
              onClick={toggleLang}
              className="flex items-center justify-between w-full bg-blue-100 dark:bg-gray-700 px-3 py-3 rounded-lg text-gray-700 dark:text-gray-200"
            >
              <span>{t("Language", "اللغة")}</span>
              <MdLanguage />
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center justify-between w-full bg-blue-100 dark:bg-gray-700 px-3 py-3 rounded-lg text-gray-700 dark:text-gray-200"
            >
              <span>{darkMode ? t("Light Mode", "وضع النهار") : t("Dark Mode", "الوضع الليلي")}</span>
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
