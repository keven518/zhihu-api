const jsonwebtoken = require('jsonwebtoken')
const router = require('koa-router')()
const { find, findById, create, update, delete: del, login, checkOwner } = require('../controllers/users')
const { secret } = require('../config')

router.prefix('/users')

const auth = async (ctx, next) => {
  console.log('ctx.request: ', ctx.request)
  const { authorization = '' } = ctx.request.header
  const token = authorization.replace('Bearer', '')
  try{
    const user = jsonwebtoken.verify(token, secret)
    ctx.state.user = user
  }catch(err){
    ctx.throw(401, err.message)
  }
  await next()
}

router.get('/', async (ctx) => {
  ctx.body = '<h1>这是主页 - HomeCtl - 8866';
})

router.get('/bar', find)

router.post('/add', create)

router.get('/:id', findById)

router.patch('/:id', auth, checkOwner, update)

router.delete('/:id', auth, checkOwner, del)

router.post('/login', login)

module.exports = router
