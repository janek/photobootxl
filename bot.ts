import {
  Bot,
  InputFile,
  InputMediaBuilder,
} from "https://deno.land/x/grammy@v1.22.4/mod.ts";
import { load } from "https://deno.land/std@0.221.0/dotenv/mod.ts";

await load({ export: true });

const token = Deno.env.get("BOT_TOKEN")!;
export const adminId = Deno.env.get("TELEGRAM_ADMIN_ID")!;
const bot = new Bot(token);

bot.command("start", (ctx) =>
  ctx.reply("beep bop! Press or write /photo to take a photo!")
);

bot.command("photo", async (ctx) => {
  ctx.reply(`Smile!`);
  const photos = [];
  for await (const i of Array(4).keys()) {
    ctx.reply(`${i + 1}!`);
    const photoFilename = `photo${i}.jpg`;
    await takePhoto(photoFilename);
    await overlayTurbulenceOnPhoto(photoFilename);
    const photo = InputMediaBuilder.photo(new InputFile(photoFilename));
    photos.push(photo);
    await new Promise((resolve) => setTimeout(resolve, 300)); // 0.5s pause
  }
  ctx.replyWithMediaGroup(photos);
  ctx.reply(`Printing!`);
  await tileAndPrintPhotos();
});

export const sendLastPhotosToAdmin = async () => {
  const photos = [];
  for await (const i of Array(4).keys()) {
    const photoFilename = `photo${i}.jpg`;
    const photo = InputMediaBuilder.photo(new InputFile(photoFilename));
    photos.push(photo);
  }
  bot.api.sendMediaGroup(adminId, photos);
};

export const sendMessageToAdmin = async (message: string) => {
  bot.api.sendMessage(adminId, message);
};

export const overlayTurbulenceOnPhoto = async (photoFilename: string) => {
  const command = new Deno.Command("sh", {
    args: ["overlay.sh", photoFilename],
  });
  const { code } = await command.output();
  if (code !== 0) {
    throw new Error(`fswebcam exited with code ${code}`);
  }
};

export const tileAndPrintPhotos = async () => {
  const tileCommand = new Deno.Command("sh", {
    args: ["tile.sh"],
  });
  const { code: tileCode } = await tileCommand.output();
  if (tileCode !== 0) {
    throw new Error(`tile.sh exited with code ${tileCode}`);
  }

  const printCommand = new Deno.Command("sh", {
    args: ["print.sh"],
  });
  const { code: printCode } = await printCommand.output();
  if (printCode !== 0) {
    throw new Error(`print.sh exited with code ${printCode}`);
  }
};

export const takePhoto = async (photoFilename: string) => {
  const command = new Deno.Command("fswebcam", {
    args: [photoFilename],
  });
  const { code } = await command.output();
  if (code !== 0) {
    throw new Error(`fswebcam exited with code ${code}`);
  }
};

bot.on("message", (ctx) => ctx.reply("Got another message!"));

bot.start();

bot.api.sendMessage(Deno.env.get("TELEGRAM_ADMIN_ID")!, "Bo(o)t(h) started!");
