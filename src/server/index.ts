import { join } from 'path';
import cluster from 'cluster';
import { cpus } from 'os';
import { config } from 'dotenv';
import { runServer } from './server';

const isProd = process.env.NODE_ENV === 'production';

// If you compile server code with webpack, this is unnecessary.
config({
  path: isProd ? join(__dirname, '../../../.env.prod') : join(__dirname, '../../.env.dev')
});

if (isProd) {
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
