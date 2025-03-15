import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { context } from "../MainContext";

export default function Header() {
    const { cart } = useContext(context);

    return (
        <div className="w-full p-3 md:p-4 shadow-lg text-[20px] md:text-[24px] font-bold bg-blue-500 text-white flex flex-wrap justify-between items-center">
            <span className="flex items-center gap-2">
                🛒 <span>Shopping Cart</span>
            </span>

            <div className="flex gap-4 md:gap-6">
                <Link to="/" className="hover:underline text-sm md:text-base">Store</Link>
                <Link to="/cart" className="hover:underline text-sm md:text-base">
                    Cart: {cart.length}
                </Link>
            </div>
        </div>
    );
}
