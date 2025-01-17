# Jumpy2

A VS Code extension that creates dynamic hotkeys to jump around files across visible panes. It's a new 'Jumpy' but from the original author (Atom package) for VS Code. It works with the major VSC vim extensions and I plan to maintain it.

## How to jump

1. Hit <kbd>shift</kbd> + <kbd>enter</kbd>
2. Choose from your presented labels:
3. Enter two characters.
4. Keep coding!

Watch the demo:

[![Jumpy2 demo on youtube.com](https://img.youtube.com/vi/ClqiG3xskKM/0.jpg)](https://www.youtube.com/watch?v=ClqiG3xskKM)

## Install

On command line:

```bash
code --install-extension davidlgoldberg.jumpy2
```

## Notes

-   Works great with or without [vim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim "vim extension's homepage") or [neovim](https://marketplace.visualstudio.com/items?itemName=asvetliakov.vscode-neovim "neo vim extension's homepage")! See vim/nvim integration below
-   Vim modes supported:
    -   command mode
    -   insert mode
-   Recommended key mappings to replace 'f' in vim integration below.
-   Recommended key mappings for back and forward below.

## Key Bindings

### Defaults

-   Enter jump mode
    -   <kbd>shift</kbd> + <kbd>enter</kbd>
-   Enter selection mode
    -   <kbd>shift</kbd> + <kbd>alt</kbd> + <kbd>enter</kbd>
-   Reset first character entered
    -   <kbd>backspace</kbd>
-   Cancel/exit jump mode (any of the following)
    -   <kbd>shift</kbd> + <kbd>enter</kbd>
    -   <kbd>enter</kbd>
    -   <kbd>esc</kbd>
    -   <kbd>space</kbd>

## Jump back and forward

Did you know VS Code has built in backwards and forward navigation functionality? You should _probably_ map that to a hotkey for Jumpy!
I currently use the <kbd>backspace</kbd> key which overrides the default boring backspace functionality from vim (while in normal mode only of course).

For example with [vim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) Edit this in your `keybindings.json` file:

```json
    {
        "key": "backspace",
        "command": "workbench.action.navigateBack",
        "when": "editorTextFocus && vim.active && !inDebugRepl && vim.mode == 'Normal'"
    },
    {
        "key": "shift+backspace",
        "command": "workbench.action.navigateForward",
        "when": "editorTextFocus && vim.active && !inDebugRepl && vim.mode == 'Normal'"
    },
```

## Custom set of keys to use (easier to type / faster?)

```json
"jumpy2.customKeys": {
    "type": "array",
    "default": "fjdkslaghrueiwoncmv",
    "description": "Default characters to use"
},
```

The default might be easier for beginners. It is also probably better for larger screens (more labels before jumpy has to resort to utliizing uppercase letters).

```json
"jumpy2.customKeys": {
    "type": "array",
    "default": "abcdefghijklmnopqrstuvwxyz",
    "description": "Default characters to use"
},
```

## Colors & Border

To override Jumpy's default label colors (black on green) try this
In your VS Code's `settings.json` file:

```json
"workbench.colorCustomizations": {
  "jumpy2.labelFontColor": "#000000", // black
  "jumpy2.labelBackgroundColor": "#ff0000", // on red
  "jumpy2.labelBorderColor": "#ffffff", // white border
  "jumpy2.beaconColor": "#ff0000af", // transparent red
},
```

_However_, it is probably wise to leave the defaults, and instead scope this to a theme or wildcarded (modified from [VS Code's examples](https://code.visualstudio.com/docs/getstarted/themes#_editor-syntax-highlighting) like so:

```js
"workbench.colorCustomizations": {
  // NOTE: not all dark and light themes are conveniently labeled "dark" or "light" like this.
  // In that case, you can specify per theme, or again, just leave Jumpy's default or override the default with the example above.
  "[*Dark*]": {
    "jumpy2.labelFontColor": "#000000",
    "jumpy2.labelBackgroundColor": "#FFFFFF",
    "jumpy2.labelBorderColor": "#FF0000",
    "jumpy2.beaconColor": "#FF0000AF",
  },
  "[*Light*]": {
    "jumpy2.labelFontColor": "#FFFFFF",
    "jumpy2.labelBackgroundColor": "#000000",
    "jumpy2.labelBorderColor": "#FF0000",
    "jumpy2.beaconColor": "#FF0000AF",
  }
},
```

## Vim integration

(_see neovim below if interested_)

### Override vim's extension level backspace

If you want the <kbd>backspace</kbd> key to work as the jumpy "reset" command you **must** define a "_user_" level keybindings override in `keybindings.json` to override vim's "_extension_" level keybinding:

```json
{
    "key": "backspace",
    "command": "jumpy2.reset",
    "when": "jumpy2.jump-mode && editorTextFocus"
}
```

(_feel free to bind it to another key as well_)

### Bind 'f' and/or 'F' key

if <kbd>f</kbd> vim functionality is desired:
open settings as json and add:

```json
  "vim.normalModeKeyBindingsNonRecursive": [
    {
      "before": ["f"],
      "commands": ["jumpy2.toggle"]
    },
    {
      "before": ["F"],
      "commands": ["jumpy2.toggleSelection"]
    }
  ],
```

## Neovim Integration

_NOTE: I haven't fully configured neovim but used it successfully for a while with the following_:

```json
{
  "key": "f",
  "command": "jumpy2.toggle",
  "when": "neovim.mode =~ /^normal$|^visual$/ && !jumpy2.jump-mode && editorTextFocus"
},
{
  "key": "escape",
  "command": "jumpy2.exit",
  "when": "neovim.init && jumpy2.jump-mode && editorTextFocus"
}
```

for back and forward functionality with neovim:

```json
{
  "key": "backspace",
  "command": "workbench.action.navigateBack",
  "when": "editorTextFocus && !inDebugRepl && neovim.mode != 'insert'"
},
{
  "key": "shift+backspace",
  "command": "workbench.action.navigateForward",
  "when": "editorTextFocus && !inDebugRepl && neovim.mode != 'insert'"
}
```

## Fun

### Show your total career jumps

command palette (usually <kbd>command</kbd>+<kbd>shift</kbd>+<kbd>p</kbd>) -> `Jumpy: Show Career Jumps`

### Emojis

Change the 'jumper' set (emojis)
in your VS Code's `settings.json`

add:

```json
  "jumpy2.jumperEmojis.jumperSet": ["🐒"],
```

_The above tells jumpy to use the monkey emoji exclusively._

## Known Issues

-   Can not jump to treeview or tabs.

## Acknowledgements

-   Various [contributors](https://github.com/DavidLGoldberg/jumpy/graphs/contributors) from the original atom project.
-   Logo icon created by [Dr. Gregory W. Goldberg](https://scholar.google.com/citations?hl=en&user=zNw4iZkAAAAJ&view_op=list_works) (in his spare time!) and David L. Goldberg."
-   Implementation inspiration from [Wayne Maurer](https://github.com/wmaurer) (the author of the first VS Code implementation of Jumpy)

## Related work

-   Other Jumpies:
    -   Original [Jumpy](https://atom.io/packages/jumpy) for Atom
    -   First [Jumpy](https://marketplace.visualstudio.com/items?itemName=wmaurer.vscode-jumpy) to make it to VS Code
    -   VS Code 'jumpy' search [results](https://marketplace.visualstudio.com/search?term=jumpy&target=VSCode&category=All%20categories&sortBy=Relevance)
    -   [Jumpy for Sublime](https://packagecontrol.io/packages/Jumpy)
-   Ace Jump maintains a nice [comparison list](https://github.com/acejump/AceJump#comparison) of hotkey/jump related programs

(should we _collab_ more? Reach out!)

## Keywords

(A little SEO juice)

-   Shortcuts
-   Navigation
-   Productivity
-   Mouseless
-   Plugin
-   Extension

## My previous Atom packages :)

-   [Jumpy](https://atom.io/packages/jumpy)
-   [Jumpy-beacon](https://atom.io/packages/jumpy-beacon) (I still have to implement this or at least a beacon for Jumpy2)
-   [Qolor](https://atom.io/packages/qolor)

## Support Jumpy2

-   Subscribe to my youtube channel: https://www.youtube.com/channel/UCi6p1uTlAozufNiQgpgpW-Q
-   Sponsor me on Github [David L Goldberg](https://github.com/sponsors/DavidLGoldberg)
-   Support me on [Patreon](https://www.patreon.com/davidlgoldberg)
-   Support me via [crypto](./crypto-donations.md)
