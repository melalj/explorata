import modelWorker from 'workerize-loader!../plugins/FB_MESSENGER/modelWorker.js'; // eslint-disable-line import/no-webpack-loader-syntax

let instance;

export function initWorker() {
  instance = modelWorker();
}

export function getWorker() {
  return instance;
}

