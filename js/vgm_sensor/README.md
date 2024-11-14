# vgm_sensor tutorial

This is an example of extending JavaScript for the Flipper Zero.  The files were used in the [YouTube video](https://youtu.be/EtOZN3Rh47c) which demonstrates the process in detail.

Our [a_demo.js](./a_demo.js) script will display sensor information from the video game module.

The [tone_rotate.js](./tone_rotate.js) script will play a tone using the speaker module.  As you rotate the Flipper (change the yaw reading) the frequency of the tone will increase or decrese.

For a demo of just sounds, please see the [../tones](../tones) example.

# Installing the JavaScript files
Copy the [a_demo.js](./a_demo.js), [tone_rotate.js](./tone_rotate.js) and [speaker_api.js](./speaker_api.js) files to your `SD Card/apps/Scripts` directory.  You can then run the scripts from the Flipper Zero (`Apps`, `Scripts`, `a_demo.js`).

## Installing the C (js_vgm) module
NOTE: The `js_vgm` module is already installed in custom firmware.  If you are using the custom firmware, you can skip this section!

To expose the sensor APIs to JavaScript we used a second technique of creating a module in C and compiling it into the firmware.  This is a more robust technique, but requires more work for everyone that want to use the module.  If you are using enumeration values, they get resolved at compile time so they will always be correct.  You are able to include additional files in your C module, so you can access APIs that aren't part of the firmware (for example, accessing the sensors in the video game module).  The downside is that you have to write C code, and everyone that wants to run your script needs to have their firmware compiled with your module.

To add the native C module to your firmware:
- Follow the steps in [Clone & Deploy firmware](https://github.com/jamisonderek/flipper-zero-tutorials/wiki/Install-Firmware-and-Apps#clone--deploy-firmware) instructions.
- Copy the [js_vgm](./js_vgm) folder to your firmware's `applications/system/js_app/modules/js_vgm` directory on your computer.
- Update your application.fam for js_app, adding an entry in your firmware's `applications/system/js_app/application.fam` file to include the js_vgm module at the bottom of the file.  It should look like the following:
```c
App(
    appid="js_vgm",
    apptype=FlipperAppType.PLUGIN,
    entry_point="js_vgm_ep",
    requires=["js_app"],
    sources=["modules/js_vgm/*.c", "modules/js_vgm/ICM42688P/*.c"],
)
```
- Recompile your firmware and deploy it to your Flipper Zero.  (e.g. Run step 7 again in the *Clone & Deploy firmware* instructions.)

NOTE: If you create a useful module, you should try to make a pull-request to the firmware, so that other people can use your module without having to recompile the firmware.