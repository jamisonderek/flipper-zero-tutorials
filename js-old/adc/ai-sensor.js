// Script created by ChatGPT 4
// @CodeAllNight / MrDerekJamison
// Discord server - https://discord.com/invite/NsjCvqwPAd
// Github - https://github.com/jamisonderek/flipper-zero-tutorials

// Flipper Zero JavaScript ADC (Analog-to-Digital Converter) demo.

// Required hardware connections...
// Step 1. Connect a NTC Thermistor (R0:2K, B:3470K) to 3.3V and Pin A7.
// Step 2. Connect a 2.2K Resistor to Pin A7 and GND.

// Requires MNTM-005 (or current Momentum dev build)

let gpio = require("gpio");
let Math = require("math");

// Constants for the thermistor calculation
let B = 3470; // B value of the thermistor
let R0 = 2000; // Resistance of the thermistor at T0 (in ohms)
let T0 = 298.15; // Reference temperature (25°C in Kelvin)
let Vref = 3.3; // Reference voltage in volts

// Initialize pin A7 as analog
gpio.init("PA7", "analog", "no");

// Start analog reading with a reference voltage of 3.3V
gpio.startAnalog(2048); // vRef = 2.048V (scaled)

function readTemperature() {
    let millivolts = gpio.readAnalog("PA7");

    // Voltage divider calculation
    let R1 = 2200; // Known resistor value in ohms (2.2kΩ)
    let Vout = millivolts / 1000; // Convert millivolts to volts

    if (Vout === 0) {
        return 0;
    }

    let Rt = R1 * (Vref / Vout - 1); // Corrected thermistor resistance calculation

    // Steinhart-Hart equation to calculate temperature in Kelvin
    let logRt = Math.log(Rt / R0);
    let invT = (1 / T0) + (1 / B) * logRt;
    let tempK = 1 / invT;
    let tempC = tempK - 273.15; // Convert Kelvin to Celsius
    let tempF = tempC * 9 / 5 + 32; // Convert Celsius to Fahrenheit

    return tempF;
}

function formatTemperature(temp) {
    let roundedTemp = Math.floor(temp * 100 + 0.5) / 100; // Round to two decimal places
    let intPart = Math.floor(roundedTemp); // Integer part
    let fracPart = Math.floor((roundedTemp - intPart) * 100); // Fractional part

    let intPartStr = to_string(intPart);
    let fracPartStr = fracPart < 10 ? '0' + to_string(fracPart) : to_string(fracPart); // Ensure two digits in the fractional part

    return intPartStr + '.' + fracPartStr;
}

// Main loop to read and display the temperature every second
while (true) {
    let tempF = readTemperature();
    if (tempF !== 0) { // Ignore invalid measurements
        print("Temperature: " + formatTemperature(tempF) + " F"); // Use " F" instead of "°F"
    }
    delay(1000); // Wait for 1 second
}

gpio.stopAnalog();