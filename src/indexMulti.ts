import dotenv from 'dotenv';
import cluster from 'cluster';
import { cpus } from 'os';
import { runServer } from './service/service';

dotenv.config();
const PORT = Number(process.env.PORT) || 4000;
const numCPUs = cpus().length;

if (cluster.isPrimary) {
  runServer(PORT);
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    const workerPORT = PORT + i + 1;
    cluster.fork({ PORT: workerPORT });
    process.env.PORT = workerPORT.toString();
  }

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  runServer(Number(process.env.PORT));
}
