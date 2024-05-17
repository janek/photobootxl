photoFilename=$1

if [ -f "$photoFilename" ]; then
  rm "$photoFilename"
fi

if [[ "$OSTYPE" == "darwin"* ]]; then
    # MacOS
    say "$phtoFilename"
    imagesnap "$photoFilename"
else
    # Raspberry Pi / Linux
    espeak "$photoFilename"
    fswebcam --no-banner "$photoFilename"
fi