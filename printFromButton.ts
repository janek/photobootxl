import { disableOverlay, disablePrint } from "./bot.ts";
import {
  overlayTurbulenceOnPhoto,
  takePhoto,
  tileAndPrintPhotos,
} from "./photo.ts";
import { sendLastPhotosToAdmin, sendMessageToAdmin } from "./utils.ts";

sendMessageToAdmin("Button photo triggered!");
for await (const i of Array(4).keys()) {
  sendMessageToAdmin(`${i + 1}!`);
  console.log(`Taking photo from button - ${i + 1}!`);
  const photoFilename = `photo${i}.jpg`;
  await takePhoto(photoFilename);
  if (!disableOverlay) {
    await overlayTurbulenceOnPhoto(photoFilename);
  }
}

await new Promise((resolve) => setTimeout(resolve, 300));
await sendLastPhotosToAdmin();
if (!disablePrint) {
  sendMessageToAdmin("Printing!");
  await tileAndPrintPhotos();
} else {
  sendMessageToAdmin("Printing disabled");
}
