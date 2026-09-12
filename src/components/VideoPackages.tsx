import { videoFooterLine, videoLongForm, videoNotes, videoPackages } from "../data/videoPackages";
import { goToContact } from "../lib/contact";

export function VideoPackages() {
  return (
    <section id="pricing-video" className="pricing-block video-pricing">
      <div className="container">
        <div className="video-head">
          <div>
            <p className="eyebrow">Production</p>
            <h2 className="section-title">
              VIDEO CONTENT
              <span> Packages.</span>
            </h2>
            <p className="section-copy">Short films on a monthly rhythm — planned, cut, and ready for the feed.</p>
          </div>
          <ul className="video-steps" aria-hidden="true">
            <li>IDEAS</li>
            <li>SHOOT</li>
            <li>EDIT</li>
            <li>GROW</li>
          </ul>
        </div>

        <div className="plan-grid plan-grid-3">
          {videoPackages.map((pack) => (
            <article key={pack.id} className={`plan-card ${pack.popular ? "is-popular" : ""}`}>
              {pack.popular ? <div className="badge">Most Popular</div> : null}
              <div className="plan-card-top">
                <h3>{pack.name}</h3>
                <p className="plan-tag">{pack.tagline}</p>
                <div className="video-volume">
                  <strong>{pack.volume}</strong>
                  <span>{pack.volumeLabel}</span>
                </div>
              </div>
              <ul className="video-includes">
                {pack.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <button className="btn btn-primary" onClick={() => goToContact(`Video Content — ${pack.name}`)}>
                Get Started →
              </button>
            </article>
          ))}
        </div>

        <div className="video-extras">
          <article className="video-longform">
            <h3>{videoLongForm.title}</h3>
            <strong>{videoLongForm.price}</strong>
            <p>{videoLongForm.note}</p>
          </article>
          <article>
            <h3>Important Notes</h3>
            <ul>
              {videoNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </article>
        </div>
        <div className="note-row">
          <p>{videoFooterLine}</p>
          <strong>Let's Grow Together.</strong>
        </div>
      </div>
    </section>
  );
}
