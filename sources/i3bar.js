import { type } from "./type";
import { after } from "./time";

import { createInterface } from "readline";
import EventEmitter from "events";

export class I3Bar extends EventEmitter {
  constructor() {
    super();

    this.version = 1;
    this.clickEventsEnabled = false;
    this.blocks = [];
  }

  enableEvents() {
    if (arguments.length !== 0) {
      throw new Error("Expected exactly zero arguments.");
    }

    this.clickEventsEnabled = true;
  }

  setSecondsBetweenRefreshes(secondsBetweenRefreshes) {
    if (type(secondsBetweenRefreshes) !== "number") {
      throw new TypeError("First argument must be a number.");
    }

    if (secondsBetweenRefreshes < 0) {
      throw new Error("First argument cannot be lower than zero.");
    }

    if (arguments.length !== 1) {
      throw new Error("Expected exactly one argument.");
    }

    this.secondsBetweenRefreshes = secondsBetweenRefreshes
  }

  addBlock(block) {
    if (type(block) !== "object") {
      throw new TypeError("First argument must be an object.");
    }

    if (arguments.length !== 1) {
      throw new Error("Expect exactly one argument.");
    }

    if (!block.hasOwnProperty("full_text")) {
      throw new ReferenceError("Block must contain a property called full_text.");
    }

    if (type(block.full_text) !== "string") {
      throw new TypeError("Property full_text must be a string.");
    }

    this.blocks.push(block);
  }

  render() {
      process.stdout.write(JSON.stringify(this.blocks));

      process.stdout.write(",");
  }

  listenEvents() {
    if (arguments.length !== 0) {
      throw new Error("Expected exactly zero arguments.");
    }

    if (!this.clickEventsEnabled) {
      return;
    }

    const readline = createInterface({
      input: process.stdin,
      terminal: true
    });

    readline.on("line", async (line) => {
      try {
        const event = JSON.parse(line.replace(/^,/, ""));

        if (event.hasOwnProperty("button") && event.hasOwnProperty("name")) {
          switch(event.button) {
            case 1:
              this.emit("leftClick", event.name);
              break;

            case 2:
              this.emit("rightClick", event.name);
              break;

            case 3:
              this.emit("middleClick", event.name);
              break;

            case 4:
              this.emit("mouseWheelUp", event.name);
              break;

            case 5:
              this.emit("mouseWheelDown", event.name);
              break;
          }
        }
      } catch (error) {
      } finally {
        readline.close();
        this.listenEvents();
      }
    });
  }

  async start() {
    if (arguments.length !== 0) {
      throw new Error("Expected no arguments.");
    }

    if (type(this.secondsBetweenRefreshes) !== "number") {
      throw new TypeError("Seconds between refreshes must be set before using this method.");
    }

    this.listenEvents();

    process.stdout.write(JSON.stringify({
      version: this.version,
      click_events: this.clickEventsEnabled
    }));

    process.stdout.write("[[],");

    while (true) {
      this.render();

      await after(this.secondsBetweenRefreshes).seconds;
    }
  }
}
