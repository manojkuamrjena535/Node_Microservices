import express from "express";
import * as ctrl from "../controllers/post.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/health", ctrl.health);
router.get("/posts", ctrl.getPosts);
router.get("/posts/:id", ctrl.getPostById);
router.post("/posts", authenticate, ctrl.createPost);
router.put("/posts/:id", authenticate, ctrl.updatePost);
router.delete("/posts/:id", authenticate, ctrl.deletePost);

export default router;
