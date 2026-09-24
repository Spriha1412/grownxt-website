import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { company } from "../data/company";

type AboutAccordionProps = {
  progress: MotionValue<number>;
  staticLayout: boolean;
};

function AboutDesktopCard({
  card,
  index,
  count,
  progress,
  active,
  onSelect,
}: {
  card: (typeof company.about.cards)[number];
  index: number;
  count: number;
  progress: MotionValue<number>;
  active: number;
  onSelect: (index: number) => void;
}) {
  const open = active === index;
  const flex = useTransform(progress, (value) => {
    const x = value * (count - 1);
    const distance = Math.min(1, Math.abs(x - index));
    const eased = distance * distance * (3 - 2 * distance);
    return 3.85 - eased * 3.2;
  });
  const glow = useTransform(progress, (value) => {
    const x = value * (count - 1);
    return 1 - Math.min(1, Math.abs(x - index));
  });
  const boxShadow = useTransform(
    glow,
    (amount) =>
      `inset 0 0 0 1px rgba(128,164,72,${0.08 + amount * 0.55}), 0 28px 70px rgba(128,164,72,${amount * 0.18})`
  );

  return (
    <motion.article
      className={`about-card ${open ? "is-active" : ""}`}
      style={{ flexGrow: flex, flexBasis: 0, boxShadow }}
      onClick={() => onSelect(index)}
    >
      <span>0{index + 1}</span>
      <h3>{card.title}</h3>
      <div className="about-card-body">
        {card.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </motion.article>
  );
}

export function AboutAccordion({ progress, staticLayout }: AboutAccordionProps) {
  const cards = company.about.cards;
  const [active, setActive] = useState(0);

  useMotionValueEvent(progress, "change", (value) => {
    if (staticLayout) return;
    const next = Math.round(Math.min(cards.length - 1, Math.max(0, value * (cards.length - 1))));
    setActive(next);
  });

  useEffect(() => {
    if (!staticLayout) return;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-about-index]"));
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number(visible.target.getAttribute("data-about-index"));
        if (!Number.isNaN(index)) setActive(index);
      },
      { rootMargin: "-32% 0px -42% 0px", threshold: [0.25, 0.5, 0.75] }
    );
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, [staticLayout]);

  if (staticLayout) {
    return (
      <div className="about-accordion">
        {cards.map((card, index) => {
          const open = active === index;
          return (
            <article
              key={card.id}
              className={`about-acc ${open ? "is-active" : ""}`}
              data-about-index={index}
            >
              <button onClick={() => setActive(index)} aria-expanded={open}>
                <span>0{index + 1}</span>
                <strong>{card.title}</strong>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    className="about-card-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {card.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    );
  }

  return (
    <div className="about-cards">
      {cards.map((card, index) => (
        <AboutDesktopCard
          key={card.id}
          card={card}
          index={index}
          count={cards.length}
          progress={progress}
          active={active}
          onSelect={setActive}
        />
      ))}
    </div>
  );
}
