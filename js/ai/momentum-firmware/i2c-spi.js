// Script cannot work without i2c module so check before
checkSdkFeatures(["i2c"]);

// Script cannot work without spi module so check before
checkSdkFeatures(["spi"]);

// Connect an 24C32N EEPROM to the I2C bus of the board. SDA=pin 15, SCL=pin 16, VCC=pin 9, GND=pin 8.
let i2c = require("i2c");

// Connect a w25q32 SPI device to the Flipper Zero.
// D1=pin 2 (MOSI), SLK=pin 5 (SCK), GND=pin 8 (GND), D0=pin 3 (MISO), CS=pin 4 (CS), VCC=pin 9 (3V3)
let spi = require("spi");

function i2c_find_first_device() {
    let addr = -1;
    for (let try_addr = 0; try_addr !== 0xff; try_addr++) {
        if (i2c.isDeviceReady(try_addr, 5)) {
            addr = try_addr;
            break;
        }
    }
    return addr;
}

let addr = i2c_find_first_device();
if (addr === -1) {
    print("I2C device not found");
    print("Please connect a 24C32N  EEPROM I2C device to the Flipper Zero.");
    print("SDA=pin 15, SCL=pin 16,  VCC=pin 9, GND=pin 8.");
} else {
    print("I2C device found at address: " + addr.toString(16));
    delay(1000);

    // first two bytes are the start address (0x0000)
    // the remaining bytes are the data to store.
    // can also use Uint8Array([0x00, 0x00, ...]) as write parameter
    i2c.write(addr, [0x00, 0x00, 0x41, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47]);
    while (i2c.isDeviceReady(addr, 9) === false) {
        print("Waiting for device to be ready...");
    }

    // write the address to read from (we start at address 0x0001)
    // read 3 bytes - 0x42, 0x43, 0x44
    let data_buf = i2c.writeRead(addr, [0x00, 0x01], 3, 100);
    let data = Uint8Array(data_buf);
    print("Read bytes: " + data.length.toString());
    for (let i = 0; i < data.length; i++) {
        print("data[" + i.toString() + "] = " + data[i].toString(16));
    }

    // read two more bytes (0x45, 0x46) from current address
    data_buf = i2c.read(addr, 2);
    data = Uint8Array(data_buf);
    print("Read bytes: " + data.length.toString());
    for (let i = 0; i < data.length; i++) {
        print("data[" + i.toString() + "] = " + data[i].toString(16));
    }
}


// Display textbox so user can scroll to see all output.
let eventLoop = require("event_loop");
let gui = require("gui");
let textBoxView = require("gui/text_box");
let text = "SPI demo\n";
let textBox = textBoxView.makeWith({
    focus: "end",
    font: "text",
    text: text,
});

function addText(add) {
    text += add;
    textBox.set("text", text);
}

gui.viewDispatcher.switchTo(textBox);

// writeRead returns a buffer the same length as the input buffer.
// We send 6 bytes of data, starting with 0x90, which is the command to read the manufacturer ID.
// Can also use Uint8Array([0x90, 0x00, ...]) as write parameter
// Optional timeout parameter in ms. We set to 100ms.
let data_buf = spi.writeRead([0x90, 0x0, 0x0, 0x0, 0x0, 0x0], 100);
let data = Uint8Array(data_buf);
if (data.length === 6) {
    if (data[4] === 0xEF) {
        addText("Found Winbond device\n");
        if (data[5] === 0x15) {
            addText("Device ID: W25Q32\n");
        } else {
            addText("Unknown device ID: " + data[5].toString(16) + "\n");
        }
    } else if (data[4] === 0x0) {
        addText("Be sure Winbond W25Q32 is connected to Flipper Zero SPI pins.\n");
    } else {
        addText("Unknown device. Manufacturer ID: " + data[4].toString(16) + "\n");
    }
}

addText("\nReading JEDEC ID\n");

// Acquire the SPI bus. Multiple calls will happen with Chip Select (CS) held low.
spi.acquire();

// Send command (0x9F) to read JEDEC ID.
// Can also use Uint8Array([0x9F]) as write parameter
// Note: you can pass an optional timeout parameter in milliseconds.
spi.write([0x9F]);

// Request 3 bytes of data.
// Note: you can pass an optional timeout parameter in milliseconds.
data_buf = spi.read(3);

// Release the SPI bus as soon as we are done with the set of SPI commands.
spi.release();

data = Uint8Array(data_buf);
addText("JEDEC MF ID: " + data[0].toString(16) + "\n");
addText("JEDEC Memory Type: " + data[1].toString(16) + "\n");
addText("JEDEC Capacity ID: " + data[2].toString(16) + "\n");

if (data[0] === 0xEF) {
    addText("Found Winbond device\n");
}
let capacity = data[1] << 8 | data[2];
if (capacity === 0x4016) {
    addText("Device: W25Q32\n");
} else if (capacity === 0x4015) {
    addText("Device: W25Q16\n");
} else if (capacity === 0x4014) {
    addText("Device: W25Q80\n");
} else {
    addText("Unknown device\n");
}

// Wait for user to close the app
eventLoop.subscribe(gui.viewDispatcher.navigation, function (_sub, _, eventLoop) {
    eventLoop.stop();
}, eventLoop);

// This script has no interaction, only textbox, so event loop doesn't need to be running all the time
// We run it at the end to accept input for the back button press to quit
// But before that, user sees a textbox and pressing back has no effect
// This is fine because it allows simpler logic and the code above takes no time at all to run
eventLoop.run();
