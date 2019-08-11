import "mocha";

import { expect } from "chai";
import { I3Bar, I3Block } from "../sources/i3bar";

describe("i3bar", function() {
  this.timeout(10 * 1000);

  it("should create an instance of i3bar", function() {
    expect(new I3Bar()).to.be.an.instanceof(I3Bar);
  });

  it("should throw an error if there are arguments when calling the enableEvents method", function() {
    const i3Bar = new I3Bar();

    expect(() => i3Bar.enableEvents(0)).to.throw(Error, "Expected exactly zero arguments.");
  });

  it("should throw an error if the first argument to the setSecondsBetweenRefreshes is not a number", function() {
    const i3Bar = new I3Bar();

    expect(() => i3Bar.setSecondsBetweenRefreshes("")).to.throw(TypeError, "First argument must be a number.");
    expect(() => i3Bar.setSecondsBetweenRefreshes(null)).to.throw(TypeError, "First argument must be a number.");
    expect(() => i3Bar.setSecondsBetweenRefreshes(undefined)).to.throw(TypeError, "First argument must be a number.");
    expect(() => i3Bar.setSecondsBetweenRefreshes(true)).to.throw(TypeError, "First argument must be a number.");
    expect(() => i3Bar.setSecondsBetweenRefreshes([])).to.throw(TypeError, "First argument must be a number.");
    expect(() => i3Bar.setSecondsBetweenRefreshes({})).to.throw(TypeError, "First argument must be a number.");
    expect(() => i3Bar.setSecondsBetweenRefreshes(Symbol())).to.throw(TypeError, "First argument must be a number.");
  });

  it("should throw an error if the argument to the setSecondsBetweenRefreshes is negative", function() {
    const i3Bar = new I3Bar();

    expect(() => i3Bar.setSecondsBetweenRefreshes(-1)).to.throw(Error, "First argument cannot be lower than zero.");
  });

  it("should throw an error if the argument count is not exactly one", function() {
    const i3Bar = new I3Bar();

    expect(() => i3Bar.setSecondsBetweenRefreshes(1, 2)).to.throw(Error, "Expected exactly one argument.");
  });

  it("should throw an error if the argument passed to the addBlock method is not an object", function() {
    const i3Bar = new I3Bar();

    expect(() => i3Bar.addBlock("")).to.throw(TypeError, "Expected first argument to be a I3Block.");
    expect(() => i3Bar.addBlock(null)).to.throw(TypeError, "Expected first argument to be a I3Block.");
    expect(() => i3Bar.addBlock(undefined)).to.throw(TypeError, "Expected first argument to be a I3Block.");
    expect(() => i3Bar.addBlock(true)).to.throw(TypeError, "Expected first argument to be a I3Block.");
    expect(() => i3Bar.addBlock([])).to.throw(TypeError, "Expected first argument to be a I3Block.");
    expect(() => i3Bar.addBlock(0)).to.throw(TypeError, "Expected first argument to be a I3Block.");
    expect(() => i3Bar.addBlock(Symbol())).to.throw(TypeError, "Expected first argument to be a I3Block.");
  });

  it("should throw an error if more than one arguments are passed to addBlock", function() {
    const i3Bar = new I3Bar();

    expect(() => i3Bar.addBlock({ full_text: "" }, 0)).to.throw(Error, "Expect exactly one argument.");
  });

  it("should throw an error if trying to add a block that has no full text", function() {
    const i3Bar = new I3Bar();

    expect(() => i3Bar.addBlock(new I3Block({}))).to.throw(ReferenceError, "Property full_text missing.");
  });

  it("should throw an error if the full text is not a string nor a function when trying to add a block", function() {
    const i3Bar = new I3Bar();

    expect(() => i3Bar.addBlock(new I3Block({ full_text: true }))).to.throw(TypeError, "Property full_text expected to be a string, a function or an asynchronous function.");
    expect(() => i3Bar.addBlock(new I3Block({ full_text: 0 }))).to.throw(TypeError, "Property full_text expected to be a string, a function or an asynchronous function.");
    expect(() => i3Bar.addBlock(new I3Block({ full_text: null }))).to.throw(TypeError, "Property full_text expected to be a string, a function or an asynchronous function.");
    expect(() => i3Bar.addBlock(new I3Block({ full_text: undefined }))).to.throw(TypeError, "Property full_text expected to be a string, a function or an asynchronous function.");
    expect(() => i3Bar.addBlock(new I3Block({ full_text: [] }))).to.throw(TypeError, "Property full_text expected to be a string, a function or an asynchronous function.");
    expect(() => i3Bar.addBlock(new I3Block({ full_text: {} }))).to.throw(TypeError, "Property full_text expected to be a string, a function or an asynchronous function.");
  });

  it("should throw an error when trying to add arguments to the render method", function(done) {
    const i3Bar = new I3Bar();

    i3Bar.render(0).then(function() {
      done("failed");
    }).catch(function() {
      done();
    });

  });

  it("should throw an error if trying to add arguments to the listenEvents method", function() {
    const i3Bar = new I3Bar();

    expect(() => i3Bar.listenEvents(0)).to.throw(Error, "Expected exactly zero arguments.");
  });

  it("should throw an error if trying to add argument to the start method", function(done) {
    const i3Bar = new I3Bar();

    i3Bar.start(0).then(function() {
      done("failed");
    }).catch(function(error) {
      if (error instanceof Error && error.toString().includes("Expected no arguments.")) {
        done();
      } else {
        done("failed");
      }
    });
  });

  it("should throw an error if trying to start the bar without refresh time", function(done) {
    const i3Bar = new I3Bar();

    i3Bar.start().then(function() {
      done("failed");
    }).catch(function(error) {
      if (error instanceof TypeError && error.toString().includes("Seconds between refreshes must be set before using this method.")) {
        done();
      } else {
        done("failed");
      }
    });
  });

  it("start the bar without error when set properly", function(done) {
    const i3Bar = new I3Bar();

    i3Bar.setSecondsBetweenRefreshes(5);
    i3Bar.addBlock(new I3Block({ full_text: "test" }));
    i3Bar.start();

    done();
  });

  it("should set the event without errors when passing no arguments", function() {
    const i3Bar = new I3Bar();

    expect(() => i3Bar.enableEvents()).to.not.throw;
  });

  it("should render without errors when passing no arguments", function() {
    const i3Bar = new I3Bar();

    i3Bar.render();
  });

  it("should trigger a left click when clicking on the bar", function(done) {
    const i3Bar = new I3Bar();

    i3Bar.setSecondsBetweenRefreshes(5);
    i3Bar.enableEvents();
    i3Bar.addBlock(new I3Block({ full_text: "something", name: "volume" }));

    i3Bar.on("leftClick", function() {
      done();
    });

    const standardInput = i3Bar.listenEvents();

    standardInput.write(`${JSON.stringify({ name: "volume", button: 1 })}\n`);
    standardInput.close();
  });

  it("should trigger a right click when clicking on the bar", function(done) {
    const i3Bar = new I3Bar();

    i3Bar.setSecondsBetweenRefreshes(5);
    i3Bar.enableEvents();
    i3Bar.addBlock(new I3Block({ full_text: "something", name: "volume" }));

    i3Bar.on("rightClick", function() {
      done();
    });

    const standardInput = i3Bar.listenEvents();

    standardInput.write(`${JSON.stringify({ name: "volume", button: 3 })}\n`);
    standardInput.close();
  });

  it("should trigger a middle click when clicking on the bar", function(done) {
    const i3Bar = new I3Bar();

    i3Bar.setSecondsBetweenRefreshes(5);
    i3Bar.enableEvents();
    i3Bar.addBlock(new I3Block({ full_text: "something", name: "volume" }));

    i3Bar.on("middleClick", function() {
      done();
    });

    const standardInput = i3Bar.listenEvents();

    standardInput.write(`${JSON.stringify({ name: "volume", button: 2 })}\n`);
    standardInput.close();
  });

  it("should trigger a mouse wheel up when mouse wheeling up on the bar", function(done) {
    const i3Bar = new I3Bar();

    i3Bar.setSecondsBetweenRefreshes(5);
    i3Bar.enableEvents();
    i3Bar.addBlock(new I3Block({ full_text: "something", name: "volume" }));

    i3Bar.on("mouseWheelUp", function() {
      done();
    });

    const standardInput = i3Bar.listenEvents();

    standardInput.write(`${JSON.stringify({ name: "volume", button: 4 })}\n`);
    standardInput.close();
  });

  it("should trigger a mouse wheel down when mouse wheeling down on the bar", function(done) {
    const i3Bar = new I3Bar();

    i3Bar.setSecondsBetweenRefreshes(5);
    i3Bar.enableEvents();
    i3Bar.addBlock(new I3Block({ full_text: "something", name: "volume" }));

    i3Bar.on("mouseWheelDown", function() {
      done();
    });

    const standardInput = i3Bar.listenEvents();

    standardInput.write(`${JSON.stringify({ name: "volume", button: 5 })}\n`);
    standardInput.close();
  });

  it("should not throw an error if the event is malformed", function() {
    const i3Bar = new I3Bar();

    i3Bar.setSecondsBetweenRefreshes(5);
    i3Bar.enableEvents();
    i3Bar.addBlock(new I3Block({ full_text: "something", name: "volume" }));

    i3Bar.on("mouseWheelDown", function() {
      done();
    });

    const standardInput = i3Bar.listenEvents();

    standardInput.write(`${JSON.stringify({ name: "volume" })}\n`);
    standardInput.close();
  });

  it("should throw an error when trying to instanciate an i3 block without parameter", function() {
    expect(() => new I3Block()).to.throw(Error, "Expected exactly one argument.");
  });

  it("should throw an error when trying to instanciate an i3 block without an object", function() {
    expect(() => new I3Block("")).to.throw(Error, "Expected first argument to be a string.");
    expect(() => new I3Block(0)).to.throw(Error, "Expected first argument to be a string.");
    expect(() => new I3Block(null)).to.throw(Error, "Expected first argument to be a string.");
    expect(() => new I3Block(undefined)).to.throw(Error, "Expected first argument to be a string.");
    expect(() => new I3Block(true)).to.throw(Error, "Expected first argument to be a string.");
    expect(() => new I3Block([])).to.throw(Error, "Expected first argument to be a string.");
    expect(() => new I3Block(() => {})).to.throw(Error, "Expected first argument to be a string.");
  });

  it("should return the good value for a full_text property when using a function for the instanciation of a i3 block", function(done) {
    const i3Block = new I3Block({ full_text: () => "hello" });

    i3Block.normalize().then(function(block) {
      expect(block).to.deep.equal({ full_text: "hello" });
      done();
    }).catch(function() {
      done("failed");
    });
  });

  it("should return the good value for a full_text property when using an asynchronous function for the instanciation of a i3 block", function(done) {
    const i3Block = new I3Block({ full_text: async () => await Promise.resolve("hello") });

    i3Block.normalize().then(function(block) {
      expect(block).to.deep.equal({ full_text: "hello" });
      done();
    }).catch(function() {
      done("failed");
    });
  });

  it("should throw an error when trying to update a block property that is not a string", function() {
    const i3Block = new I3Block({ full_text: "" });

    expect(() => i3Block.update(1, "")).to.throw(TypeError, "The property to update must be a string.");;
    expect(() => i3Block.update(true, "")).to.throw(TypeError, "The property to update must be a string.");;
    expect(() => i3Block.update(null, "")).to.throw(TypeError, "The property to update must be a string.");;
    expect(() => i3Block.update(undefined, "")).to.throw(TypeError, "The property to update must be a string.");;
    expect(() => i3Block.update(Symbol(), "")).to.throw(TypeError, "The property to update must be a string.");;
    expect(() => i3Block.update([], "")).to.throw(TypeError, "The property to update must be a string.");;
    expect(() => i3Block.update({}, "")).to.throw(TypeError, "The property to update must be a string.");;
    expect(() => i3Block.update(() => {}, "")).to.throw(TypeError, "The property to update must be a string.");;
  });

  it("should throw an error when trying to update without providing exactly two arguments", function() {
    const i3Block = new I3Block({ full_text: "" });

    expect(() => i3Block.update()).to.throw(Error, "Expected exactly two arguments.");
    expect(() => i3Block.update("full_text")).to.throw(Error, "Expected exactly two arguments.");
    expect(() => i3Block.update("full_text", "", "")).to.throw(Error, "Expected exactly two arguments.");
  });

  it("should update the block property correctly", async function() {
    const i3Block = new I3Block({ full_text: "not updated" });

    i3Block.update("full_text", "updated");

    expect(await i3Block.normalize()).to.deep.equal({ full_text: "updated" });
  });
});
