import React from "react";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  selectCartItems, selectCartIsOpen, selectCartTotal,
  closeCart, removeItem, updateQuantity, clearCart,
} from "../../store/slices/cartSlice";

const CartSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const isOpen = useAppSelector(selectCartIsOpen);
  const total = useAppSelector(selectCartTotal);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => dispatch(closeCart())}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="bg-brand-yellow px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={22} />
            <h2 className="font-display text-2xl text-brand-dark tracking-wide">Your Order</h2>
          </div>
          <button onClick={() => dispatch(closeCart())} className="p-2 rounded-full hover:bg-brand-dark/10 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
              <div className="text-6xl">🥤</div>
              <p className="font-display text-3xl text-gray-200">Cart is empty</p>
              <p className="font-body text-sm text-gray-400">Add some dirty sodas or exotic snacks!</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 bg-gray-50 rounded-2xl p-3">
                <div className="w-16 h-16 rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center" style={{ backgroundColor: item.product.bgColor }}>
                  <img src={item.product.imageUrl} alt={item.product.name} className="h-14 w-auto object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-bold text-sm text-brand-dark truncate">{item.product.name}</p>
                  <p className="font-body text-brand-pink font-bold text-sm">${item.product.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.product.id, quantity: item.quantity - 1 }))}
                      className="w-6 h-6 rounded-full bg-brand-yellow flex items-center justify-center hover:bg-brand-pink hover:text-white transition-colors"
                    ><Minus size={10} /></button>
                    <span className="font-body font-bold text-sm w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.product.id, quantity: item.quantity + 1 }))}
                      className="w-6 h-6 rounded-full bg-brand-yellow flex items-center justify-center hover:bg-brand-pink hover:text-white transition-colors"
                    ><Plus size={10} /></button>
                  </div>
                </div>
                <button onClick={() => dispatch(removeItem(item.product.id))} className="text-gray-300 hover:text-red-500 transition-colors self-start mt-1">
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-body font-semibold text-gray-500">Total</span>
              <span className="font-display text-3xl text-brand-dark">${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-brand-dark text-white font-body font-bold py-4 rounded-full hover:bg-brand-purple transition-colors duration-200 text-sm uppercase tracking-wider">
              Proceed to Checkout
            </button>
            <button onClick={() => dispatch(clearCart())} className="w-full text-center font-body text-xs text-gray-400 hover:text-red-400 transition-colors">
              Clear all items
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
