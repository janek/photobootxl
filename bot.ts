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
import { state } from "./state.ts";
const bot = new Bot(botToken);

bot.command("start", (ctx) =>
  ctx.reply("beep bop! Press or write /photo to take a photo!")
);

bot.command("toggleprint", (ctx) => {
  state.disablePrint = !state.disablePrint;
  ctx.reply(`Printing is now ${state.disablePrint ? "disabled" : "enabled"}.`);
});

bot.command("togglelogo", (ctx) => {
  state.disableOverlay = !state.disableOverlay;
  ctx.reply(
    `Logo overlay is now ${state.disableOverlay ? "disabled" : "enabled"}.`
  );
});

bot.command("photo", async (ctx) => {
  ctx.reply(`Smile!`);
  const photos = [];
  for await (const i of Array(4).keys()) {
    ctx.reply(`${i + 1}!`);
    const photoFilename = `photo${i}.jpg`;
    await takePhoto(photoFilename);
    if (!state.disableOverlay) {
      await overlayTurbulenceOnPhoto(photoFilename);
    }
    const photo = InputMediaBuilder.photo(new InputFile(photoFilename));
    photos.push(photo);
    await new Promise((resolve) => setTimeout(resolve, 300)); // 0.5s pause
  }
  ctx.replyWithMediaGroup(photos);
  if (!state.disablePrint) {
    ctx.reply("Printing!");
    await tileAndPrintPhotos();
  }
});

bot.on("message", (ctx) => ctx.reply("beep bop"));

bot.start();

const printOptionsState = `Printing ${
  state.disablePrint ? "disabled" : "enabled"
}, logo ${state.disableOverlay ? "disabled" : "enabled"}.`;

bot.api.sendMessage(
  Deno.env.get("TELEGRAM_ADMIN_ID")!,
  "Bo(o)t(h) started!\n" + printOptionsState
);
