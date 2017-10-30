# space-dud-example
`space-dud-example` is an example client/server setup of the [space-dud](https://www.npmjs.com/package/space-dud) module.

## How to Run
Clone the `space-dud` repository:
```
$ git clone https://github.com/MMazzocchi/space-dud-example.git
```
A `space-dud-example/` directory should now be available. Change directories to it, and install the required modules:
```
$ cd space-dud-example/
$ npm install
```
All modules shoule now be installed. Start the server:
```
$ node index.js
```
If all goes well, you should see the message `listening on 0.0.0.0:3000`.

Next, open a web browser. Navigate to http://0.0.0.0:3000/controller.html. You should see a page that says "Player ID: " followed by a string of characters, numbers, and dashes. Copy the player ID, save it for later.
**While the browser window is still open**, plug in a USB game controller. Press a couple buttons to ensure the browser detects it. Keep the browser window open.

Open another web browser window. Navigate to http://0.0.0.0:3000/display.html. You should see a page with an input box labeled "Player ID". Paste your player ID into that box and click "Submit". Keep the browser window open and visible.

Now, click back to the controller client. Press buttons on the controller; you should see the display client change as it receives and displays the events.
