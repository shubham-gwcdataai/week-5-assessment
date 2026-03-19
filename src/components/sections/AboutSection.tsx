import React, { useEffect, useRef, useState } from "react";
function useCounter(target: number, duration = 1800, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, target, duration]);
  return count;
}
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const StatCard: React.FC<{ value: number; suffix: string; label: string; color: string; trigger: boolean }> =
  ({ value, suffix, label, color, trigger }) => {
    const count = useCounter(value, 1600, trigger);
    return (
      <div className={`rounded-3xl p-5 flex flex-col justify-between ${color}`}>
        <p className="font-display text-4xl sm:text-5xl text-white leading-none">
          {count}{suffix}
        </p>
        <p className="font-body text-white/70 text-sm font-medium mt-2 leading-snug">{label}</p>
      </div>
    );
  };

const AboutSection: React.FC = () => {
  const { ref: sectionRef, inView } = useInView(0.15);
  const flavours = [
    { img: "/assets/drink_2.avif", name: "Coconut Lime Classic",   tag: "Signature",  bg: "#1a1a1a" },
    { img: "/assets/drink_5.avif", name: "Cherry Coconut Cream",   tag: "Bestseller", bg: "#4a1020" },
    { img: "/assets/drink_7.avif", name: "Blue Raspberry Surge",   tag: "Fan Fave",   bg: "#0d2a4a" },
    { img: "/assets/drink_6.avif", name: "Mango Habanero Fizz",    tag: "Spicy Hit",  bg: "#3a1a00" },
    { img: "/assets/drink_8.avif", name: "Lemon Citrus Splash",    tag: "Refreshing", bg: "#2a2a00" },
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % flavours.length), 3200);
    return () => clearInterval(t);
  }, [flavours.length]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#F7F5F0] py-16 sm:py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-10 lg:mb-14">
          <span className="font-body uppercase tracking-[0.3em] text-brand-pink text-xs font-bold">
            Our World
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">
          <div
            className={`
              sm:col-span-2 lg:col-span-5 lg:row-span-2
              bg-brand-dark rounded-[2rem] p-8 sm:p-10
              flex flex-col justify-between
              min-h-[340px] lg:min-h-[560px]
              transition-all duration-700
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
            style={{ transitionDelay: "0ms" }}
          >
          
            <div>
              <img
                src="/assets/logo.webp"
                alt="Johnny's"
                className="h-14 w-auto object-contain mb-8 brightness-[2] saturate-0 opacity-80"
              />
              <h2 className="font-display text-[clamp(2.4rem,4vw,3.8rem)] text-white leading-none mb-5">
                CHICAGO'S<br />
                <span className="text-brand-yellow">MOST WILD</span><br />
                SODA SHOP.
              </h2>
              <p className="font-body text-white/55 text-sm sm:text-base leading-relaxed max-w-md">
                We're a family-owned business born and raised right here in Chicago. We started
                Johnny's because this city deserved somewhere extraordinary — a place where every
                sip is an adventure and every snack is a discovery.
              </p>
            </div>

      
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => { const el = document.querySelector("#sodas"); el?.scrollIntoView({ behavior: "smooth" }); }}
                className="font-body font-bold text-sm bg-brand-yellow text-brand-dark px-6 py-3 rounded-full hover:bg-white transition-colors duration-200"
              >
                Order Now →
              </button>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-5 py-3">
                <span className="text-brand-yellow font-display text-lg">★★★★★</span>
                <span className="font-body text-white/60 text-xs">4.9 / 5.0</span>
              </div>
            </div>
          </div>
          <div
            className={`
              lg:col-span-4 lg:row-span-2
              rounded-[2rem] overflow-hidden relative
              min-h-[380px] sm:min-h-[420px] lg:min-h-[560px]
              transition-all duration-700
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
            style={{
              backgroundColor: flavours[active].bg,
              transitionDelay: "120ms",
            }}
          >
          
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 50% 30%, rgba(245,197,24,0.12) 0%, transparent 70%)",
              }}
            />

            
            <div className="absolute inset-0 flex items-end justify-center pb-6">
              {flavours.map((f, i) => (
                <img
                  key={f.name}
                  src={f.img}
                  alt={f.name}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 object-contain drop-shadow-2xl animate-float"
                  style={{
                    height: "300px",
                    width: "auto",
                    opacity: i === active ? 1 : 0,
                    transform: `translateX(-50%) scale(${i === active ? 1 : 0.92})`,
                    transition: "opacity 0.6s ease, transform 0.6s ease",
                  }}
                  loading="lazy"
                />
              ))}
            </div>

           
            <div className="absolute top-5 right-5">
              <span className="font-body font-bold text-xs bg-brand-yellow text-brand-dark px-3 py-1.5 rounded-full">
                {flavours[active].tag}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-16 pb-5 px-6">
              <p className="font-display text-white text-xl leading-tight mb-3">
                {flavours[active].name}
              </p>
              <div className="flex gap-2">
                {flavours.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active ? "bg-brand-yellow w-6" : "bg-white/30 w-1.5"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          
          <div
            className={`
              lg:col-span-3
              bg-brand-purple rounded-[2rem] p-7
              flex flex-col justify-between
              min-h-[200px] lg:min-h-[0px]
              transition-all duration-700
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
            style={{ transitionDelay: "240ms" }}
          >
            <div>
              <p className="font-body text-white/50 text-xs uppercase tracking-widest mb-3 font-semibold">
                What is it?
              </p>
              <h3 className="font-display text-white text-3xl sm:text-4xl leading-none mb-4">
                DIRTY<br />SODA<br />EXPLAINED
              </h3>
              <p className="font-body text-white/65 text-sm leading-relaxed">
                Take a Coke or Pepsi base, mix in coconut, vanilla, cherry or any wild flavor,
                drizzle sweet cream — and you've got yourself a dirty soda. Pure magic.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
              <span className="font-body text-white/50 text-xs">50+ combinations available</span>
            </div>
          </div>

      
          <div
            className={`
              lg:col-span-3
              grid grid-cols-2 gap-3
              transition-all duration-700
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
            style={{ transitionDelay: "300ms" }}
          >
            <StatCard value={50}  suffix="+"  label="Soda flavors"      color="bg-brand-pink"   trigger={inView} />
            <StatCard value={100} suffix="+"  label="Exotic snacks"     color="bg-brand-dark"   trigger={inView} />
            <StatCard value={15}  suffix="+"  label="Countries sourced" color="bg-brand-dark"   trigger={inView} />
            <StatCard value={3}   suffix=" yrs" label="Serving Chicago" color="bg-brand-yellow" trigger={inView} />
          </div>

        
          <div
            className={`
              sm:col-span-2 lg:col-span-12
              bg-white rounded-[2rem] p-6 sm:p-8
              transition-all duration-700
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">

              {/* Left label */}
              <div className="flex-shrink-0">
                <p className="font-body text-xs uppercase tracking-widest text-gray-400 font-semibold mb-1">Our Picks</p>
                <h3 className="font-display text-brand-dark text-3xl sm:text-4xl leading-none">
                  TRY A<br />FLAVOUR
                </h3>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px self-stretch bg-gray-100" />

              {/* Drinks strip */}
              <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-1 flex-1 scrollbar-none">
                {[
                  { img: "/assets/drink_1.avif", label: "Classic OG",      bg: "#F3F3F3" },
                  { img: "/assets/drink_5.avif", label: "Cherry Coconut",  bg: "#FEF0F4" },
                  { img: "/assets/drink_6.avif", label: "Mango Habanero",  bg: "#FFF6E8" },
                  { img: "/assets/drink_7.avif", label: "Blue Raspberry",  bg: "#EEF4FF" },
                  { img: "/assets/drink_8.avif", label: "Lemon Citrus",    bg: "#FEFBE8" },
                ].map(({ img, label, bg }) => (
                  <div
                    key={label}
                    className="flex-shrink-0 flex flex-col items-center group cursor-pointer"
                    onClick={() => { const el = document.querySelector("#sodas"); el?.scrollIntoView({ behavior: "smooth" }); }}
                  >
                    <div
                      className="w-16 h-20 sm:w-20 sm:h-24 rounded-2xl flex items-end justify-center overflow-hidden mb-2 group-hover:scale-105 transition-transform duration-300"
                      style={{ backgroundColor: bg }}
                    >
                      <img
                        src={img}
                        alt={label}
                        className="h-[72px] sm:h-[88px] w-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                    <p className="font-body text-[11px] text-gray-500 font-medium text-center leading-tight max-w-[64px] sm:max-w-[80px]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Right CTA */}
              <button
                onClick={() => { const el = document.querySelector("#sodas"); el?.scrollIntoView({ behavior: "smooth" }); }}
                className="flex-shrink-0 hidden lg:flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-brand-yellow hover:bg-brand-pink transition-colors duration-200 group"
              >
                <span className="font-display text-brand-dark group-hover:text-white text-3xl leading-none">→</span>
                <span className="font-body text-brand-dark group-hover:text-white text-[10px] font-bold uppercase tracking-wide mt-1">
                  Order
                </span>
              </button>
            </div>
          </div>

    
          <div
            className={`
              sm:col-span-2 lg:col-span-6
              bg-brand-yellow rounded-[2rem] p-7 sm:p-9
              flex flex-col sm:flex-row items-start sm:items-center gap-6
              transition-all duration-700
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
            style={{ transitionDelay: "500ms" }}
          >
            {/* Big orange */}
            <div className="flex-shrink-0 animate-float" style={{ animationDelay: "0.5s" }}>
              <img
                src="/assets/drink_4.avif"
                alt="Fresh fruit"
                className="h-24 sm:h-28 w-auto object-contain drop-shadow-xl"
                loading="lazy"
              />
            </div>

            {/* Text */}
            <div>
              <p className="font-body text-brand-dark/60 text-xs uppercase tracking-widest font-semibold mb-2">
                Globally Sourced
              </p>
              <h3 className="font-display text-brand-dark text-3xl sm:text-4xl leading-none mb-3">
                REAL INGREDIENTS<br />FROM EVERYWHERE
              </h3>
              <p className="font-body text-brand-dark/70 text-sm leading-relaxed max-w-sm">
                We hunt down the world's most exciting flavors — from Japanese matcha to Dubai
                pistachio chocolate — and bring them straight to Chicago.
              </p>

              {/* Country flags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {["🇺🇸 USA", "🇯🇵 Japan", "🇦🇪 Dubai", "🇰🇷 Korea", "🇨🇦 Canada"].map(f => (
                  <span
                    key={f}
                    className="font-body text-xs bg-brand-dark/10 text-brand-dark font-semibold px-3 py-1 rounded-full"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div
            className={`
              sm:col-span-2 lg:col-span-6
              border-2 border-gray-200 rounded-[2rem] p-7 sm:p-9
              flex flex-col justify-between
              transition-all duration-700
              ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
            style={{ transitionDelay: "600ms" }}
          >
            {/* Quote mark */}
            <div
              className="font-display text-[100px] text-brand-yellow leading-none select-none"
              style={{ lineHeight: "0.7", marginBottom: "16px" }}
            >
              "
            </div>
            <blockquote className="font-display text-brand-dark text-2xl sm:text-3xl leading-snug mb-6">
              We didn't open a soda shop. We opened a place where every visit feels like a trip
              around the world.
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-yellow flex items-center justify-center flex-shrink-0">
                <span className="font-display text-brand-dark text-lg">J</span>
              </div>
              <div>
                <p className="font-body font-bold text-brand-dark text-sm">Johnny & Family</p>
                <p className="font-body text-gray-400 text-xs">Founders · Chicago, IL</p>
              </div>
              <div className="ml-auto">
                <img
                  src="/assets/logo.webp"
                  alt="Johnny's"
                  className="h-10 w-auto object-contain opacity-30"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
