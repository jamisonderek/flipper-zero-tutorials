// Script created in video https://youtu.be/ETn9E4L6EY0
// @CodeAllNight / MrDerekJamison
// Discord server - https://discord.com/invite/NsjCvqwPAd
// Github - https://github.com/jamisonderek/flipper-zero-tutorials

// Flipper Zero JavaScript ADC (Analog-to-Digital Converter) demo.

// Required hardware connections...
// Step 1. Connect a NTC Thermistor (R0:2K, B:3470K) to 3.3V and Pin A7.
// Step 2. Connect a 2.2K Resistor to Pin A7 and GND.

// Requires MNTM-008 (or current Momentum dev build)

// NOTE: The "gpio" module requires that "event_loop" be loaded first.
let eventLoop = require("event_loop");
let gpio = require("gpio");
let Math = require("math");

let tempSensor = gpio.get("PA7");
// 2048mV reference voltage
tempSensor.init({ direction: "in", inMode: "analog" });

function mvToSensorResistance(millivolts) {
  let Rfixed = 2200; // 2200 ohm fixed resistor
  let Vtotal = 3.3; // resistor + sensor series connected to 3.3
  let Vrfixed = millivolts / 1000; // millivolts to volts
  let I = Vrfixed / Rfixed;
  let Rtotal = Vtotal / I;
  let Rsensor = Rtotal - Rfixed;
  return Rsensor;
}

function resistanceToCelsius(rsensor) {
  // B value of the thermistor
  let B = 3470;
  // Reference temp (25°C in Kelvin) 
  let T0 = 273.15 + 25;
  // Resistance of the thermistor at T0 (in ohms)
  let R0 = 2000;
  // B or β parameter equation 
  // from https://en.wikipedia.org/wiki/Thermistor
  let invT = (1 / T0) + (1 / B) * Math.log(rsensor / R0);
  let tempK = 1 / invT;
  // Convert Kelvin to Celsius
  let tempC = tempK - 273.15;
  return tempC;
}

// Function to print 1 digits after decimal written by ChatGPT 4o.
function formatTemperature(temp) {
  let roundedTemp = Math.floor(temp * 10 + 0.5) / 10; // Round to one decimal place
  let intPart = Math.floor(roundedTemp); // Integer part
  let fracPart = Math.floor((roundedTemp - intPart) * 10); // Fractional part
  return intPart.toString() + '.' + fracPart.toString();
}

for (let i = 0; i < 50; i++) {
  let mv = tempSensor.readAnalog();
  let sensor_resistance = mvToSensorResistance(mv);
  let tempC = resistanceToCelsius(sensor_resistance);
  let msg = mv.toString() + " mV:";
  msg = msg + sensor_resistance.toString() + " Ohms:";
  msg = msg + formatTemperature(tempC) + " C";
  print(msg);
  delay(1000); // 1 second
}

