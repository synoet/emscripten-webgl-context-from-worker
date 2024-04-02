const worker = new Worker('worker.js');

worker.onmessage = function(event) {
    const { type, message } = event.data;
    switch (type) {
        case 'debug':
            console.log(`[Worker Debug] ${message}`);
            break;
        default:
            console.log(`[Worker] Unknown message type: '${type}' with message: ${message}`);
    }
};

function transferCanvasToWorker() {
  console.log('[Main] Transferring canvas to worker...');
  const canvas = document.getElementById('canvas');
  const offscreen = canvas.transferControlToOffscreen();


  worker.postMessage({type: 'transferCanvas', canvas: offscreen}, [offscreen]);
}

window.onload = () => {
  transferCanvasToWorker();
};


function testGetCanvas() {
  worker.postMessage({type: 'getContext'}, []);
}
