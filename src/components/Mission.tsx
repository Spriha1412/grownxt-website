import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { company } from "../data/company";
import { missionVideos } from "../data/videoStack";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const SLIDE_MS = 6500;

function useMissionSlides() {
  return useMemo(() => {
    const items = [
      {
        id: "stand",
        label: "01",
        title: company.mission.subheading,
        body: company.mission.copy,
      },
      {
        id: "deliver",
        label: "02",
        title: company.mission.deliverHeading,
        body: company.mission.deliver,
      },
      ...company.mission.pillars.map((pillar, index) => ({
        id: pillar.title,
        label: String(index + 3).padStart(2, "0"),
        title: pillar.title,
        body: pillar.body,
      })),
    ];

    return items.map((item, index) => {
      const clip = missionVideos[index] ?? missionVideos[0];
      return {
        ...item,
        video: clip.src,
        poster: clip.poster,
      };
    });
  }, []);
}

function MissionVideo({
  src,
  poster,
  visible,
  playing,
}: {
  src: string;
  poster: string;
  visible: boolean;
  playing: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (playing) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [playing]);

  return (
    <motion.video
      ref={ref}
      src={encodeURI(src)}
      poster={poster}
      className="mission-video"
      muted
      loop
      playsInline
      preload={visible ? "auto" : "metadata"}
      aria-hidden="true"
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

export function Mission() {
  const slides = useMissionSlides();
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const slide = slides[active];
  const videos = useMemo(() => [...new Set(slides.map((item) => item.video))], [slides]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.28 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !inView || paused) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [inView, paused, reduced, slides.length]);

  return (
    <section id="mission" ref={sectionRef} className="mission" data-theme="dark">
      <div className="container-wide">
        <div className="mission-head">
          <p className="eyebrow">Our Mission</p>
          <h2 className="section-title">What we show up to do.</h2>
        </div>

        {reduced ? (
          <div className="mission-static">
            <div className="mission-media is-static">
              <MissionVideo
                src={slides[0].video}
                poster={slides[0].poster}
                visible
                playing={inView}
              />
              <div className="mission-media-veil" />
            </div>
            <blockquote>{company.mission.copy}</blockquote>
            <article>
              <h3>{company.mission.deliverHeading}</h3>
              <p>{company.mission.deliver}</p>
            </article>
            <div className="mission-static-grid">
              {company.mission.pillars.map((pillar) => (
                <article key={pillar.title}>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="mission-stage"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="mission-media"
              style={{ backgroundImage: `url(${slide.poster})` }}
            >
              {videos.map((src) => {
                const poster = slides.find((item) => item.video === src)?.poster ?? "";
                return (
                  <MissionVideo
                    key={src}
                    src={src}
                    poster={poster}
                    visible={slide.video === src}
                    playing={inView && slide.video === src}
                  />
                );
              })}
              <div className="mission-media-veil" />
              <span className="mission-media-count">
                {slide.label} / {String(slides.length).padStart(2, "0")}
              </span>
            </div>

            <div className="mission-story">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  className="mission-slide"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="mission-kicker">{slide.label}</p>
                  <h3>{slide.title}</h3>
                  <p>{slide.body}</p>
                </motion.div>
              </AnimatePresence>

              <div className="mission-progress" aria-hidden="true">
                <i key={`${active}-${paused}`} className={paused ? "is-paused" : ""} />
              </div>

              <div className="mission-steps" role="tablist" aria-label="Mission points">
                {slides.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={index === active}
                    className={index === active ? "is-active" : ""}
                    onClick={() => setActive(index)}
                  >
                    <span>{item.label}</span>
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
