import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { services } from "../data/services";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { scrollToId } from "../lib/utils";

function ServiceCardFace({
  title,
  what,
  why,
  points,
  name,
}: {
  title: string;
  what: string;
  why: string;
  points: readonly string[];
  name: string;
}) {
  return (
    <article className="service-card">
      <h3>{title}</h3>
      <div className="service-copy">
        <div>
          <h4>What it is</h4>
          <p>{what}</p>
        </div>
        <div>
          <h4>Why it matters</h4>
          <p>{why}</p>
        </div>
      </div>
      <ul className="service-points">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <button className="btn btn-primary" onClick={() => scrollToId("contact")}>
        Get Started →
      </button>
      <small>{name}</small>
    </article>
  );
}

function StickyServiceCard({
  service,
  index,
  onActive,
}: {
  service: (typeof services)[number];
  index: number;
  onActive: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 110px", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -10]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) onActive(index);
      },
      { threshold: [0.5, 0.75], rootMargin: "-10% 0px -28% 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [index, onActive]);

  return (
    <div ref={ref} className="service-slot" style={{ zIndex: index + 1 }}>
      <motion.div className="service-slot-face" style={{ scale, y }}>
        <ServiceCardFace
          title={service.title}
          what={service.what}
          why={service.why}
          points={service.points}
          name={service.name}
        />
      </motion.div>
    </div>
  );
}

export function StackedServiceCards() {
  const isMobile = useMediaQuery("(max-width: 860px)");
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const stacked = !isMobile && !reduced;

  const heading = (
    <div className="services-head">
      <p className="eyebrow">Capabilities</p>
      <h2 className="section-title">How we can help</h2>
      <p className="section-copy services-lead">
        Six disciplines, one system. Scroll and each card takes the stage until the next one lands.
      </p>
      {stacked && (
        <p className="service-progress" aria-live="polite">
          <span>{String(active + 1).padStart(2, "0")}</span>
          <i />
          <span>{String(services.length).padStart(2, "0")}</span>
        </p>
      )}
    </div>
  );

  if (!stacked) {
    return (
      <div className="container">
        {heading}
        <div className="service-list">
          {services.map((service) => (
            <ServiceCardFace
              key={service.id}
              title={service.title}
              what={service.what}
              why={service.why}
              points={service.points}
              name={service.name}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="service-stack">
      <div className="container">{heading}</div>
      <div className="service-stack-track">
        {services.map((service, index) => (
          <StickyServiceCard
            key={service.id}
            service={service}
            index={index}
            onActive={setActive}
          />
        ))}
      </div>
    </div>
  );
}
