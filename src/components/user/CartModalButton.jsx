import { useContext, useState } from "react";
import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { ShoppingCart } from "@mui/icons-material";
import { CartContext } from "../../contexts/CartContext";
import CartItemControl from "./CartItemControl";
import { FoodContext } from "../../contexts/FoodContext";

const getTotalItems = (items) =>
  items.reduce((acc, item) => acc + item.amount, 0);

const calculateTotal = (items) =>
  items.reduce((acc, item) => acc + item.amount * item.price, 0);

const CartModal = ({ cart, clearCart, open, handleClose }) => {
  const { handleAddToOrder } = useContext(FoodContext);
  const handleCheckout = () => {
    const order = { id: uuidv4(), items: cart };
    handleAddToOrder(order);
    clearCart();
    handleClose();
  };

  const empty = cart.length === 0;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="cart dialog"
      aria-describedby="cart dialog"
      fullWidth
    >
      <DialogTitle>Your Cart</DialogTitle>

      <DialogContent dividers>
        {empty ? (
          <DialogContentText>No items in cart.</DialogContentText>
        ) : (
          <>
            {cart.map((item) => (
              <CartItemControl key={item.id} item={item} />
            ))}
            <br />
            Total Items: {getTotalItems(cart)}
            <br />
            Total Amount: ${calculateTotal(cart)}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        {!empty && (
          <Button onClick={handleCheckout} autoFocus>
            Checkout
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

CartModal.propTypes = {
  cart: PropTypes.array,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  clearCart: PropTypes.func,
};

export default function CartModalButton() {
  const { cart, clearCart } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CartModal
        cart={cart}
        clearCart={clearCart}
        open={open}
        handleClose={handleClose}
      />
      <IconButton
        sx={{ position: "fixed", zIndex: 100, right: "20px", top: "20px" }}
        onClick={handleClickOpen}
      >
        <Badge badgeContent={cart.length} color="error">
          <ShoppingCart />
        </Badge>
      </IconButton>
    </>
  );
}
