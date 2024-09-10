/*
 Sliding Blink Tester

This program is helpful for validating your Flipper Zero is able to program the ATTiny85.

Flipper Zero AVR Flasher https://lab.flipper.net/apps/avr_isp
Flipper Zero GPIO Reader https://lab.flipper.net/apps/gpio_reader

On Flipper Zero:
- Install the above applications.
- Run the "Apps"/"GPIO"/"AVR Flasher" app.
- Make sure Flipper Zero is wired to your ATTiny85 (see below for wiring diagram)
- Make sure USB cable is connected between Flipper Zero and Computer
- Choose "ISP Programmer"
- You should see "AVR chip detected!" along with "ATtiny85"
- Click the RIGHT button for "Next>"
- "ISP mode active" should be shown and USB should attach a new COM port.

In Arduino IDE:
- Choose "File" then "Preferences" then Add the following two lines to Additional Board Manager URLS...
  http://drazzy.com/package_drazzy.com_index.json
  https://raw.githubusercontent.com/damellis/attiny/ide-1.6.x-boards-manager/package_damellis_attiny_index.json
- OPTIONAL: Choose "File", then "Preferences" then "Show verbose output during upload".
- Choose "Tools", "Board", "Board Manager..."
- Filter by "tiny85"
- Install "attiny" and/or "ATTinyCore" (pick your favorite author, its just like the Flipper Firmware choice)
- Run ISP on Flipper*
- Choose "Tools", "Port", pick the serial port for the Flipper ISP programmer.
- Choose "Tools", "Get Board Info".
  - It should show "VID: 0x0473", "PID: 0x5740" and SN "FLIP_(flippername)".
- For "attiny" do this...
  - Choose "Tools", "Board", "attiny", "ATTiny25/45/85"
  - Choose "Tools", "Clock", "Internal 1MHz" (for lower power) or "Internal 8MHz" for faster GPIO.
  - Choose "Tools", "Processor", "ATtiny85"
- Or for "ATTinyCore" do this...
  - Choose "Tools", "Board", "ATTinyCore", "ATtiny25/45/85 (no bootloader)"
  - Choose "Tools", "Chip", "ATtiny85"
  - Choose "Tools", "Clock Source", "1MHz (internal)" (for lower power) or "8MHz (internal)" for faster GPIO.
- Choose "Tools", "Programmer", "AVR ISP" or "Arduino as ISP" (both seem to use -cstk500v1 flag for avrdude)
- Choose "Tools", "Burn bootloader" (this will also update the speed of the ATTiny85)
- Choose "Sketch", "Upload Using Programmer". This will upload this blink sketch to your processor

On Flipper Zero:
- Make sure you have done the above steps and programmed your ATtiny85 with this blink sketch.
- Make sure Flipper Zero is still wired to your ATTiny85.
- Run the "Apps"/"GPIO"/"[GPIO] Reader" app.
- NOTE: On pin PB2 do not use the UP/DOWN buttons, as this will activate pull-ups/downs and cause a RESET.
- The reader should be on "PA7" & say high impedence.
- The value should toggle between "High" and "Low" as the ATtiny85 blinks the pin.
- You should be able to use LEFT/RIGHT buttons to see other pins and find the blinking pin!
- The ATtiny85 blinks Flipper Zero GPIO pins in the following order... PA7, PA6, PA4, PB3, [NOT PB2], PC3
- NOTE: PB2 is a RESET pin, so we don't program that as GPIO (so we can RESET new sketches later).

Ordered list Flipper (pins 1..9)
 Flipper PA7 (pin 2) = ATTiny85 PB0 (pin 5) = MOSI
 Flipper PA6 (pin 3) = ATTiny85 PB1 (pin 6) = MISO
 Flipper PA4 (pin 4) = ATTiny85 PB4 (pin 3) = [Optional CLOCK]
 Flipper PB3 (pin 5) = ATTiny85 PB2 (pin 7) = SCK
 Flipper PB2 (pin 6) = ATTiny85 RESET (pin 1) = RESET
 Flipper PC3 (pin 7) = ATTiny85 PB3 (pin 2) = [Unused in Programming]
 Flipper GND (pin 8 or 11) = ATTiny85 GND (pin 4) = GND
 Flipper 3V3 (pin 9) = ATTiny85 VCC (pin 8) = VCC

Ordered list ATTiny85 (pins 1...8)
 Flipper PB2 (pin 6) = ATTiny85 RESET (pin 1) = RESET
 Flipper PC3 (pin 7) = ATTiny85 PB3 (pin 2) = [Unused in Programming]
 Flipper PA4 (pin 4) = ATTiny85 PB4 (pin 3) = [Optional CLOCK]
 Flipper GND (pin 8 or 11) = ATTiny85 GND (pin 4) = GND
 Flipper PA7 (pin 2) = ATTiny85 PB0 (pin 5) = MOSI
 Flipper PA6 (pin 3) = ATTiny85 PB1 (pin 6) = MISO
 Flipper PB3 (pin 5) = ATTiny85 PB2 (pin 7) = SCK
 Flipper 3V3 (pin 9) = ATTiny85 VCC (pin 8) = VCC

 Blinks Flipper Zero GPIO pins in the following order... PA7, PA6, PA4, PB3, [PB2 is RESET], PC3
*/

#define MY_LED 0

// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(0, OUTPUT);
  pinMode(1, OUTPUT);
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);
}

void blink(int pin, int speed) {
  for (int i=0; i<5; i++) {
    digitalWrite(pin, true);
    delay(speed);
    digitalWrite(pin, false);
    delay(speed);
  }
}

int pin_map[] = {0,1,4,2,3}; // PA7, PA6, PA4, PB3, [PB2 is RESET], PC3

// the loop function runs over and over again forever
void loop() {
  for (int i=0;i<5;i++) {
    blink(pin_map[i], 100);
  }
}
