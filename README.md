# Pasta to CFG

https://zakru.github.io/pasta-to-cfg/index.html

This simple web application converts any long text into a file compatible with
Source engine games such as Counter-Strike: Global Offensive. This file can then
be used to output the entire text into the in-game chat in several messages.

## Usage

1. Enter your text in the first text area (alternatively use the button below to
   use text from a file on your device)
2. Set the command name you wish to use in the corresponding text field
3. Copy the text in the second text area and save it to a file inside your
   game's `cfg` directory
4. Execute the file from within the game

There is now a command with your given name. When called repeatedly, your text
will be output into the game chat.

**Note: If called too rapidly, the game server will most likely throttle the
messages, resulting in some lines going missing.**
