import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  const navLinks = [
    { label: "Home",          href: "#home" },
    { label: "Dirty Sodas",   href: "#sodas" },
    { label: "Exotic Snacks", href: "#snacks" },
    { label: "About Us",      href: "#about" },
    { label: "Contact",       href: "#contact" },
  ];

  const socials = [
    { Icon: Facebook,  href: "#", label: "Facebook"  },
    { Icon: Twitter,   href: "#", label: "Twitter"   },
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Linkedin,  href: "#", label: "LinkedIn"  },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-yellow relative overflow-hidden">

      <div className="pt-8 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8 mb-10">
          <div className="flex flex-col items-center sm:items-center lg:items-start text-center sm:text-center lg:text-left">
            <img
              src="/assets/logo.webp"
              alt="Johnny's Dirty Soda & Snacks"
              className="h-20 w-auto object-contain mb-5"
            />
            <div className="space-y-3 w-full">
              <a
                href="tel:3127193145"
                className="flex items-center justify-center lg:justify-start gap-2.5 group"
              >
                <Phone size={15} className="text-brand-dark flex-shrink-0" />
                <span className="font-display text-xl text-brand-dark group-hover:text-white transition-colors tracking-wide">
                  312-719-3145
                </span>
              </a>
              <a
                href="mailto:info@johnnysdirtysoda.com"
                className="flex items-center justify-center lg:justify-start gap-2.5 group"
              >
                <Mail size={14} className="text-brand-dark/60 flex-shrink-0" />
                <span className="font-body text-sm text-brand-dark group-hover:text-white transition-colors">
                  info@johnnysdirtysoda.com
                </span>
              </a>
              <div className="flex items-center justify-center lg:justify-start gap-2.5">
                <MapPin size={14} className="text-brand-dark/60 flex-shrink-0" />
                <span className="font-body text-sm text-brand-dark/80">Chicago, Illinois</span>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-center text-center">
            <h4 className="font-display text-2xl text-brand-dark tracking-wide mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-body text-brand-dark hover:text-white transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center sm:items-end lg:items-end text-center sm:text-right">
            <h4 className="font-display text-2xl text-brand-dark tracking-wide mb-5">
              Follow Us
            </h4>
            <div className="flex gap-3 mb-4">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-brand-dark text-white flex items-center justify-center hover:bg-white hover:text-brand-dark transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <p className="font-body text-xs text-brand-dark/60 leading-relaxed max-w-[200px]">
              Tag us in your dirty soda photos!<br />
              <span className="font-semibold text-brand-dark/80">@JohnnysDirtySoda</span>
            </p>
          </div>
        </div>
        <div className="sm:hidden flex flex-wrap justify-center gap-x-5 gap-y-2 mb-10">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="font-body text-brand-dark hover:text-white transition-colors text-sm font-medium"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="border-t border-brand-dark/20 pt-6">
          <p className="font-body text-xs text-brand-dark/60 text-center">
            All Rights Reserved. &copy; {new Date().getFullYear()} Johnny's Dirty Soda &amp; Snacks
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
