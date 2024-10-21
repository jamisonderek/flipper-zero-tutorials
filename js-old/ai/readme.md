# AI for JavaScript

## Overview
This project was tested with [ChatGPT-4o](https://chatgpt.com/?model=gpt-4o).  The goal of this project is to use AI to generate JavaScript that runs on the Flipper Zero; without requiring the user to be familiar with JavaScript programming.

## Directions
- Step 1. Open [Chatgpt.com](https://chatgpt.com/?model=gpt-4o) and make sure you have `ChatGPT-4o` selected.
- Step 2. Copy the contents of [intro.txt](./intro.txt) into the Message window of Chat.
- Step 3. Drag the train*.js files into the Message window.
- Step 4. Press `Ctrl`+`Enter` to get a blank line.
- Step 5. Request a script to do some feature for the Flipper Zero!  Be sure you request something that is in [Supported Capabilities](https://github.com/jamisonderek/flipper-zero-tutorials/wiki/JavaScript#capabilities) of JavaScript; or at least not in the [Not Supported](https://github.com/jamisonderek/flipper-zero-tutorials/wiki/JavaScript#not-supported) for the best results.
  Example: "Create a JavaScript program for the Flipper Zero that prints 'Hello World' on the screen."
- Step 6. Click the `Copy code` button from the response.
- Step 7. Paste the resulting script into a text file (I named my file `ai.js`).
- Step 8. Copy the text file to your Flipper Zero on the SD Card at `sd card/apps/Scripts`.
- Step 9. Run the script on the Flipper Zero (`Apps`, `Scripts`, *yourScript.js*).

## Troubleshooting
If you get an error displayed on Flipper...
Tell ChatGPT
```
I got error: <message from flipper:4>. 
Line 4 is <contents of line from js file>
```  

Replace the stuff in angle brackets with the actual error message.  The end of the error will have a `:` and line number (4 in this example).  Replace the second line with the actual line number reported and the contents of the line (Ctrl+G goes to line in Notepad).

If program runs, but does not give expected result...
Tell ChatGPT the result you got and the expected result.

## Support
If you have any questions, please ask in my [Flipper Zero Discord](https://discord.com/invite/NsjCvqwPAd) server.  There are also giveaways and other fun things happening there.

Support my work: 
- Option 1. [Like, Subscribe and click the Bell (to get notified)](https://youtu.be/DAUQGeG4pc4) 
- Option 2. [https://ko-fi.com/codeallnight](https://ko-fi.com/codeallnight) (donate $3 via PayPal or Venmo) 
- Option 3. Click the "Thanks" button on [YouTube](https://youtu.be/DAUQGeG4pc4). 
- Option 4. Purchase a [FlipBoard](https://github.com/MakeItHackin/FlipBoard) (I get a portion of the sale).
