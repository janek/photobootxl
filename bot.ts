import { Bot, InputFile, InputMediaBuilder } from "https://deno.land/x/grammy@v1.22.4/mod.ts";
import { load } from "https://deno.land/std@0.221.0/dotenv/mod.ts";

await load({ export: true }) 

const token = Deno.env.get("BOT_TOKEN")!;
const photoFilename = 'photo.jpg'
const bot = new Bot(token); 

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.command("photo", async (ctx) => {
  // Run a terminal command and await end: ffmpeg -f v4l2 -i /dev/video0 -frames 1 ~/Desktop/dx.jpg

  await takePhoto();

  const photo = InputMediaBuilder.photo(new InputFile("photo.jpg"));
  ctx.replyWithMediaGroup([photo]);
});

const takePhoto = async () => {
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