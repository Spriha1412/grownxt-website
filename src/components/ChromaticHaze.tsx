import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export function ChromaticHaze() {
  const washRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const wash = washRef.current;
    const field = fieldRef.current;
    if (!wash || !field || reduced) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const n = y * 0.00105;
        const driftX = Math.sin(n) * 2.6;
        const driftY = Math.cos(n * 0.68) * 1.8;
        wash.style.transform = `translate3d(${driftX}%, ${y * -0.028 + driftY * 10}px, 0) rotate(${driftX * 0.35}deg)`;
        field.style.transform = `translate3d(${-driftX * 0.55}%, ${y * -0.055 - driftY * 8}px, 0)`;
        frame = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <div className="haze" aria-hidden="true">
      <div className="haze-base" />
      <div ref={washRef} className="haze-wash" />
      <div ref={fieldRef} className="haze-field">
        <span className="haze-bloom haze-bloom-a" />
        <span className="haze-bloom haze-bloom-b" />
        <span className="haze-bloom haze-bloom-c" />
        <span className="haze-bloom haze-bloom-d" />
      </div>
      <div className="haze-veil" />
    </div>
  );
}
