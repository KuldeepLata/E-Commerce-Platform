import React, { useContext, useEffect, useState } from "react";
import { context } from "../MainContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart() {
  const { cart, RemovefromCart, updateCartQuantity, addtoCart } = useContext(context);
  const [prevCart, setPrevCart] = useState(cart);

  useEffect(() => {
    if (JSON.stringify(cart) !== JSON.stringify(prevCart)) {
      toast.info("🛒 Cart updated!", { position: "top-right", autoClose: 2000 });
      setPrevCart(cart);
    }
  }, [cart]);

  const handleRemove = (id) => {
    RemovefromCart(id);
    toast.error("❌ Item removed from cart!", { position: "top-right", autoClose: 2000 });
  };

  const handleIncrease = (id, quantity) => {
    updateCartQuantity(id, quantity + 1);
  };

  const handleDecrease = (id, quantity) => {
    if (quantity > 1) {
      updateCartQuantity(id, quantity - 1);
    }
  };

  if (!cart || cart.length === 0) {
    return <p className="text-center text-gray-500 text-lg mt-10">🛒 Your cart is empty</p>;
  }

  return (
    <div className="container mx-auto p-6 relative">
      <h2 className="text-3xl font-semibold mb-6 text-center">🛍️ Your Shopping Cart</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {cart.map((d, index) => (
          <div key={index} className="bg-white border rounded-lg shadow-lg p-6 min-h-[400px] flex flex-col justify-between transition-transform hover:scale-105 duration-200">
            <Link to={"/details/" + d.id}>
              <img src={d.thumbnail} alt={d.title} className="w-full h-60 object-cover rounded-md" />
            </Link>
            <div className="mt-4 flex flex-col flex-grow">
              <h3 className="text-lg font-medium text-gray-800 mb-1">
                <Link to={"/details/" + d.id} className="hover:underline">
                  {d.title}
                </Link>
              </h3>
              <p className="text-sm text-gray-500 mb-2">⭐ {d.rating}/5</p>
              <p className="text-xl font-bold text-blue-600">${d.price}</p>

              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => handleDecrease(d.id, d.quantity)}
                  disabled={d.quantity === 1}
                  className={`px-3 py-1 rounded-md ${d.quantity === 1 ? "bg-gray-300" : "bg-black hover:bg-black"} font-bold text-white`}
                >
                  -
                </button>
                <span className="text-lg font-medium">{d.quantity}</span>
                <button
                  onClick={() => handleIncrease(d.id, d.quantity)}
                  className="px-3 py-1 bg-black hover:bg-black font-bold text-white rounded-md"
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="w-full mt-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-transform transform active:scale-95 duration-150"
              onClick={() => handleRemove(d.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
