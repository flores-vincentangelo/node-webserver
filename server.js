const cluster = require('cluster');
const os = require('os');

let numCPUs = os.cpus().length;
numCPUs = 2
if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);
  
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  require('./src/worker'); // Each worker runs this
}