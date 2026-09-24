import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { stackVideos, videoChapters } from "../data/videoStack";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { scrollToId } from "../lib/utils";

function LayerVideo({
  src,
  active,
}: {
  src: string;
  active: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (active) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active]);

  return (
    <video
      ref={ref}
      src={encodeURI(src)}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}

function ChapterCopy({ chapter }: { chapter: (typeof videoChapters)[number] }) {
  return (
    <div className="video-stack-copy">
      <h2 className="section-title">{chapter.title}</h2>
      <p className="section-copy">{chapter.copy}</p>
      {chapter.id === "services" && (
        <button className="btn btn-primary" onClick={() => scrollToId("contact")}>
          Get In Touch
        </button>
      )}
    </div>
  );
}

export function StackedVideos() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const cameraScale = useTransform(scrollYProgress, [0, 0.62, 0.74, 1], [0.97, 0.97, 0.84, 0.76]);
  const cameraY = useTransform(scrollYProgress, [0, 0.62, 0.82], [0, 0, -40]);
  const cameraRotate = useTransform(scrollYProgress, [0, 0.62, 0.82], [0, 0, -5]);
  const cameraOpacity = useTransform(scrollYProgress, [0, 0.64, 0.82], [1, 1, 0.35]);
  const cameraZ = useTransform(scrollYProgress, [0, 0.68, 0.7], [3, 3, 1]);

  const servicesScale = useTransform(scrollYProgress, [0, 0.6, 0.7, 0.8], [0.86, 0.86, 1.07, 1]);
  const servicesY = useTransform(scrollYProgress, [0, 0.6, 0.7, 0.8], [64, 64, -12, 0]);
  const servicesRotate = useTransform(scrollYProgress, [0, 0.6, 0.78], [4, 4, 0]);
  const servicesZ = useTransform(scrollYProgress, [0, 0.68, 0.7], [1, 1, 4]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(videoChapters.length - 1, Math.max(0, Math.floor(value * videoChapters.length)));
    setActive(next);
  });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.08 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const chapter = videoChapters[active];

  if (reduced) {
    return (
      <section id="showreel" ref={ref} className="video-stack is-static" data-theme="dark">
        <div className="container">
          <p className="eyebrow">In motion</p>
          <h2 className="section-title">The work, then the system behind it.</h2>
          <div className="video-stack-static-media">
            <div className="video-layer">
              <LayerVideo src={stackVideos.camera} active={inView} />
            </div>
            <div className="video-layer">
              <LayerVideo src={stackVideos.services} active={inView} />
            </div>
          </div>
          <div className="video-stack-static-copy">
            {videoChapters.map((item) => (
              <article key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="showreel" ref={ref} className="video-stack" data-theme="dark">
      <div className="video-stack-pin">
        <div className="video-stack-stage">
          <motion.div
            className="video-layer is-back"
            style={{
              scale: servicesScale,
              y: servicesY,
              rotate: servicesRotate,
              zIndex: servicesZ,
            }}
          >
            <LayerVideo src={stackVideos.services} active={inView} />
            <div className="video-layer-veil" />
          </motion.div>
          <motion.div
            className="video-layer is-front"
            style={{
              scale: cameraScale,
              y: cameraY,
              rotate: cameraRotate,
              opacity: cameraOpacity,
              zIndex: cameraZ,
            }}
          >
            <LayerVideo src={stackVideos.camera} active={inView} />
            <div className="video-layer-veil" />
          </motion.div>
        </div>

        <div className="container video-stack-ui">
          <AnimatePresence mode="wait">
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <ChapterCopy chapter={chapter} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
