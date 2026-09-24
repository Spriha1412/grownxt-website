import { useRef } from "react";
import { useScroll } from "framer-motion";
import { company } from "../data/company";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { AboutAccordion } from "./AboutAccordion";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 860px)");
  const staticLayout = isMobile || reduced;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="about"
      ref={ref}
      className={`about-pin ${staticLayout ? "is-static" : ""}`}
      data-theme="dark"
    >
      <div className="about">
        <div className="container">
          <p className="eyebrow">About Us</p>
          <h2 className="section-title">A digital partner, not a vendor.</h2>
          <div className="about-lead">
            {company.about.copy.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <AboutAccordion progress={scrollYProgress} staticLayout={staticLayout} />
        </div>
      </div>
    </section>
  );
}
