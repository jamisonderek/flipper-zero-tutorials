# Modulation
The following .SUB files have the same data encoded with various modulations.  I found it helpful to load the various .SUB files and play them with a Flipper Zero to an SDR to visually understand how the data looks when viewed with an SDR application.

All of the following files are the same Princeton signal, but encoded with different presets that ship in at least one firmware...
- [E-P-AM270.sub](./E-P-AM270.sub) - This file use **FuriHalSubGhzPresetOok270Async** ("AM270") preset.
- [E-P-AM650.sub](./E-P-AM650.sub) - This file use **FuriHalSubGhzPresetOok650Async** ("AM650") preset.
- [E-P-FM238.sub](./E-P-FM238.sub) - This file use **FuriHalSubGhzPreset2FSKDev238Async** ("FM238") preset. 2.38kHz deviation.
- [E-P-Pagers.sub](./E-P-Pagers.sub) - This file use **Custom** ("Pagers") preset. 5.16Hz deviation.
- [E-P-FM95.sub](./E-P-FM95.sub) - This file use **Custom** ("FM95") preset. 9.52kHz deviation.
- [E-P-FM15k.sub](./E-P-FM15k.sub) - This file use **Custom** ("FM15k") preset. 15.87Hz deviation. PATable ramp: 00 12 0E 34 60 C5 C1 C0.
- [E-P-Honda1.sub](./E-P-Honda1.sub) - This file use **Custom** ("FM15k") preset. 15.87Hz deviation. (No ramp) DataRate: 14k. ACG: 33dB.
- [E-P-Honda2.sub](./E-P-Honda2.sub) - This file use **Custom** ("FM15k") preset. 15.87Hz deviation. (No ramp) DataRate: 14k. ACG: 42dB.
- [E-P-FM476.sub](./E-P-FM476.sub) - This file use **FuriHalSubGhzPreset2FSKDev476Async** ("FM476") preset. 47.6kHz deviation.

This looks at presets that uses different modulations, including ASK and GFSK.
- [433am650.sub](./433am650.sub) - This file uses **FuriHalSubGhzPresetOok650Async** ("AM650") preset.
- [433amASK.sub](./433amASK.sub) - This file uses **02 0D 03 07 08 32 0B 06 14 00 13 00 12 30 11 32 10 17 18 18 19 18 1D 90 1C 00 1B 07 20 FB 22 11 21 B6 00 00 2A 60 00 00 00 00 00 00**. Register 1D: 4dB decision boundary. Off=(0.25mW or -6dBm) On=(1.0mW or 0dBm)
- [433fm238.sub](./433fm238.sub) - This file uses **FuriHalSubGhzPreset2FSKDev238Async** ("FM238") preset.
- [433fm476.sub](./433fm476.sub) - This file uses **FuriHalSubGhzPreset2FSKDev476Async** ("FM476") preset.
- [433fm-wide.sub](./433fm-wide.sub) - This file uses **02 0D 0B 06 08 32 07 04 14 00 13 02 12 04 11 83 10 67 15 64 18 18 19 16 1D 91 1C 00 1B 07 20 FB 22 10 21 56 00 00 C0 00 00 00 00 00 00 00**. Register 15: 64. (152.34kHz devication)
- [433gfsk476.sub](./433gfsk476.sub) - This file uses **02 0D 0B 06 08 32 07 04 14 00 13 02 12 14 11 83 10 67 15 47 18 18 19 16 1D 91 1C 00 1B 07 20 FB 22 10 21 56 00 00 C0 00 00 00 00 00 00 00**. Register 15: 47. (47.6kHz deviation)
- [433gfsk476.sub](./433gfsk476.sub) - This file uses **02 0D 0B 06 08 32 07 04 14 00 13 02 12 14 11 83 10 67 15 47 18 18 19 16 1D 91 1C 00 1B 07 20 FB 22 10 21 56 00 00 C0 00 00 00 00 00 00 00**. Register 15: 47. (47.6kHz deviation)
- [433gfsk-wide.sub](./433gfsk-wide.sub) - This file uses **02 0D 0B 06 08 32 07 04 14 00 13 02 12 14 11 83 10 67 15 64 18 18 19 16 1D 91 1C 00 1B 07 20 FB 22 10 21 56 00 00 C0 00 00 00 00 00 00 00**. Register 15: 64. (152.34kHz deviation)

This looks at different protocols.
- [E-Came12-Single.sub](./E-Came12-Single.sub) - This file has a single "Came12" signal.
- [E-Princeton-Single.sub](./E-Princeton-Single.sub) - This file has a single "Princeton" signal.
- [E-Linear-Single.sub](./E-Linear-Single.sub) - This file has a single "Linear" signal.
- [E-DH0005-Single.sub](./E-DH0005-Single.sub) - This file has a single "DoorHan (KeeLoq)" signal.

- [E-Came12-Held.sub](./E-Came12-Held.sub) - This file has multiple "Came12" signals.
- [E-Princeton-Held.sub](./E-Princeton-Held.sub) - This file has multiple "Princeton" signals.
- [E-Linear-Held.sub](./E-Linear-Held.sub) - This file has multiple "Linear" signals.
- [E-DH0005-Held.sub](./E-DH0005-Held.sub) - This file has multiple "DoorHan (KeeLoq)" signals.

You can hear when data alternates, but not easily tell which duty cycle.
- [E-Linear-Held.sub](./E-Linear-Held.sub) - This file has multiple "Linear" signals.
- [E-Linear1500500.sub](./E-Linear1500500.sub) - This file has multiple "Linear" signals, with all data being 1515 -516.
- [E-Linear5001500.sub](./E-Linear5001500.sub) - This file has multiple "Linear" signals, with all data being 515 -1516.

Rolling code, part of code is "encrypted" and part is "fixed".
- [E-DH0005-Held.sub](./E-DH0005-Held.sub) - This is button count "0005" using DoorHan (KeeLoq).
- [E-DH0006-Held.sub](./E-DH0006-Held.sub) - This is button count "0006" using DoorHan (KeeLoq).