# Web Workers

This demo shows how the web worker off-loads the recursive fibonacci computation from the main thread onto a separate thread, allowing the UI to be responsive in the meantime. Unlike when the computation is done on the main thread, then the UI becomes unresponsive. I've added an extra option, to show how a similar effect can be achieved, by offloading the computation to the server and invoking it with a network call via an async function. The async function will be picked up by the event loop once the request has been fulfilled.

To test this, enter a number greater or equal to 45. The computation will last enough for you to try and play with the various UI elements, and see when it becomes unresponsive. You can try to click on the input box, or the dropdown menu, or even select some text.

## Docs
- [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [Web Socket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
