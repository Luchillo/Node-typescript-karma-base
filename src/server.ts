import './polyfills';
import * as Express from 'express';
// import * as GraphHTTP from 'express-graphql';

// Config
const APP_PORT = 8080;

const app = Express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

console.log(Object.entries(Express));

// app.use('/graphql', GraphHTTP({
//   schema: Schema,
//   pretty: true,
//   graphiql: true,
// }));

console.log('Env: ', ENV);

app.listen(APP_PORT, () => console.log(`App listening on port ${APP_PORT}`));

export default app;
