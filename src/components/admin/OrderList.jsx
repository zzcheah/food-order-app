import { useContext } from "react";
import { FoodContext } from "../../contexts/FoodContext";
import { Box, Divider, Typography } from "@mui/material";

export default function OrderList() {
  const { order } = useContext(FoodContext);

  return (
    <>
      <Typography variant="h3">Order List</Typography>
      <br />
      {order.map((so, index) => (
        <Box
          key={so.id}
          sx={{ width: "100%", m: 2, p: 2, border: "1px black" }}
        >
          <Typography>{`Order ${index + 1}`}</Typography>
          {so.items.map((item, index2) => (
            <Typography direction="row" key={item.id} component="a">
              <pre>
                {`Item ${index2 + 1}: ${item.name} `}&#9;
                {` Quantity: ${item.amount}`}
              </pre>
            </Typography>
          ))}
          <Divider />
        </Box>
      ))}
    </>
  );
}
