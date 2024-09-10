let gpio = require("gpio");

let pins = ["PA7", "PA6", "PA4", "PB3", "PC3"];
let pins_values = [false, false, false, false, false];

for (let i = 0; i < pins.length; i++) {
    gpio.init(pins[i], "input", "no");
    pins_values[i] = gpio.read(pins[i]);
}

while (true) {
    for (let i = 0; i < pins.length; i++) {
        let value = gpio.read(pins[i]);
        if (value !== pins_values[i]) {
            print(pins[i] + " changed to " + (value ? "high" : "low"));
            pins_values[i] = value;
        }
    }
    delay(50);
}