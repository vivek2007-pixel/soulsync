import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { addEmailTask } from "./taskQueue.js";
import { connectDB } from "./config/database.js";

import authRoutes from "./routes/auth_routes.js";
import chatRoutes from "./routes/chat_routes.js";
import guestRoutes from "./routes/guest_routes.js";
import adminroutes from "./routes/adminroutes.js";

dotenv.config();
const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/guest", guestRoutes);
app.use("/api/admin", adminroutes);



app.use(bodyParser.json());
// POST endpoint that queues tasks
app.post("/send-emails", (req, res) => {
 const { emails, subject, body } = req.body;
 emails.forEach((email) => {
 addEmailTask(email, subject, body);
 });
 res.json({ message: "Emails queued successfully!" });
});

// Root Check
app.get("/", (req, res) => {
  res.send("SoulSync Backend is Running ✔");
});

// Start server AFTER DB connects
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});


