import {
  InputFile,
  InputMediaBuilder,
} from "https://deno.land/x/grammy@v1.22.4/mod.ts";
import {
  tileAndPrintPhotos,
  takePhoto,
  overlayTurbulenceOnPhoto,
  sendLastPhotosToAdmin,
  sendMessageToAdmin,
} from "./bot.ts";

sendMessageToAdmin("Button photo triggered!");
const photos = [];
for await (const i of Array(4).keys()) {
  sendMessageToAdmin(`${i + 1}!`);
  const photoFilename = `photo${i}.jpg`;
  await takePhoto(photoFilename);
  await overlayTurbulenceOnPhoto(photoFilename);
  const photo = InputMediaBuilder.photo(new InputFile(photoFilename));
  photos.push(photo);
}

sendLastPhotosToAdmin();
await tileAndPrintPhotos();
