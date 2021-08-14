import express from "express";
import { loginFunc, signUpFunc } from "../functions/userFunc.js";
const router = express.Router();

router.post("/login", loginFunc);
router.post("/signup", signUpFunc);
export default router;
