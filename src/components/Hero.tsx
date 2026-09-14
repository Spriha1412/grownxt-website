import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { company } from "../data/company";
import { orbitServices } from "../data/services";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { scrollToId } from "../lib/utils";

type OrbitService = (typeof orbitServices)[number];

function placeOnOrbit(items: readonly OrbitService[], offset = 0) {
  const step = 360 / items.length;
  return items.map((service, index) => ({
    service,
    angle: offset + step * index,
  }));
}

const outerTags = placeOnOrbit(orbitServices.slice(0, 6), 6);
const middleTags = placeOnOrbit(orbitServices.slice(6, 12), 28);
const innerTags = placeOnOrbit(orbitServices.slice(12), 12);

const mobileFloatChips = [
  { id: "seo", label: "SEO", className: "c1" },
  { id: "reels", label: "Reels", className: "c2" },
  { id: "ads", label: "Ads", className: "c3" },
  { id: "shopify", label: "Shopify", className: "c4" },
] as const;

function OrbitTags({
  items,
  reduced,
}: {
  items: readonly { service: OrbitService; angle: number }[];
  reduced: boolean;
}) {
  return (
    <>
      {items.map(({ service, angle }) => (
        <span key={service.id} className="hero-tag" style={{ "--a": `${angle}deg` } as CSSProperties}>
          <button
            type="button"
            aria-label={service.name}
            onClick={() => scrollToId("services")}
            tabIndex={reduced ? 0 : -1}
          >
            {service.tag}
          </button>
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [heroTheme, setHeroTheme] = useState<"light" | "dark">("light");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 88, damping: 26, mass: 0.32 });

  const bg = useTransform(
    progress,
    [0, 0.4, 0.82],
    ["rgba(248,246,241,0.08)", "rgba(0, 0, 0, 0.72)", "rgba(0,0,0,1)"]
  );
  const color = useTransform(progress, [0, 0.38, 0.55], ["#000000", "#000000", "#f4f6ef"]);
  const muted = useTransform(progress, [0, 0.38, 0.55], ["#5f6658", "#5f6658", "rgba(244,246,239,0.74)"]);

  useEffect(() => {
    if (reduced) {
      setHeroTheme("light");
      return;
    }
    return progress.on("change", (value) => {
      setHeroTheme(value > 0.42 ? "dark" : "light");
    });
  }, [progress, reduced]);

  return (
    <section id="home" ref={ref} className="hero-pin" data-theme={heroTheme}>
      <motion.div className="hero" style={reduced ? undefined : { backgroundColor: bg, color }}>
        <div className="hero-stage">
          <div className="hero-mobile-ambience" aria-hidden="true">
            <span className="hero-float-orb o1" />
            <span className="hero-float-orb o2" />
            <span className="hero-float-orb o3" />
            <span className="hero-float-spark s1" />
            <span className="hero-float-spark s2" />
            <span className="hero-float-spark s3" />
            <span className="hero-float-dot d1" />
            <span className="hero-float-dot d2" />
            <span className="hero-float-dot d3" />
            <span className="hero-float-dot d4" />
            <span className="hero-float-dot d5" />
            <span className="hero-float-dot d6" />
          </div>
          <div className={`hero-orbit-wrap ${reduced ? "is-static" : ""}`}>
            <span className="hero-core-glow" aria-hidden="true" />
            <div className="hero-rings" aria-hidden="true">
              <span className="hero-ring r1" />
              <span className="hero-ring r2" />
              <span className="hero-ring r3" />
            </div>
            <div className="hero-orbit orbit-c" aria-hidden={reduced ? undefined : true}>
              <OrbitTags items={outerTags} reduced={reduced} />
            </div>
            <div className="hero-orbit orbit-a" aria-hidden={reduced ? undefined : true}>
              <OrbitTags items={middleTags} reduced={reduced} />
            </div>
            <div className="hero-orbit orbit-b" aria-hidden={reduced ? undefined : true}>
              <OrbitTags items={innerTags} reduced={reduced} />
            </div>

            <div className="hero-copy">
              <h1>
                <span className="hero-line">{company.hero.heading}</span>
                <span className="hero-line">
                  {company.hero.headingLead}{" "}
                  <span className="hero-accent">{company.hero.headingAccent}</span>
                </span>
              </h1>
              <motion.p className="hero-lead" style={reduced ? undefined : { color: muted }}>
                {company.hero.lead}
              </motion.p>
              <div className="hero-visual">
                <div className="hero-visual-float" aria-hidden="true">
                  {mobileFloatChips.map((chip) => (
                    <span key={chip.id} className={`hero-float-chip ${chip.className}`}>
                      {chip.label}
                    </span>
                  ))}
                </div>
                <img
                  className="hero-home-image"
                  src="/home-image.png"
                  alt="Grow your brand with SEO, social media, content, advertising, and more"
                  width={488}
                  height={511}
                  decoding="async"
                />
              </div>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => scrollToId("contact")}>
                  Talk to us
                </button>
                <button className="btn btn-secondary" onClick={() => scrollToId("services")}>
                  See services
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
