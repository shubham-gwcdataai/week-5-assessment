import React from "react";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "../../types";
import { useAppDispatch } from "../../hooks/redux";
import { addItem, openCart } from "../../store/slices/cartSlice";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(product));
    dispatch(openCart());
  };

  return (
    <div
      className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 flex flex-col border border-gray-100"
    >
      {/* Image area */}
      <div
        className="relative h-56 flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: product.bgColor }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-52 w-auto object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-lg"
        />
        {/* Origin badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm">
          <span className="font-body text-xs font-bold text-gray-600">{product.origin}</span>
        </div>
        {/* Featured badge */}
        {product.featured && (
          <div className="absolute top-3 left-3 bg-brand-pink text-white rounded-full px-3 py-1">
            <span className="font-body text-xs font-bold">⭐ Featured</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-body font-bold text-brand-dark text-sm leading-snug mb-1 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          <Star size={12} fill="#F5C518" className="text-brand-yellow" />
          <span className="font-body text-xs text-gray-400 font-medium">{product.rating}</span>
        </div>

        <p className="font-body text-xs text-gray-400 mb-3 line-clamp-2 flex-1 leading-relaxed">
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="bg-brand-yellow/15 text-brand-dark font-body text-[10px] font-semibold px-2 py-1 rounded-full capitalize"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto">
          <span className="font-display text-3xl text-brand-dark">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-brand-dark text-white font-body text-xs font-bold px-4 py-2.5 rounded-full hover:bg-brand-pink transition-colors duration-200 group-hover:scale-105"
          >
            <ShoppingCart size={13} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
