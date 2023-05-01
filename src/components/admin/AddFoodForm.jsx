import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { FoodContext } from "../../contexts/FoodContext";
import ClearIcon from "@mui/icons-material/Clear";
import { sanityClient } from "../../api/sanity";

export default function AddFoodForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone();

  const [file, setFile] = useState(null);

  const { handleAddToFood } = useContext(FoodContext);

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  function onSubmit({ foodName, desc, price }) {
    if (file === null) {
      window.alert("Missing food image, please select an image!!");
      return;
    }
    sanityClient.assets
      .upload("image", file)
      .then((res) => {
        handleAddToFood({
          id: uuidv4(),
          name: foodName,
          desc,
          price,
          url: res.url,
        });
        window.alert("Food added!");
        setFile(null);
        reset();
      })
      .catch((err) =>
        window.alert(`Failed to upload image, please contact dev :: ${err}`)
      );
  }

  return (
    <>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={2}
        sx={{ m: 2 }}
      >
        <Box
          sx={{
            py: 6,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography component="h1" variant="h5">
            Add Food
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="foodName"
              label="Food Name"
              name="foodName"
              autoFocus
              inputProps={register("foodName", {
                required: "Name is required",
              })}
              error={!!errors.foodName}
              helperText={errors.foodName?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              id="desc"
              inputProps={register("desc", {
                required: "Description is required",
              })}
              error={!!errors.desc}
              helperText={errors.desc?.message}
            />

            <FormControl sx={{ my: 2 }} error={errors.price && true}>
              <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
              <OutlinedInput
                id="price"
                inputProps={register("price", {
                  required: "Price is required",
                  pattern: {
                    value: /^[0-9]+(\.[0-9]{1,2})?$/,
                    message: "Please enter valid price",
                  },
                })}
                error={!!errors.price}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Amount"
              />
              {errors.price && (
                <FormHelperText>{errors.price.message}</FormHelperText>
              )}
            </FormControl>
            <br />
            {file === null ? (
              <>
                <FormControl sx={{ py: 2 }}>
                  <div
                    {...getRootProps()}
                    style={{
                      border: "1px dotted grey",
                      padding: "20px",
                      textAlign: "center",
                    }}
                  >
                    <input
                      label="image"
                      name="image"
                      id="image"
                      {...getInputProps()}
                    />
                    {isDragActive ? (
                      <p>Drop the image here ...</p>
                    ) : (
                      <p>
                        Drag and drop an image of the food here, or click to
                        select file
                      </p>
                    )}
                  </div>
                </FormControl>
                <br />
              </>
            ) : (
              <Stack direction="row" alignItems="center">
                <Typography sx={{ px: 1 }}>{`image: ${file.name}`}</Typography>
                <IconButton onClick={() => setFile(null)}>
                  <ClearIcon sx={{ color: "red" }} />
                </IconButton>
              </Stack>
            )}

            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
