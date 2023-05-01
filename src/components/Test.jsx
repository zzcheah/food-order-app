import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export default function Test() {
  const { cart, handleAddToCart } = useContext(CartContext);
  return (
    <div>
      Cart:
      {/* {cart.totalAmount} */}
      <div onClick={() => handleAddToCart({ id: 1, price: 122 })}>
        Add to Cart
      </div>
    </div>
  );
}
