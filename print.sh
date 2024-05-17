if [ "${DISABLE_PRINT}" = "true" ]; then
    echo "Print disabled, exiting early."
    exit 0
fi

rm -rf print.pdf
convert tiled_photos.jpg print.pdf
lp -d EPSON_ET_2850_Series print.pdf