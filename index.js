import { Telegraf, Markup } from "telegraf";
import express from "express";
import puppeteer from "puppeteer";
import checkAdd from "./Helper/checkAdd.js";
import imageReply from "./Helper/imageReply.js";
const browser = await puppeteer.launch();
const bot = new Telegraf("6793068435:AAHkURhKnnOMDxfM48jghNrE-u9kZhtHIqk");
const app = express();
const port = process.env.PORT || 3001;
const menuBtn = (ctx) => {
  const button = Markup.button.callback("Check 🔍", "check");
  ctx.replyWithMarkdownV2(
    "*Welcome to Check MyToken*\n\nAn unoffical rugchecker\n\nTo check a token just click the check button, and send address the coin",
    Markup.inlineKeyboard([button]).resize()
  );
};

bot.start(menuBtn);
bot.command("menu", menuBtn);
bot.on("callback_query", async (ctx) => {
  // Explicit usage
  if (ctx.callbackQuery.data != "check") {
    ctx.reply("Say what?");
    return;
  }
  await ctx.reply("Type the address here:", {
    reply_markup: { force_reply: true },
  });
});
bot.on("message", async (ctx) => {
  if (
    ctx.message.reply_to_message &&
    ctx.message.reply_to_message.text === "Type the address here:"
  ) {
    // This message is a reply to the forced reply message
    const replyText = ctx.message.text;
    console.log(replyText,replyText.length);
    if (replyText.length >= 43) {
      const valid = await checkAdd(ctx.message.text);
      if (!valid) {
        ctx.reply("Invalid address");
        return;
      }
      const sentMessage = await ctx.reply("Please wait...")
      imageReply(sentMessage,ctx,replyText,browser);
    } else ctx.reply("Invalid address");
  } else {
    ctx.reply("Say what?");
  }
});

bot.launch();
app.get('/', function (req, res) {
  res.send("Welocme to check your token");
  });
  const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
