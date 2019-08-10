# core

Core library for creating i3bar using Node.js.

## Requirements

- GNU/Linux or BSD
- Node.js
- NPM
- i3wm

### Archlinux

```console
$ pacman -S node npm i3
```

### Others

If you distribution has the `node`, `npm` and `i3` packages, go for it! Try to compile from sources only when all hope for a pre-compiled package is gone.

## Usage

### Create your i3bar directory

```console
$ mkdir ~/my-awesome-i3bar
$ cd ~/my-awesome-i3bar
```

> **Note**: I named this directory `my-awesome-i3bar` because I think that the bar that you will create will be awesome and that you are awesome but you can of course rename it the way you want and... Oh no, please... YOU. ARE. BREATHTAKING! :blush:

### Initialize a brand-new NPM project

```console
$ touch package.json
$ $EDITOR package.json
```

```json
{
  "private": true
}
```

> **Note**: New to Node.js or JavaScript? That's okay! NPM is the package manager for Node.js. It is like `apt-get` but for JavaScript developers. I intendendly make things easy to follow for people that are not particularily at ease with that platform. Feel free to [open an issue](./issues) if I have not made something clear! Oh and see the `$EDITOR`? I'll use this as a placeholder for whatever text editor you want to use. This means open this file with your editor and add the next lines to it. In fact, you can even use the line as is as there are many chances for your operating system to already have a `$EDITOR` environment variable set to some default editor. But I'll use VIM in my case. Any VIM users in the room? Hello?! :sweat_smile:

### Install the library

```console
npm install --save-dev @i3bar/core
```

> **Note**: The argument `--save-dev` is here used to say that this library must be installed on our local project. We could also have installed the library globally by issueing the `npm install --global @i3bar/core`, but there are not so much advantages to use a global package other than forgetting it and taking space for nothing on the global NPM packages. If you want to swap `npm` with `yarn` instead, be my guest! To not loose too much people I'll stick with `npm` which is the most popular package manager for newcomers.

### Create the Node.js script

```console
$ touch main.js
$ $EDITOR main.js
```

> **Note**: From now on, the next lines you will see will have to be copy/paste into this Node.js script.

### Import the library

```node
const { I3Bar } = require("@i3bar/core");
```

> **How it works?**: Node.js uses the `require` keyword for inclusion of installed libraries. As you already installed the `@i3bar/core` library, it will be available here. You can also add any other library you would want to use to help you create your awesome i3bar! See [the official NPM website](https://www.npmjs.com/) for a list of popular package to use! You can also use the ECMAScript Modules imports, but I'm trying to focus on newcomers here, remember?

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

> **How it works?**: it will use the object you gave as parameter and will stringify it to send the output to the i3 runtime that will in the end render the bar with these informations periodically. `"full_text"` is mandatory as it is used to render the text you want on your bar. An empty string for that property is a valid value and will simply be ignored by the i3 runtime (i.e. not being displayed on the bar). Values with a leading underscore (`_myCustomProperty`) will also be ignored. See the [i3 bar protocol documentation](https://i3wm.org/docs/i3bar-protocol.html#_blocks_in_detail) for more informations about all the properties you can set. There are many more and you can even customize the colors and background. I'm really terrible at designing interfaces so this example is intended to be simple for simple minded person like me. :smile: Be creative and let me see the result of your hard design work!

### Almost there

```node
myBar.start();
```

> **Note**: From now, we have finished setting our script. Save and close the file for the next comming section.

### Set the bar command

```console
$ $EDITOR ~/.config/i3/config
```

```
bar {
  status_command node ~/my-awesome-i3bar/main.js
}
```

```console
$ i3 reload
```

> **Note**: You should now have a basic, but awesome i3bar displayed! I may have forgotten something, or made a mistake when publishing the library. If any error occured, or you are unsure about something, please feel free to [open an issue](./issues).

## API

### Enable Events

```typescript
enableEvents(): void;
```

> **Note**: This will alow you to use events such as right and left clicking, middle click (you know, the click on the rolling thingy in the middle of the mouse), up & down scrolling. Yes that is right, you can use scrolling on the bar and trigger some action (typically, I use this for setting the volume).

```node
myBar.enableEvents();
```


### Set Seconds Between Each Refreshes

```typescript
setSecondsBetweenRefreshes(secondsBetweenRefreshes: number): void;
```

> **Note**: This will set a timer between refreshes. This means, the higher you will set it, the less resource heavy it will be as it is working with an infinite while loop. Funny fact, I was wrongly adding this feature at the beginning and forgot to uncomment the timeout between refreshes. I was doing okay until I noticed my cpu was at 70°C. Don't be like me. Do not forget to set it and use a decent value. 5 seconds is okay. You could even go higher. Thanks to events (see below), you can manually refresh the bar as needed.

```node
myBar.setSecondsBetweenRefreshes(5);
```

### Add block

```typescript
interface Block {
  full_text: string;
  [key: string]: unknown;
};

addBlock(block: Block): void
```

> **Note**: This will allow you to add some blocks to be displayed on the i3 status bar. For now, only the `"full_text"` property is required as it is also required in i3. Setting the value to an empty string will make the i3 runtime ignore the block. This is handy when it comes to fetching some data online and sometimes the data is just not there. Or Checking that you are indeed online.

```node
myBar.addBlock({ full_text: "Hello, i3bar!" });
```

### Manual rendering

```typescript
render(): void
```

> **How it works?**: This will internally use the array of blocks that you registered with the `addBlock` method and send a stringified version of it in the standard output. TLDR; this will just update the status bar following the i3bar protocol. Use this method when you want to manually update the bar when like for instance you want to fetch the weather from a web service but don't know exactly when this will come back as a result. Or any other case you might want to find it useful. Try not to spam it in a while loop or a `setInterval` with a short interval.

### Start the bar 

```typescript
start(): Promise<void>;
```

> **How it works?**: This will send the right headers according to the i3 bar protocol and start the infinite loop for sending update of the status bar from time to time. Usually you want to make it the last instructions of your `main.js` script after setting everything.
