/*
Flipper Zero JavaScript is based on the mJS engine, which is fairly restricted.  

For example:
- You must use the `let` keyword.  `const` and `var` are not allowed!
- You cannot do string interpolation with the `$`.
- You must use `let math = require("math");` if you need access to any of the math functions.
- You must use `toString` to convert numerics (like integer and float) into a string.
- Before using the `gpio` module you must do... let eventLoop = require("event_loop"); let gpio = require("gpio");
- Before using the `gui` module you must do... let eventLoop = require("event_loop"); let gui = require("gui");
- When keyboard.text display the on-screen keyboard, it covers the entire screen (so you can't see any previously printed information).
- All files are stored on the SD Card under the `/ext/` subdirectory.
- Delays are always measured in milliseconds and use the built-in `delay` function.
- Uint8Array(buffer) instead of `new Uint8Array(buffer)`.  
- Objects like `String` do not exist.  
- There is no split or trim functions built-in for strings.  "1,2".split(","); and "x  ".trim(); will generate runtime errors!
- See this training file for how to use the toUpperCase, toLowerCase, parseInt.  
- You can get the ascii value of a character in a string using charCodeAt and also convert an ascii value back to a char using chr.
- Console methods output to the serial port debugger. The print method writes to the Flipper display.
- Functions must be declared before they are used, but typically after all of the require statements.
*/

// The following example code is based on many of the example scripts from the Flipper Zero firmware: 
// array_buf_test.js, bad_uart.js, console.js, delay.js, gpio.js, math.js, notify.js, 
// path.js, storage.js, stringutils.js, uart_echo.js, uart_echo_8e1.js.

// I recommend you also look at event_loop.js, gui.js & interactive.js for a full list of methods you can call.


let serial = require("serial");

let eventLoop = require("event_loop");
// Note: "gpio" and "gui" modules have a dependency on "event_loop" getting loaded first.
let gpio = require("gpio");

let math = require("math");

let notify = require("notification");

let storage = require("storage");

// print is a built-in method (displays on screen)
print("print", 1);

// console is a built-in object and has 4 log levels.
// Log is via the serial port (connect via CLI and use "log debug" to see all messages).
// the param is ...args.
console.log("log", 2); // Logs message: [I][JS] log 2 
// delays 500 milliseconds before running next line.
delay(500);
console.warn("warn", 3); // Logs message: [W][JS] warn 3
delay(500);
console.error("error", 4); // Logs message: [E][JS] error 4 
delay(500);
console.debug("debug", 5); // Logs message: [D][JS] debug 5 


// da-da (red LED)
notify.error();
delay(5000);

// ta-da-da-da (green LED)
notify.success();
delay(2000);

// color ONLY supports: "red", "green", "blue", "yellow", "cyan", "magenta"
// duration ONLY supports: "short" (10ms) or "long" (100ms).
for (let i = 0; i < 10; i++) {
    notify.blink("red", "short");
    delay(500);
}

// Built-in variables for directory and name of running script.
print("script has __dirname of" + __dirname);
print("script has __filename of" + __filename);

// Defaults to base 10
print(parseInt("123")); // prints 123
print(parseInt("123", 16)); // prints 291
print("HAPPY".charCodeAt(1)); // prints 65 (ascii for A, character at index 1)
print(chr(65)); // prints "A" (ascii 65 is A)

print("math.abs(-5):", math.abs(-5)); // 5
print("math.acos(0.5):", math.acos(0.5)); // 1.047198
print("math.acosh(2):", math.acosh(2)); // 1.316958
print("math.asin(0.5):", math.asin(0.5)); // 0.474089
print("math.asinh(2):", math.asinh(2)); // 1.443635
// print("math.atan(1):", math.atan(1)); // crashes
// print("math.atan2(1, 1):", math.atan2(1, 1)); // crashes
print("math.atanh(0.5):", math.atanh(0.5)); // 0.549306
print("math.cbrt(27):", math.cbrt(27)); // 3
print("math.ceil(5.3):", math.ceil(5.3)); // 6
print("math.clz32(1):", math.clz32(1)); // 31
print("math.cos(math.PI):", math.cos(math.PI)); // -1.000000
print("math.exp(1):", math.exp(1)); // 2.718282
print("math.floor(5.7):", math.floor(5.7)); // 5
print("math.max(3, 5):", math.max(3, 5)); // 5
print("math.min(3, 5):", math.min(3, 5)); // 3
print("math.pow(2, 3):", math.pow(2, 3)); // 8
print("math.random():", math.random()); // 0.078615 (changes each call)
print("math.sign(-5):", math.sign(-5)); // -1
print("math.sin(math.PI/2):", math.sin(math.PI / 2)); // 1.000000
print("math.sqrt(25):", math.sqrt(25)); // 5
print("math.trunc(5.7):", math.trunc(5.7)); // 5

// You MUST use "let" keyword to define variables. The "var" keyword is not supported!
let sampleText = "Hello, World!";

let lengthOfText = "Length of text: " + sampleText.length.toString();
print(lengthOfText);

let start = 7;
let end = 12;
let substringResult = sampleText.slice(start, end);
print(substringResult);

let searchStr = "World";
let result2 = sampleText.indexOf(searchStr).toString();
print(result2);

let upperCaseText = "Text in upper case: " + sampleText.toUpperCase();
print(upperCaseText);

let lowerCaseText = "Text in lower case: " + sampleText.toLowerCase();
print(lowerCaseText);


// Uint8Array is a built-in type
let arr_1 = Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
print("len =", arr_1.buffer.byteLength);

