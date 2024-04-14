import { Bot, InputFile, InputMediaBuilder } from "https://deno.land/x/grammy@v1.22.4/mod.ts";
import { load } from "https://deno.land/std@0.221.0/dotenv/mod.ts";

await load({ export: true }) 

const token = Deno.env.get("BOT_TOKEN")!;
const bot = new Bot(token); 

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.command("photo", async (ctx) => {
  // Run a terminal command and await end: ffmpeg -f v4l2 -i /dev/video0 -frames 1 ~/Desktop/dx.jpg

  // define command used to create the subprocess
  const command = new Deno.Command(Deno.execPath(), {
    args: ["eval", "console.log('hello'); console.error('world')"],
  });

  // create subprocess and collect output
  const { code, stdout, stderr } = await command.output();

  console.assert(code === 0);
  console.assert("world\n" === new TextDecoder().decode(stderr));
  console.log(new TextDecoder().decode(stdout));

  const photo = InputMediaBuilder.photo(new InputFile("test_image.jpg"));
  ctx.replyWithMediaGroup([photo]);
});

bot.on("message", (ctx) => ctx.reply("Got another message!"));

bot.start();