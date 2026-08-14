import { createContext, useContext, useState } from 'react';

// 1. Create the context
const CartContext = createContext();

// 2. Create the provider component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

  // Add item to cart (or increase quantity if it already exists)
    const addToCart = (item) => {
    setCartItems((prevItems) => {
        const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
        return prevItems.map((cartItem) =>
            cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
    }
        return [...prevItems, { ...item, quantity: 1 }];
    });
    };

  // Remove item completely from cart
    const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

  // Increase quantity of a specific item
    const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
        prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
    );
    };

  // Decrease quantity of a specific item (or remove if quantity drops to 1)
    const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
        prevItems
        .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
    };

  // Clear cart entirely (useful after checkout)
    const clearCart = () => {
    setCartItems([]);
    };

  // Calculate total price of all items in the cart
    const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
    );

  // Calculate total number of items for badge counts
    const totalItemsCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
    );

    return (
    <CartContext.Provider
        value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartTotal,
        totalItemsCount,
        }}
    >
        {children}
    </CartContext.Provider>
    );
};

// 3. Custom hook for easy consumption in components
export const useCart = () => {
    return useContext(CartContext);
};