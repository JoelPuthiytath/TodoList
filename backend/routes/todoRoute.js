import express from "express";
import {
  addItems,
  deleteTask,
  getTasks,
  updateTask,
} from "../controller/taskController.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/item", addItems);
router.delete("/deleteTask", deleteTask);
router.put("/updateTask", updateTask);

export default router;