let arr_2 = Uint8Array(arr_1.buffer.slice(2, 6));
print("slice len =", arr_2.buffer.byteLength);
for (let i = 0; i < arr_2.buffer.byteLength; i++) {
    print(arr_2[i]);
}


let path = "/ext/storage.test";

print("File exists:", storage.fileExists(path));

print("Writing...");
let file = storage.openFile(path, "w", "create_always");
file.write("Hello ");
file.close();

print("File exists:", storage.fileExists(path));
// mode "w" is for write-only, "r" for read-only, "rw" is for read-write.
// "open_existing" : open file or fail if it doesn't exist
// "open_always" : open file or create a new empty one if it doesn't exist
// "open_append" : open file and set r/w pointer to EOF, or create a new one if it doesn't exist
// "create_new" : create new file or fail if it exists
// "create_always" : truncate and open file, or create a new empty one if it doesn't exist
file = storage.openFile(path, "w", "open_append");
file.write("World!");
file.close();

print("Reading...");
file = storage.openFile(path, "r", "open_existing");
let text = file.read("ascii", 128);
file.close();
print(text);

print("Removing...");
storage.remove(path);

print("Done");



// The "lpuart" port uses pins 15 (TX) & 16 (RX) of the Flipper Zero.
// The "usart" port uses pins 13 (TX) & 14 (RX) of the Flipper Zero.
serial.setup("lpuart", 115200);

// write takes a string or an array.
// serial.write("\n");
serial.write([0x0a]);

// timeout in is milliseconds.
let console_resp = serial.expect("# ", 1000);

// You must use === and !== operators for equality.
if (console_resp === undefined) {
    print("No CLI response");
} else {
    serial.write("uci\n");

    // No timeout specified, so this will wait forever.
    let uci_state = serial.expect([": not found", "Usage: "]);

    if (uci_state === 1) {
        serial.expect("# ");
        serial.write("uci show wireless\n");
        serial.expect(".key=");
        print("key:", serial.readln());
    } else {
        print("uci cmd not found");
    }
}

// End the serial so we can call setup again.
serial.end();

// This script is like uart_echo, except it uses 8E1 framing (8 data bits, even
// parity, 1 stop bit) as opposed to the default 8N1 (8 data bits, no parity,
// 1 stop bit)

serial.setup("usart", 230400, { dataBits: "8", parity: "even", stopBits: "1" });

while (1) {
    // timeout is in milliseconds
    let rx_data = serial.readBytes(1, 1000);
    // NOTE: You could also use serial.readAny(timeout), to avoid starving your loop with single byte reads

    if (rx_data !== undefined) {
        serial.write(rx_data);
        let data_view = Uint8Array(rx_data);
        // Display number as base 16
        print("0x" + data_view[0].toString(16));
        if (data_view[0] === 0) {
            break;
        }
    }
}


// initialize pins
let led = gpio.get("pc3"); // same as `gpio.get(7)`
let led2 = gpio.get("pa7"); // same as `gpio.get(2)`
let pot = gpio.get("pc0"); // same as `gpio.get(16)`
let button = gpio.get("pc1"); // same as `gpio.get(15)`
led.init({ direction: "out", outMode: "push_pull" });
pot.init({ direction: "in", inMode: "analog" });
button.init({ direction: "in", pull: "up", inMode: "interrupt", edge: "falling" });

// blink led
print("Commencing blinking (PC3)");
eventLoop.subscribe(eventLoop.timer("periodic", 1000), function (_, _item, led, state) {
    led.write(state);
    return [led, !state];
}, led, true);

// cycle led pwm
print("Commencing PWM (PA7)");
eventLoop.subscribe(eventLoop.timer("periodic", 10), function (_, _item, led2, state) {
    led2.pwmWrite(10000, state);
    return [led2, (state + 1) % 101];
}, led2, 0);

// read potentiometer when button is pressed
print("Press the button (PC1)");
eventLoop.subscribe(button.interrupt(), function (_, _item, pot, event_loop) {
    let mV = pot.readAnalog();
    print("PC0 is at", mV, "mV");
    if (mV === 1337) {
        // Stop processing events once the voltage is 1.337 volts
        event_loop.stop();
    }
}, pot, eventLoop);

// the program will just exit unless this is here
eventLoop.run();

// Set pins back to input, so we aren't trying to sink/source current.
button.init({ direction: "in", inMode: "analog" });
led.init({ direction: "in", inMode: "analog" });
led2.init({ direction: "in", inMode: "analog" });

// possible pins https://docs.flipper.net/gpio-and-modules#miFsS
// "PA7" aka 2
// "PA6" aka 3
// "PA4" aka 4
// "PB3" aka 5
// "PB2" aka 6
// "PC3" aka 7
// "PA14" aka 10
// "PA13" aka 12
// "PB6" aka 13
// "PB7" aka 14
// "PC1" aka 15
// "PC0" aka 16
// "PB14" aka 17

// possible modes
// { direction: "out", outMode: "push_pull" }
// { direction: "out", outMode: "open_drain" }
// { direction: "out", outMode: "push_pull", altFn: true }
// { direction: "out", outMode: "open_drain", altFn: true }
// { direction: "in", inMode: "analog" }
// { direction: "in", inMode: "plain_digital" }
// { direction: "in", inMode: "interrupt", edge: "rising" }
// { direction: "in", inMode: "interrupt", edge: "falling" }
// { direction: "in", inMode: "interrupt", edge: "both" }
// { direction: "in", inMode: "event", edge: "rising" }
// { direction: "in", inMode: "event", edge: "falling" }
// { direction: "in", inMode: "event", edge: "both" }
// all variants support an optional `pull` field which can either be undefined,
// "up" or "down"
