let gpio = require("gpio");
let gpio_spi_mosi = "PA7";
let gpio_spi_sck = "PB3";
let gpio_spi_cs = "PA4";
gpio.init(gpio_spi_mosi, "outputPushPull", "none");
gpio.init(gpio_spi_sck, "outputPushPull", "none");
gpio.init(gpio_spi_cs, "outputPushPull", "none");

function leds(addr, data) {
    gpio.write(gpio_spi_mosi, false);
    gpio.write(gpio_spi_sck, false);
    gpio.write(gpio_spi_cs, false);

    let mask = 0x80;
    for (let i = 0; i < 8; i++) {
        gpio.write(gpio_spi_mosi, (addr & mask) !== 0);
        gpio.write(gpio_spi_sck, true);
        gpio.write(gpio_spi_sck, false);
        mask >>= 1;
    }

    for (let i = 0; i < 8; i++) {
        gpio.write(gpio_spi_mosi, data[i] !== ' ' && data[i] !== '0');
        gpio.write(gpio_spi_sck, true);
        gpio.write(gpio_spi_sck, false);
    }

    gpio.write(gpio_spi_cs, true);
    gpio.write(gpio_spi_mosi, true);
    gpio.write(gpio_spi_sck, true);
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

gpio.init(gpio_spi_mosi, "analog", "none");
gpio.init(gpio_spi_sck, "analog", "none");
gpio.init(gpio_spi_cs, "analog", "none");