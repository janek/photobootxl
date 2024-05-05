import {
  overlayTurbulenceOnPhoto,
  takePhoto,
  tileAndPrintPhotos,
} from "./photo.ts";

// sendMessageToAdmin("Button photo triggered!");
// const photos = [];
for await (const i of Array(4).keys()) {
  //   sendMessageToAdmin(`${i + 1}!`);
  console.log(`Taking photo from button - ${i + 1}!`);
  const photoFilename = `button_photo${i}.jpg`;
  await takePhoto(photoFilename);
  await overlayTurbulenceOnPhoto(photoFilename);
  //   const photo = InputMediaBuilder.photo(new InputFile(photoFilename));
  //   photos.push(photo);
}

// sendLastPhotosToAdmin();
await tileAndPrintPhotos();
