import os
import RPi.GPIO as GPIO
import time

# Set up GPIO:
GPIO.setmode(GPIO.BCM)  # Use BCM GPIO numbering
GPIO.setup(11, GPIO.IN, pull_up_down=GPIO.PUD_UP)  # Set GPIO11 as input with pull-up

try:
    while True:
        button_state = GPIO.input(11)
        if button_state == False:
            print("Button Pressed!")
            os.system("echo hishell")
            os.system("deno printFromButton.ts")
        else:
            print("Button Released!")
        time.sleep(1)  # Delay for debounce and to reduce CPU usage

finally:
    GPIO.cleanup()  # Clean up GPIO on normal exit
