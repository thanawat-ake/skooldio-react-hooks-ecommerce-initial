import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const cartItemString = window.localStorage.getItem('cartItems');
    const cart = cartItemString ? JSON.parse(cartItemString) : [];
    setCartItems(cart);
  }, []);
  const addCartItem = (product, quantity) => {
    const matchingCartItem = cartItems.find((cartItem) => cartItem.product.id === product.id);
    if (matchingCartItem) {
      matchingCartItem.quantity += quantity;
    } else {
      cartItems.push({ product, quantity });
    }

    setCartItems(cartItems);
    window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };
  const removeCartItem = (productId) => {
    const newCartItems = cartItems.filter((cartItem) => cartItem.product.id !== productId);
    setCartItems(newCartItems);
    window.localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };
  return { cartItems, addCartItem, removeCartItem };
};

export default useCart;
