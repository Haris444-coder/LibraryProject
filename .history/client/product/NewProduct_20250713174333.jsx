/*import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useTheme } from "@mui/material/styles";
import auth from "../lib/auth-helper";
import { create } from "./api-product.js";
import { Link, Navigate } from "react-router-dom";

export default function NewProduct() {
  const theme = useTheme();
  const [values, setValues] = useState({
    name: "",
    description: "",
    image: "",
    redirect: false,
    error: "",
  });
  const jwt = auth.isAuthenticated();

  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = () => {
    let productData = new FormData();
    values.name && productData.append("name", values.name);
    values.description && productData.append("description", values.description);
    values.image && productData.append("image", values.image);
    create(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      productData
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", redirect: true });
      }
    });
  };

  if (values.redirect) {
    return <Navigate to={"/seller/products"} />;
  }

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: "auto",
        textAlign: "center",
        mt: 5,
        pb: 2,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          component="h2"
          sx={{ mt: 2, color: theme.palette.primary.main }}
        >
          New Product
        </Typography>

        <br />

        <input
          accept="image/*"
          onChange={handleChange("image")}
          style={{ display: "none" }}
          id="icon-button-file"
          type="file"
        />
        <label htmlFor="icon-button-file">
          <Button
            variant="contained"
            color="secondary"
            component="span"
            startIcon={<AddPhotoAlternateIcon />}
          >
            Upload Logo
          </Button>
        </label>
        <span style={{ marginLeft: "10px" }}>
          {values.image ? values.image.name : ""}
        </span>

        <br />

        <TextField
          id="name"
          label="Name"
          value={values.name}
          onChange={handleChange("name")}
          margin="normal"
          sx={{ mx: 1, width: 300 }}
        />

        <br />

        <TextField
          id="description"
          label="Description"
          multiline
          rows={2}
          value={values.description}
          onChange={handleChange("description")}
          margin="normal"
          sx={{ mx: 1, width: 300 }}
        />

        <br />

        {values.error && (
          <Typography component="p" color="error" sx={{ mt: 1 }}>
            <Icon color="error" sx={{ verticalAlign: "middle", mr: 1 }}>
              error
            </Icon>
            {values.error}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          color="primary"
          variant="contained"
          onClick={clickSubmit}
          sx={{ mb: 2, mx: 1 }}
        >
          Submit
        </Button>

        <Link to="/seller/products" style={{ textDecoration: "none" }}>
          <Button variant="contained" sx={{ mb: 2, mx: 1 }}>
            Cancel
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
*/

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
  Button,
  Icon,
  Grid,
  Avatar,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useTheme } from "@mui/material/styles";
import { useParams, Navigate } from "react-router-dom";
import auth from "../lib/auth-helper";
import { create } from "./api-product.js";

export default function NewProduct() {
  const { shopId } = useParams();
  const theme = useTheme();
  const jwt = auth.isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    image: "",
    category: "",
    quantity: "",
    price: "",
    error: "",
    redirect: false,
  });

  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = () => {
    let productData = new FormData();
    Object.keys(values).forEach((key) => {
      if (values[key] && key !== "redirect" && key !== "error") {
        productData.append(key, values[key]);
      }
    });

    create({ shopId }, { t: jwt.token }, productData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", redirect: true });
      }
    });
  };

  const imagePreview = values.image
    ? URL.createObjectURL(values.image)
    : "/api/product/defaultphoto";

  if (values.redirect) {
    return <Navigate to={`/seller/shop/edit/${shopId}`} />;
  }

  return (
    <Grid container justifyContent="center" sx={{ mt: 4 }}>
      <Card sx={{ width: 500 }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
            New Product
          </Typography>

          <Avatar
            src={imagePreview}
            sx={{ width: 80, height: 80, mx: "auto", my: 2 }}
            variant="rounded"
          />

          <input
            accept="image/*"
            onChange={handleChange("image")}
            type="file"
            id="product-image"
            style={{ display: "none" }}
          />
          <label htmlFor="product-image">
            <Button
              variant="contained"
              component="span"
              startIcon={<AddPhotoAlternateIcon />}
            >
              Upload Image
            </Button>
          </label>

          <TextField
            fullWidth
            label="Name"
            margin="normal"
            onChange={handleChange("name")}
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={3}
            onChange={handleChange("description")}
          />
          <TextField
            fullWidth
            label="Category"
            margin="normal"
            onChange={handleChange("category")}
          />
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            margin="normal"
            onChange={handleChange("quantity")}
          />
          <TextField
            fullWidth
            label="Price"
            type="number"
            margin="normal"
            onChange={handleChange("price")}
          />

          {values.error && (
            <Typography color="error" sx={{ mt: 2 }}>
              <Icon color="error" sx={{ verticalAlign: "middle", mr: 1 }}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>

        <CardActions>
          <Button variant="contained" onClick={clickSubmit}>
            Submit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
