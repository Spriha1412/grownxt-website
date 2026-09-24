import { useEffect, useState, type FormEvent } from "react";
import { company } from "../data/company";
import { consumePrefillService } from "../lib/contact";
import { contactServices, scrollToId } from "../lib/utils";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
};

const empty: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
};

function validate(values: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (!/^[+\d][\d\s-]{7,}$/.test(values.phone.trim())) errors.phone = "Enter a valid phone number.";
  if (!values.service) errors.service = "Select a service.";
  if (values.message.trim().length < 10) errors.message = "Please share a short message.";
  return errors;
}

export function Contact() {
  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const apply = (service?: string | null) => {
      if (!service) return;
      setValues((current) => ({ ...current, service }));
    };
    apply(consumePrefillService());
    const onPrefill = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      apply(detail);
    };
    window.addEventListener("grownxt-prefill", onPrefill);
    return () => window.removeEventListener("grownxt-prefill", onPrefill);
  }, []);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("error");
      return;
    }

    setSubmitting(true);
    try {
      const subject = encodeURIComponent(`GrowNXT enquiry: ${values.service}`);
      const body = encodeURIComponent(
        `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\nCompany: ${values.company || "Not provided"}\nService: ${values.service}\n\n${values.message}`
      );
      window.location.href = `${company.contact.emailHref}?subject=${subject}&body=${body}`;
      setStatus("success");
      setValues(empty);
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact" data-theme="dark">
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="section-title">{company.contact.heading}</h2>
          <p className="contact-line">{company.contact.line}</p>
          <p className="contact-ready">{company.contact.ready}</p>
          <p>{company.contact.support}</p>
          <p>{company.contact.start}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={company.contact.emailHref}>
              Get In Touch
            </a>
            <button className="btn btn-secondary" onClick={() => scrollToId("services")}>
              View Our Work
            </button>
          </div>
          <ul className="contact-meta">
            <li>
              <span>Phone</span>
              <a href={company.contact.phoneHref}>{company.contact.phone}</a>
            </li>
            <li>
              <span>Address</span>
              <address>
                {company.contact.addressLines[0]}
                <br />
                {company.contact.addressLines[1]}
              </address>
            </li>
            <li>
              <span>Website</span>
              <a href={company.contact.websiteHref} target="_blank" rel="noreferrer">
                {company.contact.website}
              </a>
            </li>
            <li>
              <span>Email</span>
              <a href={company.contact.emailHref}>{company.contact.email}</a>
            </li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <label>
            Name
            <input
              name="name"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              autoComplete="name"
            />
            {errors.name && <small>{errors.name}</small>}
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              autoComplete="email"
            />
            {errors.email && <small>{errors.email}</small>}
          </label>
          <label>
            Phone
            <input
              name="phone"
              value={values.phone}
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
              autoComplete="tel"
            />
            {errors.phone && <small>{errors.phone}</small>}
          </label>
          <label>
            Company
            <input
              name="company"
              value={values.company}
              onChange={(e) => setValues({ ...values, company: e.target.value })}
              autoComplete="organization"
            />
          </label>
          <label>
            Service interested in
            <select
              name="service"
              value={values.service}
              onChange={(e) => setValues({ ...values, service: e.target.value })}
            >
              <option value="">Select a service</option>
              {contactServices.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {errors.service && <small>{errors.service}</small>}
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows={5}
              value={values.message}
              onChange={(e) => setValues({ ...values, message: e.target.value })}
            />
            {errors.message && <small>{errors.message}</small>}
          </label>
          <button id="contact-submit" className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Sending..." : "Get In Touch"}
          </button>
          {status === "success" && (
            <p className="form-success" role="status">
              Thank you. Your enquiry is ready to send. We will be in touch shortly.
            </p>
          )}
          {status === "error" && (
            <p className="form-error" role="alert">
              Please correct the highlighted fields and try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
