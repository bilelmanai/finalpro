import mongoose from "mongoose";
import blogsmodule from "../modules/blogsmodule.js";

export const getdata = async (req, res) => {
  try {
    const getAll = await blogsmodule.find();
    res.status(200).json(getAll);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const postdata = async (req, res) => {
  const reqBody = req.body;
  try {
    const created = await blogsmodule.create({
      ...reqBody,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });

    res.status(200).json(created);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const updateData = async (req, res) => {
  const reqBody = req.body;
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("no post with that id ");
    }
    const update = await blogsmodule.findByIdAndUpdate(id, reqBody, {
      new: true,
    });

    res.status(202).json(update);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const deleteData = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("no post with that id ");
    }
    await blogsmodule.findByIdAndRemove(id);
    res.json({ message: "post deleted successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const updatedatalike = async (req, res) => {
  const { reqId } = req.params;
  if (!req.userId) {
    return res.json({ message: "unauthenticated" });
  }
  try {
    if (!mongoose.Types.ObjectId.isValid(reqId)) {
      return res.status(404).send("no post with that id ");
    }
    const post = await blogsmodule.findById(reqId);
    const index = post.likes.findIndex((id) => id === req.userId);
    if (index == -1) {
      post.likes.push(req.userId);
    }
    if (index !== -1) {
      post.likes = post.likes.filter((x) => x !== req.userId);
    }
    const updatePost = await blogsmodule.findByIdAndUpdate(reqId, post, {
      new: true,
    });
    res.json(updatePost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
