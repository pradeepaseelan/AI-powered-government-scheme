import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message received — we'll get back to you soon.");
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <span className="eyebrow">Get in touch</span>
      <h1 className="mt-2 text-3xl sm:text-4xl font-semibold text-navy-900">Contact us</h1>
      <p className="mt-3 text-navy-700/70">Questions, feedback, or found an issue? Send us a message.</p>

      <form onSubmit={handleSubmit} className="mt-8 card p-8 space-y-5">
        <div>
          <label className="label-text" htmlFor="name">Name</label>
          <input id="name" name="name" required className="input-field" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label className="label-text" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className="input-field" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label className="label-text" htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={5} required className="input-field" value={form.message} onChange={handleChange} />
        </div>
        <button type="submit" className="btn-primary w-full">Send message</button>
      </form>
    </div>
  );
}
