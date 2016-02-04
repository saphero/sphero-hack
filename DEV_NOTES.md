# DEVELOPER NOTES

#### Known Issues:

- Rely on Noble bluetooth module but is not entirely compatible with this project. Causes glitches to setup of BB-8 and Ollie devices.

- Currently the graphs on the ```/move``` page are not working well for BB-8 devices. This could be due to the Bluetooth LE connection which does not receive a steady stream of packets from the device and instead, dumps information back to the server. This distorts the graphs.

- Intermittent Bluetooth connectivity issues when other paired devices are on.

- BB-8 connection doesn't work according to Sphero module - firstly, orb.connect() does not run and we had to take additional steps to save the orb object. Also, when connecting, we have to emit setupDevice() twice.
