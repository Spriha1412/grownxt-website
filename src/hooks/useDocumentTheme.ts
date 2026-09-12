import { useEffect } from "react";
import { useNavTheme } from "../context/NavThemeContext";

export function useDocumentTheme() {
  const { setTheme } = useNavTheme();

  useEffect(() => {
    const update = () => {
      const probe = document.elementFromPoint(window.innerWidth / 2, Math.min(window.innerHeight * 0.38, 168));
      const themed = probe?.closest("[data-theme]");
      const value = themed?.getAttribute("data-theme");
      if (value === "dark" || value === "light") setTheme(value);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [setTheme]);
}
