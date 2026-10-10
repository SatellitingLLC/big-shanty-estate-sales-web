"use client";

import { useState, type FormEvent } from "react";

import styles from "./page.module.css";

const topics = ["Estate sale", "Downsizing", "Liquidation", "Auction", "Appraisal"] as const;

const timings = [
  "As soon as possible",
  "Within the next month",
  "In a few months",
  "Just exploring for now",
] as const;

export function ContactForm() {
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [topic, setTopic] = useState<(typeof topics)[number]>("Estate sale");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending || done) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (name: string) => data.get(name)?.toString().trim() ?? "";
    const name = value("name");
    const email = value("email");
    const phone = value("phone");

    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !phone) {
      setError("Please add your name, a valid email address, and a phone number.");
      document.getElementById(!name ? "contact-name" : !/^\S+@\S+\.\S+$/.test(email) ? "contact-email" : "contact-phone")?.focus();
      return;
    }

    setError("");
    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(data),
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: `Walk-through request: ${topic} - ${name}`,
          from_name: "Big Shanty Estate Sales Website",
          botcheck: data.get("website") ? "1" : "",
        }),
      });
      const result: unknown = await res.json();
      if (!res.ok || typeof result !== "object" || result === null || !("success" in result) || !result.success) {
        throw new Error();
      }
      setDone(true);
    } catch {
      setError("Sorry, that didn't send. Please call us or try again.");
      setSending(false);
    }
  }

  return (
    <div className={done ? `${styles.ticket} ${styles.done}` : styles.ticket}>
      <div className={styles.inner}>
        <div className={styles.tophead}>
          <small>Admit One &middot; Free Consultation</small>
          <h2>Request a Walk-Through</h2>
          <span>No pressure. No obligation.</span>
        </div>
        <form className={styles.ticketForm} onSubmit={handleSubmit}>
          <div className={styles.fld}>
            <div className={styles.lab} id="contact-topic-label">
              I&rsquo;m reaching out about
            </div>
            <div className={styles.chips} role="radiogroup" aria-labelledby="contact-topic-label">
              {topics.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="topic"
                    value={option}
                    checked={topic === option}
                    onChange={() => setTopic(option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div className={styles.f2}>
            <div className={styles.fld}>
              <label htmlFor="contact-name">Your name</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" required />
            </div>
            <div className={styles.fld}>
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required />
            </div>
          </div>
          <div className={styles.f2}>
            <div className={styles.fld}>
              <label htmlFor="contact-phone">Phone</label>
              <input id="contact-phone" name="phone" type="tel" autoComplete="tel" required />
            </div>
            <div className={styles.fld}>
              <label htmlFor="contact-city">Property city</label>
              <input id="contact-city" name="city" type="text" autoComplete="address-level2" />
            </div>
          </div>
          <div className={styles.fld}>
            <label htmlFor="contact-timing">Ideal timing</label>
            <select id="contact-timing" name="timing" defaultValue={timings[0]}>
              {timings.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className={styles.fld}>
            <label htmlFor="contact-message">Tell us about the home</label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              placeholder="Size of the home, types of items, anything we should know."
            />
          </div>
          <p className={styles.formError} role="alert" aria-live="polite">
            {error}
          </p>
          <div className={styles.submit}>
            <small>We read every request and reply by phone or email.</small>
            <button className={styles.button} type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send Request"}
            </button>
          </div>
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className={styles.honeypot} />
        </form>
        <div className={styles.stamp} role="status">
          <div className={styles.stampMark}>Received</div>
          <p>Thanks — your request is in. We will be in touch soon.</p>
        </div>
      </div>
    </div>
  );
}
