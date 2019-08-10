import "mocha";

import { expect } from "chai";
import { after, After } from "../sources/time";

describe("time", function() {
  it("should throw an error if the first argument is not a number", function() {
    expect(() => after("")).to.throw(TypeError, "First argument must be a number.");;
    expect(() => after(null)).to.throw(TypeError, "First argument must be a number.");;
    expect(() => after(undefined)).to.throw(TypeError, "First argument must be a number.");;
    expect(() => after(true)).to.throw(TypeError, "First argument must be a number.");;
    expect(() => after(Symbol())).to.throw(TypeError, "First argument must be a number.");;
    expect(() => after({})).to.throw(TypeError, "First argument must be a number.");;
    expect(() => after([])).to.throw(TypeError, "First argument must be a number.");;
  });

  it("should throw an exception when passing no arguments", function() {
    expect(() => after()).to.throw(TypeError, "First argument must be a number.");;
  });

  it("should throw an exception when passing more than one argument", function() {
    expect(() => after(1, 2)).to.throw(Error, "Expected exactly one argument.");;
  });

  it("should return an instance of After", function() {
    expect(after(5)).to.be.an.instanceof(After);
  });

  it("should throw an error when instanciating with no arguments", function() {
    expect(() => new After()).to.throw(TypeError, "Expected first argument to be a number.");
  });

  it("should throw an error when trying to instanciating with a non-number argument", function() {
    expect(() => new After("")).to.throw(TypeError, "Expected first argument to be a number.");
    expect(() => new After(null)).to.throw(TypeError, "Expected first argument to be a number.");
    expect(() => new After(undefined)).to.throw(TypeError, "Expected first argument to be a number.");
    expect(() => new After(true)).to.throw(TypeError, "Expected first argument to be a number.");
    expect(() => new After(Symbol)).to.throw(TypeError, "Expected first argument to be a number.");
    expect(() => new After({})).to.throw(TypeError, "Expected first argument to be a number.");
    expect(() => new After([])).to.throw(TypeError, "Expected first argument to be a number.");
  });

  it("should throw an error when instanciating with more than one argument", function() {
    expect(() => new After(1, 2)).to.throw(Error, "Expected exactly one argument.");
  });

  it("should return a promise when using the seconds getter", function() {
    expect(after(1).seconds).to.be.a("promise"); 
  });
});
