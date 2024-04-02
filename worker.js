let globalCanvas = null;

globalThis.document = {
  querySelector: (query) => {
    sendDebugMessage(`Query selector called with ${query}`)
    if (query === "#canvas") {
      return globalCanvas;
    }
  }
}
importScripts('./out.js');

Module.onRuntimeInitialized = () => {
    Module['print'] = sendDebugMessage;
    sendDebugMessage("Module loaded and ready.");
}

function sendDebugMessage(message) {
    postMessage({ type: 'debug', message: message });
}

onmessage = function(e) {
  postMessage({ type: 'debug', message: `Worker received message ${e.type}` });
  if (e.data.canvas) {
    const canvas = e.data.canvas;
    sendDebugMessage('WebGL initialized successfully.');
    Module['canvas'] = canvas;
    globalCanvas = canvas;
  }else if (e.data.type === 'getContext') {
    sendDebugMessage('Getting context...');
    Module.testGetContext();
  }
};
