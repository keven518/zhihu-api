const router = require('koa-router')()
const { index, indexRender } = require('../controllers/home')

router.get('/', indexRender)

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
