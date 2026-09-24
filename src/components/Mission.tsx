import { company } from "../data/company";

export function Mission() {
  return (
    <section id="mission" className="mission" data-theme="dark">
      <div className="container">
        <div className="mission-grid">
          <div>
            <p className="eyebrow">Our Mission</p>
            <h2 className="section-title">What we show up to do.</h2>
            <p className="mission-kicker">{company.mission.subheading}</p>
          </div>
          <div className="mission-copy">
            <blockquote>{company.mission.copy}</blockquote>
            <div className="mission-panel">
              <h3>{company.mission.deliverHeading}</h3>
              <p>{company.mission.deliver}</p>
            </div>
          </div>
        </div>
        <div className="mission-pillars">
          {company.mission.pillars.map((pillar) => (
            <article key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
