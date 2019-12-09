const logger = require('koa-logger');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongo = require('koa-mongo')
const app = new Koa();

app.use(mongo({
  host: 'localhost',
  port: 27017,
  user: 'admin',
  db: 'user',
  authSource: 'admin',
  max: 100,
  min: 1
}));

const router = new Router();

app.use(bodyParser());

app.use(logger());

router.get('/',(ctx)=>{ctx.body= "howdy partner"});

app.use(router.routes());

app.listen(3000);