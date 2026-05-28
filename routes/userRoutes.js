import express, { Router } from "express";
import {
  GetUsers,
  CreateUser,
  CreateBulkUsers,
  UpdateUser,
  DeleteUser,
} from "../controller/logic.js";

const router = express.Router();

router.get("/", GetUsers);

router.post("/users", CreateUser);

router.post("/users/bulk", CreateBulkUsers);

router.put("/users/:id", UpdateUser);

router.delete("/users/:id", DeleteUser);

export default router;