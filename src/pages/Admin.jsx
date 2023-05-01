import { useState } from "react";
import PropTypes from "prop-types";
import AddFoodForm from "../components/admin/AddFoodForm";
import AppDrawer from "../components/admin/AppDrawer";
import FoodGrid from "../components/common/FoodGrid";
import { Box } from "@mui/material";
import OrderList from "../components/admin/OrderList";

export default function Admin({ footer }) {
  const [menu, setMenu] = useState("ADD_FOOD");
  let component;
  switch (menu) {
    case "ADD_FOOD":
      component = <AddFoodForm />;
      break;
    case "FOOD_LIST":
      component = <FoodGrid isAdmin />;
      break;
    default:
      component = <OrderList />;
  }

  return (
    <AppDrawer setMenu={setMenu}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          alignItems: "center",
        }}
      >
        {component}
        <Box sx={{ flexGrow: 1 }} />
        {footer()}
      </Box>
    </AppDrawer>
  );
}

Admin.propTypes = {
  footer: PropTypes.func,
};
