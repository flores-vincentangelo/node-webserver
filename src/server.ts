
const cluster = require("cluster");
import type { Worker } from "cluster";
const os = require("os");

const numCpus: number = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker: Worker) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
  })
} else {
    require('./src/worker');
}
