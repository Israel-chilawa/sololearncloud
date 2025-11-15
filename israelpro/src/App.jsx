import React, { useState } from "react";

/**
 * SimpleContactForm
 * - Controlled inputs: React state holds field values
 * - Basic validation: checks required fields and simple email format
 * - "Submit" logs data to console (replace with API call if needed)
 */
export default function App() {
  // 1) form state: hold values for each input
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // 2) errors state: hold validation messages per field
  const [errors, setErrors] = useState({});

  // 3) loading / submitted states (optional UX)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // handleChange: called on every keystroke in inputs
  function handleChange(e) {
    const { name, value } = e.target;
    // update only the changed field while keeping others
    setFormData(prev => ({ ...prev, [name]: value }));

    // clear error for this field as user types
    setErrors(prev => ({ ...prev, [name]: "" }));
  }

  // validate: basic rules, returns an object with error messages
  function validate(data) {
    const errs = {};
    if (!data.name.trim()) errs.name = "Name is required.";
    if (!data.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = "Enter a valid email.";
    }
    if (!data.message.trim()) errs.message = "Message is required.";
    return errs;
  }

  // handleSubmit: called when the form is submitted
  async function handleSubmit(e) {
    e.preventDefault();            // stop page reload
    setSubmitted(false);

    const validation = validate(formData);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return; // stop if validation fails
    }

    setIsSubmitting(true);

    try {
      // Simulate sending data to server (replace with real fetch)
      await new Promise(res => setTimeout(res, 800));

      console.log("Form submitted:", formData); // <-- replace with API call
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" }); // clear form
    } catch (err) {
      console.error("Submit error", err);
      // setErrors({ submit: "Failed to send. Try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <p>built by israel chilawa. v1 on 15th NOV</p>
      <h1>Contact Us </h1>

      {submitted && <div style={{ color: "green", marginBottom: 12 }}>Thanks — your message was sent!</div>}

      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <label style={{ display: "block", marginBottom: 6 }}>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
          />
          {errors.name && <div style={{ color: "crimson", marginTop: 6 }}>{errors.name}</div>}
        </label>

        {/* Email */}
        <label style={{ display: "block", marginTop: 12 }}>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
          />
          {errors.email && <div style={{ color: "crimson", marginTop: 6 }}>{errors.email}</div>}
        </label>

        {/* Message */}
        <label style={{ display: "block", marginTop: 12 }}>
          Message
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message..."
            rows={5}
            style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
          />
          {errors.message && <div style={{ color: "crimson", marginTop: 6 }}>{errors.message}</div>}
        </label>

        {/* Submit */}
        <div style={{ marginTop: 16 }}>
          <button type="submit" disabled={isSubmitting} style={{ padding: "8px 16px" }}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>

        {/* General submit error (optional) */}
        {errors.submit && <div style={{ color: "crimson", marginTop: 12 }}>{errors.submit}</div>}
      </form>
    </div>
  );
}
