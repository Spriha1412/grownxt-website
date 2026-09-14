import { websiteFeatureOrder, websitePlans, websitePricingNote } from "../data/websitePlans";
import { FeatureValue } from "./FeatureValue";
import { goToContact } from "../lib/contact";

export function WebsitePricing() {
  return (
    <section id="pricing-website" className="pricing-block website-pricing">
      <div className="container-wide">
        <p className="eyebrow">Websites</p>
        <h2 className="section-title">Website Development Packages</h2>
        <p className="section-copy">Fast, clear, built to convert. One-time projects with the same standard of finish on every card.</p>

        <div className="plan-grid plan-grid-4">
          {websitePlans.map((plan) => (
            <article key={plan.id} className={`plan-card ${plan.popular ? "is-popular" : ""}`}>
              {plan.popular ? <div className="badge">Most Popular</div> : null}
              <div className="plan-card-top">
                <h3>{plan.name}</h3>
                <p className="plan-tag">{plan.features["Website Type"]}</p>
                <div className="plan-price">
                  <strong>{plan.price}</strong>
                  <span>one-time</span>
                </div>
              </div>
              <ul className="plan-features">
                {websiteFeatureOrder.map((feature) => (
                  <li key={feature}>
                    <span>{feature}</span>
                    <FeatureValue value={plan.features[feature]} />
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary" onClick={() => goToContact(`Website Development — ${plan.name}`)}>
                Get Started →
              </button>
            </article>
          ))}
        </div>

        <div className="note-row">
          <p>{websitePricingNote}</p>
          <strong>Let's Grow Together.</strong>
        </div>
      </div>
    </section>
  );
}
