let event_loop = require("event_loop");
let gpio = require("gpio");
let mosi = gpio.get("PA7");
let sck = gpio.get("PB3");
let cs = gpio.get("PA4");
mosi.init({ direction: "out", outMode: "push_pull" });
sck.init({ direction: "out", outMode: "push_pull" });
cs.init({ direction: "out", outMode: "push_pull" });

function leds(addr, data) {
    mosi.write(false);
    sck.write(false);
    cs.write(false);

    let mask = 0x80;
    for (let i = 0; i < 8; i++) {
        mosi.write((addr & mask) !== 0);
        sck.write(true);
        sck.write(false);
        mask >>= 1;
    }

    for (let i = 0; i < 8; i++) {
        mosi.write(data[i] !== ' ' && data[i] !== '0');
        sck.write(true);
        sck.write(false);
    }

    cs.write(true);
    mosi.write(true);
    sck.write(true);
}

// Initialize MAX7219 device
leds(0xFF, "00000000");
leds(0x0C, "00000001");
leds(0x09, "00000000");
leds(0x0A, "00000111");
leds(0x0B, "00000111");

for (let loop_counter = 0; loop_counter < 10; loop_counter++) {
    // Draw the pattern (0 = off, 1 = on)
    leds(0x1, "  ****  ");
    leds(0x2, " *    * ");
    leds(0x3, "*      *");
    leds(0x4, "*      *");
    leds(0x5, "*      *");
    leds(0x6, "*      *");
    leds(0x7, " *    * ");
    leds(0x8, "  ****  ");

    delay(250); // Wait 1/4 second

    // Draw the pattern (0 = off, 1 = on)
    leds(0x1, "  ****  ");
    leds(0x2, " *    * ");
    leds(0x3, "*      *");
    leds(0x4, "* *  * *");
    leds(0x5, "*      *");
    leds(0x6, "* **** *");
    leds(0x7, " *    * ");
    leds(0x8, "  ****  ");

    delay(250); // Wait 1/4 second
}
