photoFilename=$1

if [ -f "$photoFilename" ]; then
  rm "$photoFilename"
fi

fswebcam --no-banner "$photoFilename"