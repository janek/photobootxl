import { Bot, InputFile, InputMediaBuilder } from "https://deno.land/x/grammy@v1.22.4/mod.ts";
import { load } from "https://deno.land/std@0.221.0/dotenv/mod.ts";

await load({ export: true }) 

const token = Deno.env.get("BOT_TOKEN")!;
const bot = new Bot(token); 

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.command("photo", (ctx) => { 
    const photo = InputMediaBuilder.photo(new InputFile("test_image.jpg"))
    ctx.replyWithMediaGroup([photo]);
});

bot.on("message", (ctx) => ctx.reply("Got another message!"));

bot.start();