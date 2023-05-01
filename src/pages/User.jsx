import { Box, Typography } from "@mui/material";
import Test from "../components/Test";
import FoodGrid from "../components/common/FoodGrid";
import CartModalButton from "../components/user/CartModalButton";

export default function User({ footer }) {
  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Box sx={{ m: 2 }}>
          <Typography variant="h3">User Page</Typography>
          <Typography variant="h4">Food List</Typography>
        </Box>
        <CartModalButton />
        <FoodGrid />
        <Box sx={{ flexGrow: 1 }} />
        {footer()}
      </Box>
    </>
  );
}
