// This script will create an "subghz-backup.img" image file in the root of the SD Card.
// It will then copy the contents of the "/ext/subghz" directory to the image file.
// The image file will be mounted as a virtual disk and the user can access it via USB.
// The user can then eject the virtual disk and the image file will be removed from the SD Card.
// Idea from : jeffman78 (https://github.com/jamisonderek/flipper-zero-tutorials/issues/44)

checkSdkFeatures(["usbdisk"]);
checkSdkFeatures(["storage-virtual"]);

let storage = require("storage");
let usbdisk = require("usbdisk");

let path = "/ext/subghz";
let imagePath = "/ext/subghz-backup.img";
let imageSize = 4 * 1024 * 1024; // NOTE: Our backup file is up to 4MB is size!

function copyFile(path, source) {
    if (path.length < 6) { // path should be "/ext/X" where X is the directory.
        return;
    }

    let rel = path.slice(5, path.length); // Drop the "/ext/" part of the path.
    let sourcePath = path + "/" + source;
    let targetPath = "/mnt/" + rel + "/" + source; // Virtual disk is "/mnt/".
    print(targetPath);
    if (storage.copy(sourcePath, targetPath)) {
        console.log("Copy Success " + sourcePath + " to " + targetPath);
    } else {
        console.error("Copy Error " + sourcePath + " to " + targetPath);
    }
}

function copyDir(path, recursive) {
    let dir = storage.readDirectory(path);
    if (dir !== undefined) {

        if (path.length >= 5) {
            let rel = path.slice(5, path.length);
            let targetPath = "/mnt/" + rel;
            if (!storage.fileExists(targetPath)) {
                console.log("Creating directory " + targetPath);
                if (storage.makeDirectory(targetPath)) {
                    console.log("Directory created " + targetPath);
                } else {
                    console.error("Directory create failed " + targetPath);
                }
            }
        }

        for (let i = 0; i < dir.length; i++) {
            if (recursive && dir[i].isDirectory) {
                print("dir: ", dir[i].path);
                copyDir(path + "/" + dir[i].path);
            } else {
                print("file: ", dir[i].path);
                print("size:", dir[i].size);
                print("time:", dir[i].timestamp);
                copyFile(path, dir[i].path);
            }
        }
    }
}

if (!storage.fileExists(imagePath)) {
    usbdisk.createImage(imagePath, imageSize);
}

storage.virtualInit(imagePath);
storage.virtualMount();
copyDir(path, true);
storage.virtualQuit();

usbdisk.start(imagePath);
print("Disk attached. Eject to exit...");
while (!usbdisk.wasEjected()) {
    delay(1000);
}
usbdisk.stop();