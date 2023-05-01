import { useState, createContext } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();
const CART_KEY = "CART";
const cachedCart = localStorage.getItem(CART_KEY);

function CartContextProvider({ children }) {
  const [cart, setCart] = useState(
    cachedCart === null ? [] : JSON.parse(cachedCart)
  );

  const handleAddToCart = (clickedItem) => {
    setCart((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      var newList;
      if (isItemInCart) {
        newList = prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      } else {
        newList = [...prev, { ...clickedItem, amount: 1 }];
      }

      localStorage.setItem(CART_KEY, JSON.stringify(newList));
      return newList;
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => {
      const newList = prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, []);
      localStorage.setItem(CART_KEY, JSON.stringify(newList));
      return newList;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem(CART_KEY, JSON.stringify([]));
  };
  return (
    <CartContext.Provider
      value={{ cart, handleAddToCart, handleRemoveFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

CartContextProvider.propTypes = {
  children: PropTypes.element,
};

export { CartContext, CartContextProvider };
