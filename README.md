# emscripten-webgl-context-from-worker

The emscripten webgl glue doesn't let you pass in a context, only create one.
This is not possible in a worker, since it doesnt have access to the DOM.

Seems like its possible to transfer the canvas to the worker as an OffscreenCanvas.

then mock a `document.querySelector` to return the transfered canvas. Emscripten will call this under the hood, and acquire the right context.
```javascript
globalThis.document = {
  querySelector: (query) => {
    if (query === "#canvas") {
      // globalCanvas is OffscreenCanvas transfered to the worker
      return globalCanvas;
    }
  }
}
```


