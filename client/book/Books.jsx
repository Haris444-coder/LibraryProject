import React, { useEffect, useState } from "react";
import auth from "../lib/auth-helper";
import { list, removeBook, checkout, returnBook } from "./book.api.js";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Books() {
  const [books, setBooks] = useState([]);
  const jwt = auth.isAuthenticated();

  const loadBooks = () => {
    list(jwt.token).then((data) => {
      if (data.error) console.log(data.error);
      else setBooks(data);
    });
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleDelete = (id) => {
    removeBook(id, jwt.token).then(() => loadBooks());
  };

  const handleCheckout = (id) => {
    checkout(id, jwt.token).then(() => loadBooks());
  };

  const handleReturn = (id) => {
    returnBook(id, jwt.token).then(() => loadBooks());
  };

  const currentUser = jwt.user;

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Library Books</Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/books/new"
        >
          Add Book
        </Button>
      </Box>

      <Grid container spacing={2}>
        {books.map((b) => {
          const isOwner = b.owner && b.owner._id === currentUser._id;
          const isBorrower =
            b.checkedOutBy && b.checkedOutBy._id === currentUser._id;

          return (
            <Grid item xs={12} sm={6} md={4} key={b._id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                {/** Cover image if exists */}
                <CardMedia
                  component="img"
                  height="160"
                  image={`/api/books/photo/${b._id}`}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                  alt={b.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{b.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Author: {b.author}
                  </Typography>
                  {b.genre && (
                    <Typography variant="body2" color="text.secondary">
                      Genre: {b.genre}
                    </Typography>
                  )}
                  {b.year && (
                    <Typography variant="body2" color="text.secondary">
                      Year: {b.year}
                    </Typography>
                  )}

                  <Box sx={{ mt: 1 }}>
                    <Chip
                      label={b.status === "available" ? "Available" : "Checked out"}
                      color={b.status === "available" ? "success" : "warning"}
                      size="small"
                    />
                  </Box>

                  {b.owner && (
                    <Typography variant="caption" color="text.secondary">
                      Owner: {b.owner.name}
                    </Typography>
                  )}

                  {b.checkedOutBy && (
                    <Typography variant="caption" color="text.secondary" display="block">
                      Checked out by: {b.checkedOutBy.name}
                    </Typography>
                  )}
                </CardContent>

                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Box>
                    {isOwner && (
                      <>
                        <Button
                          size="small"
                          component={Link}
                          to={`/books/edit/${b._id}`}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleDelete(b._id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </Box>

                  <Box>
                    {!isOwner && b.status === "available" && (
                      <Button size="small" onClick={() => handleCheckout(b._id)}>
                        Check out
                      </Button>
                    )}
                    {isBorrower && b.status === "checked-out" && (
                      <Button size="small" onClick={() => handleReturn(b._id)}>
                        Return
                      </Button>
                    )}
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
