import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: { type: String, trim: true, required: "Title is required" },
  author: { type: String, trim: true, required: "Author is required" },
  year: Number,
  genre: String,
  description: String,

 
  image: {
    data: Buffer,
    contentType: String,
  },

 
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  status: {
    type: String,
    default: "available",
    enum: ["available", "checked-out"],
  },

  
  checkedOutBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null,
  },

  created: { type: Date, default: Date.now },
  updated: Date,
});

export default mongoose.model("Book", BookSchema);
