import { company, navLinks } from "../data/company";
import { services } from "../data/services";
import { scrollToId } from "../lib/utils";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="footer" data-theme="dark">
      <div className="container footer-grid">
        <div>
          <Logo variant="dark" />
        </div>
        <div>
          <h3>Quick Links</h3>
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <button onClick={() => scrollToId(link.id)}>{link.label}</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Services</h3>
          <ul>
            {services.map((service) => (
              <li key={service.id}>
                <button onClick={() => scrollToId("services")}>{service.name}</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <ul>
            <li>
              <a href={company.contact.phoneHref}>{company.contact.phone}</a>
            </li>
            <li>
              <a href={company.contact.emailHref}>{company.contact.email}</a>
            </li>
            <li>
              <a href={company.contact.websiteHref}>{company.contact.website}</a>
            </li>
            <li>
              {company.contact.addressLines[0]} {company.contact.addressLines[1]}
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer-copy">
        <p>© {new Date().getFullYear()} GrowNXT.co. All rights reserved.</p>
      </div>
    </footer>
  );
}
