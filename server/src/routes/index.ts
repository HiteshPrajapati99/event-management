import { Router } from "express";

import { createEvent, getEvents, updateEvent } from "../controllers/event";
import { login, register } from "../controllers/user";
import { authMiddleware } from "../middleware/auth.middleware";
import { upload } from "../utils/multer";

const router = Router();

// Auth
router.post("/user/register", register);
router.post("/user/login", login);

// Event Routes
router.post(
  "/event/create",
  authMiddleware,
  upload.array("images"),
  createEvent
);
router.get("/event/get-all", authMiddleware, getEvents);
router.post(
  "/event/update",
  authMiddleware,
  upload.array("images"),
  updateEvent
);

export default router;
