import { useEffect, useState } from "react";
import { navLinks } from "../data/company";
import { useActiveSection } from "../hooks/useActiveSection";
import { useNavTheme } from "../context/NavThemeContext";
import { useDocumentTheme } from "../hooks/useDocumentTheme";
import { scrollToId } from "../lib/utils";
import { Logo } from "./Logo";

const sectionIds = navLinks.map((link) => link.id);

export function Navbar() {
  const { theme } = useNavTheme();
  useDocumentTheme();
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className={`nav ${theme} ${scrolled ? "scrolled" : ""} ${open ? "open" : ""}`}>
      <div className="nav-bar">
        <button className="nav-logo" onClick={() => go("home")} aria-label="Go to home">
          <Logo variant={theme === "dark" ? "dark" : "light"} compact />
        </button>

        <nav className="nav-links" aria-label="Primary">
          {navLinks.map((link) => (
            <button
              key={link.id}
              className={active === link.id ? "is-active" : ""}
              onClick={() => go(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button className="btn btn-primary nav-cta" onClick={() => go("contact")}>
          Get In Touch
        </button>

        <button
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`nav-mobile ${open ? "is-open" : ""}`}>
        {navLinks.map((link) => (
          <button
            key={link.id}
            className={active === link.id ? "is-active" : ""}
            onClick={() => go(link.id)}
          >
            {link.label}
          </button>
        ))}
        <button className="btn btn-primary" onClick={() => go("contact")}>
          Get In Touch
        </button>
      </div>
    </header>
  );
}
