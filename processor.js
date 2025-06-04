const { parentPort, workerData } = require('worker_threads');

function processRequest(data) {
    console.log(`worker ${data.id} is working on ${data.data} for ${data.to} seconds`)
    throw new Error(`worker ${data.id} died`)
    setTimeout(() => {
        console.log(`worker ${data.id} is done working on ${data.data}`)
        return "done";
    }, data.to * 1000)
}

parentPort.postMessage(processRequest(workerData))