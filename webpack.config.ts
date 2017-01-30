switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack.prod')({env: 'production'}); // tslint:disable-line
    break;
  case 'test':
  case 'testing':
    module.exports = require('./config/webpack.test')({env: 'test'}); // tslint:disable-line
    break;
  case 'dev':
  case 'development':
  // tslint:disable-next-line:no-switch-case-fall-through
  default:
    module.exports = require('./config/webpack.dev')({env: 'development'}); // tslint:disable-line
}
