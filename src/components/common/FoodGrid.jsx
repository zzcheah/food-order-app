import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { CartContext } from "../../contexts/CartContext";
import { useContext } from "react";
import { FoodContext } from "../../contexts/FoodContext";

export default function FoodGrid({ isAdmin }) {
  const { handleAddToCart } = useContext(CartContext);
  const { food, handleRemoveFromFood } = useContext(FoodContext);
  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      {food?.map((item) => (
        <Grid item key={item.id} xs={12} sm={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 200 }}
              image={item.url ? item.url : ""}
              title="some food"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.desc}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  isAdmin
                    ? handleRemoveFromFood(item.id)
                    : handleAddToCart({
                        id: item.id,
                        price: item.price,
                        name: item.name,
                        imgUrl: item.url,
                      });
                }}
              >
                {isAdmin ? "Remove food" : "Add To Cart"}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

FoodGrid.propTypes = {
  isAdmin: PropTypes.bool,
};
