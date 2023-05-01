import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { Button, Divider, Stack, Typography } from "@mui/material";

export default function CartItemControl({ item }) {
  const { handleAddToCart, handleRemoveFromCart } = useContext(CartContext);

  const { id, name, amount, price } = item;
  return (
    <>
      <Typography variant="h6">{name}</Typography>
      <Typography>Price: ${price}</Typography>
      <Typography>Total: ${(amount * price).toFixed(2)}</Typography>
      <Stack direction="row" alignItems="center">
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => handleRemoveFromCart(id)}
        >
          -
        </Button>
        <Typography sx={{ p: 1 }}>{amount}</Typography>
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => handleAddToCart(item)}
        >
          +
        </Button>
      </Stack>
      {/* <img src={`https://source.unsplash.com/featured`} alt={name} /> */}
      <Divider sx={{ py: 1 }} />
    </>
  );
}
