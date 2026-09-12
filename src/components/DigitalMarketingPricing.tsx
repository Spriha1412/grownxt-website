import { useState } from "react";
import {
  digitalMarketingFeatureOrder,
  digitalMarketingNotes,
  digitalMarketingPlans,
  durations,
  type DurationKey,
} from "../data/digitalMarketingPlans";
import { FeatureValue } from "./FeatureValue";
import { goToContact } from "../lib/contact";

export function DigitalMarketingPricing() {
  const [duration, setDuration] = useState<DurationKey>("1m");
  const [openId, setOpenId] = useState<string | null>("business");

  return (
    <section id="pricing-digital" className="pricing-block">
      <div className="container">
        <p className="eyebrow">Digital Marketing</p>
        <h2 className="section-title">Pick a pace. Keep the work.</h2>
        <p className="section-copy">
          Choose a duration. The scope stays the same — only the monthly rate changes. Advertising
          budget is never bundled into the agency fee.
        </p>
        <div className="duration-toggle" role="tablist" aria-label="Plan duration">
          {durations.map((item) => (
            <button
              key={item.key}
              role="tab"
              aria-selected={duration === item.key}
              className={duration === item.key ? "is-active" : ""}
              onClick={() => setDuration(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="plan-grid plan-grid-3">
          {digitalMarketingPlans.map((plan) => {
            const price = plan.pricing[duration];
            const open = openId === plan.id;
            return (
              <article key={plan.id} className={`plan-card ${plan.popular ? "is-popular" : ""}`}>
                {plan.popular ? <div className="badge">Most Popular</div> : null}
                <div className="plan-card-top">
                  <h3>{plan.name}</h3>
                  <p className="plan-tag">{plan.tagline}</p>
                  <div className="plan-price">
                    <strong>{price.rate}</strong>
                    <span>/ month</span>
                  </div>
                  <p className="plan-total">
                    <strong>Total amount · {price.total}</strong>
                  </p>
                </div>
                <button
                  className="plan-more"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : plan.id)}
                >
                  {open ? "Hide features" : "View features"}
                </button>
                <ul className={`plan-features ${open ? "is-open" : ""}`}>
                  {digitalMarketingFeatureOrder.map((feature) => (
                    <li key={feature}>
                      <span>{feature}</span>
                      <FeatureValue value={plan.features[feature]} />
                    </li>
                  ))}
                </ul>
                <button className="btn btn-primary" onClick={() => goToContact(`Digital Marketing Plan — ${plan.name}`)}>
                  Get Started →
                </button>
              </article>
            );
          })}
        </div>

        <div className="note-row">
          <p>
            {digitalMarketingNotes[0]} {digitalMarketingNotes[1]}
          </p>
          <strong>Let's Grow Together.</strong>
        </div>
      </div>
    </section>
  );
}
