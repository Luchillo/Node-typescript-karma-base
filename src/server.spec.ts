import fetch from 'node-fetch';
import { Server } from 'http';
import {app, APP_PORT} from './server';
// tslint:disable-next-line:no-var-requires
// const server = require('./server');

import * as enableDestroy from 'server-destroy';

console.log('App: ', app);
console.log('enableDestroy: ', enableDestroy);
let server: any;

describe('Root test', () => {
  beforeAll((done) => {
    console.log('Before');
    server = app.listen(APP_PORT, () => {
      enableDestroy(server);
      done();
    });
  });
  afterAll((done) => {
    console.log('After');
    server.close();
    server.destroy(done);
  });
  it('Should return http code 200', (done) => {
    new Promise(async (resolve, reject) => {
      try {
        let resp = await fetch('http://localhost:8080');
        console.log('Fetch response obj: ', JSON.stringify(resp), null, 2);
        expect(resp.status).toBe(200);

        let resp2 = await fetch('http://localhost:8080');
        console.log(JSON.stringify(resp2.headers), null, 2);
        expect(resp2.status).toBe(250);
        resolve(true);
      } catch (err) {
        console.error(err);
        resolve(err);
      }
    })
    .then(() => done());
  });
});
