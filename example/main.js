const { I3Bar, I3Block } = require("../lib/i3bar.js");
const { readFile } = require("fs");
const { exec } = require("child_process");

function getBattery() {
  return new Promise(function(resolve) {
    readFile("/sys/class/power_supply/BAT0/capacity", function(error, battery) {
      if (error) {
        resolve(" ??%");
      } else {
        resolve(` ${battery.toString().trim()}%`);
      }
    });
  });
}

function getVolume() {
  return new Promise(function(resolve) {
    // pactl is the Pulse Audio Control CLI, replace this with your own audio control CLI!
    exec("pactl list sinks", function(exception, output, error) {
      if (exception || error) {
        resolve(" ??%");
      } else {
        resolve(` ${output.match(/\d+%/)[0].trim()}`);
      }
    });
  });
}

function addLeadingZero(input) {
  return input.toString().padStart(2, "0");
}

function getTime() {
  const date = new Date();

  return ` ${addLeadingZero(date.getHours())}:${addLeadingZero(date.getMinutes())}`;
}

const bar = new I3Bar();
const timeBlock = new I3Block({ full_text: getTime });
const batteryBlock = new I3Block({ full_text: async () => await getBattery() });
const volumeBlock = new I3Block({ full_text: async () => await getVolume(), name: "volume" });

bar.setSecondsBetweenRefreshes(5);
bar.enableEvents();
bar.addBlock(batteryBlock);
bar.addBlock(volumeBlock);
bar.addBlock(timeBlock);

bar.on("leftClick", function(blockName) {
  if (blockName === "volume") {
    exec("pactl set-sink-mute 0 toggle", function() {
      bar.render();
    });
  }
});

bar.on("mouseWheelUp", function(blockName) {
  if (blockName === "volume") {
    exec("pactl set-sink-volume 0 +1%", function() {
      bar.render();
    });
  }
});

bar.on("mouseWheelDown", function(blockName) {
  if (blockName === "volume") {
    exec("pactl set-sink-volume 0 -1%", function() {
      bar.render();
    });
  }
});

bar.start();
