# attiny85

## Overview
The Flipper Zero can be used as an ISP programmer for the ATtiny85 microcontroller.
It can also be used to dump and flash the ATtiny85.

You can install the Flipper Zero AVR Flasher from https://lab.flipper.net/apps/avr_isp

## Blink
The blink program blinks each GPIO pin on the ATtiny85.
This is a good way to confirm that the ATtiny85 is working correctly.
See the blink.ino for directions on connecting to the Flipper Zero.
There is also a "attiny_blink_detect.js" file that will output the blinking pin.

## Max7219
The max7219 program will display the a value between 0 and 999 on a 7-segment display.
The value is incremented automatically or be read from the ADC pin.
`Max7219count` increments the number, while `Max7219temp` reads the ADC pin.

You can copy the .hex and .avr files to `SD Card/apps_data/avr_isp` and load them from the Flipper Zero onto the ATtiny85.