import React, { useState, useEffect } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { list } from "./api-product.js";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchProducts = async () => {
      try {
        const data = await list(signal);
        if (data && data.error) {
          setError(data.error);
        } else if (data) {
          setProducts(data);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Fetch error:", err);
          setError("Failed to load products.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 3,
        mt: 5,
        mb: 3,
        bgcolor: "background.paper",
      }}
      component={Paper}
      elevation={4}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{
          color: "text.primary",
          textAlign: "center",
          mb: 2,
          fontWeight: "bold",
        }}
      >
        All Products
      </Typography>

      {loading && (
        <Typography variant="body1" align="center">
          Loading products...
        </Typography>
      )}

      {error && (
        <Typography variant="body1" align="center" color="error">
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <List dense>
          {products.map((product, i) => (
            <React.Fragment key={product._id || i}>
              <ListItem
                button
                alignItems="flex-start"
                component={Link}
                to={`/products/${product._id}`}
                sx={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{ width: 100, height: 100 }}
                    src={`/api/products/logo/${
                      product._id
                    }?${new Date().getTime()}`}
                    alt={product.name}
                  >
                    {product.name?.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <Box sx={{ pl: 2, py: 1 }}>
                  <Typography
                    variant="h6"
                    component="h2"
                    color="primary"
                    sx={{ mb: 0.5 }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ whiteSpace: "pre-line" }}
                  >
                    {product.description}
                  </Typography>
                </Box>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
}
