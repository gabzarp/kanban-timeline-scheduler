const logger = require('koa-logger');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongo = require('koa-mongo')
const user = require('./controllers/UserController')
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

router.get('/',(ctx)=>{ctx.body= "howdy partner"})
      .post('/user', user.createUser)
      .post('/login', user.login)
      .get('/user/:id', user.getUsertById)
      .delete('/user/:id', user.deleteUser)
      .patch('/user/:id', user.updateUser)
      .get('/users', user.getAllUsers);

app.use(router.routes());

app.listen(3000);