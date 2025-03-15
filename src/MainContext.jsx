import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const context = createContext();

export default function MainContext(props) {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        axios.get('https://dummyjson.com/products')
            .then((success) => {
                setProducts(success.data.products);
            })
            .catch((err) => {
                console.log("Error fetching data:", err);
            });
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const updateCartQuantity = (id, newQuantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const addtoCart = (id) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                const newItem = products.find((product) => product.id === id);
                return [...prevCart, { ...newItem, quantity: 1 }];
            }
        });
    };

    const RemovefromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    return (
        <context.Provider value={{ products, addtoCart, cart, RemovefromCart, updateCartQuantity }}>
            {props.children}
        </context.Provider>
    );
}

export { context };
