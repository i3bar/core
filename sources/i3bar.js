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
    if (1 !== arguments.length) {
      throw new Error("Expected exactly one argument.");
    }

    if ("object" !== type(properties)) {
      throw new TypeError("Expected first argument to be a string.");
    }

    if (!Object.prototype.hasOwnProperty.call(properties, "full_text")) {
      throw new ReferenceError("Property full_text missing.");
    }

    const typeFullText = type(properties.full_text);

    if ("string" !== typeFullText && "function" !== typeFullText && "asyncfunction" !== typeFullText) {
      throw new TypeError("Property full_text expected to be a string, a function or an asynchronous function.");
    }

    this.properties = properties;
  }

  update(property, newValue) {
    if (2 !== arguments.length) {
      throw new Error("Expected exactly two arguments.");
    }

    if ("string" !== type(property)) {
      throw new TypeError("The property to update must be a string.");
    }

    this.properties[ property ] = newValue;
  }

  async normalize() {
    const unpromisedProperties = await Promise.all(Object.entries(this.properties).map(async function([ key, value ]) {
      switch (type(value)) {
      case "asyncfunction":
        return [ key, await value() ];

      case "function":
        return [ key, value() ];

      default:
        return [ key, value ];
      }
    }));

    return unpromisedProperties.reduce(function(properties, [ key, value ]) {
      return Object.assign(properties, { [ key ]: value });
    }, {});
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
    if (0 !== arguments.length) {
      throw new Error("Expected exactly zero arguments.");
    }

    this.clickEventsEnabled = true;
  }

  setSecondsBetweenRefreshes(secondsBetweenRefreshes) {
    if ("number" !== type(secondsBetweenRefreshes)) {
      throw new TypeError("First argument must be a number.");
    }

    if (0 > secondsBetweenRefreshes) {
      throw new Error("First argument cannot be lower than zero.");
    }

    if (1 !== arguments.length) {
      throw new Error("Expected exactly one argument.");
    }

    this.secondsBetweenRefreshes = secondsBetweenRefreshes;
  }

  addBlock(block) {
    if (1 !== arguments.length) {
      throw new Error("Expect exactly one argument.");
    }

    if (!(block instanceof I3Block)) {
      throw new TypeError("Expected first argument to be a I3Block.");
    }

    this.blocks.push(block);
  }

  async render() {
    if (0 !== arguments.length) {
      throw new Error("Expected exactly zero arguments.");
    }

    const normalizedBlocks = await Promise.all(this.blocks.map(function(block) {
      return block.normalize();
    }));

    process.stdout.write(JSON.stringify(normalizedBlocks));
    process.stdout.write(",");
  }

  listenEvents() {
    if (0 !== arguments.length) {
      throw new Error("Expected exactly zero arguments.");
    }

    if (!this.clickEventsEnabled) {
      return null;
    }

    const readline = createInterface({
      input: process.stdin,
      terminal: true
    });

    readline.on("line", line => {
      try {
        const event = JSON.parse(line.replace(/^,/, ""));

        if (
          Object.prototype.hasOwnProperty.call(event, "button") && Object.prototype.hasOwnProperty.call(event, "name") && Object.prototype.hasOwnProperty.call(event, "modifiers")
        ) {
          switch (event.button) {
          case 1:
            this.emit("leftClick", event.name, event.modifiers);
            break;

          case 2:
            this.emit("middleClick", event.name, event.modifiers);
            break;

          case 3:
            this.emit("rightClick", event.name, event.modifiers);
            break;

          case 4:
            this.emit("mouseWheelUp", event.name, event.modifiers);
            break;

          case 5:
            this.emit("mouseWheelDown", event.name, event.modifiers);
            break;

          // Skip default
          }
        }
      } catch (error) { // eslint-disable-line 
      } finally {
        readline.close();
        /* istanbul ignore next */
        if ("test" !== process.env.NODE_ENV) {
          this.listenEvents();
        }
      }
    });

    return readline;
  }

  async start() {
    if (0 !== arguments.length) {
      throw new Error("Expected no arguments.");
    }

    if ("number" !== type(this.secondsBetweenRefreshes)) {
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

      await after(this.secondsBetweenRefreshes).seconds; // eslint-disable-line no-await-in-loop

      /* istanbul ignore next */
      if ("test" === process.env.NODE_ENV) {
        break;
      }
    }
  }
}
