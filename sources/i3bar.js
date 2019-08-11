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

    if (!Object.prototype.hasOwnProperty.call(properties, "full_text")) {
      throw new ReferenceError("Property full_text missing.");
    }

    const typeFullText = type(properties.full_text);

    if (typeFullText !== "string" && typeFullText !== "function" && typeFullText !== "asyncfunction") {
      throw new TypeError("Property full_text expected to be a string, a function or an asynchronous function.");
    }

    this.properties = properties;
  }

  update(property, newValue) {
    if (arguments.length !== 2) {
      throw new Error("Expected exactly two arguments.");
    }

    if (type(property) !== "string") {
      throw new TypeError("The property to update must be a string.");
    }

    this.properties[property] = newValue;
  }

  async normalize() {
    const block = {};

    for (const [ key, value ] of Object.entries(this.properties)) {
      const typeOfValue = type(value);

      if (typeOfValue === "function") {
        block[key] = value();
      } else if (typeOfValue === "asyncfunction") {
        block[key] = await value();
      } else {
        block[key] = value;
      }
    }

    return block;
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

    this.secondsBetweenRefreshes = secondsBetweenRefreshes;
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

  async render() {
    if (arguments.length !== 0) {
      throw new Error("Expected exactly zero arguments.");
    }

    const normalizedBlocks = [];

    for (const block of this.blocks) {
      normalizedBlocks.push(await block.normalize());
    }

    process.stdout.write(JSON.stringify(normalizedBlocks));
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

    readline.on("line", line => {
      try {
        const event = JSON.parse(line.replace(/^,/, ""));

        if (Object.prototype.hasOwnProperty.call(event, "button") && Object.prototype.hasOwnProperty.call(event, "name")) {
          switch(event.button) {
          case 1:
            this.emit("leftClick", event.name);
            break;

          case 2:
            this.emit("middleClick", event.name);
            break;

          case 3:
            this.emit("rightClick", event.name);
            break;

          case 4:
            this.emit("mouseWheelUp", event.name);
            break;

          case 5:
            this.emit("mouseWheelDown", event.name);
            break;
          }
        }
      } catch (error) { // eslint-disable-line 
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

    while (true) { // eslint-disable-line
      this.render();

      await after(this.secondsBetweenRefreshes).seconds;

      /* istanbul ignore next */
      if (process.env.NODE_ENV === "test") {
        break;
      }
    }
  }
}
