import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import auth from "../lib/auth-helper";
import { Link, useNavigate, useLocation } from "react-router-dom";

const isActive = (location, path) =>
  location.pathname === path ? "#ff4081" : "#ffffff";

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        
        {/* App Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Library App
        </Typography>

        {/* Home */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <IconButton aria-label="Home" sx={{ color: isActive(location, "/") }}>
            <HomeIcon />
          </IconButton>
        </Link>

        {/* Users */}
        <Link to="/users" style={{ textDecoration: "none" }}>
          <Button sx={{ color: isActive(location, "/users") }}>Users</Button>
        </Link>

        {/* Books */}
        <Link to="/books" style={{ textDecoration: "none" }}>
          <Button sx={{ color: isActive(location, "/books") }}>Books</Button>
        </Link>

        {/* If NOT logged in */}
        {!auth.isAuthenticated() && (
          <>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button sx={{ color: isActive(location, "/signup") }}>
                Sign Up
              </Button>
            </Link>

            <Link to="/signin" style={{ textDecoration: "none" }}>
              <Button sx={{ color: isActive(location, "/signin") }}>
                Sign In
              </Button>
            </Link>
          </>
        )}

        {/* If logged in */}
        {auth.isAuthenticated() && (
          <>
            {/* My Profile */}
            <Link
              to={`/user/${auth.isAuthenticated().user._id}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                sx={{
                  color: isActive(
                    location,
                    `/user/${auth.isAuthenticated().user._id}`
                  ),
                }}
              >
                My Profile
              </Button>
            </Link>

            {/* Sign out */}
            <Button
              sx={{ color: "#ffffff" }}
              onClick={() => {
                auth.clearJWT(() => navigate("/"));
              }}
            >
              Sign Out
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
