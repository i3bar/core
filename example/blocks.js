const { I3Block } = require("../lib/i3bar.js");
const { networkInterfaceIPAddress, getTime, getBattery, getVolume, getBrightness, getOsUsername } = require("./utils");

const timeBlock = new I3Block({ full_text: getTime });
const batteryBlock = new I3Block({ full_text: getBattery });
const volumeBlock = new I3Block({ full_text: getVolume, name: "volume" });
const brightnessBlock = new I3Block({ full_text: getBrightness, name: "brightness" });
const userBlock = new I3Block({ full_text: getOsUsername, name: "username" });
const networkBlock = new I3Block({ full_text: () => networkInterfaceIPAddress("wlp1s0") });
// List your network interfaces with Node.js in a new terminal:
// /usr/bin/node -e 'console.log(require("os").networkInterfaces())' 

module.exports = {
  timeBlock,
  batteryBlock,
  volumeBlock,
  brightnessBlock,
  userBlock,
  networkBlock
};
