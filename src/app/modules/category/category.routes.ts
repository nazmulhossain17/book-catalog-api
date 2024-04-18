import express from "express";
import { categoryController } from "./category.controller";

const router = express.Router();

router.post("/create-category", categoryController.insertIntoDb);
router.get("/", categoryController.getAllFromDB);
router.get("/:id", categoryController.getDataById);
router.patch("/:id", categoryController.updateIntoDB);
router.delete("/:id", categoryController.deleteFromDB);

export const categoryRoutes = router;
