export const takePhoto = async (photoFilename: string) => {
  const command = new Deno.Command("fswebcam", {
    args: [photoFilename],
  });
  const output = await command.output();
  if (output.code !== 0) {
    throw new Error(
      `fswebcam exited with code ${
        output.code
      } and error message: ${new TextDecoder().decode(output.stderr)}`
    );
  }
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
