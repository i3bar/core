const { readFile } = require("fs");
const { exec } = require("child_process");
const { userInfo, networkInterfaces } = require("os");

function addLeadingZero(input) {
  return input.toString().padStart(2, "0");
}

function getFileContent(path) {
  return new Promise(function(resolve) {
    readFile(path, function(error, data) {
      if (error) {
        resolve(false);
      } else {
        resolve(data.toString().trim());
      }
    });
  });
}

function getCommandOutput(command) {
  return new Promise(function(resolve) {
    exec(command, function(exception, output, error) {
      if (exception || error) {
        resolve(false);
      } else {
        resolve(output.toString().trim());
      }
    });
  });
}

async function getBattery() {
  const [ battery, status ] = await Promise.all([
    getFileContent("/sys/class/power_supply/BAT0/capacity"),
    getFileContent("/sys/class/power_supply/BAT0/status")
  ]);

  if (!battery || !status) {
    // I'm using ttf-font-awesome from the Archlinux community packages, feel free to use another icon set!
    return " ??%";
  }

  if (status !== "Discharging" && battery <= 99) {
    return ` ${battery}%`;
  }

  if (battery <= 25) {
    return ` ${battery}%`;
  } 

  if (battery <= 50) {
    return ` ${battery}%`;
  }

  if (battery <= 75) {
    return ` ${battery}%`;
  }

  return ` ${battery}%`;
}

async function getVolume() {
  // pactl is the Pulse Audio Control CLI, replace this with your own audio control CLI!
  const output = await getCommandOutput("pactl list sinks")

  if (!output) {
    return " ??%";
  }

  const volume = output.match(/\d+%/)[0].trim();
  const muted = output.match(/(?<=Mute:\s)\w+/)[0].trim();

  if (muted === "yes" || volume === "0%") {
    return ` ${volume}`;
  }

  return ` ${volume}`;
}

function getTime() {
  const date = new Date();

  return ` ${addLeadingZero(date.getHours())}:${addLeadingZero(date.getMinutes())}`;
}

async function getBrightness() {
  const brightness = await getCommandOutput("xbacklight -get");

  if (!brightness) {
    return " ??%";
  }

  return ` ${parseInt(brightness)}%`;
}

function getOsUsername() {
  return ` ${userInfo().username}`;
}

function byNetworkInterfaceName(networkInterfaceName) {
  return function([currentNetworkInterfaceName]) {
    return currentNetworkInterfaceName === networkInterfaceName;
  };
}

function byFamily(networkInterfaceFamily) {
  return  function(networkInterfaceOption) {
    return networkInterfaceOption.family === networkInterfaceFamily;
  }
}

function toNetworkAddress(networkInterfaceAddress, networkInterfaceOption) {
  if (!networkInterfaceAddress) {
    return networkInterfaceOption.address;
  }
}

function toNetworkInterfaceObject(networkInterfaces, [currentNetworkInterfaceName, currentNetworkInterfaceOptions]) {
  return Object.assign(networkInterfaces, {
    [currentNetworkInterfaceName]: currentNetworkInterfaceOptions.filter(byFamily("IPv4")).reduce(toNetworkAddress, "")
  });
}

function networkInterfaceIPAddress(interface) {
  const networkInterface = Object
    .entries(networkInterfaces())
    .filter(byNetworkInterfaceName(interface))
    .reduce(toNetworkInterfaceObject, {});

  if (!Object.prototype.hasOwnProperty.call(networkInterface, interface)) {
    return "";
  }

  if (networkInterface[interface].length < 1) {
    return "";
  }

  return ` ${networkInterface[interface]}`;
}

module.exports = {
  getCommandOutput,
  getBattery,
  getVolume,
  getTime,
  getBrightness,
  getOsUsername,
  networkInterfaceIPAddress
};
