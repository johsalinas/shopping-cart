import express from "express";
import { getAll, getById } from "../controllers/discountController.js";

const router = express.Router();

router.route("/").get(getAll);
router.route("/:brand").get(getById);

export default router;
