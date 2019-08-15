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

/**
 * @param {unknown} input
 * @return {string}
 */
export function type(input) {
  if (1 < arguments.length) {
    throw new Error("Expected zero or no more than one argument.");
  }

  return Object.prototype.toString.call(input).replace("[object ", "").replace("]", "").toLowerCase();
}
