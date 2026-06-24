import { useState, useEffect, useRef } from 'react';

const INFO_ITEMS = [
  { icon: 'fas fa-map-marker-alt', label: 'Location', value: 'Samakki, ' },
  { icon: 'fas fa-envelope',       label: 'Email',    value: 's6702041610304@email.kmutnb.ac.th'         },
  { icon: 'fas fa-phone',          label: 'Phone',    value: '+66 0993896903'         },
];

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });
  const [success, setSuccess] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll('.fade-up');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 80);
      });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name || !form.email) return alert('Please fill in required fields.');
    setSuccess(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <section id="contact" className="page-section" ref={ref}>
      <div className="section-header fade-up">
        <p className="section-eyebrow">Get In Touch</p>
        <h2 className="section-title">Contact <span className="accent">Me</span></h2>
        <div className="section-divider" />
      </div>

      <div className="contact-grid">
        {/* Info */}
        <div className="fade-up">
          <h3>Let's talk about everything!</h3>
          <p>
            Don't like forms? Send me an{' '}
            <a href="mailto:hello@bolby.com">email</a> directly. 👋
          </p>
          <ul className="contact-items">
            {INFO_ITEMS.map(({ icon, label, value }) => (
              <li className="contact-item" key={label}>
                <div className="contact-item-icon"><i className={icon} /></div>
                <div className="contact-item-text">
                  <strong>{label}</strong>
                  <span>{value}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <div className="contact-form fade-up">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Your Name *</label>
              <input
                name="name" value={form.name} onChange={handleChange}
                className="form-control" placeholder="John Doe"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                name="email" type="email" value={form.email} onChange={handleChange}
                className="form-control" placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Subject</label>
            <input
              name="subject" value={form.subject} onChange={handleChange}
              className="form-control" placeholder="Project Inquiry"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              name="message" value={form.message} onChange={handleChange}
              className="form-control" placeholder="Your message..."
            />
          </div>

          <button className="btn btn-primary btn-full" onClick={handleSubmit}>
            <i className="fas fa-paper-plane" /> Send Message
          </button>

          {success && (
            <div className="alert alert-success">
              <i className="fas fa-check-circle" /> Your message has been sent successfully!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
