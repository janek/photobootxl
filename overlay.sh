# Generate random size between 30% and 70% of the original size
SCALE_FACTOR=$(shuf -i 30-90 -n 1)

# Generate a random angle for rotation (in radians; π rad = 180 degrees)
# FFmpeg uses radians, so we need to convert degrees to radians if using degree values
ROTATE_ANGLE=$(awk -v min=-180 -v max=180 'BEGIN{srand(); print int(min+rand()*(max-min+1))}')
ROTATE_RAD=$(awk -v deg=$ROTATE_ANGLE 'BEGIN{print deg*3.14159/180}')

# Get the photo filename from the command line arguments
PHOTO_FILENAME=$1

# Overlay the image and then crop the bottom 20px
ffmpeg -y -i $PHOTO_FILENAME -i assets/turbulence_portal.png -filter_complex \
"[1:v]format=rgba,scale=iw*$SCALE_FACTOR/100:ih*$SCALE_FACTOR/100,rotate=$ROTATE_RAD:c=none:ow=rotw($ROTATE_RAD):oh=roth($ROTATE_RAD),colorchannelmixer=aa=0.2[fg]; \
 [0:v][fg]overlay=(W-w)/2:(H-h)/2,crop=in_w:in_h-20:0:0" $PHOTO_FILENAME
