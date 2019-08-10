/**
 *
 * Core library for creating i3bar using Node.js.
 * Copyright (C) 2019 Amin NAIRI
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { type } from "./type";
import { after } from "./time";

import { createInterface } from "readline";
import EventEmitter from "events";

export class I3Block {
  constructor(properties) {
    if (arguments.length !== 1) {
      throw new Error("Expected exactly one argument.");
    }

    if (type(properties) !== "object") {
      throw new TypeError("Expected first argument to be a string.");
    }

    if (!properties.hasOwnProperty("full_text")) {
      throw new ReferenceError("Property full_text missing.");
    }

    if (type(properties.full_text) !== "string") {
      throw new TypeError("Property full_text expected to be a string.");
    }

    this.properties = properties;
  }

  normalize() {
    return Object.fromEntries(Object.entries(this.properties).map(function([key, value]) {
      if (type(value) === "function") {
        return [ key, value() ];
      }

      return [ key, value ];
    }));
  }
}

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
    if (arguments.length !== 1) {
      throw new Error("Expect exactly one argument.");
    }

    if (!(block instanceof I3Block)) {
      throw new TypeError("Expected first argument to be a I3Block.");
    }

    this.blocks.push(block);
  }

  render() {
    if (arguments.length !== 0) {
      throw new Error("Expected exactly zero arguments.");
    }

    process.stdout.write(JSON.stringify(this.blocks.map(block => block.normalize())));

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
      stdout: process.stdout,
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
        /* istanbul ignore next */
        if (process.env.NODE_ENV !== "test") {
          this.listenEvents();
        }
      }
    });

    return readline;
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

      /* istanbul ignore next */
      if (process.env.NODE_ENV === "test") {
        break;
      }
    }
  }
}
