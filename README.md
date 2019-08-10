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


