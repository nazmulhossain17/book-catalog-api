import express from "express";
import { bookController } from "./book.controller";

const router = express.Router();

router.post("/", bookController.insertIntoDb);
router.get("/", bookController.getAllFromDB);
router.get("/:id", bookController.getDataById);
router.patch("/:id", bookController.updateIntoDB);
router.delete("/:id", bookController.deleteFromDB);

export const bookRoutes = router;
