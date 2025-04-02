checkSdkFeatures(["usbdisk"]);

// The actual application uses all of these modules...
let eventLoop = require("event_loop");
let gui = require("gui");
let textBoxView = require("gui/text_box");
let badusb = require("badusb");
let storage = require("storage");

// The code below is a simplification...
let usbdisk = require("usbdisk");
let sizeMb = 4;
let imagePath = "/ext/apps_data/mass_storage/" + sizeMb.toString() + "MB.img";
let imageSize = sizeMb * 1024 * 1024;

if (storage.fileExists(imagePath)) {
    print("Disk image exists!");
} else {
    if (doesSdkSupport(["usbdisk-createimage"])) {
        print("Creating disk image...");
        usbdisk.createImage(imagePath, imageSize);
    } else {
        die("Disk image not present. Please manually create: " + imagePath);
    }
}

print("Attaching storage...");
usbdisk.start(imagePath);

print("Waiting for storage to detatch...");
while (!usbdisk.wasEjected()) {
    delay(1000);
}

print("Ejected, stopping UsbDisk...");
usbdisk.stop();