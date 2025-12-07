// chat_routes.js
import express from "express";
import {
  createChat,
  getAllChats,
  getChatHistory,
  sendMessage,
  deleteChat,
} from "../controllers/chat_controller.js";

const router = express.Router();

// REMOVED protect (your frontend doesn't send JWT yet)
router.post("/create", createChat);
router.get("/all", getAllChats);
router.get("/history", getChatHistory);
router.post("/send", sendMessage);
router.delete("/delete/:chatId", deleteChat);

export default router;
