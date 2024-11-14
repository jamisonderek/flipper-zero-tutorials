// See https://youtu.be/saIGmyrM_Wc for details, starting around 6:00.
// We create an R-2R ladder using data bits A7, A6, A4, B3, B2, C3 and GND.

let eventLoop = require("event_loop");
let gpio = require("gpio");

let pins = [gpio.get("PA7"), gpio.get("PA6"), gpio.get("PA4"), gpio.get("PB3"), gpio.get("PB2"), gpio.get("PC3")];
for (let i = 0; i < pins.length; i++) {
  pins[i].init({ direction: "out", outMode: "push_pull" });
}

function reset() {
  for (let i = 0; i < pins.length; i++) {
    pins[i].write(false);
  }
}

let delay_ms = 2000;
while (true) {
  // 0b100000 / 0b111111 * 3.3 = 1.65 volts
  print("1.65 volts");
  reset();
  pins[5].write(true);
  delay(delay_ms);

  // 0b101010 / 0b111111 * 3.3 = 2.2 volts
  print("2.2 volts");
  reset();
  pins[5].write(true);
  pins[3].write(true);
  pins[1].write(true);
  delay(delay_ms);

  // 0b010011 / 0b111111 * 3.3 = 1.0 volts
  print("1.0 volts");
  reset();
  pins[4].write(true);
  pins[1].write(true);
  pins[0].write(true);
  delay(delay_ms);
}
