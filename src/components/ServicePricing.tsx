import { servicePricing, servicePricingCta, servicePricingNote } from "../data/servicePricing";
import { goToContact } from "../lib/contact";

export function ServicePricing() {
  return (
    <section id="pricing-services" className="pricing-block service-dir">
      <div className="container">
        <p className="eyebrow">Directory</p>
        <h2 className="section-title">Our Services & Pricing</h2>
        <p className="section-copy">
          Need one piece, not a full retainership? Choose a service, request a quote, and we will
          scope it to the work — not a padded bundle.
        </p>
        <div className="dir-grid">
          {servicePricing.map((category) => (
            <article key={category.id} className="dir-card">
              <header>
                <h3>{category.name}</h3>
                <p>{category.subtitle}</p>
              </header>
              <ul>
                {category.items.map((item) => (
                  <li key={item.name}>
                    <button onClick={() => goToContact(item.name)}>
                      <span>{item.name}</span>
                      <strong>{item.price}</strong>
                    </button>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="note-row">
          <p>
            {servicePricingNote} {servicePricingCta}
          </p>
          <button className="btn btn-secondary" onClick={() => goToContact("Custom / Individual Service")}>
            Request a customized quote
          </button>
        </div>
      </div>
    </section>
  );
}
