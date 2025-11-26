import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Box,
} from "@mui/material";
import { read } from "./api-product.js";
import { useParams } from "react-router-dom";

export default function Shop() {
  const params = useParams();
  const [shop, setShop] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read(
      {
        shopId: params.shopId,
      },
      signal
    ).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setShop(data);
      }
    });

    return () => abortController.abort();
  }, [params.shopId]);

  const logoUrl = shop._id
    ? `/api/shops/logo/${shop._id}?${new Date().getTime()}`
    : "/api/shops/defaultphoto";

  return (
    <Box sx={{ flexGrow: 1, margin: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center", pb: 2 }}>
            <CardContent>
              <Typography
                variant="h5"
                component="h2"
                sx={{ m: 2, color: "text.primary", fontWeight: "bold" }}
              >
                {shop.name}
              </Typography>

              <Avatar
                src={logoUrl}
                alt={shop.name}
                sx={{ width: 100, height: 100, margin: "auto" }}
              />

              <Typography
                variant="subtitle1"
                component="h2"
                sx={{ mt: 1, color: "text.secondary" }}
              >
                {shop.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
