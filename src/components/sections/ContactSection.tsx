import React, { useState } from "react";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { ContactForm } from "../../types";

const ContactSection: React.FC = () => {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-brand-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="font-body uppercase tracking-[0.3em] text-brand-yellow text-xs font-semibold mb-4">Get In Touch</p>
            <h2 className="font-display leading-none mb-10">
              <span className="block text-7xl lg:text-8xl text-white">SAY</span>
              <span className="block text-7xl lg:text-8xl text-brand-yellow">HELLO!</span>
            </h2>
            <div className="space-y-6">
              {[
                { Icon: Phone, label: "Phone", value: "312-719-3145", href: "tel:3127193145" },
                { Icon: Mail, label: "Email", value: "info@johnnysdirtysoda.com", href: "mailto:info@johnnysdirtysoda.com" },
                { Icon: MapPin, label: "Location", value: "Chicago, Illinois", href: "#" },
              ].map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-yellow/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-brand-yellow" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-white/40 uppercase tracking-wide">{label}</p>
                    <a href={href} className="font-body text-white font-medium hover:text-brand-yellow transition-colors">{value}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 gap-4">
                <div className="text-6xl">🥤</div>
                <h3 className="font-display text-4xl text-brand-yellow">Thanks!</h3>
                <p className="font-body text-white/70">We'll get back to you faster than you can say "dirty soda".</p>
                <button onClick={() => setSubmitted(false)} className="mt-4 font-body text-sm text-brand-yellow hover:underline">Send another message</button>
              </div>
            ) : (
              <div className="space-y-5">
                <h3 className="font-display text-3xl text-white mb-6">Send a Message</h3>
                {[
                  { name: "name", label: "Name", type: "text", placeholder: "Your name" },
                  { name: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                ].map(({ name, label, type, placeholder }) => (
                  <div key={name}>
                    <label className="font-body text-xs text-white/50 uppercase tracking-wide block mb-2">{label}</label>
                    <input
                      type={type} name={name}
                      value={form[name as keyof ContactForm]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white font-body placeholder-white/30 focus:outline-none focus:border-brand-yellow transition-colors text-sm"
                    />
                  </div>
                ))}
                <div>
                  <label className="font-body text-xs text-white/50 uppercase tracking-wide block mb-2">Message</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} rows={4}
                    placeholder="What's on your mind?"
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white font-body placeholder-white/30 focus:outline-none focus:border-brand-yellow transition-colors resize-none text-sm"
                  />
                </div>
                <button
                  onClick={handleSubmit} disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-brand-yellow text-brand-dark font-body font-bold py-4 rounded-xl hover:bg-brand-pink hover:text-white transition-all duration-200 text-sm uppercase tracking-wider disabled:opacity-60"
                >
                  {loading ? <div className="w-4 h-4 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" /> : <Send size={16} />}
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
