# core

Core library for creating i3bar using Node.js.

## Requirements

- Node.js
- NPM
- i3wm

## Installation

```console
$ mkdir ~/my-custom-i3bar
$ cd ~/my-custom-i3bar
$ npm init --yes
$ npm install --save-dev @i3bar/core
$ touch main.js
$ $EDITOR main.js # see examples below
$ $EDITOR ~/.config/i3/config
```

```
bar {
  status_command node ~/my-custom-i3bar/main.js
}
```

## API

Coming soon...

## Usage

### Import the library

```node
const { I3Bar } = require("@i3bar/core");
```

### Instanciate a new bar

```node
const myBar = new I3Bar();
```

### Set the refresh time

```node
myBar.setSecondsBetweenRefreshes(5);
```

> **How it works?**: it uses a `setTimeout()` call to space calls to the function that will render the bar. This means values lower than 1 or even floating point values are valid values. However, it is highly discouraged to use such values as it can quickly make the process take much more resources than needed. There are really few cases where you will need to set a value below 5. You'll see later that there are clever ways to re-render the bar on events without having to set a really small value for this method.

### Add a block

```node
myBar.addBlock({ full_text: new Date().toISOString() });
```

> **How it works?**: it will use the object you gave and as parameter and will stringified it to send the output to the i3 runtime that will in the end render the bar with these informations periodically. `"full_text"` is mandatory as it is used to render the text you want on your bar. Values equal to an empty string are valid values and will simply be ignored by the i3 runtime (i.e. not being displayed on the bar). See the [i3 bar protocol documentation](https://i3wm.org/docs/i3bar-protocol.html#_blocks_in_detail) for more informations about all the properties you can set. There are many more and you can even customize the colors and background. I'm really terrible at designing interfaces so this example is intended to be simple for simple minded person like me. :smile: Be creative and let me see the result of your hard design work!
