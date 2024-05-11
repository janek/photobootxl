import {
  Api,
  InputFile,
  InputMediaBuilder,
} from "https://deno.land/x/grammy@v1.22.4/mod.ts";
import { load } from "https://deno.land/std@0.221.0/dotenv/mod.ts";
await load({ export: true });
export const adminId = Deno.env.get("TELEGRAM_ADMIN_ID")!;
export const botToken = Deno.env.get("BOT_TOKEN")!;

// Send a message without the `bot` object.
const api = new Api(botToken);

export const sendLastPhotosToAdmin = async () => {
  const photos = [];
  for await (const i of Array(4).keys()) {
    const photoFilename = `photo${i}.jpg`;
    const photo = InputMediaBuilder.photo(new InputFile(photoFilename));
    photos.push(photo);
  }
  api.sendMediaGroup(adminId, photos);
};

export const sendMessageToAdmin = async (message: string) => {
  api.sendMessage(adminId, message);
};
