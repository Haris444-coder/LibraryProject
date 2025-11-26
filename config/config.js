const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    "mongodb+srv://hmaleji_db_user:3606nLFXejR5lq0q@cluster0.nvfo58e.mongodb.net/?appName=Cluster0"
};

export default config;
