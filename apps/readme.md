# Flipper Zero Apps & Games
This page is a collection of applications that have been fixed to work with the latest Flipper Zero firmware & aren't currently available on lab.flipper.net! 

First be sure uFBT is installed for your firmware. The instructions below will install the latest **dev** branch of firmware on your Flipper Zero. Be sure to backup any important files (like captured data) before running the uFBT commands.

- [uFBT installer](#ufbt)
- [Flipper Plane](#flipper-plane) - fixed 03/24/2025. status: [pr](https://github.com/Larry-the-Pig/flipper-plane/pull/2) created. [Please 🌟 here!](https://github.com/moorscheln/flipper-plane)

Sources of apps:
- https://awesome-flipper.com/application/community/
- https://github.com/djsime1/awesome-flipperzero?tab=readme-ov-file
- https://github.com/FroggMaster/FlipperZero

Please contact me on **Discord (@CodeAllNight)** if you know of apps that aren't on https://lab.flipper.net that no longer compile; or leave a comment as an [issue](https://github.com/jamisonderek/flipper-zero-tutorials/issues) in this repo with a link to the GitHub page containing the application.fam file.


## uFBT
This will flash the latest Official firmware onto your Flipper Zero...

### Official firmware
```sh
echo y | python3 -m pip uninstall ufbt
python3 -m pip install --upgrade ufbt
ufbt update --index-url=https://update.flipperzero.one/firmware/directory.json
ufbt update --channel=dev
ufbt update
ufbt flash_usb

```

### Unleashed firmware
```sh
echo y | python3 -m pip uninstall ufbt
python3 -m pip install --upgrade ufbt
ufbt update --index-url=https://up.unleashedflip.com/directory.json
ufbt update --channel=dev
ufbt update
ufbt flash_usb

```

### Momentum firmware
```sh
echo y | python3 -m pip uninstall ufbt
python3 -m pip install --upgrade ufbt
ufbt update --index-url=https://up.momentum-fw.dev/firmware/directory.json
ufbt update --channel=dev
ufbt update
ufbt flash_usb

```



## Flipper Plane
_Category_: **Games**

_Description_: Fly a paper plane through obstacles and get to the bottom of the map!

_Author_: [Larry-the-Pig](https://github.com/Larry-the-Pig/flipper-plane)

_Updates by_: [Michael Orscheln](https://github.com/moorscheln/flipper-plane/tree/michaelorscheln/fix-bugs)

![flipper plane](./screenshots/flipper-plane.png)

```sh
git clone https://github.com/moorscheln/flipper-plane.git
cd flipper-plane
git checkout michaelorscheln/fix-bugs
ufbt launch

```
