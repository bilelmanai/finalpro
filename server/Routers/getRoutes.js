import express from "express";
import {
  getdata,
  postdata,
  updateData,
  deleteData,
  updatedatalike,
} from "../functions/allfunc.js";
import middleware from "../middleware/auth.js";
const router = express.Router();

router.get("/", getdata);
router.post("/", middleware, postdata);
router.patch("/:id", middleware, updateData);
router.delete("/:id", middleware, deleteData);
router.patch("/:reqId/like", middleware, updatedatalike);
export default router;
