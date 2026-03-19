import React from "react";
import { Globe } from "lucide-react";

const MARQUEE_ITEMS = [
  "Dirty Soda", "Exotic Snacks", "Fresh Juices", "Chicago Born",
  "World Flavors", "Family Owned", "Order Now", "Try Something New",
];

const GrowingSection: React.FC = () => {
  const duplicated = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Real Earth image */}
          <div className="relative flex items-center justify-center h-80 lg:h-96">
            <div className="relative w-640 h-640 lg:w-800 lg:h-200">
              <img
                src="/assets/earth.avif"
                alt="Earth - flavors from around the world"
                className="w-full h-full object-contain drop-shadow-2xl animate-spin-slow"
              />
            </div>

            {/* Country badges */}
            {[
              { flag: "🇺🇸", label: "USA", style: { top: "5%", left: "0%" } },
              { flag: "🇯🇵", label: "Japan", style: { top: "20%", right: "0%" } },
              { flag: "🇦🇪", label: "Dubai", style: { bottom: "25%", right: "0%" } },
              { flag: "🇰🇷", label: "Korea", style: { bottom: "5%", left: "5%" } },
              { flag: "🇨🇦", label: "Canada", style: { top: "50%", left: "-5%" } },
            ].map(({ flag, label, style }) => (
              <div
                key={label}
                className="absolute bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2 z-10"
                style={style}
              >
                <span className="text-xl">{flag}</span>
                <span className="font-body text-xs font-bold text-brand-dark">{label}</span>
              </div>
            ))}
          </div>

          {/* Text */}
          <div>
            <p className="font-body uppercase tracking-[0.3em] text-brand-green text-xs font-semibold mb-4">
              Growing Something
            </p>
            <h2 className="font-display leading-none mb-6">
              <span className="block text-6xl lg:text-8xl text-brand-dark">FLAVORS</span>
              <span className="block text-6xl lg:text-8xl text-brand-yellow">FROM</span>
              <span className="block text-6xl lg:text-8xl text-brand-dark">EVERY</span>
              <span className="block text-6xl lg:text-8xl text-brand-pink">CORNER</span>
            </h2>
            <p className="font-body text-gray-600 leading-relaxed mb-6 max-w-md">
              We scour the globe so you don't have to. Our buying team is constantly discovering
              the world's most exciting snacks and drinks — bringing them straight to Chicago.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-green/20 rounded-full flex items-center justify-center">
                <Globe size={18} className="text-brand-dark" />
              </div>
              <span className="font-body text-sm font-semibold text-brand-dark">
                Products from 15+ countries and counting
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-brand-dark py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {duplicated.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 mx-4">
              <span className="font-display text-2xl text-white tracking-wider">{item}</span>
              <span className="text-brand-yellow text-xl">★</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrowingSection;
