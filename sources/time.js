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

export class After {
  constructor(delay) {
    if (type(delay) !== "number") {
      throw new TypeError("Expected first argument to be a number.");
    }

    if (arguments.length !== 1) {
      throw new Error("Expected exactly one argument.");
    }

    this.delay = delay;
  }

  get seconds() {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000 * this.delay);
    });
  }
}

export function after(delay) {
  if (type(delay) !== "number") {
    throw new TypeError("First argument must be a number.");
  }

  if (arguments.length !== 1) {
    throw new Error("Expected exactly one argument.");
  }

  return new After(delay);
}
