let usbdisk = require("usbdisk");

let exfilCapacityMb = 4; // Reserve space for our image (payloads and results).
let image = __dirname + "/Demo_" + exfilCapacityMb.toString() + "MB.img";

usbdisk.start(image);

let i = 0;
while (true) {
    delay(1000);
    print(i++);
}