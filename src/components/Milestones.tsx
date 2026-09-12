import { milestones } from "../data/services";

export function Milestones() {
  return (
    <section id="milestones" className="milestones" data-theme="light">
      <div className="container">
        <p className="eyebrow">Progress</p>
        <h2 className="section-title">Our Milestones</h2>
        <div className="milestone-grid">
          {milestones.map((item, index) => (
            <article key={item.id} className="milestone-card" style={{ animationDelay: `${index * 80}ms` }}>
              <span>0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
