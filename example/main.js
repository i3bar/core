const { I3Bar } = require("../lib/i3bar.js");
const { getCommandOutput } = require("./utils");
const { timeBlock, batteryBlock, volumeBlock, brightnessBlock, userBlock, networkBlock } = require("./blocks");

const bar = new I3Bar();

bar.setSecondsBetweenRefreshes(5);
bar.enableEvents();
bar.addBlock(networkBlock);
bar.addBlock(brightnessBlock);
bar.addBlock(batteryBlock);
bar.addBlock(volumeBlock);
bar.addBlock(timeBlock);
bar.addBlock(userBlock);

bar.on("leftClick", async function(blockName) {
  if (blockName === "volume") {
    await getCommandOutput("pactl set-sink-mute 0 toggle");
    bar.render();
  }
});

bar.on("mouseWheelUp", async function(blockName) {
  if (blockName === "volume") {
    await getCommandOutput("pactl set-sink-volume 0 +1%");
    bar.render();
  } else if (blockName === "brightness") {
    // I use xorg-xbacklight from the Archlinux official packages to control the brightness of my laptop
    const brightness = await getCommandOutput("xbacklight -get")

    if (brightness) {
      await getCommandOutput(`xbacklight -set ${parseInt(brightness) + 10}`)
      bar.render();
    }
  }
});

bar.on("mouseWheelDown", async function(blockName) {
  if (blockName === "volume") {
    await getCommandOutput("pactl set-sink-volume 0 -1%");
    bar.render();
  } else if (blockName === "brightness") {
    const brightness = await getCommandOutput("xbacklight -get")

    if (brightness && brightness > 10) {
      await getCommandOutput(`xbacklight -set ${parseInt(brightness) - 10}`)
      bar.render();
    }
  }
});

bar.start();
