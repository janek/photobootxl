photoFilename=$1

if [ -f "$photoFilename" ]; then
  rm "$photoFilename"
fi

# Check if the script is running on a Mac
if [[ "$OSTYPE" == "darwin"* ]]; then
    # Use imagesnap for Mac
    imagesnap "$photoFilename"
else
    # Use fswebcam for other systems
    fswebcam --no-banner "$photoFilename"
fi