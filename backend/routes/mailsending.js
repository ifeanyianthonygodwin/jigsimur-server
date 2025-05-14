import express from "express";
import {mailsending} from "../controllers/mailsending.controller.js";

const router = express.Router();

router.post("/api/affiliate", mailsending)

export default router