# AI for JavaScript

## Overview
This project was tested with [ChatGPT-4o](https://chatgpt.com/?model=gpt-4o) and [Grok](https://grok.com/chat).  The goal of this project is to use AI to generate JavaScript that runs on the Flipper Zero; without requiring the user to be familiar with JavaScript programming.

JavaScript has a limited set of features. Be sure you request something that is in [Supported Capabilities](https://github.com/jamisonderek/flipper-zero-tutorials/wiki/JavaScript#features) of JavaScript; or at least not in the [Not Supported](https://github.com/jamisonderek/flipper-zero-tutorials/wiki/JavaScript#not-supported) for the best results.

## Directions
- Step 1. Open [Chatgpt.com](https://chatgpt.com/?model=gpt-4o) and make sure you have `ChatGPT-4o` selected.
- Step 2. Drag the files for your firmware into the Message window.
  - [Official](./official-firmware/)
  - [RogueMaster](./roguemaster-firmware/)
  - [Momentum](./momentum-firmware)
  - [Unleashed](./unleashed-firmware)
- Step 3. Request a script to do some feature for the Flipper Zero!  Be sure you request something that is in [Supported Capabilities](https://github.com/jamisonderek/flipper-zero-tutorials/wiki/JavaScript#features) of JavaScript; or at least not in the [Not Supported](https://github.com/jamisonderek/flipper-zero-tutorials/wiki/JavaScript#not-supported) for the best results.
  Example: "Create a JavaScript program for the Flipper Zero that prints 'Hello World' on the screen."
- Step 4. Click the `Copy code` button from the response.
- Step 5. Paste the resulting script into a text file (I named my file `ai.js`).
- Step 6. Copy the text file to your Flipper Zero on the SD Card at `sd card/apps/Scripts`.
- Step 7. Run the script on the Flipper Zero (`Apps`, `Scripts`, *yourScript.js*).

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
If you have any questions, please reach out to me on Discord (@CodeAllNight) or tag me in any of the Flipper Zero Discord servers.

Support my work: 
- Option 1. [Like, Subscribe and click the Bell (to get notified)](https://youtu.be/DAUQGeG4pc4) 
- Option 2. [https://ko-fi.com/codeallnight](https://ko-fi.com/codeallnight) (donate $3 via PayPal or Venmo) 
- Option 3. Click the "Thanks" button on [YouTube](https://youtu.be/DAUQGeG4pc4). 
- Option 4. Purchase a [FlipBoard](https://github.com/MakeItHackin/FlipBoard) (I get a portion of the sale).
- Option 5. Purchase from [Lab401.com](https://lab401.com/r?id=7c6mqp) using promo code: DEREK (You save 5% & I get a portion of the sale).