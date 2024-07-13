let storage = require("storage");

// The Flipper Zero can act like a USB drive!
let usbdisk = require("usbdisk");
if (!storage.exists("/ext/apps_data/mass_storage/8MB.img")) {
    print("Creating image...");
    usbdisk.createImage("/ext/apps_data/mass_storage/8MB.img", 8 * 1024 * 1024);
}
print("Starting UsbDisk...");
usbdisk.start("/ext/apps_data/mass_storage/8MB.img");
print("Started, waiting until ejected...");
while (!usbdisk.wasEjected()) {
    delay(1000);
}
print("Ejected, stopping UsbDisk...");
usbdisk.stop();
print("Done");

// The Flipper Zero supports a Sub-GHz radio
// 315MHz, 390MHz, 433MHz, 868Hz, and 900-915MHz!
let subghz = require("subghz");
subghz.setup();
function printRXline() {
    if (subghz.getState() !== "RX") {
        subghz.setRx(); // to RX
    }
    let rssi = subghz.getRssi();
    let freq = subghz.getFrequency();
    let ext = subghz.isExternal();
    print("rssi: ", rssi, "dBm", "@", freq, "MHz", "ext: ", ext);
}
function changeFrequency(freq) {
    if (subghz.getState() !== "IDLE") {
        subghz.setIdle(); // need to be idle to change frequency
    }
    subghz.setFrequency(freq);
}
subghz.setIdle();
print(subghz.getState()); // "IDLE"
subghz.setRx();
print(subghz.getState()); // "RX"
changeFrequency(433920000);
printRXline();
delay(1000);
let result6 = subghz.transmitFile("/ext/subghz/0.sub");
print(result6 ? "Send success" : "Send failed");
delay(1000);
changeFrequency(315000000);
printRXline();

