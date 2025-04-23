import express from "express";
import { AdminLogin } from "../controller/AdminController.js";

const adminRouter = express.Router();

adminRouter.post("/login", AdminLogin);

export default adminRouter;
