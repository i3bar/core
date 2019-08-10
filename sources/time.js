import { type } from "./type";

class After {
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
    if (type(this.delay) !== "number") {
      throw new TypeError("after must be called with a number.");
    }

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
    throw new TypeError("Expected exactly one argument.");
  }

  return new After(delay);
}
