import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type NavTheme = "light" | "dark";

type NavThemeContextValue = {
  theme: NavTheme;
  setTheme: (theme: NavTheme) => void;
};

const NavThemeContext = createContext<NavThemeContextValue | null>(null);

export function NavThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<NavTheme>("light");
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <NavThemeContext.Provider value={value}>{children}</NavThemeContext.Provider>;
}

export function useNavTheme() {
  const ctx = useContext(NavThemeContext);
  if (!ctx) throw new Error("useNavTheme must be used within NavThemeProvider");
  return ctx;
}
