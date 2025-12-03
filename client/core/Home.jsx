import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import library from "./../assets/images/library.jpg";

const Home = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        maxWidth: 900,
        margin: "auto",
        mt: 5,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          px: 2.5,
          pt: 3,
          pb: 2,
          
          color: theme.custom?.openTitle || theme.palette.primary.main,
        }}
      >
        Home Page
      </Typography>
      <CardMedia
        sx={{ minHeight: 400 }}
        image={library}
        title="Library"
      />
      <CardContent>
        <Typography variant="body2" component="p">
          Welcome to the online library! This is where users can add books and check out books
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Home;
