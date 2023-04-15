import express from "express";
import { contact } from "../controllers/contactController.js";

const router = express.Router();

router.post("/email", contact);

export default router;
