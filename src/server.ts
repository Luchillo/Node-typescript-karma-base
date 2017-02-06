import './polyfills';
// import 'core-js';
import * as Express from 'express';
// import * as GraphHTTP from 'express-graphql';

// Config
export const APP_PORT = 8080;

export const app = Express();

app.get('/', async (req, res) => {
  console.log('Root request');
  let body = await new Promise((resolve, reject) => {
    setTimeout(() => resolve(req.body), 100);
  });
  res.send('Hello World!');
});

console.log(core.Object.entries({
  a: 1,
  b: [1, 3]
}));

// app.use('/graphql', GraphHTTP({
//   schema: Schema,
//   pretty: true,
//   graphiql: true,
// }));

console.log('Env: ', ENV);
/* istanbul ignore if */
if (ENV !== 'test') {
  let server = app.listen(APP_PORT, () => console.log(`App listening on port ${APP_PORT}`));
  // server.close();
}
