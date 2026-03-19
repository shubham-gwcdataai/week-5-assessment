import React from "react";

const HeroSection: React.FC = () => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen bg-pink-50 overflow-hidden flex items-center"
    >
      <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden select-none">
        <div className="font-display text-[22vw] leading-none text-brand-yellow/25 whitespace-nowrap animate-marquee">
          DIRTY&nbsp;SODA&nbsp;·&nbsp;DIRTY&nbsp;SODA&nbsp;·&nbsp;DIRTY&nbsp;SODA&nbsp;·&nbsp;DIRTY&nbsp;SODA&nbsp;·&nbsp;
        </div>
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-yellow/20 blur-3xl -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-brand-pink/15 blur-3xl translate-y-1/3 -translate-x-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-28 pb-16 lg:py-0 min-h-screen">
        {/* Left */}
        <div className="animate-fade-up z-10 mt-14">
          <span className="inline-block bg-brand-pink/10 text-brand-pink font-body text-xs font-bold uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6">
            Chicago's #1 Exotic Soda Shop
          </span>

          <h1 className="font-display leading-none mb-6">
            <span className="block text-[clamp(4rem,10vw,8rem)] text-brand-dark">DIRTY</span>
            <span className="block text-[clamp(4rem,10vw,8rem)] text-brand-purple">SODA</span>
            <span className="block text-[clamp(3rem,7vw,6rem)] text-brand-dark">&amp; SNACKS</span>
          </h1>

          <p className="font-body text-gray-500 text-lg max-w-md mb-8 leading-relaxed">
            Johnny's — it's a mouthful, but that's kind of what we're all about. Your one-stop
            shop for drinks and snacks from all over the world.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={() => scrollTo("#sodas")}
              className="bg-brand-dark text-white font-body font-bold px-8 py-4 rounded-full text-sm hover:bg-brand-pink transition-all duration-200 hover:scale-105 shadow-lg uppercase tracking-wide"
            >
              Order Now →
            </button>
            <button
              onClick={() => scrollTo("#about")}
              className="border-2 border-brand-dark text-brand-dark font-body font-bold px-8 py-4 rounded-full text-sm hover:bg-brand-dark hover:text-white transition-all duration-200 uppercase tracking-wide"
            >
              Our Story
            </button>
          </div>

          <div className="flex gap-10">
            {[
              { value: "50+", label: "Soda Flavors" },
              { value: "100+", label: "Exotic Snacks" },
              { value: "4.9★", label: "Avg Rating" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-4xl text-brand-dark">{value}</p>
                <p className="font-body text-xs text-gray-400 mt-1 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>


        <div className="relative flex justify-center items-center h-[500px] lg:h-screen max-h-[700px]">

          <div className="absolute w-[380px] h-[380px] lg:w-[480px] lg:h-[480px] rounded-full bg-brand-yellow/30 animate-spin-slow" />

          <div className="relative z-20 animate-float">
            <img
              src="/assets/drink_2.avif"
              alt="Johnny's Signature Dirty Soda"
              className="h-[360px] lg:h-[460px] w-auto object-contain drop-shadow-2xl"
            />
          </div>
          <div
            className="absolute top-8 left-4 lg:left-0 z-10 animate-float"
            style={{ animationDelay: "1.5s" }}
          >
            <img
              src="/assets/drink_7.avif"
              alt="Blue Soda"
              className="h-36 w-auto object-contain drop-shadow-xl"
            />
          </div>
          <div
            className="absolute bottom-8 right-4 lg:right-0 z-10 animate-float"
            style={{ animationDelay: "0.8s" }}
          >
            <img
              src="/assets/drink_5.avif"
              alt="Cherry Soda"
              className="h-36 w-auto object-contain drop-shadow-xl"
            />
          </div>

          {/* Info badges */}
          <div
            className="absolute top-16 right-4 bg-white rounded-2xl shadow-xl px-4 py-3 z-30 animate-float"
            style={{ animationDelay: "1s" }}
          >
            <p className="font-body text-xs text-gray-400">Today's Special</p>
            <p className="font-display text-lg text-brand-pink">Cherry Coconut</p>
          </div>

          <div
            className="absolute bottom-16 left-4 bg-brand-dark rounded-2xl shadow-xl px-4 py-3 z-30 animate-float"
            style={{ animationDelay: "2s" }}
          >
            <p className="font-body text-xs text-brand-yellow">New Arrival</p>
            <p className="font-display text-base text-white">Dubai Chocolate</p>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-body text-[10px] text-gray-400 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-300 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
