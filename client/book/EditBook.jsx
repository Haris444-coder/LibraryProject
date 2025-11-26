import React, { useEffect, useState } from "react";
import { read, update } from "./book.api.js";
import auth from "../lib/auth-helper";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBook() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const jwt = auth.isAuthenticated();

  const [values, setValues] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    description: "",
    image: null,
    error: "",
  });

  useEffect(() => {
    read(bookId, jwt.token).then((data) => {
      if (data.error) setValues({ ...values, error: data.error });
      else
        setValues((prev) => ({
          ...prev,
          title: data.title || "",
          author: data.author || "",
          genre: data.genre || "",
          year: data.year || "",
          description: data.description || "",
        }));
    });
  }, [bookId]);

  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = () => {
    let formData = new FormData();
    formData.append("title", values.title);
    formData.append("author", values.author);
    formData.append("genre", values.genre);
    formData.append("year", values.year);
    formData.append("description", values.description);
    if (values.image) formData.append("image", values.image);

    update(bookId, formData, jwt.token).then((data) => {
      if (data.error) setValues({ ...values, error: data.error });
      else navigate("/books");
    });
  };

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ p: 3, maxWidth: 500, width: "100%" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Edit Book
        </Typography>

        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={values.title}
          onChange={handleChange("title")}
        />
        <TextField
          label="Author"
          fullWidth
          margin="normal"
          value={values.author}
          onChange={handleChange("author")}
        />
        <TextField
          label="Genre"
          fullWidth
          margin="normal"
          value={values.genre}
          onChange={handleChange("genre")}
        />
        <TextField
          label="Year"
          type="number"
          fullWidth
          margin="normal"
          value={values.year}
          onChange={handleChange("year")}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          minRows={3}
          value={values.description}
          onChange={handleChange("description")}
        />

        <Button
          variant="outlined"
          component="label"
          sx={{ mt: 2, mb: 2 }}
        >
          Change Cover Image
          <input type="file" accept="image/*" hidden onChange={handleChange("image")} />
        </Button>

        {values.error && (
          <Typography color="error" variant="body2">
            {values.error}
          </Typography>
        )}

        <Box sx={{ mt: 2, textAlign: "right" }}>
          <Button variant="contained" color="primary" onClick={clickSubmit}>
            Save
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
