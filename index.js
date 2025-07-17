require("dotenv").config();
const { Telegraf } = require("telegraf");
const express = require("express");
const mongoose = require("mongoose");

// App setup
const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("LizzyBot is running..."));
app.listen(PORT, () => console.log(`🌐 Web server running on port ${PORT}`));

// Telegram bot
const bot = new Telegraf(process.env.BOT_TOKEN);

// MongoDB setup
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Sample bot reply
bot.start((ctx) => ctx.reply("Hey, I’m LizzyBot 😘 Ready to play?"));

// Launch bot
bot.launch();
console.log("🤖 LizzyBot is live on Telegram!");

// Graceful shutdown
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));