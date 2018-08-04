import * as cluster from 'cluster';
import { cpus } from 'os';
import { runServer } from './server';

if (process.env.NODE_ENV === 'production') {
  const numCPUs = cpus().length;

  if (cluster.isMaster) {
    [...new Array(numCPUs)].forEach(() => cluster.fork());

    // cluster manager
    cluster.on('exit', (worker, code, signal) => {
      console.log(`Restarting ${worker.process.pid}. ${code || signal}`);
      cluster.fork();
    });
  } else {
    runServer();
  }
} else {
  runServer();
}

process.on('uncaughtException', (err) => {
  console.error(err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error(err);
});
