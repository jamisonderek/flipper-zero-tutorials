// Print a message on the display
print("print", 1);

// Print a message to the debugger serial port
console.log("log", 2);

let gpio = require("gpio");
// initialize pin A4 as analog (you can also use PA7, PA6, PC3, PC1, PC0)
gpio.init("PA4", "analog", "no"); // pin, mode, pull

// Set max input voltage to 2.048V (2048mV)
// You can also use 2500 for a 2.5V (2500mV) max input.
gpio.startAnalog(2048);

// Returns the number of millivolts (or the reference voltage if it exceeds the reference voltage)
let pa4_value = gpio.readAnalog("PA4");
print("A4 is " + to_string(pa4_value) + "mV");

gpio.stopAnalog();

let arr_1 = Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
// Prints "len = 10"
print("len =", arr_1.buffer.byteLength);

let arr_2 = Uint8Array(arr_1.buffer.slice(2, 6));
// Prints "slice len = 4"
print("slice len =", arr_2.buffer.byteLength);
// Prints 2,3,4,5 on separate lines.
for (let i = 0; i < arr_2.buffer.byteLength; i++) {
    print(arr_2[i]);
}

let serial = require("serial");
serial.setup("lpuart", 115200);
// serial.write("\n");
serial.write([0x0a]);
let console_resp = serial.expect("# ", 1000);
if (console_resp === undefined) {
    print("No CLI response");
} else {
    serial.write("uci\n");
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
// There's also serial.end(), so you can serial.setup() again in same script
// You can also use serial.readAny(timeout), will avoid starving your loop with single byte reads

let badusb = require("badusb");
let notify = require("notification");
let flipper = require("flipper");
let dialog = require("dialog");
badusb.setup({
    vid: 0xAAAA,
    pid: 0xBBBB,
    mfr_name: "Flipper",
    prod_name: "Zero",
    layout_path: "/ext/badusb/assets/layouts/en-US.kl"
});
dialog.message("BadUSB demo", "Press OK to start");
if (badusb.isConnected()) {
    notify.blink("green", "short");
    print("USB is connected");

    // Act like user typed "Hello, World!" and pressed enter.
    badusb.println("Hello, world!", 10); // 10 ms between characters improves typing.

    // Act like user pressed CTRL+A keys.
    badusb.press("CTRL", "a");
    delay(1000);

    // Act like user typed the name of their Flipper Zero!
    badusb.println(flipper.getName());
    // happy sound + vibro + green status light.
    notify.success();
} else {
    print("USB not connected");
    // beep,beep + vibro + red status light.
    notify.error();
}

// Optional, but allows to interchange with usbdisk
badusb.quit();

//dialog already imported above.
//let dialog = require("dialog");
let result1 = dialog.message("Dialog demo", "Press OK to start");
// prints true if user presses ok.
print(result1);
let dialog_params = ({
    header: "Test_header",
    text: "Test_text",
    button_left: "Left",
    button_right: "Files",
    button_center: "OK"
});
let result2 = dialog.custom(dialog_params);
if (result2 === "") {
    print("Back is pressed");
} else if (result2 === "Files") {
    let result3 = dialog.pickFile("/ext", "*");
    print("Selected", result3);
} else {
    print(result2, "is pressed");
}

// gpio is already defined
//let gpio = require("gpio");
// initialize pins
// Pins of the Flipper Zero are:
// 1 : 5 volts (Normally disconnected, must be enabled in GPIO settings or plug in USB-C cable)
// 2 : PA7 (SPI MOSI & ADC 12)
// 3 : PA6 (SPI MISO & ADC 11)
// 4 : PA4 (SPI CS & ADC 9)
// 5 : PB3 (SPI SCK)
// 6 : PB2 (SPI other)
// 7 : PC3 (ADC 4)
// 8 : GND
// 9 : 3.3 volts
// 10 : PA14 (SWC : software debugger clock)
// 11 : GND
// 12 : PA13 (SIO : software debugger i/o)
// 13 : PB6 (TX : USART transmit)
// 14 : PB7 (RX : USART receive)
// 15 : PC1 (I2C SDA & LPUART TX & ADC 2)
// 16 : PC0 (I2C SCL & LPUART RX & ADC 1)
// 17 : PB14 (1Wire / iBUTTON : has 1K pull-up resistor)
// 18 : GND
// 20 mA max current per GPIO pin (2-7, 10, 12-17)
// 1 Amp max current for 3.3 volt pin
// 1 Amp max current for 5.0 volt pin
gpio.init("PC3", "outputPushPull", "up"); // pin, mode, pull
// pull parameter is "up"/"down"/"no".
print("PC3 is initialized as outputPushPull with pull-up");
gpio.init("PC1", "input", "down"); // pin, mode, pull
print("PC1 is initialized as input with pull-down");
// let led on PC3 blink
gpio.write("PC3", true); // high
delay(1000);
gpio.write("PC3", false); // low
delay(1000);
// read value from PC1 and write it to PC3
for (let i = 0; i < 10; i++) {
    let value = gpio.read("PC1");
    gpio.write("PC3", value);
    value ? print("PC1 is high") : print("PC1 is low");
    delay(100);
}

let keyboard = require("keyboard");
keyboard.setHeader("Example Text Input");
// Default text is optional, pass "" if unused.
// Third param is true if text should be selected.
// NOTE: When the keyboard is displayed it takes the full screen, so any print messages are not visible.  Only the header and default text are visible.
let text = keyboard.text(100, "Default text", true);
// Returns undefined when pressing back
print("Got text:", text);
keyboard.setHeader("Example Byte Input");
// Default data is optional
let result4 = keyboard.byte(6, Uint8Array([1, 2, 3, 4, 5, 6]));
// Returns undefined when pressing back
if (result4 !== undefined) {
    let data = Uint8Array(result4);
    result4 = "0x";
    for (let i = 0; i < data.byteLength; i++) {
        if (data[i] < 0x10) result4 += "0";
        result4 += to_hex_string(data[i]);
    }
}
print("Got data:", result4);

let math = require("math");
print("math.abs(-5):", math.abs(-5));
print("math.acos(0.5):", math.acos(0.5));
print("math.acosh(2):", math.acosh(2));
print("math.asin(0.5):", math.asin(0.5));
print("math.asinh(2):", math.asinh(2));
print("math.atan(1):", math.atan(1));
print("math.atan2(1, 1):", math.atan2(1, 1));
print("math.atanh(0.5):", math.atanh(0.5));
print("math.cbrt(27):", math.cbrt(27));
print("math.ceil(5.3):", math.ceil(5.3));
print("math.clz32(1):", math.clz32(1));
print("math.cos(math.PI):", math.cos(math.PI));
print("math.exp(1):", math.exp(1));
print("math.floor(5.7):", math.floor(5.7));
print("math.max(3, 5):", math.max(3, 5));
print("math.min(3, 5):", math.min(3, 5));
print("math.pow(2, 3):", math.pow(2, 3));
print("math.random():", math.random());
print("math.sign(-5):", math.sign(-5));
print("math.sin(math.PI/2):", math.sin(math.PI / 2));
print("math.sqrt(25):", math.sqrt(25));
print("math.trunc(5.7):", math.trunc(5.7));

let storage = require("storage");
print("script has __dirpath of" + __dirpath);
print("script has __filepath of" + __filepath);
if (storage.exists(__dirpath + "/math.js")) {
    print("math.js exist here.");
} else {
    print("math.js does not exist here.");
}

//storage already defined above.
//let storage = require("storage");
let path = "/ext/storage.test";
function arraybuf_to_string(arraybuf) {
    let string = "";
    let data_view = Uint8Array(arraybuf);
    for (let i = 0; i < data_view.length; i++) {
        string += chr(data_view[i]);
    }
    return string;
}
print("File exists:", storage.exists(path));
print("Writing...");
// write(path, data, offset)
// If offset is specified, the file is not cleared, content is kept and data is written at specified offset
// Takes both strings and array buffers
storage.write(path, "Hello ");
print("File exists:", storage.exists(path));
// Append will create the file even if it doesnt exist!
// Takes both strings and array buffers
storage.append(path, "World!");
print("Reading...");
// read(path, size, offset)
// If no size specified, total filesize is used
// If offset is specified, size is capped at (filesize - offset)
let data = storage.read(path);
// read returns an array buffer, to allow proper usage of raw binary data
print(arraybuf_to_string(data));
print("Removing...")
storage.remove(path);
print("Done")
// There's also:
// storage.copy(old_path, new_path);
// storage.move(old_path, new_path);
// storage.mkdir(path);
// storage.virtualInit(path);
// storage.virtualMount();
// storage.virtualQuit();

let sampleText = "Hello, World!";

let lengthOfText = "Length of text: " + to_string(sampleText.length);
print(lengthOfText);
let start = 7;
let end = 12;
let substringResult = sampleText.slice(start, end);
print(substringResult);
let searchStr = "World";
let result5 = to_string(sampleText.indexOf(searchStr));
print(result5);
let upperCaseText = "Text in upper case: " + to_upper_case(sampleText);
print(upperCaseText);
let lowerCaseText = "Text in lower case: " + to_lower_case(sampleText);
print(lowerCaseText);
let code = "123ABC".charCodeAt(3);
let ch = chr(code);
print ("code = " + to_string(code)); // Prints: "code = 65"
print ("ch = " + to_string(ch)); // Prints: "ch = A"


let submenu = require("submenu");
submenu.addItem("Item 1", 0);
submenu.addItem("Item 2", 1);
submenu.addItem("Item 3", 2);
submenu.setHeader("Select an option:");
let result7 = submenu.show();
// Returns undefined when pressing back
// Prints 0-2 depending on user selection.
print("Result:", result7);

let textbox = require("textbox");
// You should set config before adding text
// Focus (start / end), Font (text / hex)
textbox.setConfig("end", "text");
// Can make sure it's cleared before showing, in case of reusing in same script
// (Closing textbox already clears the text, but maybe you added more in a loop for example)
textbox.clearText();
// Add default text
textbox.addText("Example dynamic updating textbox\n");
// Non-blocking, can keep updating text after, can close in JS or in GUI
textbox.show();
let i = 0;
while (textbox.isOpen() && i < 5) {
    print("console", i++);
    // Add text to textbox buffer
    textbox.addText("textbox " + to_string(i) + "\n");
    delay(500);
}
// If not closed by user (instead i < 5 is false above), close forcefully
if (textbox.isOpen()) {
    textbox.close();
}

