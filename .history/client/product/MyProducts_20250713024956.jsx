import React, { useState, useEffect } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  Icon,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
import auth from "../lib/auth-helper.js";
import { listByOwner } from "./api-product.js";
import { Navigate, Link } from "react-router-dom";
//import { useParams } from "react-router-dom";
import DeleteProduct from "./DeleteProduct";

export default function MyProducts() {
  //const params = useParams();
  const theme = useTheme();
  const [products, setProducts] = useState([]);

  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listByOwner({ userId: jwt.user._id }, { t: jwt.token }, signal).then(
      (data) => {
        if (data.error) {
          setRedirectToSignin(true);
        } else {
          setProducts(data);
        }
      }
    );
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const removeProduct = (product) => {
    const updatedProducts = [...products];
    const index = updatedProducts.indexOf(product);
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  if (redirectToSignin) {
    return <Navigate to="/signin" />;
  }

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 600,
        m: "auto",
        mt: 5,
        p: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          ml: 1,
          color: theme.palette.primary.main,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Your ProductShops
        <Link to="/seller/shop/new" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Icon>add_box</Icon>}
          >
            New Shop
          </Button>
        </Link>
      </Typography>

      <List dense>
        {shops.map((shop, i) => (
          <span key={i}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar
                  src={`/api/shops/logo/${shop._id}?${new Date().getTime()}`}
                />
              </ListItemAvatar>
              <ListItemText primary={shop.name} secondary={shop.description} />
              {auth.isAuthenticated().user &&
                auth.isAuthenticated().user._id === shop.owner._id && (
                  <ListItemSecondaryAction>
                    <Link to={`/seller/shop/edit/${shop._id}`}>
                      <IconButton aria-label="Edit" color="primary">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <DeleteShop shop={shop} onRemove={removeShop} />
                  </ListItemSecondaryAction>
                )}
            </ListItem>
            <Divider />
          </span>
        ))}
      </List>
    </Paper>
  );
}
