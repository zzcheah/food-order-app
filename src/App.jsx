import { useState } from "react";

import User from "./pages/User";
import Admin from "./pages/Admin";
import { FoodContextProvider } from "./contexts/FoodContext";
import { Box, Button } from "@mui/material";
import FastfoodTwoToneIcon from "@mui/icons-material/FastfoodTwoTone";
import { CartContextProvider } from "./contexts/CartContext";

function App() {
  const [isAdmin, setIsAdmin] = useState(true);

  const Footer = () => {
    return (
      <Box
        sx={{
          bgcolor: "lightgray",
          width: "100%",
          py: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          minHeight: "200px",
        }}
      >
        <FastfoodTwoToneIcon sx={{ fontSize: "128px", color: "gray", my: 2 }} />
        <Button
          variant="contained"
          size="small"
          onClick={() => setIsAdmin(!isAdmin)}
          sx={{ m: 3, bgcolor: "gray", color: "lightgray", px: 3 }}
        >
          {isAdmin ? "Admin" : "User"}
        </Button>
      </Box>
    );
  };

  return (
    <>
      <FoodContextProvider>
        <CartContextProvider>
          {isAdmin ? <Admin footer={Footer} /> : <User footer={Footer} />}
        </CartContextProvider>
      </FoodContextProvider>
    </>
  );
}

export default App;
