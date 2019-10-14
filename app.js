const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const mongoose = require('mongoose')
const { connectionStr } = require('./config')

const index = require('./routes/index')
const users = require('./routes/users')

mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('mongodb连接成功')
})
mongoose.connection.on('error', console.error)

// error handler
onerror(app)

app.use(error({
  postFormat: (e, {stack, ...rest}) => process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}
}))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(parameter(app))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
