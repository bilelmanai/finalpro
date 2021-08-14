import mongoose from "mongoose";

const schema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: { type: [String], default: [] },
  createdAt: { type: Date, default: new Date() },
});

const blogsmodule = mongoose.model("blogsmodule", schema);

export default blogsmodule;
