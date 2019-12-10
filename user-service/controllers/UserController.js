const bcrypt = require('bcrypt');
const mongo = require('koa-mongo');
const user = {
    createUser: (ctx) =>{
        return bcrypt.hash(ctx.request.body.password, 10)
        .then((results)=>{
            ctx.request.body.password = results;
            return ctx.db.collection('user').insertOne(ctx.request.body)
        })
        .then((results)=>{
            ctx.body = results;
            ctx.status = 200;
        })
        .catch(err =>{ctx.body = 'error: ' + err; ctx.status = 500;})
    },
    login: (ctx) =>{
        return ctx.db.collection('user').findOne({"name": ctx.request.body.name})
        .then((results) => {
            return bcrypt.compare(ctx.request.body.password, results.password);
        })
        .then(results =>{
            ctx.body = results;
            ctx.status = 200;
        })
        .catch(err =>{
            ctx.body = err;
            ctx.status = 500;
        })
    },
    getUsertById: (ctx) =>{
        return ctx.db.collection('user').findOne({"_id": mongo.ObjectID(ctx.params.id)})
        .then((results)=>{
            ctx.body = results;
            ctx.status = 200;
        })
        .catch(err =>{ctx.body = 'error: ' + err; ctx.status = 500;})
    },
    deleteUser: (ctx) =>{
        return ctx.db.collection('user').deleteOne({"_id": mongo.ObjectID(ctx.params.id)})
        .then(()=>{
            ctx.body = 'user deleted';
            ctx.status = 200;
        })
        .catch(err =>{ctx.body = 'error: ' + err; ctx.status = 500;})
    },
    updateUser: (ctx) =>{
        return ctx.db.collection('user').updateOne({"_id": mongo.ObjectID(ctx.params.id)} , ctx.request.body)
        .then(()=>{
            ctx.body = ctx.request.body;
            ctx.status = 200;
        })
        .catch(err =>{ctx.body = 'error: ' + err; ctx.status = 500;})
    },
    getAllUsers: (ctx) => {
        return ctx.db.collection('user').find().toArray()
        .then((results)=>{
            ctx.body = results;
            ctx.status = 200;
        })
        .catch(err =>{ctx.body = 'error: ' + err; ctx.status = 500;})
    }
}

module.exports = user;