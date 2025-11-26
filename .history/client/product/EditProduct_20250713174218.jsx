/*import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon,
  Avatar,
  Grid,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useTheme } from "@mui/material/styles";
import auth from "../lib/auth-helper";
import { read, update } from "./api-product.js";
import { Navigate, useParams } from "react-router-dom";
import MyProducts from "../product/MyProducts";

export default function EditProduct() {
  const params = useParams();
  const theme = useTheme();
  const [values, setValues] = useState({
    name: "",
    description: "",
    image: "",
    redirect: false,
    error: "",
    id: "",
    owner: "",
  });

  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ productId: params.productId }, signal).then((data) => {
      if (data.error) {
        setValues((prev) => ({ ...prev, error: data.error }));
      } else {
        setValues((prev) => ({
          ...prev,
          id: data._id,
          name: data.name,
          description: data.description,
          owner: data.owner.name,
        }));
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [params.productId]);

  const clickSubmit = () => {
    let productData = new FormData();
    values.name && productData.append("name", values.name);
    values.description && productData.append("description", values.description);
    values.image && productData.append("image", values.image);

    update({ productId: params.productId }, { t: jwt.token }, productData).then(
      (data) => {
        if (data.error) {
          setValues((prev) => ({ ...prev, error: data.error }));
        } else {
          setValues((prev) => ({ ...prev, redirect: true }));
        }
      }
    );
  };

  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const logoUrl = values.id
    ? `/api/products/logo/${values.id}?${new Date().getTime()}`
    : "/api/products/defaultphoto";

  if (values.redirect) {
    return <Navigate to="/seller/products" />;
  }

  return (
    <Grid container spacing={8} sx={{ flexGrow: 1, m: 4 }}>
      <Grid item xs={12} sm={6}>
        <Card sx={{ textAlign: "center", pb: 2 }}>
          <CardContent>
            <Typography
              variant="h6"
              component="h2"
              sx={{ mt: 2, color: theme.palette.primary.main }}
            >
              Edit Product
            </Typography>

            <Avatar
              src={logoUrl}
              sx={{ width: 60, height: 60, mx: "auto", my: 2 }}
            />

            <input
              accept="image/*"
              onChange={handleChange("image")}
              id="icon-button-file"
              type="file"
              style={{ display: "none" }}
            />
            <label htmlFor="icon-button-file">
              <Button
                variant="contained"
                component="span"
                startIcon={<AddPhotoAlternateIcon />}
              >
                Change Logo
              </Button>
            </label>
            <span style={{ marginLeft: "10px" }}>
              {values.image ? values.image.name : ""}
            </span>

            <TextField
              id="name"
              label="Name"
              value={values.name}
              onChange={handleChange("name")}
              margin="normal"
              sx={{ my: 2, width: 400 }}
            />

            <TextField
              id="description"
              label="Description"
              multiline
              rows={3}
              value={values.description}
              onChange={handleChange("description")}
              margin="normal"
              sx={{ my: 2, width: 400 }}
            />

            <Typography
              variant="subtitle1"
              sx={{ mt: 2, color: theme.palette.text.secondary }}
            >
              Owner: {values.owner}
            </Typography>

            {values.error && (
              <Typography component="p" color="error" sx={{ mt: 2 }}>
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
              sx={{ mb: 2 }}
            >
              Update
            </Button>
          </CardActions>
        </Card>
      </Grid>
      
      <Grid item xs={6} sm={6}>
         <MyProducts shopId={params.shopId} />
      </Grid>
    </Grid>
  );
}
*/

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
  Button,
  Icon,
  Avatar,
  Grid,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useTheme } from "@mui/material/styles";
import { useParams, Navigate } from "react-router-dom";
import auth from "../lib/auth-helper";
import { read, update } from "./api-product.js";

export default function EditProduct() {
  const { shopId, productId } = useParams();
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

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ productId }, signal).then((data) => {
      if (data.error) {
        setValues((prev) => ({ ...prev, error: data.error }));
      } else {
        setValues((prev) => ({
          ...prev,
          name: data.name,
          description: data.description,
          category: data.category,
          quantity: data.quantity,
          price: data.price,
        }));
      }
    });

    return () => abortController.abort();
  }, [productId]);

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

    update({ shopId, productId }, { t: jwt.token }, productData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, redirect: true });
        }
      }
    );
  };

  const imagePreview = values.image
    ? URL.createObjectURL(values.image)
    : `/api/product/image/${productId}`;

  if (values.redirect) {
    return <Navigate to={`/seller/shop/edit/${shopId}`} />;
  }

  return (
    <Grid container justifyContent="center" sx={{ mt: 4 }}>
      <Card sx={{ width: 500 }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
            Edit Product
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
              Change Image
            </Button>
          </label>

          <TextField
            fullWidth
            label="Name"
            value={values.name}
            margin="normal"
            onChange={handleChange("name")}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            value={values.description}
            margin="normal"
            onChange={handleChange("description")}
          />
          <TextField
            fullWidth
            label="Category"
            value={values.category}
            margin="normal"
            onChange={handleChange("category")}
          />
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={values.quantity}
            margin="normal"
            onChange={handleChange("quantity")}
          />
          <TextField
            fullWidth
            label="Price"
            type="number"
            value={values.price}
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
            Update
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
