import { useState, createContext } from "react";
import PropTypes from "prop-types";

const FoodContext = createContext();
const FOOD_KEY = "FOOD";
const ORDER_KEY = "ORDER";
const cachedFood = localStorage.getItem(FOOD_KEY);
const cachedOrder = localStorage.getItem(ORDER_KEY);

function FoodContextProvider({ children }) {
  const [food, setFood] = useState(
    cachedFood === null ? [] : JSON.parse(cachedFood)
  );
  const [order, setOrder] = useState(
    cachedOrder === null ? [] : JSON.parse(cachedOrder)
  );

  const handleAddToFood = (item) => {
    const newList = [...food, item];
    localStorage.setItem(FOOD_KEY, JSON.stringify(newList));
    setFood(newList);
  };

  const handleRemoveFromFood = (id) => {
    const newList = food.filter((item) => item.id !== id);
    localStorage.setItem(FOOD_KEY, JSON.stringify(newList));
    setFood(newList);
  };

  const handleAddToOrder = (singleOrder) => {
    const newList = [...order, singleOrder];
    localStorage.setItem(ORDER_KEY, JSON.stringify(newList));
    setOrder(newList);
  };

  return (
    <FoodContext.Provider
      value={{
        food,
        handleAddToFood,
        handleRemoveFromFood,
        order,
        handleAddToOrder,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
}

FoodContextProvider.propTypes = {
  children: PropTypes.element,
};

export { FoodContext, FoodContextProvider };
