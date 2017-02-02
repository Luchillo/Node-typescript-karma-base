// import * as app from './server';
import app from './server';
// tslint:disable-next-line:no-var-requires
// const server = require('./server');

console.log('App: ', app);


describe('test', () => {
  it('works', () => {
    expect(true).toBe(true);
  });
  it('works again', () => {
    expect('Hello').toBe('Hello');
  });
});
