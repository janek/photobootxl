// bot.ts
import {
  Bot,
  InputFile,
  InputMediaBuilder,
} from "https://deno.land/x/grammy@v1.22.4/mod.ts";

import {
  takePhoto,
  overlayTurbulenceOnPhoto,
  tileAndPrintPhotos,
} from "./photo.ts";
import { botToken } from "./utils.ts";

const bot = new Bot(botToken);

export let disablePrint = false;
export let disableOverlay = false;

bot.command("start", (ctx) =>
  ctx.reply("beep bop! Press or write /photo to take a photo!")
);

bot.command("toggleprint", (ctx) => {
  disablePrint = !disablePrint;
  ctx.reply(`Printing is now ${disablePrint ? "disabled" : "enabled"}.`);
});

bot.command("togglelogo", (ctx) => {
  disableOverlay = !disableOverlay;
  ctx.reply(`Logo overlay is now ${disableOverlay ? "disabled" : "enabled"}.`);
});

bot.command("photo", async (ctx) => {
  ctx.reply(`Smile!`);
  const photos = [];
  for await (const i of Array(4).keys()) {
    ctx.reply(`${i + 1}!`);
    const photoFilename = `photo${i}.jpg`;
    await takePhoto(photoFilename);
    if (!disableOverlay) {
      await overlayTurbulenceOnPhoto(photoFilename);
    }
    const photo = InputMediaBuilder.photo(new InputFile(photoFilename));
    photos.push(photo);
    await new Promise((resolve) => setTimeout(resolve, 300)); // 0.5s pause
  }
  ctx.replyWithMediaGroup(photos);
  if (!disablePrint) {
    ctx.reply("Printing!");
    await tileAndPrintPhotos();
  }
  await tileAndPrintPhotos();
});

bot.on("message", (ctx) => ctx.reply("beep bop"));

bot.start();

bot.command("toggleprint", (ctx) => {
  const currentStatus = Deno.env.get("DISABLE_PRINT") === "true";
  Deno.env.set("DISABLE_PRINT", currentStatus ? "false" : "true");
  ctx.reply(`Printing is now ${currentStatus ? "enabled" : "disabled"}.`);
});

bot.command("togglelogo", (ctx) => {
  const currentStatus = Deno.env.get("DISABLE_OVERLAY") === "true";
  Deno.env.set("DISABLE_OVERLAY", currentStatus ? "false" : "true");
  ctx.reply(`Logo overlay is now ${currentStatus ? "enabled" : "disabled"}.`);
});

const printOptionsState = `Printing ${
  disablePrint ? "disabled" : "enabled"
}, overlay ${disableOverlay ? "disabled" : "enabled"}.`;

bot.api.sendMessage(Deno.env.get("TELEGRAM_ADMIN_ID")!, "Bo(o)t(h) started!");
bot.api.sendMessage(Deno.env.get("TELEGRAM_ADMIN_ID")!, printOptionsState);
