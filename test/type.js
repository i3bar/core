import "mocha";

import { expect } from "chai";
import { type } from "../sources/type";

describe("type", function() {
  it("should return the correct type for a number value", function() {
    expect(type(0)).to.equal("number");
  });

  it("should return the correct type for a boolean value", function() {
    expect(type(true)).to.equal("boolean");
  });

  it("should return the correct type for a null value", function() {
    expect(type(null)).to.equal("null");
  });

  it("should return the correct type for an undefined value", function() {
    expect(type(undefined)).to.equal("undefined");
  });

  it("should return the correct type for a string value", function() {
    expect(type("")).to.equal("string");
  });

  it("should return the correct type for a symbol value", function() {
    expect(type(Symbol())).to.equal("symbol");
  });

  it("should return the correct type for an array value", function() {
    expect(type([])).to.equal("array");
  });

  it("should return the correct type for an object value", function() {
    expect(type({})).to.equal("object");
  });

  it("should return undefined when ommiting the argument", function() {
    expect(type()).to.equal("undefined");
  });

  it("should throw an error when passing more than one argument", function() {
    expect(() => type(0, 1)).to.throw(Error, "Expected zero or no more than one argument.");
  });
});
