// Add new feature to JavaScript
// Video Game Module Sensor data!  
// (created using C Module)
let vgm = require("vgm");
// Wait for 1 second so sensor data can be read
delay(1000);
print("Pitch is", vgm.getPitch());
print("Roll is", vgm.getRoll());
print("Yaw is", vgm.getYaw());

// Wait for up to 5 second for the yaw to change
// at least 30 degrees.  Return the change in yaw
// in degrees.
print("Rotate yaw now!");
print("deltaYaw is", vgm.deltaYaw(30.0, 5000));