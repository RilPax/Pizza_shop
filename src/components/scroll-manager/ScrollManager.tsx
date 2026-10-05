import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Скроллит к якорю (/#promo) или наверх при смене страницы
export const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    // Ждём, пока секция отрисуется
    const timer = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }, 50);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};
