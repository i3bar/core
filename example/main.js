const { I3Bar, I3Block } = require("../lib/i3bar.js");
const { readFile } = require("fs");
const { exec } = require("child_process");
const { userInfo } = require("os");

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

const bar = new I3Bar();
const timeBlock = new I3Block({ full_text: getTime });
const batteryBlock = new I3Block({ full_text: getBattery });
const volumeBlock = new I3Block({ full_text: getVolume, name: "volume" });
const brightnessBlock = new I3Block({ full_text: getBrightness, name: "brightness" });
const userBlock = new I3Block({ full_text: getOsUsername });

bar.setSecondsBetweenRefreshes(5);
bar.enableEvents();
bar.addBlock(brightnessBlock);
bar.addBlock(batteryBlock);
bar.addBlock(volumeBlock);
bar.addBlock(timeBlock);
bar.addBlock(userBlock);

bar.on("leftClick", function(blockName) {
  if (blockName === "volume") {
    exec("pactl set-sink-mute 0 toggle", function() {
      bar.render();
    });
  }
});

bar.on("mouseWheelUp", async function(blockName) {
  if (blockName === "volume") {
    try {
      await getCommandOutput("pactl set-sink-volume 0 +1%");
      bar.render();
    } catch (error) {}
  } else if (blockName === "brightness") {
    try {
      // I use xorg-xbacklight from the Archlinux official packages to control the brightness of my laptop
      const brightness = await getCommandOutput("xbacklight -get")

      if (brightness) {
        await getCommandOutput(`xbacklight -set ${parseInt(brightness) + 10}`)
        bar.render();
      }
    } catch (error) {}
  }
});

bar.on("mouseWheelDown", async function(blockName) {
  if (blockName === "volume") {
    try {
      await getCommandOutput("pactl set-sink-volume 0 -1%");
      bar.render();
    } catch (error) {}
  } else if (blockName === "brightness") {
    try {
      const brightness = await getCommandOutput("xbacklight -get")

      if (brightness && brightness > 10) {
        await getCommandOutput(`xbacklight -set ${parseInt(brightness) - 10}`)
        bar.render();
      }
    } catch (error) {}
  }
});

bar.start();
