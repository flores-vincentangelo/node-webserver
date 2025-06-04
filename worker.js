// worker.js
const { Worker } = require('worker_threads');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    console.log('in /')
    try{
        await runInWorker("data", getRandomInt(10))
        res.send("message received");
    } catch (e){
        console.log("there was an error")
    }
})

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function runInWorker(data, to) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./processor.js', {
      workerData: {
        data: data,
        id: process.pid,
        to: to
      },
    });

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`Worker ${process.pid} stopped with code ${code}`));
    });
  });
}

app.listen(port, () => {
    console.log(`Worker ${process.pid} listening on port 3000`);

})