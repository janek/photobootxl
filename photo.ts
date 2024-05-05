export const takePhoto = async (photoFilename: string) => {
  const command = new Deno.Command("sh", {
    args: ["take_photo.sh", photoFilename],
  });
  const output = await command.output();
  if (output.code !== 0) {
    throw new Error(
      `take_photo.sh exited with code ${
        output.code
      } and error message: ${new TextDecoder().decode(output.stderr)}`
    );
  }
};

export const overlayTurbulenceOnPhoto = async (photoFilename: string) => {
  const command = new Deno.Command("sh", {
    args: ["overlay.sh", photoFilename],
  });
  const output = await command.output();
  if (output.code !== 0) {
    throw new Error(
      `overlay.sh exited with code ${
        output.code
      } and error message: ${new TextDecoder().decode(output.stderr)}`
    );
  }
};

export const tileAndPrintPhotos = async () => {
  const tileCommand = new Deno.Command("sh", {
    args: ["tile.sh"],
  });
  const tileOutput = await tileCommand.output();
  if (tileOutput.code !== 0) {
    throw new Error(
      `tile.sh exited with code ${
        tileOutput.code
      } and error message: ${new TextDecoder().decode(tileOutput.stderr)}`
    );
  }

  const printCommand = new Deno.Command("sh", {
    args: ["print.sh"],
  });
  const printOutput = await printCommand.output();
  if (printOutput.code !== 0) {
    throw new Error(
      `print.sh exited with code ${
        printOutput.code
      } and error message: ${new TextDecoder().decode(printOutput.stderr)}`
    );
  }
};
