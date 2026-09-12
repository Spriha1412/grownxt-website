import { useEffect, useRef, useState } from "react";
import { pricingNav } from "../data/company";
import { scrollToId } from "../lib/utils";
import { DigitalMarketingPricing } from "./DigitalMarketingPricing";
import { WebsitePricing } from "./WebsitePricing";
import { ServicePricing } from "./ServicePricing";
import { VideoPackages } from "./VideoPackages";

export function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string>(pricingNav[0].id);

  useEffect(() => {
    const ids = pricingNav.map((item) => item.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0.2 }
    );
    elements.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);

  return (
    <section id="pricing" ref={ref} className="pricing" data-theme="light">
      <div className="price-nav-wrap">
        <nav className="price-nav" aria-label="Pricing categories">
          {pricingNav.map((item) => (
            <button
              key={item.id}
              className={active === item.id ? "is-active" : ""}
              onClick={() => scrollToId(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <DigitalMarketingPricing />
      <WebsitePricing />
      <ServicePricing />
      <VideoPackages />
    </section>
  );
}
