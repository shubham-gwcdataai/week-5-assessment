import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "../../types";
import { productApi } from "../../api/productApi";
import ProductCard from "../ui/ProductCard";

const ProductCarousel: React.FC<{ products: Product[] }> = ({ products }) => {
  const [current, setCurrent] = useState(0);
  const perPage = 3;
  const total = products.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const visible = Array.from({ length: Math.min(perPage, total) }, (_, i) => products[(current + i) % total]);

  if (total === 0) return null;

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((product, idx) => (
          <div key={product.id + idx} className="transition-all duration-500">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      {total > perPage && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button onClick={prev} className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors backdrop-blur-sm">
            <ChevronLeft size={20} className="text-white" />
          </button>
          <div className="flex gap-2">
            {products.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === current ? "bg-white w-6" : "bg-white/40 w-2"}`}
              />
            ))}
          </div>
          <button onClick={next} className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors backdrop-blur-sm">
            <ChevronRight size={20} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

const SnackCarousel: React.FC<{ products: Product[] }> = ({ products }) => {
  const [current, setCurrent] = useState(0);
  const perPage = 3;
  const total = products.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const visible = Array.from({ length: Math.min(perPage, total) }, (_, i) => products[(current + i) % total]);

  if (total === 0) return null;

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((product, idx) => (
          <div key={product.id + idx} className="transition-all duration-500">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      {total > perPage && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button onClick={prev} className="w-12 h-12 rounded-full bg-brand-dark/20 hover:bg-brand-dark/40 flex items-center justify-center transition-colors">
            <ChevronLeft size={20} className="text-brand-dark" />
          </button>
          <div className="flex gap-2">
            {products.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === current ? "bg-brand-dark w-6" : "bg-brand-dark/30 w-2"}`}
              />
            ))}
          </div>
          <button onClick={next} className="w-12 h-12 rounded-full bg-brand-dark/20 hover:bg-brand-dark/40 flex items-center justify-center transition-colors">
            <ChevronRight size={20} className="text-brand-dark" />
          </button>
        </div>
      )}
    </div>
  );
};

const ProductsSection: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productApi.getAll().then((res) => {
      if (res.success) setAllProducts(res.data);
      setLoading(false);
    });
  }, []);

  const sodas = allProducts.filter((p) => p.category === "soda");
  const snacks = allProducts.filter((p) => p.category === "snack");

  const Skeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => <div key={i} className="bg-white/10 rounded-3xl h-80 animate-pulse" />)}
    </div>
  );

  return (
    <>

      <section id="sodas" className="py-24 bg-brand-purple overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14">
            <div>
              <p className="font-body uppercase tracking-[0.3em] text-brand-yellow text-xs font-semibold mb-3">Our Signature</p>
              <h2 className="font-display leading-none">
                <span className="block text-6xl lg:text-8xl text-white">Dirty Sodas.</span>
                <span className="block text-6xl lg:text-8xl text-brand-yellow">Clean Hits.</span>
              </h2>
            </div>
            <p className="font-body text-white/60 max-w-sm mt-4 lg:mt-0 text-sm leading-relaxed">
              Whether you're in the mood for something fruity, fizzy, or fabulously refreshing, our
              collection of beverages has something for every taste.
            </p>
          </div>
          {loading ? <Skeleton /> : <ProductCarousel products={sodas} />}
        </div>
      </section>


      <section id="snacks" className="py-24 bg-brand-yellow overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14">
            <div>
              <p className="font-body uppercase tracking-[0.3em] text-brand-dark/50 text-xs font-semibold mb-3">From Around The World</p>
              <h2 className="font-display leading-none">
                <span className="block text-6xl lg:text-8xl text-white drop-shadow-sm">Snacks You've</span>
                <span className="block text-6xl lg:text-8xl text-brand-dark">Never Seen</span>
              </h2>
            </div>
            <p className="font-body text-brand-dark/60 max-w-sm mt-4 lg:mt-0 text-sm leading-relaxed">
              Why settle for boring? At Johnny's, every snack is a new flavor trip. Sweet, salty, sour,
              spicy — we've got it all.
            </p>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => <div key={i} className="bg-white/30 rounded-3xl h-80 animate-pulse" />)}
            </div>
          ) : (
            <SnackCarousel products={snacks} />
          )}
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-3 bg-white text-brand-dark font-body font-bold px-8 py-4 rounded-full text-sm hover:bg-brand-dark hover:text-white transition-all duration-200 shadow-lg uppercase tracking-wide">
              Order Now →
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsSection;
